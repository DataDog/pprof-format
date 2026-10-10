/**
 * Unless explicitly stated otherwise all files in this repository are licensed under the MIT License.
 *
 * This product includes software developed at Datadog (https://www.datadoghq.com/  Copyright 2022 Datadog, Inc.
 */

/*!
 * Private helpers. These are only used by other helpers.
 */
const lowMaxBig = 2n ** 32n - 1n
const lowMax = 2 ** 32 - 1
const lowMaxPlus1 = lowMax + 1

/**
 * Yields to the event loop. Uses setImmediate where available (Node.js), and
 * falls back to setTimeout in browsers, which lack setImmediate.
 */
function yieldToEventLoop(): Promise<void> {
  return typeof setImmediate === 'function'
    ? new Promise(resolve => setImmediate(resolve))
    : new Promise(resolve => setTimeout(resolve, 0))
}

// Buffer.from(string, 'utf8') is faster, when available
const toUtf8 = typeof Buffer === 'undefined'
  ? (value: string) => new TextEncoder().encode(value)
  : (value: string) => Buffer.from(value, 'utf8')

type Numeric = number | bigint

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

function decodeBigNumber(buffer: Uint8Array, start = 0): bigint {
  if (start >= buffer.length) return BigInt(0)
  // The low 4 bytes hold 28 bits and the rest at most 42, so both fit in a
  // Number exactly
  let lo = 0
  let hi = 0
  let i = 0
  let byte
  do {
    byte = buffer[start + i]
    if (i < 4) {
      lo |= (byte & 0b01111111) << (7 * i)
    } else {
      hi += (byte & 0b01111111) * 2 ** (7 * (i - 4))
    }
    i++
  } while (byte >= 0b10000000)
  if (hi < 2 ** 25) return BigInt(hi * 2 ** 28 + lo)
  return (BigInt(hi) << 28n) | BigInt(lo)
}

// Decodes a varint of at most 4 bytes spanning buffer[start..end)
function decodeSmallNumber(buffer: Uint8Array, start: number, end: number): number {
  let value = 0
  for (let i = start; i < end; i++) {
    value |= (buffer[i] & 0b01111111) << (7 * (i - start))
  }
  return value
}

function lowBits(number: Numeric): number {
  return typeof number !== 'bigint'
    ? (number >>> 0) % lowMaxPlus1
    : Number(number & lowMaxBig)
}

function highBits(number: Numeric): number {
  return typeof number !== 'bigint'
    ? (number / lowMaxPlus1) >>> 0
    : Number(number >> 32n & lowMaxBig)
}

function long(number: Numeric): Array<number> {
  const sign = number < 0
  if (sign) number = -number

  let lo = lowBits(number)
  let hi = highBits(number)

  if (sign) {
    hi = ~hi >>> 0
    lo = ~lo >>> 0
    if (++lo > lowMax) {
      lo = 0
      if (++hi > lowMax) { hi = 0 }
    }
  }

  return [hi, lo]
}

/**
 * Public helpers. These are used in the type definitions.
 */
const kTypeVarInt = 0
const kTypeLengthDelim = 2

// Decodes the varint spanning buffer[start..end)
function decodeNumber(buffer: Uint8Array, start = 0, end = buffer.length): Numeric {
  if (end - start > 4) return decodeBigNumber(buffer, start)
  return decodeSmallNumber(buffer, start, end)
}

function decodeNumbers(buffer: Uint8Array, from = 0, to = buffer.length): Array<Numeric> {
  const values = []
  let start = from

  for (let i = from; i < to; i++) {
    if ((buffer[i] & 0b10000000) === 0) {
      if (i - start >= 4) {
        values.push(decodeBigNumber(buffer, start))
      } else {
        values.push(decodeSmallNumber(buffer, start, i + 1))
      }
      start = i + 1
    }
  }

  return values
}

function push<T>(value: T, list?: Array<T>): Array<T> {
  if (list == null) {
    return [value]
  }
  list.push(value)
  return list
}

function pushAll<T>(values: Array<T>, list?: Array<T>): Array<T> {
  if (list == null) {
    return values
  }
  for (const value of values) {
    list.push(value)
  }
  return list
}

