/**
 * Unless explicitly stated otherwise all files in this repository are licensed under the MIT License.
 *
 * This product includes software developed at Datadog (https://www.datadoghq.com/  Copyright 2022 Datadog, Inc.
 */

import {
  EncodeContext,
  Message,
  Numeric,
  decodeFields,
  decodeNumber,
  decodeNumbers,
  encodeBoolField,
  encodeMessageArrayField,
  encodeMessageField,
  encodeNumberField,
  encodePackedNumbersField,
  isLengthDelim,
  isPackedOrVarInt,
  isVarInt,
  measureBoolField,
  measureMessageArrayField,
  measureMessageField,
  measureNumberField,
  measurePackedNumbersField,
  newEncodeContext,
  prepareBuffer,
  push,
  pushAll,
  toUtf8,
  verifyEncodedLength,
  yieldToEventLoop,
} from './protobuf.js'
import { StringTableBase, emptyTableToken, encodeStringEntry } from './string-table.js'

export { emptyTableToken }

/*
 * Field numbers of the messages, as declared in pprof's profile.proto. Const
 * enums are inlined at compile time, so they cost nothing at run time.
 */
const enum ValueTypeField {
  type = 1,
  unit = 2,
}

const enum LabelField {
  key = 1,
  str = 2,
  num = 3,
  numUnit = 4,
}

const enum SampleField {
  locationId = 1,
  value = 2,
  label = 3,
}

const enum MappingField {
  id = 1,
  memoryStart = 2,
  memoryLimit = 3,
  fileOffset = 4,
  filename = 5,
  buildId = 6,
  hasFunctions = 7,
  hasFilenames = 8,
  hasLineNumbers = 9,
  hasInlineFrames = 10,
}

const enum LineField {
  functionId = 1,
  line = 2,
  column = 3,
}

const enum LocationField {
  id = 1,
  mappingId = 2,
  address = 3,
  line = 4,
  isFolded = 5,
}

const enum FunctionField {
  id = 1,
  name = 2,
  systemName = 3,
  filename = 4,
  startLine = 5,
}

const enum ProfileField {
  sampleType = 1,
  sample = 2,
  mapping = 3,
  location = 4,
  function = 5,
  stringTable = 6,
  dropFrames = 7,
  keepFrames = 8,
  timeNanos = 9,
  durationNanos = 10,
  periodType = 11,
  period = 12,
  comment = 13,
  defaultSampleType = 14,
  docUrl = 15,
}

/** The pprof string table, stored in Profile.string_table. */
export class StringTable extends StringTableBase {
  /** @param tok - emptyTableToken omits the initial empty string. */
  constructor(tok?: typeof emptyTableToken) {
    super(tok, ProfileField.stringTable)
  }

  static _encodeStringFromUtf8(stringBuffer: Uint8Array | Buffer): Uint8Array {
    return encodeStringEntry(stringBuffer, ProfileField.stringTable)
  }

