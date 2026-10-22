/**
 * Unless explicitly stated otherwise all files in this repository are licensed under the MIT License.
 *
 * This product includes software developed at Datadog (https://www.datadoghq.com/  Copyright 2022 Datadog, Inc.
 */

import {
  Message,
  Numeric,
  decodeFields,
  decodeNumber,
  decodeNumbers,
  encodeBoolField,
  encodeMessageArrayField,
  encodeMessageField,
  encodeNumber,
  encodeNumberField,
  encodePackedNumbersField,
  isLengthDelim,
  isPackedOrVarInt,
  isVarInt,
  kTypeLengthDelim,
  measureBoolField,
  measureMessageArrayField,
  measureMessageField,
  measureNumber,
  measureNumberField,
  measurePackedNumbersField,
  prepareBuffer,
  push,
  pushAll,
  toUtf8,
  verifyEncodedLength,
} from './protobuf.js'

/**
 * Yields to the event loop. Uses setImmediate where available (Node.js), and
 * falls back to setTimeout in browsers, which lack setImmediate.
 */
function yieldToEventLoop(): Promise<void> {
  return typeof setImmediate === 'function'
    ? new Promise(resolve => setImmediate(resolve))
    : new Promise(resolve => setTimeout(resolve, 0))
}

export const emptyTableToken = Symbol()

export class StringTable {
  strings = new Array<string>()
  #encodings = new Array<Uint8Array>()
  #positions = new Map<string, number>()
  #field: number

  /**
   * @param tok - emptyTableToken omits the initial empty string.
   * @param field - field number of the strings in the enclosing message.
   */
  constructor(tok?: typeof emptyTableToken, field = 6) {
    this.#field = field
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

  static _encodeStringFromUtf8(stringBuffer: Uint8Array | Buffer, field = 6): Uint8Array {
    const tag = field * 8 + kTypeLengthDelim
    const buffer = new Uint8Array(
      (measureNumber(tag) || 1) + (measureNumber(stringBuffer.length) || 1) + stringBuffer.length
    )
    let offset = encodeNumber(buffer, 0, tag)
    offset = encodeNumber(buffer, offset, stringBuffer.length)
    if (stringBuffer.length > 0) {
      buffer.set(stringBuffer, offset)
    }
    return buffer
  }

  static _encodeString(string: string, field = 6): Uint8Array {
    return StringTable._encodeStringFromUtf8(toUtf8(string), field)
  }

  dedup(string: string): number {
    if (typeof string === 'number') return string
    if (!this.#positions.has(string)) {
      const pos = this.strings.push(string) - 1
      this.#positions.set(string, pos)

      // Encode strings on insertion
      this.#encodings.push(StringTable._encodeString(string, this.#field))
    }
    return this.#positions.get(string)!
  }

  _decodeString(buffer: Uint8Array) {
    const string = new TextDecoder().decode(buffer)
    this.#positions.set(string, this.strings.push(string) - 1)
    this.#encodings.push(StringTable._encodeStringFromUtf8(buffer, this.#field))
  }
}

export type ValueTypeInput = {
  type?: Numeric
  unit?: Numeric
}

export class ValueType extends Message {
  type: Numeric
  unit: Numeric

  static create(data: ValueTypeInput): ValueType {
    return data instanceof ValueType ? data : new ValueType(data)
  }

  constructor(data: ValueTypeInput) {
    super()
    this.type = data.type || 0
    this.unit = data.unit || 0
  }

  _measure() {
    let total = 0
    total += measureNumberField(1, this.type)
    total += measureNumberField(2, this.unit)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, 1, this.type)
    offset = encodeNumberField(buffer, offset, 2, this.unit)
    return offset
  }

  static decodeValue(data: ValueTypeInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isVarInt(wireType)) data.type = decodeNumber(buffer, start, end)
        break
      case 2:
        if (isVarInt(wireType)) data.unit = decodeNumber(buffer, start, end)
        break
    }
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): ValueType {
    return new this(decodeFields(buffer, this.decodeValue, start, end))
  }
}