function measureNumber(number: Numeric): number {
  if (number === 0 || number === 0n) return 0
  const [hi, lo] = long(number)

  const a = lo
  const b = (lo >>> 28 | hi << 4) >>> 0
  const c = hi >>> 24

  if (c !== 0) {
    return c < 128 ? 9 : 10
  }

  if (b !== 0) {
    if (b < 16384) {
      return b < 128 ? 5 : 6
    }

    return b < 2097152 ? 7 : 8
  }

  if (a < 16384) {
    return a < 128 ? 1 : 2
  }

  return a < 2097152 ? 3 : 4
}

function measureValue<T>(value: T): number {
  if (typeof value === 'undefined') return 0
  if (typeof value === 'number' || typeof value === 'bigint') {
    return measureNumber(value) || 1
  }
  return (value as Array<T>).length
}

function measureArray<T>(list: Array<T>): number {
  let size = 0
  for (const item of list) {
    size += measureValue(item)
  }
  return size
}

function measureNumberField(number: Numeric): number {
  const length = measureNumber(number)
  return length ? 1 + length : 0
}

function measureNumberArrayField(values: Numeric[]): number {
  let total = 0
  for (const value of values) {
    // Arrays should always include zeros to keep positions consistent
    total += measureNumber(value) || 1
  }
  // Packed arrays are encoded as Tag,Len,ConcatenatedElements
  // Tag is only one byte because field number is always < 16 in pprof
  return total ? 1 + measureNumber(total) + total : 0
}

function measureLengthDelimField<T>(value: T): number {
  const length = measureValue(value)
  // Length delimited records / submessages are encoded as Tag,Len,EncodedRecord
  // Tag is only one byte because field number is always < 16 in pprof
  return length ? 1 + measureNumber(length) + length : 0
}

function measureLengthDelimArrayField<T>(values: T[]): number {
  let total = 0
  for (const value of values) {
    total += measureLengthDelimField(value)
  }
  return total
}

function encodeNumber(buffer: Uint8Array, i: number, number: Numeric): number {
  if (number === 0 || number === 0n) {
    buffer[i++] = 0
    return i
  }

  let [hi, lo] = long(number)

  while (hi) {
    buffer[i++] = lo & 127 | 128
    lo = (lo >>> 7 | hi << 25) >>> 0
    hi >>>= 7
  }
  while (lo > 127) {
    buffer[i++] = lo & 127 | 128
    lo = lo >>> 7
  }
  buffer[i++] = lo

  return i
}

export const emptyTableToken = Symbol()

export class StringTable {
  strings = new Array<string>()
  #encodings = new Array<Uint8Array>()
  #positions = new Map<string, number>()

  constructor(tok?: typeof emptyTableToken) {
    if (tok !== emptyTableToken) {
      this.dedup('')
    }
  }

  get encodedLength(): number {
    let size = 0
    for (const encoded of this.#encodings) {
      size += encoded.length
    }
    return size
  }

  _encodeToBuffer(buffer: Uint8Array, offset: number): number {
    for (const encoded of this.#encodings) {
      buffer.set(encoded, offset)
      offset += encoded.length
    }
    return offset
  }

  encode(buffer = new Uint8Array(this.encodedLength)): Uint8Array {
    this._encodeToBuffer(buffer, 0)
    return buffer
  }

  static _encodeStringFromUtf8(stringBuffer: Uint8Array | Buffer): Uint8Array {
    const buffer = new Uint8Array(1 + stringBuffer.length + (measureNumber(stringBuffer.length) || 1))
    let offset = 0
    buffer[offset++] = 50 // (6 << 3) + kTypeLengthDelim
    offset = encodeNumber(buffer, offset, stringBuffer.length)
    if (stringBuffer.length > 0) {
      buffer.set(stringBuffer, offset)
    }
    return buffer
  }

  static _encodeString(string: string): Uint8Array {
    return StringTable._encodeStringFromUtf8(toUtf8(string))
  }

  dedup(string: string): number {
    if (typeof string === 'number') return string
    if (!this.#positions.has(string)) {
      const pos = this.strings.push(string) - 1
      this.#positions.set(string, pos)

      // Encode strings on insertion
      this.#encodings.push(StringTable._encodeString(string))
    }
    return this.#positions.get(string)!
  }