  static _encodeString(string: string): Uint8Array {
    return StringTable._encodeStringFromUtf8(toUtf8(string))
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
    total += measureNumberField(ValueTypeField.type, this.type)
    total += measureNumberField(ValueTypeField.unit, this.unit)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, ValueTypeField.type, this.type)
    offset = encodeNumberField(buffer, offset, ValueTypeField.unit, this.unit)
    return offset
  }

  static decodeValue(data: ValueTypeInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case ValueTypeField.type:
        if (isVarInt(wireType)) data.type = decodeNumber(buffer, start, end)
        break
      case ValueTypeField.unit:
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
    total += measureNumberField(LabelField.key, this.key)
    total += measureNumberField(LabelField.str, this.str)
    total += measureNumberField(LabelField.num, this.num)
    total += measureNumberField(LabelField.numUnit, this.numUnit)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, LabelField.key, this.key)
    offset = encodeNumberField(buffer, offset, LabelField.str, this.str)
    offset = encodeNumberField(buffer, offset, LabelField.num, this.num)
    offset = encodeNumberField(buffer, offset, LabelField.numUnit, this.numUnit)
    return offset
  }

  static decodeValue(data: LabelInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case LabelField.key:
        if (isVarInt(wireType)) data.key = decodeNumber(buffer, start, end)
        break
      case LabelField.str:
        if (isVarInt(wireType)) data.str = decodeNumber(buffer, start, end)
        break
      case LabelField.num:
        if (isVarInt(wireType)) data.num = decodeNumber(buffer, start, end)
        break
      case LabelField.numUnit:
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

  _measure(context: EncodeContext) {
    let total = 0
    total += measurePackedNumbersField(SampleField.locationId, this.locationId)
    total += measurePackedNumbersField(SampleField.value, this.value)
    total += measureMessageArrayField(SampleField.label, this.label, context)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset: number, context: EncodeContext): number {
    offset = encodePackedNumbersField(buffer, offset, SampleField.locationId, this.locationId)
    offset = encodePackedNumbersField(buffer, offset, SampleField.value, this.value)
    offset = encodeMessageArrayField(buffer, offset, SampleField.label, this.label, context)
    return offset
  }

  static decodeValue(data: SampleInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case SampleField.locationId:
        if (isPackedOrVarInt(wireType)) data.locationId = pushAll(decodeNumbers(buffer, start, end), data.locationId)
        break
      case SampleField.value:
        if (isPackedOrVarInt(wireType)) data.value = pushAll(decodeNumbers(buffer, start, end), data.value)
        break
      case SampleField.label:
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
    total += measureNumberField(MappingField.id, this.id)
    total += measureNumberField(MappingField.memoryStart, this.memoryStart)
    total += measureNumberField(MappingField.memoryLimit, this.memoryLimit)
    total += measureNumberField(MappingField.fileOffset, this.fileOffset)
    total += measureNumberField(MappingField.filename, this.filename)
    total += measureNumberField(MappingField.buildId, this.buildId)
    total += measureBoolField(MappingField.hasFunctions, this.hasFunctions)
    total += measureBoolField(MappingField.hasFilenames, this.hasFilenames)
    total += measureBoolField(MappingField.hasLineNumbers, this.hasLineNumbers)
    total += measureBoolField(MappingField.hasInlineFrames, this.hasInlineFrames)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, MappingField.id, this.id)
    offset = encodeNumberField(buffer, offset, MappingField.memoryStart, this.memoryStart)
    offset = encodeNumberField(buffer, offset, MappingField.memoryLimit, this.memoryLimit)
    offset = encodeNumberField(buffer, offset, MappingField.fileOffset, this.fileOffset)
    offset = encodeNumberField(buffer, offset, MappingField.filename, this.filename)
    offset = encodeNumberField(buffer, offset, MappingField.buildId, this.buildId)
    offset = encodeBoolField(buffer, offset, MappingField.hasFunctions, this.hasFunctions)
    offset = encodeBoolField(buffer, offset, MappingField.hasFilenames, this.hasFilenames)
    offset = encodeBoolField(buffer, offset, MappingField.hasLineNumbers, this.hasLineNumbers)
    offset = encodeBoolField(buffer, offset, MappingField.hasInlineFrames, this.hasInlineFrames)
    return offset
  }

  static decodeValue(data: MappingInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case MappingField.id:
        if (isVarInt(wireType)) data.id = decodeNumber(buffer, start, end)
        break
      case MappingField.memoryStart:
        if (isVarInt(wireType)) data.memoryStart = decodeNumber(buffer, start, end)
        break
      case MappingField.memoryLimit:
        if (isVarInt(wireType)) data.memoryLimit = decodeNumber(buffer, start, end)
        break
      case MappingField.fileOffset:
        if (isVarInt(wireType)) data.fileOffset = decodeNumber(buffer, start, end)
        break
      case MappingField.filename:
        if (isVarInt(wireType)) data.filename = decodeNumber(buffer, start, end)
        break
      case MappingField.buildId:
        if (isVarInt(wireType)) data.buildId = decodeNumber(buffer, start, end)
        break
      case MappingField.hasFunctions:
        if (isVarInt(wireType)) data.hasFunctions = !!decodeNumber(buffer, start, end)
        break
      case MappingField.hasFilenames:
        if (isVarInt(wireType)) data.hasFilenames = !!decodeNumber(buffer, start, end)
        break
      case MappingField.hasLineNumbers:
        if (isVarInt(wireType)) data.hasLineNumbers = !!decodeNumber(buffer, start, end)
        break
      case MappingField.hasInlineFrames:
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
    total += measureNumberField(LineField.functionId, this.functionId)
    total += measureNumberField(LineField.line, this.line)
    total += measureNumberField(LineField.column, this.column)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, LineField.functionId, this.functionId)
    offset = encodeNumberField(buffer, offset, LineField.line, this.line)
    offset = encodeNumberField(buffer, offset, LineField.column, this.column)
    return offset
  }

  static decodeValue(data: LineInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case LineField.functionId:
        if (isVarInt(wireType)) data.functionId = decodeNumber(buffer, start, end)
        break
      case LineField.line:
        if (isVarInt(wireType)) data.line = decodeNumber(buffer, start, end)
        break
      case LineField.column:
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

  _measure(context: EncodeContext) {
    let total = 0
    total += measureNumberField(LocationField.id, this.id)
    total += measureNumberField(LocationField.mappingId, this.mappingId)
    total += measureNumberField(LocationField.address, this.address)
    total += measureMessageArrayField(LocationField.line, this.line, context)
    total += measureBoolField(LocationField.isFolded, this.isFolded)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset: number, context: EncodeContext): number {
    offset = encodeNumberField(buffer, offset, LocationField.id, this.id)
    offset = encodeNumberField(buffer, offset, LocationField.mappingId, this.mappingId)
    offset = encodeNumberField(buffer, offset, LocationField.address, this.address)
    offset = encodeMessageArrayField(buffer, offset, LocationField.line, this.line, context)
    offset = encodeBoolField(buffer, offset, LocationField.isFolded, this.isFolded)
    return offset
  }

  static decodeValue(data: LocationInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case LocationField.id:
        if (isVarInt(wireType)) data.id = decodeNumber(buffer, start, end)
        break
      case LocationField.mappingId:
        if (isVarInt(wireType)) data.mappingId = decodeNumber(buffer, start, end)
        break
      case LocationField.address:
        if (isVarInt(wireType)) data.address = decodeNumber(buffer, start, end)
        break
      case LocationField.line:
        if (isLengthDelim(wireType)) data.line = push(Line.decode(buffer, start, end), data.line)
        break
      case LocationField.isFolded:
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
    total += measureNumberField(FunctionField.id, this.id)
    total += measureNumberField(FunctionField.name, this.name)
    total += measureNumberField(FunctionField.systemName, this.systemName)
    total += measureNumberField(FunctionField.filename, this.filename)
    total += measureNumberField(FunctionField.startLine, this.startLine)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, FunctionField.id, this.id)
    offset = encodeNumberField(buffer, offset, FunctionField.name, this.name)
    offset = encodeNumberField(buffer, offset, FunctionField.systemName, this.systemName)
    offset = encodeNumberField(buffer, offset, FunctionField.filename, this.filename)
    offset = encodeNumberField(buffer, offset, FunctionField.startLine, this.startLine)
    return offset
  }

  static decodeValue(data: FunctionInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case FunctionField.id:
        if (isVarInt(wireType)) data.id = decodeNumber(buffer, start, end)
        break
      case FunctionField.name:
        if (isVarInt(wireType)) data.name = decodeNumber(buffer, start, end)
        break
      case FunctionField.systemName:
        if (isVarInt(wireType)) data.systemName = decodeNumber(buffer, start, end)
        break
      case FunctionField.filename:
        if (isVarInt(wireType)) data.filename = decodeNumber(buffer, start, end)
        break
      case FunctionField.startLine:
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
    if (data.stringTable !== undefined && !(data.stringTable instanceof StringTable)) {
      throw new TypeError('Profile.stringTable must be a pprof StringTable')
    }
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

  _measure(context: EncodeContext) {
    let total = 0
    total += measureMessageArrayField(ProfileField.sampleType, this.sampleType, context)
    total += measureMessageArrayField(ProfileField.sample, this.sample, context)
    total += measureMessageArrayField(ProfileField.mapping, this.mapping, context)
    total += measureMessageArrayField(ProfileField.location, this.location, context)
    total += measureMessageArrayField(ProfileField.function, this.function, context)
    total += this.stringTable.encodedLength
    total += measureNumberField(ProfileField.dropFrames, this.dropFrames)
    total += measureNumberField(ProfileField.keepFrames, this.keepFrames)
    total += measureNumberField(ProfileField.timeNanos, this.timeNanos)
    total += measureNumberField(ProfileField.durationNanos, this.durationNanos)
    total += measureMessageField(ProfileField.periodType, this.periodType, context)
    total += measureNumberField(ProfileField.period, this.period)
    total += measurePackedNumbersField(ProfileField.comment, this.comment)
    total += measureNumberField(ProfileField.defaultSampleType, this.defaultSampleType)
    total += measureNumberField(ProfileField.docUrl, this.docUrl)
    return total
  }

  _encodeSampleTypesToBuffer(buffer: Uint8Array, offset: number, context: EncodeContext): number {
    return encodeMessageArrayField(buffer, offset, ProfileField.sampleType, this.sampleType, context)
  }

  _encodeSamplesToBuffer(buffer: Uint8Array, offset: number, context: EncodeContext): number {
    return encodeMessageArrayField(buffer, offset, ProfileField.sample, this.sample, context)
  }

  _encodeMappingsToBuffer(buffer: Uint8Array, offset: number, context: EncodeContext): number {
    return encodeMessageArrayField(buffer, offset, ProfileField.mapping, this.mapping, context)
  }

  _encodeLocationsToBuffer(buffer: Uint8Array, offset: number, context: EncodeContext): number {
    return encodeMessageArrayField(buffer, offset, ProfileField.location, this.location, context)
  }

  _encodeFunctionsToBuffer(buffer: Uint8Array, offset: number, context: EncodeContext): number {
    return encodeMessageArrayField(buffer, offset, ProfileField.function, this.function, context)
  }

  _encodeBasicValuesToBuffer(buffer: Uint8Array, offset: number, context: EncodeContext): number {
    offset = encodeNumberField(buffer, offset, ProfileField.dropFrames, this.dropFrames)
    offset = encodeNumberField(buffer, offset, ProfileField.keepFrames, this.keepFrames)
    offset = encodeNumberField(buffer, offset, ProfileField.timeNanos, this.timeNanos)
    offset = encodeNumberField(buffer, offset, ProfileField.durationNanos, this.durationNanos)
    offset = encodeMessageField(buffer, offset, ProfileField.periodType, this.periodType, context)
    offset = encodeNumberField(buffer, offset, ProfileField.period, this.period)
    offset = encodePackedNumbersField(buffer, offset, ProfileField.comment, this.comment)
    offset = encodeNumberField(buffer, offset, ProfileField.defaultSampleType, this.defaultSampleType)
    offset = encodeNumberField(buffer, offset, ProfileField.docUrl, this.docUrl)
    return offset
  }

  _encodeToBuffer(buffer: Uint8Array, offset: number, context: EncodeContext): number {
    offset = this._encodeSampleTypesToBuffer(buffer, offset, context)
    offset = this._encodeSamplesToBuffer(buffer, offset, context)
    offset = this._encodeMappingsToBuffer(buffer, offset, context)
    offset = this._encodeLocationsToBuffer(buffer, offset, context)
    offset = this._encodeFunctionsToBuffer(buffer, offset, context)
    offset = this.stringTable._encodeToBuffer(buffer, offset)
    offset = this._encodeBasicValuesToBuffer(buffer, offset, context)
    return offset
  }

  /** Like _encodeToBuffer(), but yields between phases. */
  async _encodeToBufferAsync(buffer: Uint8Array, offset: number, context: EncodeContext): Promise<number> {
    offset = this._encodeSampleTypesToBuffer(buffer, offset, context)
    await yieldToEventLoop()

    offset = this._encodeSamplesToBuffer(buffer, offset, context)
    await yieldToEventLoop()

    offset = this._encodeMappingsToBuffer(buffer, offset, context)
    await yieldToEventLoop()

    offset = this._encodeLocationsToBuffer(buffer, offset, context)
    await yieldToEventLoop()

    offset = this._encodeFunctionsToBuffer(buffer, offset, context)
    await yieldToEventLoop()

    offset = this.stringTable._encodeToBuffer(buffer, offset)
    await yieldToEventLoop()

    offset = this._encodeBasicValuesToBuffer(buffer, offset, context)
    return offset
  }

  /** Like encode(), but yields between phases. Do not mutate until it settles. */
  async encodeAsync(buffer?: Uint8Array): Promise<Uint8Array> {
    const context = newEncodeContext()
    const length = this._measure(context)
    buffer = prepareBuffer(buffer, length)
    verifyEncodedLength(await this._encodeToBufferAsync(buffer, 0, context), length)
    return buffer
  }

  static decodeValue(data: ProfileInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case ProfileField.sampleType:
        if (isLengthDelim(wireType)) data.sampleType = push(ValueType.decode(buffer, start, end), data.sampleType)
        break
      case ProfileField.sample:
        if (isLengthDelim(wireType)) data.sample = push(Sample.decode(buffer, start, end), data.sample)
        break
      case ProfileField.mapping:
        if (isLengthDelim(wireType)) data.mapping = push(Mapping.decode(buffer, start, end), data.mapping)
        break
      case ProfileField.location:
        if (isLengthDelim(wireType)) data.location = push(Location.decode(buffer, start, end), data.location)
        break
      case ProfileField.function:
        if (isLengthDelim(wireType)) data.function = push(Function.decode(buffer, start, end), data.function)
        break
      case ProfileField.stringTable: {
        if (!isLengthDelim(wireType)) break
        if (data.stringTable === undefined) {
          data.stringTable = new StringTable(emptyTableToken)
        }
        data.stringTable._decodeString(buffer.subarray(start, end))
        break
      }
      case ProfileField.dropFrames:
        if (isVarInt(wireType)) data.dropFrames = decodeNumber(buffer, start, end)
        break
      case ProfileField.keepFrames:
        if (isVarInt(wireType)) data.keepFrames = decodeNumber(buffer, start, end)
        break
      case ProfileField.timeNanos:
        if (isVarInt(wireType)) data.timeNanos = decodeNumber(buffer, start, end)
        break
      case ProfileField.durationNanos:
        if (isVarInt(wireType)) data.durationNanos = decodeNumber(buffer, start, end)
        break
      case ProfileField.periodType:
        if (isLengthDelim(wireType)) data.periodType = ValueType.decode(buffer, start, end)
        break
      case ProfileField.period:
        if (isVarInt(wireType)) data.period = decodeNumber(buffer, start, end)
        break
      case ProfileField.comment:
        if (isPackedOrVarInt(wireType)) data.comment = pushAll(decodeNumbers(buffer, start, end), data.comment)
        break
      case ProfileField.defaultSampleType:
        if (isVarInt(wireType)) data.defaultSampleType = decodeNumber(buffer, start, end)
        break
      case ProfileField.docUrl:
        if (isVarInt(wireType)) data.docUrl = decodeNumber(buffer, start, end)
        break
    }
  }

  /**
   * Decodes a profile. Like other protobuf implementations, it skips unknown
   * fields and fields whose wire type differs from the declared one.
   */
  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Profile {
    return new this(decodeFields(buffer, this.decodeValue, start, end))
  }
}