export type LabelInput = {
  key?: Numeric
  str?: Numeric
  num?: Numeric
  numUnit?: Numeric
}

export class Label extends Message {
  key: Numeric
  str: Numeric
  num: Numeric
  numUnit: Numeric

  static create(data: LabelInput): Label {
    return data instanceof Label ? data : new Label(data)
  }

  constructor(data: LabelInput) {
    super()
    this.key = data.key || 0
    this.str = data.str || 0
    this.num = data.num || 0
    this.numUnit = data.numUnit || 0
  }

  _measure() {
    let total = 0
    total += measureNumberField(1, this.key)
    total += measureNumberField(2, this.str)
    total += measureNumberField(3, this.num)
    total += measureNumberField(4, this.numUnit)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, 1, this.key)
    offset = encodeNumberField(buffer, offset, 2, this.str)
    offset = encodeNumberField(buffer, offset, 3, this.num)
    offset = encodeNumberField(buffer, offset, 4, this.numUnit)
    return offset
  }

  static decodeValue(data: LabelInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isVarInt(wireType)) data.key = decodeNumber(buffer, start, end)
        break
      case 2:
        if (isVarInt(wireType)) data.str = decodeNumber(buffer, start, end)
        break
      case 3:
        if (isVarInt(wireType)) data.num = decodeNumber(buffer, start, end)
        break
      case 4:
        if (isVarInt(wireType)) data.numUnit = decodeNumber(buffer, start, end)
        break
    }
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Label {
    return new this(decodeFields(buffer, this.decodeValue, start, end))
  }
}

export type SampleInput = {
  locationId?: Array<Numeric>
  value?: Array<Numeric>
  label?: Array<LabelInput>
}

export class Sample extends Message {
  locationId: Array<Numeric>
  value: Array<Numeric>
  label: Array<Label>

  static create(data: SampleInput): Sample {
    return data instanceof Sample ? data : new Sample(data)
  }

  constructor(data: SampleInput) {
    super()
    this.locationId = data.locationId || []
    this.value = data.value || []
    this.label = (data.label || []).map(Label.create)
  }

  _measure() {
    let total = 0
    total += measurePackedNumbersField(1, this.locationId)
    total += measurePackedNumbersField(2, this.value)
    total += measureMessageArrayField(3, this.label)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodePackedNumbersField(buffer, offset, 1, this.locationId)
    offset = encodePackedNumbersField(buffer, offset, 2, this.value)
    offset = encodeMessageArrayField(buffer, offset, 3, this.label)
    return offset
  }