  _decodeString(buffer: Uint8Array) {
    const string = new TextDecoder().decode(buffer)
    this.#positions.set(string, this.strings.push(string) - 1)
    this.#encodings.push(StringTable._encodeStringFromUtf8(buffer))
  }
}

function decode<T>(
  buffer: Uint8Array,
  decoder: (data: any, field: number, buffer: Uint8Array, start: number, end: number) => void,
  from: number,
  to: number
): DeepPartial<T> {
  const data: any = {}
  let index = from

  while (index < to) {
    const field = buffer[index] >> 3
    const mode = buffer[index] & 0b111
    index++

    let start = index
    let end = index
    switch (mode) {
      case kTypeVarInt:
        while (end < to && buffer[end++] >= 0b10000000);
        break
      case kTypeLengthDelim: {
        while (start < to && buffer[start++] >= 0b10000000);
        const size = start - index > 4
          ? Number(decodeBigNumber(buffer, index))
          : decodeSmallNumber(buffer, index, start)
        end = Math.min(start + size, to)
        break
      }
      default:
        throw new Error(`Unrecognized value type: ${mode}`)
    }

    decoder(data, field, buffer, start, end)
    index = end
  }

  return data
}

export type ValueTypeInput = {
  type?: Numeric
  unit?: Numeric
}

export class ValueType {
  type: Numeric
  unit: Numeric

  static create(data: ValueTypeInput): ValueType {
    return data instanceof ValueType ? data : new ValueType(data)
  }

  constructor(data: ValueTypeInput) {
    this.type = data.type || 0
    this.unit = data.unit || 0
  }

  get length() {
    let total = 0
    total += measureNumberField(this.type)
    total += measureNumberField(this.unit)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    if (this.type) {
      buffer[offset++] = 8 // (1 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.type)
    }

    if (this.unit) {
      buffer[offset++] = 16 // (2 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.unit)
    }

    return offset
  }

  encode(buffer = new Uint8Array(this.length)): Uint8Array {
    this._encodeToBuffer(buffer, 0)
    return buffer
  }

  static decodeValue(data: ValueTypeInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length) {
    switch (field) {
      case 1:
        data.type = decodeNumber(buffer, start, end)
        break
      case 2:
        data.unit = decodeNumber(buffer, start, end)
        break
    }
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): ValueType {
    return new this(decode(buffer, this.decodeValue, start, end) as ValueTypeInput)
  }
}

export type LabelInput = {
  key?: Numeric
  str?: Numeric
  num?: Numeric
  numUnit?: Numeric
}

export class Label {
  key: Numeric
  str: Numeric
  num: Numeric
  numUnit: Numeric

  static create(data: LabelInput): Label {
    return data instanceof Label ? data : new Label(data)
  }

  constructor(data: LabelInput) {
    this.key = data.key || 0
    this.str = data.str || 0
    this.num = data.num || 0
    this.numUnit = data.numUnit || 0
  }

  get length() {
    let total = 0
    total += measureNumberField(this.key)
    total += measureNumberField(this.str)
    total += measureNumberField(this.num)
    total += measureNumberField(this.numUnit)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    if (this.key) {
      buffer[offset++] = 8 // (1 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.key)
    }

    if (this.str) {
      buffer[offset++] = 16 // (2 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.str)
    }

    if (this.num) {
      buffer[offset++] = 24 // (3 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.num)
    }

    if (this.numUnit) {
      buffer[offset++] = 32 // (4 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.numUnit)
    }

    return offset
  }

  encode(buffer = new Uint8Array(this.length)): Uint8Array {
    this._encodeToBuffer(buffer, 0)
    return buffer
  }

  static decodeValue(data: LabelInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length) {
    switch (field) {
      case 1:
        data.key = decodeNumber(buffer, start, end)
        break
      case 2:
        data.str = decodeNumber(buffer, start, end)
        break
      case 3:
        data.num = decodeNumber(buffer, start, end)
        break
      case 4:
        data.numUnit = decodeNumber(buffer, start, end)
        break
    }
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Label {
    return new this(decode(buffer, this.decodeValue, start, end) as LabelInput)
  }
}

export type SampleInput = {
  locationId?: Array<Numeric>
  value?: Array<Numeric>
  label?: Array<LabelInput>
}

export class Sample {
  locationId: Array<Numeric>
  value: Array<Numeric>
  label: Array<Label>

