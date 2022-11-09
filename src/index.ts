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

// Buffer.from(string, 'utf8') is faster, when available
const toUtf8 = typeof Buffer === 'undefined'
  ? (value: string) => new TextEncoder().encode(value)
  : (value: string) => Buffer.from(value, 'utf8')

type Numeric = number | bigint

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

function countNumberBytes(buffer: Uint8Array): number {
  if (!buffer.length) return 0
  let i = 0
  while (i < buffer.length && buffer[i++] >= 0b10000000);
  return i
}

function decodeBigNumber(buffer: Uint8Array): bigint {
  if (!buffer.length) return BigInt(0)
  let value = BigInt(buffer[0] & 0b01111111)
  let i = 0
  while (buffer[i++] >= 0b10000000) {
    value |= BigInt(buffer[i] & 0b01111111) << BigInt(7 * i)
  }
  return value
}

function makeValue(value: Uint8Array, offset = 0) {
  return { value, offset }
}

function getValue(mode: number, buffer: Uint8Array) {
  switch (mode) {
    case kTypeVarInt:
      for (let i = 0; i < buffer.length; i++) {
        if (!(buffer[i] & 0b10000000)) {
          return makeValue(buffer.slice(0, i + 1))
        }
      }
      return makeValue(buffer)
    case kTypeLengthDelim: {
      const offset = countNumberBytes(buffer)
      const size = decodeNumber(buffer)
      return makeValue(buffer.slice(offset, Number(size) + 1), offset)
    }
    default:
      throw new Error(`Unrecognized value type: ${mode}`)
  }
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

function decodeNumber(buffer: Uint8Array): Numeric {
  const size = countNumberBytes(buffer)
  if (size > 4) return decodeBigNumber(buffer)
  if (!buffer.length) return 0

  let value = buffer[0] & 0b01111111
  let i = 0
  while (buffer[i++] >= 0b10000000) {
    value |= (buffer[i] & 0b01111111) << (7 * i)
  }
  return value
}

function decodeNumbers(buffer: Uint8Array): Array<Numeric> {
  const values = []
  let start = 0

  for (let i = 0; i < buffer.length; i++) {
    if ((buffer[i] & 0b10000000) === 0) {
      values.push(decodeNumber(buffer.slice(start, i + 1)))
      start = i + 1
    }
  }

  return values
}

function push<T>(value: T, list?: Array<T>): Array<T> {
  return Array.isArray(list) ? list.concat(value) : [value]
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
  return total ? 2 + total : 0
}

function measureLengthDelimField<T>(value: T): number {
  const length = measureValue(value)
  return length ? 2 + length : 0
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

export class StringTable extends Array {
  #encodings = new Map<string, Uint8Array>()
  #positions = new Map<string, number>()

  constructor() {
    super()
    this.push('')
  }

  static from(values: StringTable | Array<string>): StringTable {
    if (values instanceof StringTable) {
      return values
    }

    // Need to copy over manually to ensure the lookup map is correct
    const table = new StringTable()
    for (const value of values) {
      table.#positions.set(value, table.push(value) - 1)
      table.#encodings.set(value, StringTable._encodeString(value))
    }

    return table
  }

  get encodedLength(): number {
    let size = 0
    for (const encoded of this.#encodings.values()) {
      size += encoded.length
    }
    return size
  }

  encode(buffer: Uint8Array, offset: number): number {
    for (const encoded of this.#encodings.values()) {
      buffer.set(encoded, offset)
      offset += encoded.length
    }
    return offset
  }

  static _encodeString(string: string): Uint8Array {
    const stringBuffer = toUtf8(string)
    const buffer = new Uint8Array(1 + stringBuffer.length + measureNumber(stringBuffer.length))
    let offset = 0
    buffer[offset++] = 50 // (6 << 3) + kTypeLengthDelim
    offset = encodeNumber(buffer, offset, stringBuffer.length)
    buffer.set(stringBuffer, offset++)
    return buffer
  }

  dedup(string: string): number {
    if (!string) return 0
    if (typeof string === 'number') return string
    if (!this.#positions.has(string)) {
      const pos = this.push(string) - 1
      this.#positions.set(string, pos)

      // Encode strings on insertion
      this.#encodings.set(string, StringTable._encodeString(string))
    }
    return this.#positions.get(string)
  }
}

function decode<T>(
  buffer: Uint8Array,
  decoder: (data: DeepPartial<T>, field: number, value: Uint8Array) => void
): DeepPartial<T> {
  const data = {}
  let index = 0

  while (index < buffer.length) {
    const field = buffer[index] >> 3
    const mode = buffer[index] & 0b111
    index++

    const { offset, value } = getValue(mode, buffer.slice(index))
    index += value.length + offset

    decoder(data, field, value)
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

  static decodeValue(data: ValueTypeInput, field: number, buffer: Uint8Array) {
    switch (field) {
      case 1:
        data.type = decodeNumber(buffer)
        break
      case 2:
        data.unit = decodeNumber(buffer)
        break
    }
  }

  static decode(buffer: Uint8Array): ValueType {
    return new this(decode(buffer, this.decodeValue) as ValueTypeInput)
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

  static decodeValue(data: LabelInput, field: number, buffer: Uint8Array) {
    switch (field) {
      case 1:
        data.key = decodeNumber(buffer)
        break
      case 2:
        data.str = decodeNumber(buffer)
        break
      case 3:
        data.num = decodeNumber(buffer)
        break
      case 4:
        data.numUnit = decodeNumber(buffer)
        break
    }
  }

  static decode(buffer: Uint8Array): Label {
    return new this(decode(buffer, this.decodeValue) as LabelInput)
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

  constructor(data: SampleInput) {
    this.locationId = data.locationId || []
    this.value = data.value || []
    this.label = (data.label || []).map(l => new Label(l))
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

  static decodeValue(data: SampleInput, field: number, buffer: Uint8Array) {
    switch (field) {
      case 1:
        data.locationId = decodeNumbers(buffer)
        break
      case 2:
        data.value = decodeNumbers(buffer)
        break
      case 3:
        data.label = push(Label.decode(buffer), data.label)
        break
    }
  }

  static decode(buffer: Uint8Array): Sample {
    return new this(decode(buffer, this.decodeValue) as SampleInput)
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

  static decodeValue(data: MappingInput, field: number, buffer: Uint8Array) {
    switch (field) {
      case 1:
        data.id = decodeNumber(buffer)
        break
      case 2:
        data.memoryStart = decodeNumber(buffer)
        break
      case 3:
        data.memoryLimit = decodeNumber(buffer)
        break
      case 4:
        data.fileOffset = decodeNumber(buffer)
        break
      case 5:
        data.filename = decodeNumber(buffer)
        break
      case 6:
        data.buildId = decodeNumber(buffer)
        break
      case 7:
        data.hasFunctions = !!decodeNumber(buffer)
        break
      case 8:
        data.hasFilenames = !!decodeNumber(buffer)
        break
      case 9:
        data.hasLineNumbers = !!decodeNumber(buffer)
        break
      case 10:
        data.hasInlineFrames = !!decodeNumber(buffer)
        break
    }
  }

  static decode(buffer: Uint8Array): Mapping {
    return new this(decode(buffer, this.decodeValue) as MappingInput)
  }
}

export type LineInput = {
  functionId?: Numeric
  line?: Numeric
}

export class Line {
  functionId: Numeric
  line: Numeric

  constructor(data: LineInput) {
    this.functionId = data.functionId || 0
    this.line = data.line || 0
  }

  get length() {
    let total = 0
    total += measureNumberField(this.functionId)
    total += measureNumberField(this.line)
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

    return offset
  }

  encode(buffer = new Uint8Array(this.length)): Uint8Array {
    this._encodeToBuffer(buffer, 0)
    return buffer
  }

  static decodeValue(data: LineInput, field: number, buffer: Uint8Array) {
    switch (field) {
      case 1:
        data.functionId = decodeNumber(buffer)
        break
      case 2:
        data.line = decodeNumber(buffer)
        break
    }
  }

  static decode(buffer: Uint8Array): Line {
    return new this(decode(buffer, this.decodeValue) as LineInput)
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

  constructor(data: LocationInput) {
    this.id = data.id || 0
    this.mappingId = data.mappingId || 0
    this.address = data.address || 0
    this.line = (data.line || []).map(l => new Line(l))
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

  static decodeValue(data: LocationInput, field: number, buffer: Uint8Array) {
    switch (field) {
      case 1:
        data.id = decodeNumber(buffer)
        break
      case 2:
        data.mappingId = decodeNumber(buffer)
        break
      case 3:
        data.address = decodeNumber(buffer)
        break
      case 4:
        data.line = push(Line.decode(buffer), data.line)
        break
      case 5:
        data.isFolded = !!decodeNumber(buffer)
        break
    }
  }

  static decode(buffer: Uint8Array): Location {
    return new this(decode(buffer, this.decodeValue) as LocationInput)
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

  static decodeValue(data: FunctionInput, field: number, buffer: Uint8Array) {
    switch (field) {
      case 1:
        data.id = decodeNumber(buffer)
        break
      case 2:
        data.name = decodeNumber(buffer)
        break
      case 3:
        data.systemName = decodeNumber(buffer)
        break
      case 4:
        data.filename = decodeNumber(buffer)
        break
      case 5:
        data.startLine = decodeNumber(buffer)
        break
    }
  }

  static decode(buffer: Uint8Array): Function {
    return new this(decode(buffer, this.decodeValue) as FunctionInput)
  }
}

export type ProfileInput = {
  sampleType?: Array<ValueTypeInput>
  sample?: Array<SampleInput>
  mapping?: Array<MappingInput>
  location?: Array<LocationInput>
  function?: Array<FunctionInput>
  stringTable?: StringTable | string[]
  dropFrames?: Numeric
  keepFrames?: Numeric
  timeNanos?: Numeric
  durationNanos?: Numeric
  periodType?: ValueTypeInput
  period?: Numeric
  comment?: Array<Numeric>
  defaultSampleType?: Numeric
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

  constructor(data: ProfileInput = {}) {
    this.sampleType = (data.sampleType || []).map(v => new ValueType(v))
    this.sample = (data.sample || []).map(v => new Sample(v))
    this.mapping = (data.mapping || []).map(v => new Mapping(v))
    this.location = (data.location || []).map(v => new Location(v))
    this.function = (data.function || []).map(v => new Function(v))
    this.stringTable = StringTable.from(data.stringTable || [])
    this.dropFrames = data.dropFrames || 0
    this.keepFrames = data.keepFrames || 0
    this.timeNanos = data.timeNanos || 0
    this.durationNanos = data.durationNanos || 0
    this.periodType = data.periodType ? new ValueType(data.periodType) : undefined
    this.period = data.period || 0
    this.comment = data.comment || []
    this.defaultSampleType = data.defaultSampleType || 0
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
    total += measureLengthDelimArrayField(this.comment)
    total += measureNumberField(this.defaultSampleType)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    for (const sampleType of this.sampleType) {
      buffer[offset++] = 10 // (1 << 3) + kTypeLengthDelim
      offset = encodeNumber(buffer, offset, sampleType.length)
      offset = sampleType._encodeToBuffer(buffer, offset)
    }

    for (const sample of this.sample) {
      buffer[offset++] = 18 // (2 << 3) + kTypeLengthDelim
      offset = encodeNumber(buffer, offset, sample.length)
      offset = sample._encodeToBuffer(buffer, offset)
    }

    for (const mapping of this.mapping) {
      buffer[offset++] = 26 // (3 << 3) + kTypeLengthDelim
      offset = encodeNumber(buffer, offset, mapping.length)
      offset = mapping._encodeToBuffer(buffer, offset)
    }

    for (const location of this.location) {
      buffer[offset++] = 34 // (4 << 3) + kTypeLengthDelim
      offset = encodeNumber(buffer, offset, location.length)
      offset = location._encodeToBuffer(buffer, offset)
    }

    for (const fun of this.function) {
      buffer[offset++] = 42 // (5 << 3) + kTypeLengthDelim
      offset = encodeNumber(buffer, offset, fun.length)
      offset = fun._encodeToBuffer(buffer, offset)
    }

    offset = this.stringTable.encode(buffer, offset)

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

    return offset
  }

  encode(buffer = new Uint8Array(this.length)): Uint8Array {
    this._encodeToBuffer(buffer, 0)
    return buffer
  }

  static decodeValue(data: ProfileInput, field: number, buffer: Uint8Array) {
    switch (field) {
      case 1:
        data.sampleType = push(ValueType.decode(buffer), data.sampleType)
        break
      case 2:
        data.sample = push(Sample.decode(buffer), data.sample)
        break
      case 3:
        data.mapping = push(Mapping.decode(buffer), data.mapping)
        break
      case 4:
        data.location = push(Location.decode(buffer), data.location)
        break
      case 5:
        data.function = push(Function.decode(buffer), data.function)
        break
      case 6: {
        const string = new TextDecoder().decode(buffer)
        data.stringTable = StringTable.from(push(string, data.stringTable as StringTable))
        break
      }
      case 7:
        data.dropFrames = decodeNumber(buffer)
        break
      case 8:
        data.keepFrames = decodeNumber(buffer)
        break
      case 9:
        data.timeNanos = decodeNumber(buffer)
        break
      case 10:
        data.durationNanos = decodeNumber(buffer)
        break
      case 11:
        data.periodType = ValueType.decode(buffer)
        break
      case 12:
        data.period = decodeNumber(buffer)
        break
      case 13:
        data.comment = push(decodeNumber(buffer), data.comment)
        break
      case 14:
        data.defaultSampleType = decodeNumber(buffer)
        break
    }
  }

  static decode(buffer: Uint8Array): Profile {
    return new this(decode(buffer, this.decodeValue) as ProfileInput)
  }
}