  static decodeValue(data: SampleInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isPackedOrVarInt(wireType)) data.locationId = pushAll(decodeNumbers(buffer, start, end), data.locationId)
        break
      case 2:
        if (isPackedOrVarInt(wireType)) data.value = pushAll(decodeNumbers(buffer, start, end), data.value)
        break
      case 3:
        if (isLengthDelim(wireType)) data.label = push(Label.decode(buffer, start, end), data.label)
        break
    }
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Sample {
    return new this(decodeFields(buffer, this.decodeValue, start, end))
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

export class Mapping extends Message {
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
    super()
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

  _measure() {
    let total = 0
    total += measureNumberField(1, this.id)
    total += measureNumberField(2, this.memoryStart)
    total += measureNumberField(3, this.memoryLimit)
    total += measureNumberField(4, this.fileOffset)
    total += measureNumberField(5, this.filename)
    total += measureNumberField(6, this.buildId)
    total += measureBoolField(7, this.hasFunctions)
    total += measureBoolField(8, this.hasFilenames)
    total += measureBoolField(9, this.hasLineNumbers)
    total += measureBoolField(10, this.hasInlineFrames)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, 1, this.id)
    offset = encodeNumberField(buffer, offset, 2, this.memoryStart)
    offset = encodeNumberField(buffer, offset, 3, this.memoryLimit)
    offset = encodeNumberField(buffer, offset, 4, this.fileOffset)
    offset = encodeNumberField(buffer, offset, 5, this.filename)
    offset = encodeNumberField(buffer, offset, 6, this.buildId)
    offset = encodeBoolField(buffer, offset, 7, this.hasFunctions)
    offset = encodeBoolField(buffer, offset, 8, this.hasFilenames)
    offset = encodeBoolField(buffer, offset, 9, this.hasLineNumbers)
    offset = encodeBoolField(buffer, offset, 10, this.hasInlineFrames)
    return offset
  }

  static decodeValue(data: MappingInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isVarInt(wireType)) data.id = decodeNumber(buffer, start, end)
        break
      case 2:
        if (isVarInt(wireType)) data.memoryStart = decodeNumber(buffer, start, end)
        break
      case 3:
        if (isVarInt(wireType)) data.memoryLimit = decodeNumber(buffer, start, end)
        break
      case 4:
        if (isVarInt(wireType)) data.fileOffset = decodeNumber(buffer, start, end)
        break
      case 5:
        if (isVarInt(wireType)) data.filename = decodeNumber(buffer, start, end)
        break
      case 6:
        if (isVarInt(wireType)) data.buildId = decodeNumber(buffer, start, end)
        break
      case 7:
        if (isVarInt(wireType)) data.hasFunctions = !!decodeNumber(buffer, start, end)
        break
      case 8:
        if (isVarInt(wireType)) data.hasFilenames = !!decodeNumber(buffer, start, end)
        break
      case 9:
        if (isVarInt(wireType)) data.hasLineNumbers = !!decodeNumber(buffer, start, end)
        break
      case 10:
        if (isVarInt(wireType)) data.hasInlineFrames = !!decodeNumber(buffer, start, end)
        break
    }
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Mapping {
    return new this(decodeFields(buffer, this.decodeValue, start, end))
  }
}

export type LineInput = {
  functionId?: Numeric
  line?: Numeric
  column?: Numeric
}

export class Line extends Message {
  functionId: Numeric
  line: Numeric
  column: Numeric

  static create(data: LineInput): Line {
    return data instanceof Line ? data : new Line(data)
  }

  constructor(data: LineInput) {
    super()
    this.functionId = data.functionId || 0
    this.line = data.line || 0
    this.column = data.column || 0
  }

  _measure() {
    let total = 0
    total += measureNumberField(1, this.functionId)
    total += measureNumberField(2, this.line)
    total += measureNumberField(3, this.column)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, 1, this.functionId)
    offset = encodeNumberField(buffer, offset, 2, this.line)
    offset = encodeNumberField(buffer, offset, 3, this.column)
    return offset
  }

  static decodeValue(data: LineInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isVarInt(wireType)) data.functionId = decodeNumber(buffer, start, end)
        break
      case 2:
        if (isVarInt(wireType)) data.line = decodeNumber(buffer, start, end)
        break
      case 3:
        if (isVarInt(wireType)) data.column = decodeNumber(buffer, start, end)
        break
    }
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Line {
    return new this(decodeFields(buffer, this.decodeValue, start, end))
  }
}

export type LocationInput = {
  id?: Numeric
  mappingId?: Numeric
  address?: Numeric
  line?: Array<LineInput>
  isFolded?: boolean
}

export class Location extends Message {
  id: Numeric
  mappingId: Numeric
  address: Numeric
  line: Array<Line>
  isFolded: boolean

  static create(data: LocationInput): Location {
    return data instanceof Location ? data : new Location(data)
  }

  constructor(data: LocationInput) {
    super()
    this.id = data.id || 0
    this.mappingId = data.mappingId || 0
    this.address = data.address || 0
    this.line = (data.line || []).map(Line.create)
    this.isFolded = !!data.isFolded
  }