  static create(data: SampleInput): Sample {
    return data instanceof Sample ? data : new Sample(data)
  }

  constructor(data: SampleInput) {
    this.locationId = data.locationId || []
    this.value = data.value || []
    this.label = (data.label || []).map(Label.create)
  }

  get length() {
    let total = 0
    total += measureNumberArrayField(this.locationId)
    total += measureNumberArrayField(this.value)
    total += measureLengthDelimArrayField(this.label)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    if (this.locationId.length) {
      buffer[offset++] = 10 // (1 << 3) + kTypeLengthDelim
      offset = encodeNumber(buffer, offset, measureArray(this.locationId))
      for (const locationId of this.locationId) {
        offset = encodeNumber(buffer, offset, locationId)
      }
    }

    if (this.value.length) {
      buffer[offset++] = 18 // (2 << 3) + kTypeLengthDelim
      offset = encodeNumber(buffer, offset, measureArray(this.value))
      for (const value of this.value) {
        offset = encodeNumber(buffer, offset, value)
      }
    }

    for (const label of this.label) {
      buffer[offset++] = 26 // (3 << 3) + kTypeLengthDelim
      offset = encodeNumber(buffer, offset, label.length)
      offset = label._encodeToBuffer(buffer, offset)
    }

    return offset
  }

  encode(buffer = new Uint8Array(this.length)): Uint8Array {
    this._encodeToBuffer(buffer, 0)
    return buffer
  }

  static decodeValue(data: SampleInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length) {
    switch (field) {
      case 1:
        data.locationId = pushAll(decodeNumbers(buffer, start, end), data.locationId)
        break
      case 2:
        data.value = pushAll(decodeNumbers(buffer, start, end), data.value)
        break
      case 3:
        data.label = push(Label.decode(buffer, start, end), data.label)
        break
    }
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Sample {
    return new this(decode(buffer, this.decodeValue, start, end) as SampleInput)
  }
}

export type MappingInput = {
  id?: Numeric
  memoryStart?: Numeric
  memoryLimit?: Numeric
  fileOffset?: Numeric
  filename?: Numeric
  buildId?: Numeric
  hasFunctions?: boolean
  hasFilenames?: boolean
  hasLineNumbers?: boolean
  hasInlineFrames?: boolean
}

export class Mapping {
  id: Numeric
  memoryStart: Numeric
  memoryLimit: Numeric
  fileOffset: Numeric
  filename: Numeric
  buildId: Numeric
  hasFunctions: boolean
  hasFilenames: boolean
  hasLineNumbers: boolean
  hasInlineFrames: boolean

  static create(data: MappingInput): Mapping {
    return data instanceof Mapping ? data : new Mapping(data)
  }

  constructor(data: MappingInput) {
    this.id = data.id || 0
    this.memoryStart = data.memoryStart || 0
    this.memoryLimit = data.memoryLimit || 0
    this.fileOffset = data.fileOffset || 0
    this.filename = data.filename || 0
    this.buildId = data.buildId || 0
    this.hasFunctions = !!data.hasFunctions
    this.hasFilenames = !!data.hasFilenames
    this.hasLineNumbers = !!data.hasLineNumbers
    this.hasInlineFrames = !!data.hasInlineFrames
  }

  get length() {
    let total = 0
    total += measureNumberField(this.id)
    total += measureNumberField(this.memoryStart)
    total += measureNumberField(this.memoryLimit)
    total += measureNumberField(this.fileOffset)
    total += measureNumberField(this.filename)
    total += measureNumberField(this.buildId)
    total += measureNumberField(this.hasFunctions ? 1 : 0)
    total += measureNumberField(this.hasFilenames ? 1 : 0)
    total += measureNumberField(this.hasLineNumbers ? 1 : 0)
    total += measureNumberField(this.hasInlineFrames ? 1 : 0)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    if (this.id) {
      buffer[offset++] = 8 // (1 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.id)
    }
    if (this.memoryStart) {
      buffer[offset++] = 16 // (2 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.memoryStart)
    }
    if (this.memoryLimit) {
      buffer[offset++] = 24 // (3 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.memoryLimit)
    }
    if (this.fileOffset) {
      buffer[offset++] = 32 // (4 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.fileOffset)
    }
    if (this.filename) {
      buffer[offset++] = 40 // (5 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.filename)
    }
    if (this.buildId) {
      buffer[offset++] = 48 // (6 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.buildId)
    }
    if (this.hasFunctions) {
      buffer[offset++] = 56 // (7 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, 1)
    }
    if (this.hasFilenames) {
      buffer[offset++] = 64 // (8 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, 1)
    }
    if (this.hasLineNumbers) {
      buffer[offset++] = 72 // (9 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, 1)
    }
    if (this.hasInlineFrames) {
      buffer[offset++] = 80 // (10 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, 1)
    }
    return offset
  }

  encode(buffer = new Uint8Array(this.length)): Uint8Array {
    this._encodeToBuffer(buffer, 0)
    return buffer
  }

  static decodeValue(data: MappingInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length) {
    switch (field) {
      case 1:
        data.id = decodeNumber(buffer, start, end)
        break
      case 2:
        data.memoryStart = decodeNumber(buffer, start, end)
        break
      case 3:
        data.memoryLimit = decodeNumber(buffer, start, end)
        break
      case 4:
        data.fileOffset = decodeNumber(buffer, start, end)
        break
      case 5:
        data.filename = decodeNumber(buffer, start, end)
        break
      case 6:
        data.buildId = decodeNumber(buffer, start, end)
        break
      case 7:
        data.hasFunctions = !!decodeNumber(buffer, start, end)
        break
      case 8:
        data.hasFilenames = !!decodeNumber(buffer, start, end)
        break
      case 9:
        data.hasLineNumbers = !!decodeNumber(buffer, start, end)
        break
      case 10:
        data.hasInlineFrames = !!decodeNumber(buffer, start, end)
        break
    }
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Mapping {
    return new this(decode(buffer, this.decodeValue, start, end) as MappingInput)
  }
}

export type LineInput = {
  functionId?: Numeric
  line?: Numeric
  column?: Numeric
}

export class Line {
  functionId: Numeric
  line: Numeric
  column: Numeric

  static create(data: LineInput): Line {
    return data instanceof Line ? data : new Line(data)
  }

  constructor(data: LineInput) {
    this.functionId = data.functionId || 0
    this.line = data.line || 0
    this.column = data.column || 0
  }

  get length() {
    let total = 0
    total += measureNumberField(this.functionId)
    total += measureNumberField(this.line)
    total += measureNumberField(this.column)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    if (this.functionId) {
      buffer[offset++] = 8 // (1 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.functionId)
    }

    if (this.line) {
      buffer[offset++] = 16 // (2 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.line)
    }

    if (this.column) {
      buffer[offset++] = 24 // (3 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.column)
    }

    return offset
  }

  encode(buffer = new Uint8Array(this.length)): Uint8Array {
    this._encodeToBuffer(buffer, 0)
    return buffer
  }

  static decodeValue(data: LineInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length) {
    switch (field) {
      case 1:
        data.functionId = decodeNumber(buffer, start, end)
        break
      case 2:
        data.line = decodeNumber(buffer, start, end)
        break
      case 3:
        data.column = decodeNumber(buffer, start, end)
        break
    }
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Line {
    return new this(decode(buffer, this.decodeValue, start, end) as LineInput)
  }
}

export type LocationInput = {
  id?: Numeric
  mappingId?: Numeric
  address?: Numeric
  line?: Array<LineInput>
  isFolded?: boolean
}

export class Location {
  id: Numeric
  mappingId: Numeric
  address: Numeric
  line: Array<Line>
  isFolded: boolean

  static create(data: LocationInput): Location {
    return data instanceof Location ? data : new Location(data)
  }

  constructor(data: LocationInput) {
    this.id = data.id || 0
    this.mappingId = data.mappingId || 0
    this.address = data.address || 0
    this.line = (data.line || []).map(Line.create)
    this.isFolded = !!data.isFolded
  }