  _measure() {
    let total = 0
    total += measureNumberField(1, this.id)
    total += measureNumberField(2, this.mappingId)
    total += measureNumberField(3, this.address)
    total += measureMessageArrayField(4, this.line)
    total += measureBoolField(5, this.isFolded)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, 1, this.id)
    offset = encodeNumberField(buffer, offset, 2, this.mappingId)
    offset = encodeNumberField(buffer, offset, 3, this.address)
    offset = encodeMessageArrayField(buffer, offset, 4, this.line)
    offset = encodeBoolField(buffer, offset, 5, this.isFolded)
    return offset
  }

  static decodeValue(data: LocationInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isVarInt(wireType)) data.id = decodeNumber(buffer, start, end)
        break
      case 2:
        if (isVarInt(wireType)) data.mappingId = decodeNumber(buffer, start, end)
        break
      case 3:
        if (isVarInt(wireType)) data.address = decodeNumber(buffer, start, end)
        break
      case 4:
        if (isLengthDelim(wireType)) data.line = push(Line.decode(buffer, start, end), data.line)
        break
      case 5:
        if (isVarInt(wireType)) data.isFolded = !!decodeNumber(buffer, start, end)
        break
    }
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Location {
    return new this(decodeFields(buffer, this.decodeValue, start, end))
  }
}

export type FunctionInput = {
  id?: Numeric
  name?: Numeric
  systemName?: Numeric
  filename?: Numeric
  startLine?: Numeric
}

export class Function extends Message {
  id: Numeric
  name: Numeric
  systemName: Numeric
  filename: Numeric
  startLine: Numeric

  static create(data: FunctionInput): Function {
    return data instanceof Function ? data : new Function(data)
  }

  constructor(data: FunctionInput) {
    super()
    this.id = data.id || 0
    this.name = data.name || 0
    this.systemName = data.systemName || 0
    this.filename = data.filename || 0
    this.startLine = data.startLine || 0
  }