  get length() {
    let total = 0
    total += measureNumberField(this.id)
    total += measureNumberField(this.mappingId)
    total += measureNumberField(this.address)
    total += measureLengthDelimArrayField(this.line)
    total += measureNumberField(this.isFolded ? 1 : 0)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    if (this.id) {
      buffer[offset++] = 8 // (1 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.id)
    }
    if (this.mappingId) {
      buffer[offset++] = 16 // (2 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.mappingId)
    }
    if (this.address) {
      buffer[offset++] = 24 // (3 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.address)
    }
    for (const line of this.line) {
      buffer[offset++] = 34 // (4 << 3) + kTypeLengthDelim
      offset = encodeNumber(buffer, offset, line.length)
      offset = line._encodeToBuffer(buffer, offset)
    }
    if (this.isFolded) {
      buffer[offset++] = 40 // (5 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, 1)
    }

    return offset
  }

  encode(buffer = new Uint8Array(this.length)): Uint8Array {
    this._encodeToBuffer(buffer, 0)
    return buffer
  }

  static decodeValue(data: LocationInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length) {
    switch (field) {
      case 1:
        data.id = decodeNumber(buffer, start, end)
        break
      case 2:
        data.mappingId = decodeNumber(buffer, start, end)
        break
      case 3:
        data.address = decodeNumber(buffer, start, end)
        break
      case 4:
        data.line = push(Line.decode(buffer, start, end), data.line)
        break
      case 5:
        data.isFolded = !!decodeNumber(buffer, start, end)
        break
    }
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Location {
    return new this(decode(buffer, this.decodeValue, start, end) as LocationInput)
  }
}

export type FunctionInput = {
  id?: Numeric
  name?: Numeric
  systemName?: Numeric
  filename?: Numeric
  startLine?: Numeric
}

export class Function {
  id: Numeric
  name: Numeric
  systemName: Numeric
  filename: Numeric
  startLine: Numeric

  static create(data: FunctionInput): Function {
    return data instanceof Function ? data : new Function(data)
  }

  constructor(data: FunctionInput) {
    this.id = data.id || 0
    this.name = data.name || 0
    this.systemName = data.systemName || 0
    this.filename = data.filename || 0
    this.startLine = data.startLine || 0
  }

  get length() {
    let total = 0
    total += measureNumberField(this.id)
    total += measureNumberField(this.name)
    total += measureNumberField(this.systemName)
    total += measureNumberField(this.filename)
    total += measureNumberField(this.startLine)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    if (this.id) {
      buffer[offset++] = 8 // (1 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.id)
    }
    if (this.name) {
      buffer[offset++] = 16 // (2 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.name)
    }
    if (this.systemName) {
      buffer[offset++] = 24 // (3 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.systemName)
    }
    if (this.filename) {
      buffer[offset++] = 32 // (4 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.filename)
    }
    if (this.startLine) {
      buffer[offset++] = 40 // (5 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.startLine)
    }

    return offset
  }

  encode(buffer = new Uint8Array(this.length)): Uint8Array {
    this._encodeToBuffer(buffer, 0)
    return buffer
  }

  static decodeValue(data: FunctionInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length) {
    switch (field) {
      case 1:
        data.id = decodeNumber(buffer, start, end)
        break
      case 2:
        data.name = decodeNumber(buffer, start, end)
        break
      case 3:
        data.systemName = decodeNumber(buffer, start, end)
        break
      case 4:
        data.filename = decodeNumber(buffer, start, end)
        break
      case 5:
        data.startLine = decodeNumber(buffer, start, end)
        break
    }
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Function {
    return new this(decode(buffer, this.decodeValue, start, end) as FunctionInput)
  }
}

export type ProfileInput = {
  sampleType?: Array<ValueTypeInput>
  sample?: Array<SampleInput>
  mapping?: Array<MappingInput>
  location?: Array<LocationInput>
  function?: Array<FunctionInput>
  stringTable?: StringTable
  dropFrames?: Numeric
  keepFrames?: Numeric
  timeNanos?: Numeric
  durationNanos?: Numeric
  periodType?: ValueTypeInput
  period?: Numeric
  comment?: Array<Numeric>
  defaultSampleType?: Numeric
  docUrl?: Numeric
}

export class Profile {
  sampleType: Array<ValueType>
  sample: Array<Sample>
  mapping: Array<Mapping>
  location: Array<Location>
  function: Array<Function>
  stringTable: StringTable
  dropFrames: Numeric
  keepFrames: Numeric
  timeNanos: Numeric
  durationNanos: Numeric
  periodType?: ValueType
  period: Numeric
  comment: Array<Numeric>
  defaultSampleType: Numeric
  docUrl: Numeric

  constructor(data: ProfileInput = {}) {
    this.sampleType = (data.sampleType || []).map(ValueType.create)
    this.sample = (data.sample || []).map(Sample.create)
    this.mapping = (data.mapping || []).map(Mapping.create)
    this.location = (data.location || []).map(Location.create)
    this.function = (data.function || []).map(Function.create)
    this.stringTable = data.stringTable || new StringTable()
    this.dropFrames = data.dropFrames || 0
    this.keepFrames = data.keepFrames || 0
    this.timeNanos = data.timeNanos || 0
    this.durationNanos = data.durationNanos || 0
    this.periodType = data.periodType ? ValueType.create(data.periodType) : undefined
    this.period = data.period || 0
    this.comment = data.comment || []
    this.defaultSampleType = data.defaultSampleType || 0
    this.docUrl = data.docUrl || 0
  }

  get length() {
    let total = 0
    total += measureLengthDelimArrayField(this.sampleType)
    total += measureLengthDelimArrayField(this.sample)
    total += measureLengthDelimArrayField(this.mapping)
    total += measureLengthDelimArrayField(this.location)
    total += measureLengthDelimArrayField(this.function)
    total += this.stringTable.encodedLength
    total += measureNumberField(this.dropFrames)
    total += measureNumberField(this.keepFrames)
    total += measureNumberField(this.timeNanos)
    total += measureNumberField(this.durationNanos)
    total += measureLengthDelimField(this.periodType)
    total += measureNumberField(this.period)
    total += measureNumberArrayField(this.comment)
    total += measureNumberField(this.defaultSampleType)
    total += measureNumberField(this.docUrl)
    return total
  }

  _encodeSampleTypesToBuffer(buffer: Uint8Array, offset = 0): number {
    for (const sampleType of this.sampleType) {
      buffer[offset++] = 10 // (1 << 3) + kTypeLengthDelim
      offset = encodeNumber(buffer, offset, sampleType.length)
      offset = sampleType._encodeToBuffer(buffer, offset)
    }
    return offset
  }

  _encodeSamplesToBuffer(buffer: Uint8Array, offset = 0): number {
    for (const sample of this.sample) {
      buffer[offset++] = 18 // (2 << 3) + kTypeLengthDelim
      offset = encodeNumber(buffer, offset, sample.length)
      offset = sample._encodeToBuffer(buffer, offset)
    }
    return offset
  }

  _encodeMappingsToBuffer(buffer: Uint8Array, offset = 0): number {
    for (const mapping of this.mapping) {
      buffer[offset++] = 26 // (3 << 3) + kTypeLengthDelim
      offset = encodeNumber(buffer, offset, mapping.length)
      offset = mapping._encodeToBuffer(buffer, offset)
    }
    return offset
  }

  _encodeLocationsToBuffer(buffer: Uint8Array, offset = 0): number {
    for (const location of this.location) {
      buffer[offset++] = 34 // (4 << 3) + kTypeLengthDelim
      offset = encodeNumber(buffer, offset, location.length)
      offset = location._encodeToBuffer(buffer, offset)
    }
    return offset
  }

  _encodeFunctionsToBuffer(buffer: Uint8Array, offset = 0): number {
    for (const fun of this.function) {
      buffer[offset++] = 42 // (5 << 3) + kTypeLengthDelim
      offset = encodeNumber(buffer, offset, fun.length)
      offset = fun._encodeToBuffer(buffer, offset)
    }
    return offset
  }