  _measure() {
    let total = 0
    total += measureNumberField(1, this.id)
    total += measureNumberField(2, this.name)
    total += measureNumberField(3, this.systemName)
    total += measureNumberField(4, this.filename)
    total += measureNumberField(5, this.startLine)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, 1, this.id)
    offset = encodeNumberField(buffer, offset, 2, this.name)
    offset = encodeNumberField(buffer, offset, 3, this.systemName)
    offset = encodeNumberField(buffer, offset, 4, this.filename)
    offset = encodeNumberField(buffer, offset, 5, this.startLine)
    return offset
  }

  static decodeValue(data: FunctionInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isVarInt(wireType)) data.id = decodeNumber(buffer, start, end)
        break
      case 2:
        if (isVarInt(wireType)) data.name = decodeNumber(buffer, start, end)
        break
      case 3:
        if (isVarInt(wireType)) data.systemName = decodeNumber(buffer, start, end)
        break
      case 4:
        if (isVarInt(wireType)) data.filename = decodeNumber(buffer, start, end)
        break
      case 5:
        if (isVarInt(wireType)) data.startLine = decodeNumber(buffer, start, end)
        break
    }
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Function {
    return new this(decodeFields(buffer, this.decodeValue, start, end))
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

export class Profile extends Message {
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
    super()
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

  _measure() {
    let total = 0
    total += measureMessageArrayField(1, this.sampleType)
    total += measureMessageArrayField(2, this.sample)
    total += measureMessageArrayField(3, this.mapping)
    total += measureMessageArrayField(4, this.location)
    total += measureMessageArrayField(5, this.function)
    total += this.stringTable.encodedLength
    total += measureNumberField(7, this.dropFrames)
    total += measureNumberField(8, this.keepFrames)
    total += measureNumberField(9, this.timeNanos)
    total += measureNumberField(10, this.durationNanos)
    total += measureMessageField(11, this.periodType)
    total += measureNumberField(12, this.period)
    total += measurePackedNumbersField(13, this.comment)
    total += measureNumberField(14, this.defaultSampleType)
    total += measureNumberField(15, this.docUrl)
    return total
  }

  _encodeSampleTypesToBuffer(buffer: Uint8Array, offset = 0): number {
    return encodeMessageArrayField(buffer, offset, 1, this.sampleType)
  }

  _encodeSamplesToBuffer(buffer: Uint8Array, offset = 0): number {
    return encodeMessageArrayField(buffer, offset, 2, this.sample)
  }

  _encodeMappingsToBuffer(buffer: Uint8Array, offset = 0): number {
    return encodeMessageArrayField(buffer, offset, 3, this.mapping)
  }

  _encodeLocationsToBuffer(buffer: Uint8Array, offset = 0): number {
    return encodeMessageArrayField(buffer, offset, 4, this.location)
  }

  _encodeFunctionsToBuffer(buffer: Uint8Array, offset = 0): number {
    return encodeMessageArrayField(buffer, offset, 5, this.function)
  }

  _encodeBasicValuesToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, 7, this.dropFrames)
    offset = encodeNumberField(buffer, offset, 8, this.keepFrames)
    offset = encodeNumberField(buffer, offset, 9, this.timeNanos)
    offset = encodeNumberField(buffer, offset, 10, this.durationNanos)
    offset = encodeMessageField(buffer, offset, 11, this.periodType)
    offset = encodeNumberField(buffer, offset, 12, this.period)
    offset = encodePackedNumbersField(buffer, offset, 13, this.comment)
    offset = encodeNumberField(buffer, offset, 14, this.defaultSampleType)
    offset = encodeNumberField(buffer, offset, 15, this.docUrl)
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

  /** Like encode(), but yields between phases. Do not mutate until it settles. */
  async encodeAsync(buffer?: Uint8Array): Promise<Uint8Array> {
    const length = this.length
    buffer = prepareBuffer(buffer, length)
    verifyEncodedLength(await this._encodeToBufferAsync(buffer, 0), length)
    return buffer
  }

  static decodeValue(data: ProfileInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isLengthDelim(wireType)) data.sampleType = push(ValueType.decode(buffer, start, end), data.sampleType)
        break
      case 2:
        if (isLengthDelim(wireType)) data.sample = push(Sample.decode(buffer, start, end), data.sample)
        break
      case 3:
        if (isLengthDelim(wireType)) data.mapping = push(Mapping.decode(buffer, start, end), data.mapping)
        break
      case 4:
        if (isLengthDelim(wireType)) data.location = push(Location.decode(buffer, start, end), data.location)
        break
      case 5:
        if (isLengthDelim(wireType)) data.function = push(Function.decode(buffer, start, end), data.function)
        break
      case 6: {
        if (!isLengthDelim(wireType)) break
        if (data.stringTable === undefined) {
          data.stringTable = new StringTable(emptyTableToken)
        }
        data.stringTable._decodeString(buffer.subarray(start, end))
        break
      }
      case 7:
        if (isVarInt(wireType)) data.dropFrames = decodeNumber(buffer, start, end)
        break
      case 8:
        if (isVarInt(wireType)) data.keepFrames = decodeNumber(buffer, start, end)
        break
      case 9:
        if (isVarInt(wireType)) data.timeNanos = decodeNumber(buffer, start, end)
        break
      case 10:
        if (isVarInt(wireType)) data.durationNanos = decodeNumber(buffer, start, end)
        break
      case 11:
        if (isLengthDelim(wireType)) data.periodType = ValueType.decode(buffer, start, end)
        break
      case 12:
        if (isVarInt(wireType)) data.period = decodeNumber(buffer, start, end)
        break
      case 13:
        if (isPackedOrVarInt(wireType)) data.comment = pushAll(decodeNumbers(buffer, start, end), data.comment)
        break
      case 14:
        if (isVarInt(wireType)) data.defaultSampleType = decodeNumber(buffer, start, end)
        break
      case 15:
        if (isVarInt(wireType)) data.docUrl = decodeNumber(buffer, start, end)
        break
    }
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Profile {
    return new this(decodeFields(buffer, this.decodeValue, start, end))
  }
}