  _encodeBasicValuesToBuffer(buffer: Uint8Array, offset = 0): number {
    if (this.dropFrames) {
      buffer[offset++] = 56 // (7 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.dropFrames)
    }

    if (this.keepFrames) {
      buffer[offset++] = 64 // (8 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.keepFrames)
    }

    if (this.timeNanos) {
      buffer[offset++] = 72 // (9 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.timeNanos)
    }

    if (this.durationNanos) {
      buffer[offset++] = 80 // (10 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.durationNanos)
    }

    if (typeof this.periodType !== 'undefined') {
      buffer[offset++] = 90 // (11 << 3) + kTypeLengthDelim
      offset = encodeNumber(buffer, offset, this.periodType.length)
      offset = this.periodType._encodeToBuffer(buffer, offset)
    }

    if (this.period) {
      buffer[offset++] = 96 // (12 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.period)
    }

    if (this.comment.length) {
      buffer[offset++] = 106 // (13 << 3) + kTypeLengthDelim
      offset = encodeNumber(buffer, offset, measureArray(this.comment))
      for (const comment of this.comment) {
        offset = encodeNumber(buffer, offset, comment)
      }
    }

    if (this.defaultSampleType) {
      buffer[offset++] = 112 // (14 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.defaultSampleType)
    }

    if (this.docUrl) {
      buffer[offset++] = 120 // (15 << 3) + kTypeVarInt
      offset = encodeNumber(buffer, offset, this.docUrl)
    }

    return offset
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = this._encodeSampleTypesToBuffer(buffer, offset)
    offset = this._encodeSamplesToBuffer(buffer, offset)
    offset = this._encodeMappingsToBuffer(buffer, offset)
    offset = this._encodeLocationsToBuffer(buffer, offset)
    offset = this._encodeFunctionsToBuffer(buffer, offset)
    offset = this.stringTable._encodeToBuffer(buffer, offset)
    offset = this._encodeBasicValuesToBuffer(buffer, offset)
    return offset
  }

  async _encodeToBufferAsync(buffer: Uint8Array, offset = 0): Promise<number> {
    offset = this._encodeSampleTypesToBuffer(buffer, offset)
    await yieldToEventLoop()

    offset = this._encodeSamplesToBuffer(buffer, offset)
    await yieldToEventLoop()

    offset = this._encodeMappingsToBuffer(buffer, offset)
    await yieldToEventLoop()

    offset = this._encodeLocationsToBuffer(buffer, offset)
    await yieldToEventLoop()

    offset = this._encodeFunctionsToBuffer(buffer, offset)
    await yieldToEventLoop()

    offset = this.stringTable._encodeToBuffer(buffer, offset)
    await yieldToEventLoop()

    offset = this._encodeBasicValuesToBuffer(buffer, offset)
    return offset
  }

  encode(buffer = new Uint8Array(this.length)): Uint8Array {
    this._encodeToBuffer(buffer, 0)
    return buffer
  }

  async encodeAsync(buffer = new Uint8Array(this.length)): Promise<Uint8Array> {
    await this._encodeToBufferAsync(buffer, 0)
    return buffer
  }

  static decodeValue(data: ProfileInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length) {
    switch (field) {
      case 1:
        data.sampleType = push(ValueType.decode(buffer, start, end), data.sampleType)
        break
      case 2:
        data.sample = push(Sample.decode(buffer, start, end), data.sample)
        break
      case 3:
        data.mapping = push(Mapping.decode(buffer, start, end), data.mapping)
        break
      case 4:
        data.location = push(Location.decode(buffer, start, end), data.location)
        break
      case 5:
        data.function = push(Function.decode(buffer, start, end), data.function)
        break
      case 6: {
        if (data.stringTable === undefined) {
          data.stringTable = new StringTable(emptyTableToken)
        }
        data.stringTable._decodeString(buffer.subarray(start, end))
        break
      }
      case 7:
        data.dropFrames = decodeNumber(buffer, start, end)
        break
      case 8:
        data.keepFrames = decodeNumber(buffer, start, end)
        break
      case 9:
        data.timeNanos = decodeNumber(buffer, start, end)
        break
      case 10:
        data.durationNanos = decodeNumber(buffer, start, end)
        break
      case 11:
        data.periodType = ValueType.decode(buffer, start, end)
        break
      case 12:
        data.period = decodeNumber(buffer, start, end)
        break
      case 13:
        data.comment = pushAll(decodeNumbers(buffer, start, end), data.comment)
        break
      case 14:
        data.defaultSampleType = decodeNumber(buffer, start, end)
        break
      case 15:
        data.docUrl = decodeNumber(buffer, start, end)
        break
    }
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Profile {
    return new this(decode(buffer, this.decodeValue, start, end) as ProfileInput)
  }
}
