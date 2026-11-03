/**
 * Unless explicitly stated otherwise all files in this repository are licensed under the MIT License.
 *
 * This product includes software developed at Datadog (https://www.datadoghq.com/  Copyright 2026 Datadog, Inc.
 */

/*
 * OpenTelemetry profiles codec for opentelemetry-proto v1.11.1: profiles,
 * common/resource dependencies, and the profiles export request and response.
 * The signal is still in development; its schema may change.
 * Field names use camelCase.
 *
 * Decode into plain inputs so repeated occurrences of singular message fields
 * merge before constructors apply defaults.
 */

import {
  EncodeContext,
  Message,
  Numeric,
  decodeDouble,
  decodeFields,
  decodeFixed64,
  decodeFixed64s,
  decodeNumber,
  decodeNumbers,
  decodeString,
  encodeBoolField,
  encodeBytesField,
  encodeDoubleField,
  encodeFixed64Field,
  encodeMessageArrayField,
  encodeMessageField,
  encodeMessageFieldHeader,
  encodeNumberField,
  encodePackedFixed64Field,
  encodePackedNumbersField,
  encodeStringArrayField,
  encodeStringField,
  isFixed64,
  isLengthDelim,
  isPackedOrVarInt,
  isVarInt,
  measureBoolField,
  measureBytesField,
  measureDoubleField,
  measureFixed64Field,
  measureMessageArrayField,
  measureMessageField,
  measureNumberField,
  measurePackedFixed64Field,
  measurePackedNumbersField,
  measureStringArrayField,
  measureStringField,
  newEncodeContext,
  prepareBuffer,
  push,
  pushAll,
  toSigned,
  verifyEncodedLength,
  yieldToEventLoop,
} from './protobuf.js'
import { StringTable, emptyTableToken } from './string-table.js'

export { StringTable, emptyTableToken }

/*
 * Each message is preceded by a const enum of its field numbers, as declared
 * in the OTel protos. Const enums are inlined at compile time, so they cost
 * nothing at run time.
 */

/* Scalar decoders. */

function decodeInt32(buffer: Uint8Array, start: number, end: number): number {
  return Number(toSigned(decodeNumber(buffer, start, end)))
}

function decodeInt32s(buffer: Uint8Array, start: number, end: number): number[] {
  return decodeNumbers(buffer, start, end).map(value => Number(toSigned(value)))
}

function decodeInt64(buffer: Uint8Array, start: number, end: number): Numeric {
  return toSigned(decodeNumber(buffer, start, end))
}

function decodeInt64s(buffer: Uint8Array, start: number, end: number): Numeric[] {
  return decodeNumbers(buffer, start, end).map(toSigned)
}

// Copy into a plain Uint8Array so decoded messages don't retain the input.
function decodeBytes(buffer: Uint8Array, start: number, end: number): Uint8Array {
  return new Uint8Array(buffer.subarray(start, end))
}

/*
 * opentelemetry/proto/common/v1/common.proto
 */

const anyValueKeys = [
  'stringValue',
  'boolValue',
  'intValue',
  'doubleValue',
  'arrayValue',
  'kvlistValue',
  'bytesValue',
  'stringValueStrindex'
] as const

const enum AnyValueField {
  stringValue = 1,
  boolValue = 2,
  intValue = 3,
  doubleValue = 4,
  arrayValue = 5,
  kvlistValue = 6,
  bytesValue = 7,
  stringValueStrindex = 8,
}

export type AnyValueInput = {
  stringValue?: string
  boolValue?: boolean
  intValue?: Numeric
  doubleValue?: number
  arrayValue?: ArrayValueInput
  kvlistValue?: KeyValueListInput
  bytesValue?: Uint8Array
  stringValueStrindex?: number
}

// The last oneof member wins; successive occurrences of a message member merge.
function setAnyValue<K extends typeof anyValueKeys[number]>(data: AnyValueInput, key: K, value: AnyValueInput[K]) {
  for (const other of anyValueKeys) {
    if (other !== key) delete data[other]
  }
  data[key] = value
}

/** A protobuf oneof: at most one field, encoded even if set to its default. */
export class AnyValue extends Message {
  stringValue?: string
  boolValue?: boolean
  intValue?: Numeric
  doubleValue?: number
  arrayValue?: ArrayValue
  kvlistValue?: KeyValueList
  bytesValue?: Uint8Array
  stringValueStrindex?: number

  static create(data: AnyValueInput): AnyValue {
    return data instanceof AnyValue ? data : new AnyValue(data)
  }

  constructor(data: AnyValueInput = {}) {
    super()
    if (anyValueKeys.filter(key => data[key] !== undefined).length > 1) {
      throw new TypeError('AnyValue can only hold one value')
    }
    this.stringValue = data.stringValue
    this.boolValue = data.boolValue
    this.intValue = data.intValue
    this.doubleValue = data.doubleValue
    this.arrayValue = data.arrayValue && ArrayValue.create(data.arrayValue)
    this.kvlistValue = data.kvlistValue && KeyValueList.create(data.kvlistValue)
    this.bytesValue = data.bytesValue
    this.stringValueStrindex = data.stringValueStrindex
  }

  _measure(context: EncodeContext) {
    if (this.stringValue !== undefined) return measureStringField(AnyValueField.stringValue, this.stringValue, true)
    if (this.boolValue !== undefined) return measureBoolField(AnyValueField.boolValue, this.boolValue, true)
    if (this.intValue !== undefined) return measureNumberField(AnyValueField.intValue, this.intValue, true)
    if (this.doubleValue !== undefined) return measureDoubleField(AnyValueField.doubleValue, this.doubleValue, true)
    if (this.arrayValue !== undefined) return measureMessageField(AnyValueField.arrayValue, this.arrayValue, context)
    if (this.kvlistValue !== undefined) return measureMessageField(AnyValueField.kvlistValue, this.kvlistValue, context)
    if (this.bytesValue !== undefined) return measureBytesField(AnyValueField.bytesValue, this.bytesValue, true)
    if (this.stringValueStrindex !== undefined) return measureNumberField(AnyValueField.stringValueStrindex, this.stringValueStrindex, true)
    return 0
  }

  _encodeToBuffer(buffer: Uint8Array, offset: number, context: EncodeContext): number {
    if (this.stringValue !== undefined) return encodeStringField(buffer, offset, AnyValueField.stringValue, this.stringValue, true)
    if (this.boolValue !== undefined) return encodeBoolField(buffer, offset, AnyValueField.boolValue, this.boolValue, true)
    if (this.intValue !== undefined) return encodeNumberField(buffer, offset, AnyValueField.intValue, this.intValue, true)
    if (this.doubleValue !== undefined) return encodeDoubleField(buffer, offset, AnyValueField.doubleValue, this.doubleValue, true)
    if (this.arrayValue !== undefined) return encodeMessageField(buffer, offset, AnyValueField.arrayValue, this.arrayValue, context)
    if (this.kvlistValue !== undefined) return encodeMessageField(buffer, offset, AnyValueField.kvlistValue, this.kvlistValue, context)
    if (this.bytesValue !== undefined) return encodeBytesField(buffer, offset, AnyValueField.bytesValue, this.bytesValue, true)
    if (this.stringValueStrindex !== undefined) {
      return encodeNumberField(buffer, offset, AnyValueField.stringValueStrindex, this.stringValueStrindex, true)
    }
    return offset
  }

  static decodeValue(data: AnyValueInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case AnyValueField.stringValue:
        if (isLengthDelim(wireType)) setAnyValue(data, 'stringValue', decodeString(buffer, start, end))
        break
      case AnyValueField.boolValue:
        if (isVarInt(wireType)) setAnyValue(data, 'boolValue', !!decodeNumber(buffer, start, end))
        break
      case AnyValueField.intValue:
        if (isVarInt(wireType)) setAnyValue(data, 'intValue', decodeInt64(buffer, start, end))
        break
      case AnyValueField.doubleValue:
        if (isFixed64(wireType)) setAnyValue(data, 'doubleValue', decodeDouble(buffer, start))
        break
      case AnyValueField.arrayValue:
        if (isLengthDelim(wireType)) setAnyValue(data, 'arrayValue', ArrayValue.decodeInput(buffer, start, end, data.arrayValue))
        break
      case AnyValueField.kvlistValue:
        if (isLengthDelim(wireType)) setAnyValue(data, 'kvlistValue', KeyValueList.decodeInput(buffer, start, end, data.kvlistValue))
        break
      case AnyValueField.bytesValue:
        if (isLengthDelim(wireType)) setAnyValue(data, 'bytesValue', decodeBytes(buffer, start, end))
        break
      case AnyValueField.stringValueStrindex:
        if (isVarInt(wireType)) setAnyValue(data, 'stringValueStrindex', decodeInt32(buffer, start, end))
        break
    }
  }

  static decodeInput(buffer: Uint8Array, start = 0, end = buffer.length, into?: AnyValueInput): AnyValueInput {
    return decodeFields(buffer, this.decodeValue, start, end, into)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): AnyValue {
    return new this(this.decodeInput(buffer, start, end))
  }
}

const enum ArrayValueField {
  values = 1,
}

export type ArrayValueInput = {
  values?: Array<AnyValueInput>
}

export class ArrayValue extends Message {
  values: Array<AnyValue>

  static create(data: ArrayValueInput): ArrayValue {
    return data instanceof ArrayValue ? data : new ArrayValue(data)
  }

  constructor(data: ArrayValueInput = {}) {
    super()
    this.values = (data.values || []).map(AnyValue.create)
  }

  _measure(context: EncodeContext) {
    return measureMessageArrayField(ArrayValueField.values, this.values, context)
  }

  _encodeToBuffer(buffer: Uint8Array, offset: number, context: EncodeContext): number {
    return encodeMessageArrayField(buffer, offset, ArrayValueField.values, this.values, context)
  }

  static decodeValue(data: ArrayValueInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case ArrayValueField.values:
        if (isLengthDelim(wireType)) data.values = push(AnyValue.decodeInput(buffer, start, end), data.values)
        break
    }
  }

  static decodeInput(buffer: Uint8Array, start = 0, end = buffer.length, into?: ArrayValueInput): ArrayValueInput {
    return decodeFields(buffer, this.decodeValue, start, end, into)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): ArrayValue {
    return new this(this.decodeInput(buffer, start, end))
  }
}

const enum KeyValueListField {
  values = 1,
}

export type KeyValueListInput = {
  values?: Array<KeyValueInput>
}

export class KeyValueList extends Message {
  values: Array<KeyValue>

  static create(data: KeyValueListInput): KeyValueList {
    return data instanceof KeyValueList ? data : new KeyValueList(data)
  }

  constructor(data: KeyValueListInput = {}) {
    super()
    this.values = (data.values || []).map(KeyValue.create)
  }

  _measure(context: EncodeContext) {
    return measureMessageArrayField(KeyValueListField.values, this.values, context)
  }

  _encodeToBuffer(buffer: Uint8Array, offset: number, context: EncodeContext): number {
    return encodeMessageArrayField(buffer, offset, KeyValueListField.values, this.values, context)
  }

  static decodeValue(data: KeyValueListInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case KeyValueListField.values:
        if (isLengthDelim(wireType)) data.values = push(KeyValue.decodeInput(buffer, start, end), data.values)
        break
    }
  }

  static decodeInput(buffer: Uint8Array, start = 0, end = buffer.length, into?: KeyValueListInput): KeyValueListInput {
    return decodeFields(buffer, this.decodeValue, start, end, into)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): KeyValueList {
    return new this(this.decodeInput(buffer, start, end))
  }
}

const enum KeyValueField {
  key = 1,
  value = 2,
  keyStrindex = 3,
}

export type KeyValueInput = {
  key?: string
  value?: AnyValueInput
  keyStrindex?: number
}

export class KeyValue extends Message {
  key: string
  value?: AnyValue
  keyStrindex: number

  static create(data: KeyValueInput): KeyValue {
    return data instanceof KeyValue ? data : new KeyValue(data)
  }

  constructor(data: KeyValueInput = {}) {
    super()
    this.key = data.key || ''
    this.value = data.value && AnyValue.create(data.value)
    this.keyStrindex = data.keyStrindex || 0
  }

  _measure(context: EncodeContext) {
    let total = 0
    total += measureStringField(KeyValueField.key, this.key)
    total += measureMessageField(KeyValueField.value, this.value, context)
    total += measureNumberField(KeyValueField.keyStrindex, this.keyStrindex)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset: number, context: EncodeContext): number {
    offset = encodeStringField(buffer, offset, KeyValueField.key, this.key)
    offset = encodeMessageField(buffer, offset, KeyValueField.value, this.value, context)
    offset = encodeNumberField(buffer, offset, KeyValueField.keyStrindex, this.keyStrindex)
    return offset
  }

  static decodeValue(data: KeyValueInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case KeyValueField.key:
        if (isLengthDelim(wireType)) data.key = decodeString(buffer, start, end)
        break
      case KeyValueField.value:
        if (isLengthDelim(wireType)) data.value = AnyValue.decodeInput(buffer, start, end, data.value)
        break
      case KeyValueField.keyStrindex:
        if (isVarInt(wireType)) data.keyStrindex = decodeInt32(buffer, start, end)
        break
    }
  }

  static decodeInput(buffer: Uint8Array, start = 0, end = buffer.length, into?: KeyValueInput): KeyValueInput {
    return decodeFields(buffer, this.decodeValue, start, end, into)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): KeyValue {
    return new this(this.decodeInput(buffer, start, end))
  }
}

const enum InstrumentationScopeField {
  name = 1,
  version = 2,
  attributes = 3,
  droppedAttributesCount = 4,
}

export type InstrumentationScopeInput = {
  name?: string
  version?: string
  attributes?: Array<KeyValueInput>
  droppedAttributesCount?: number
}

export class InstrumentationScope extends Message {
  name: string
  version: string
  attributes: Array<KeyValue>
  droppedAttributesCount: number

  static create(data: InstrumentationScopeInput): InstrumentationScope {
    return data instanceof InstrumentationScope ? data : new InstrumentationScope(data)
  }

  constructor(data: InstrumentationScopeInput = {}) {
    super()
    this.name = data.name || ''
    this.version = data.version || ''
    this.attributes = (data.attributes || []).map(KeyValue.create)
    this.droppedAttributesCount = data.droppedAttributesCount || 0
  }

  _measure(context: EncodeContext) {
    let total = 0
    total += measureStringField(InstrumentationScopeField.name, this.name)
    total += measureStringField(InstrumentationScopeField.version, this.version)
    total += measureMessageArrayField(InstrumentationScopeField.attributes, this.attributes, context)
    total += measureNumberField(InstrumentationScopeField.droppedAttributesCount, this.droppedAttributesCount)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset: number, context: EncodeContext): number {
    offset = encodeStringField(buffer, offset, InstrumentationScopeField.name, this.name)
    offset = encodeStringField(buffer, offset, InstrumentationScopeField.version, this.version)
    offset = encodeMessageArrayField(buffer, offset, InstrumentationScopeField.attributes, this.attributes, context)
    offset = encodeNumberField(buffer, offset, InstrumentationScopeField.droppedAttributesCount, this.droppedAttributesCount)
    return offset
  }

  static decodeValue(data: InstrumentationScopeInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case InstrumentationScopeField.name:
        if (isLengthDelim(wireType)) data.name = decodeString(buffer, start, end)
        break
      case InstrumentationScopeField.version:
        if (isLengthDelim(wireType)) data.version = decodeString(buffer, start, end)
        break
      case InstrumentationScopeField.attributes:
        if (isLengthDelim(wireType)) data.attributes = push(KeyValue.decodeInput(buffer, start, end), data.attributes)
        break
      case InstrumentationScopeField.droppedAttributesCount:
        if (isVarInt(wireType)) data.droppedAttributesCount = Number(decodeNumber(buffer, start, end))
        break
    }
  }

  static decodeInput(buffer: Uint8Array, start = 0, end = buffer.length, into?: InstrumentationScopeInput): InstrumentationScopeInput {
    return decodeFields(buffer, this.decodeValue, start, end, into)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): InstrumentationScope {
    return new this(this.decodeInput(buffer, start, end))
  }
}

const enum EntityRefField {
  schemaUrl = 1,
  type = 2,
  idKeys = 3,
  descriptionKeys = 4,
}

export type EntityRefInput = {
  schemaUrl?: string
  type?: string
  idKeys?: Array<string>
  descriptionKeys?: Array<string>
}

export class EntityRef extends Message {
  schemaUrl: string
  type: string
  idKeys: Array<string>
  descriptionKeys: Array<string>

  static create(data: EntityRefInput): EntityRef {
    return data instanceof EntityRef ? data : new EntityRef(data)
  }

  constructor(data: EntityRefInput = {}) {
    super()
    this.schemaUrl = data.schemaUrl || ''
    this.type = data.type || ''
    this.idKeys = data.idKeys || []
    this.descriptionKeys = data.descriptionKeys || []
  }

  _measure() {
    let total = 0
    total += measureStringField(EntityRefField.schemaUrl, this.schemaUrl)
    total += measureStringField(EntityRefField.type, this.type)
    total += measureStringArrayField(EntityRefField.idKeys, this.idKeys)
    total += measureStringArrayField(EntityRefField.descriptionKeys, this.descriptionKeys)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeStringField(buffer, offset, EntityRefField.schemaUrl, this.schemaUrl)
    offset = encodeStringField(buffer, offset, EntityRefField.type, this.type)
    offset = encodeStringArrayField(buffer, offset, EntityRefField.idKeys, this.idKeys)
    offset = encodeStringArrayField(buffer, offset, EntityRefField.descriptionKeys, this.descriptionKeys)
    return offset
  }

  static decodeValue(data: EntityRefInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case EntityRefField.schemaUrl:
        if (isLengthDelim(wireType)) data.schemaUrl = decodeString(buffer, start, end)
        break
      case EntityRefField.type:
        if (isLengthDelim(wireType)) data.type = decodeString(buffer, start, end)
        break
      case EntityRefField.idKeys:
        if (isLengthDelim(wireType)) data.idKeys = push(decodeString(buffer, start, end), data.idKeys)
        break
      case EntityRefField.descriptionKeys:
        if (isLengthDelim(wireType)) data.descriptionKeys = push(decodeString(buffer, start, end), data.descriptionKeys)
        break
    }
  }

  static decodeInput(buffer: Uint8Array, start = 0, end = buffer.length, into?: EntityRefInput): EntityRefInput {
    return decodeFields(buffer, this.decodeValue, start, end, into)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): EntityRef {
    return new this(this.decodeInput(buffer, start, end))
  }
}

/*
 * opentelemetry/proto/resource/v1/resource.proto
 */

const enum ResourceField {
  attributes = 1,
  droppedAttributesCount = 2,
  entityRefs = 3,
}

export type ResourceInput = {
  attributes?: Array<KeyValueInput>
  droppedAttributesCount?: number
  entityRefs?: Array<EntityRefInput>
}

export class Resource extends Message {
  attributes: Array<KeyValue>
  droppedAttributesCount: number
  entityRefs: Array<EntityRef>

  static create(data: ResourceInput): Resource {
    return data instanceof Resource ? data : new Resource(data)
  }

  constructor(data: ResourceInput = {}) {
    super()
    this.attributes = (data.attributes || []).map(KeyValue.create)
    this.droppedAttributesCount = data.droppedAttributesCount || 0
    this.entityRefs = (data.entityRefs || []).map(EntityRef.create)
  }

  _measure(context: EncodeContext) {
    let total = 0
    total += measureMessageArrayField(ResourceField.attributes, this.attributes, context)
    total += measureNumberField(ResourceField.droppedAttributesCount, this.droppedAttributesCount)
    total += measureMessageArrayField(ResourceField.entityRefs, this.entityRefs, context)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset: number, context: EncodeContext): number {
    offset = encodeMessageArrayField(buffer, offset, ResourceField.attributes, this.attributes, context)
    offset = encodeNumberField(buffer, offset, ResourceField.droppedAttributesCount, this.droppedAttributesCount)
    offset = encodeMessageArrayField(buffer, offset, ResourceField.entityRefs, this.entityRefs, context)
    return offset
  }

  static decodeValue(data: ResourceInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case ResourceField.attributes:
        if (isLengthDelim(wireType)) data.attributes = push(KeyValue.decodeInput(buffer, start, end), data.attributes)
        break
      case ResourceField.droppedAttributesCount:
        if (isVarInt(wireType)) data.droppedAttributesCount = Number(decodeNumber(buffer, start, end))
        break
      case ResourceField.entityRefs:
        if (isLengthDelim(wireType)) data.entityRefs = push(EntityRef.decodeInput(buffer, start, end), data.entityRefs)
        break
    }
  }

  static decodeInput(buffer: Uint8Array, start = 0, end = buffer.length, into?: ResourceInput): ResourceInput {
    return decodeFields(buffer, this.decodeValue, start, end, into)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Resource {
    return new this(this.decodeInput(buffer, start, end))
  }
}

/*
 * opentelemetry/proto/profiles/v1development/profiles.proto
 */

const enum ProfilesDictionaryField {
  mappingTable = 1,
  locationTable = 2,
  functionTable = 3,
  linkTable = 4,
  stringTable = 5,
  attributeTable = 6,
  stackTable = 7,
}

export type ProfilesDictionaryInput = {
  mappingTable?: Array<MappingInput>
  locationTable?: Array<LocationInput>
  functionTable?: Array<FunctionInput>
  linkTable?: Array<LinkInput>
  stringTable?: StringTable
  attributeTable?: Array<KeyValueAndUnitInput>
  stackTable?: Array<StackInput>
}

/**
 * Tables shared by all profiles in a ProfilesData or export request.
 * Index 0 must hold the element's zero value ("" for strings), meaning "not set".
 * Omitted tables default to that single entry.
 */
export class ProfilesDictionary extends Message {
  mappingTable: Array<Mapping>
  locationTable: Array<Location>
  functionTable: Array<Function>
  linkTable: Array<Link>
  stringTable: StringTable
  attributeTable: Array<KeyValueAndUnit>
  stackTable: Array<Stack>

  static create(data: ProfilesDictionaryInput): ProfilesDictionary {
    return data instanceof ProfilesDictionary ? data : new ProfilesDictionary(data)
  }

  constructor(data: ProfilesDictionaryInput = {}) {
    super()
    this.mappingTable = data.mappingTable ? data.mappingTable.map(Mapping.create) : [new Mapping()]
    this.locationTable = data.locationTable ? data.locationTable.map(Location.create) : [new Location()]
    this.functionTable = data.functionTable ? data.functionTable.map(Function.create) : [new Function()]
    this.linkTable = data.linkTable ? data.linkTable.map(Link.create) : [new Link()]
    this.stringTable = data.stringTable || new StringTable()
    this.attributeTable = data.attributeTable ? data.attributeTable.map(KeyValueAndUnit.create) : [new KeyValueAndUnit()]
    this.stackTable = data.stackTable ? data.stackTable.map(Stack.create) : [new Stack()]
  }

  _measure(context: EncodeContext) {
    let total = 0
    total += measureMessageArrayField(ProfilesDictionaryField.mappingTable, this.mappingTable, context)
    total += measureMessageArrayField(ProfilesDictionaryField.locationTable, this.locationTable, context)
    total += measureMessageArrayField(ProfilesDictionaryField.functionTable, this.functionTable, context)
    total += measureMessageArrayField(ProfilesDictionaryField.linkTable, this.linkTable, context)
    total += this.stringTable._measure(ProfilesDictionaryField.stringTable)
    total += measureMessageArrayField(ProfilesDictionaryField.attributeTable, this.attributeTable, context)
    total += measureMessageArrayField(ProfilesDictionaryField.stackTable, this.stackTable, context)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset: number, context: EncodeContext): number {
    offset = encodeMessageArrayField(buffer, offset, ProfilesDictionaryField.mappingTable, this.mappingTable, context)
    offset = encodeMessageArrayField(buffer, offset, ProfilesDictionaryField.locationTable, this.locationTable, context)
    offset = encodeMessageArrayField(buffer, offset, ProfilesDictionaryField.functionTable, this.functionTable, context)
    offset = encodeMessageArrayField(buffer, offset, ProfilesDictionaryField.linkTable, this.linkTable, context)
    offset = this.stringTable._encodeToBuffer(buffer, offset, ProfilesDictionaryField.stringTable)
    offset = encodeMessageArrayField(buffer, offset, ProfilesDictionaryField.attributeTable, this.attributeTable, context)
    offset = encodeMessageArrayField(buffer, offset, ProfilesDictionaryField.stackTable, this.stackTable, context)
    return offset
  }

  /** Like _encodeToBuffer(), but yields between tables. */
  async _encodeToBufferAsync(buffer: Uint8Array, offset: number, context: EncodeContext): Promise<number> {
    offset = encodeMessageArrayField(buffer, offset, ProfilesDictionaryField.mappingTable, this.mappingTable, context)
    await yieldToEventLoop()

    offset = encodeMessageArrayField(buffer, offset, ProfilesDictionaryField.locationTable, this.locationTable, context)
    await yieldToEventLoop()

    offset = encodeMessageArrayField(buffer, offset, ProfilesDictionaryField.functionTable, this.functionTable, context)
    offset = encodeMessageArrayField(buffer, offset, ProfilesDictionaryField.linkTable, this.linkTable, context)
    await yieldToEventLoop()

    offset = this.stringTable._encodeToBuffer(buffer, offset, ProfilesDictionaryField.stringTable)
    await yieldToEventLoop()

    offset = encodeMessageArrayField(buffer, offset, ProfilesDictionaryField.attributeTable, this.attributeTable, context)
    offset = encodeMessageArrayField(buffer, offset, ProfilesDictionaryField.stackTable, this.stackTable, context)
    return offset
  }

  static decodeValue(data: ProfilesDictionaryInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case ProfilesDictionaryField.mappingTable:
        if (isLengthDelim(wireType)) data.mappingTable = push(Mapping.decodeInput(buffer, start, end), data.mappingTable)
        break
      case ProfilesDictionaryField.locationTable:
        if (isLengthDelim(wireType)) data.locationTable = push(Location.decodeInput(buffer, start, end), data.locationTable)
        break
      case ProfilesDictionaryField.functionTable:
        if (isLengthDelim(wireType)) data.functionTable = push(Function.decodeInput(buffer, start, end), data.functionTable)
        break
      case ProfilesDictionaryField.linkTable:
        if (isLengthDelim(wireType)) data.linkTable = push(Link.decodeInput(buffer, start, end), data.linkTable)
        break
      case ProfilesDictionaryField.stringTable: {
        if (!isLengthDelim(wireType)) break
        if (data.stringTable === undefined) {
          data.stringTable = new StringTable(emptyTableToken)
        }
        data.stringTable._decodeString(buffer.subarray(start, end))
        break
      }
      case ProfilesDictionaryField.attributeTable:
        if (isLengthDelim(wireType)) data.attributeTable = push(KeyValueAndUnit.decodeInput(buffer, start, end), data.attributeTable)
        break
      case ProfilesDictionaryField.stackTable:
        if (isLengthDelim(wireType)) data.stackTable = push(Stack.decodeInput(buffer, start, end), data.stackTable)
        break
    }
  }

  static decodeInput(buffer: Uint8Array, start = 0, end = buffer.length, into?: ProfilesDictionaryInput): ProfilesDictionaryInput {
    return decodeFields(buffer, this.decodeValue, start, end, into)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): ProfilesDictionary {
    return new this(this.decodeInput(buffer, start, end))
  }
}

const enum ProfilesDataField {
  resourceProfiles = 1,
  dictionary = 2,
}

export type ProfilesDataInput = {
  resourceProfiles?: Array<ResourceProfilesInput>
  dictionary?: ProfilesDictionaryInput
}

/** Profiles and their shared dictionary; wire-compatible with ExportProfilesServiceRequest. */
export class ProfilesData extends Message {
  resourceProfiles: Array<ResourceProfiles>
  dictionary?: ProfilesDictionary

  static create(data: ProfilesDataInput): ProfilesData {
    return data instanceof ProfilesData ? data : new ProfilesData(data)
  }

  constructor(data: ProfilesDataInput = {}) {
    super()
    this.resourceProfiles = (data.resourceProfiles || []).map(ResourceProfiles.create)
    this.dictionary = data.dictionary && ProfilesDictionary.create(data.dictionary)
  }

  _measure(context: EncodeContext) {
    let total = 0
    total += measureMessageArrayField(ProfilesDataField.resourceProfiles, this.resourceProfiles, context)
    total += measureMessageField(ProfilesDataField.dictionary, this.dictionary, context)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset: number, context: EncodeContext): number {
    offset = encodeMessageArrayField(buffer, offset, ProfilesDataField.resourceProfiles, this.resourceProfiles, context)
    offset = encodeMessageField(buffer, offset, ProfilesDataField.dictionary, this.dictionary, context)
    return offset
  }

  /** Like _encodeToBuffer(), but yields between phases. */
  async _encodeToBufferAsync(buffer: Uint8Array, offset: number, context: EncodeContext): Promise<number> {
    const dictionary = this.dictionary

    offset = encodeMessageArrayField(buffer, offset, ProfilesDataField.resourceProfiles, this.resourceProfiles, context)
    if (dictionary === undefined) return offset
    await yieldToEventLoop()

    // Read the dictionary's recorded length in the same order as encode() does
    offset = encodeMessageFieldHeader(buffer, offset, ProfilesDataField.dictionary, context)
    return dictionary._encodeToBufferAsync(buffer, offset, context)
  }

  /** Like encode(), but yields between phases. Do not mutate until it settles. */
  async encodeAsync(buffer?: Uint8Array): Promise<Uint8Array> {
    const context = newEncodeContext()
    const length = this._measure(context)
    buffer = prepareBuffer(buffer, length)
    verifyEncodedLength(await this._encodeToBufferAsync(buffer, 0, context), length)
    return buffer
  }

  static decodeValue(data: ProfilesDataInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case ProfilesDataField.resourceProfiles:
        if (isLengthDelim(wireType)) data.resourceProfiles = push(ResourceProfiles.decodeInput(buffer, start, end), data.resourceProfiles)
        break
      case ProfilesDataField.dictionary:
        if (isLengthDelim(wireType)) data.dictionary = ProfilesDictionary.decodeInput(buffer, start, end, data.dictionary)
        break
    }
  }

  static decodeInput(buffer: Uint8Array, start = 0, end = buffer.length, into?: ProfilesDataInput): ProfilesDataInput {
    return decodeFields(buffer, this.decodeValue, start, end, into)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): ProfilesData {
    return new this(this.decodeInput(buffer, start, end))
  }
}

const enum ResourceProfilesField {
  resource = 1,
  scopeProfiles = 2,
  schemaUrl = 3,
}

export type ResourceProfilesInput = {
  resource?: ResourceInput
  scopeProfiles?: Array<ScopeProfilesInput>
  schemaUrl?: string
}

export class ResourceProfiles extends Message {
  resource?: Resource
  scopeProfiles: Array<ScopeProfiles>
  schemaUrl: string

  static create(data: ResourceProfilesInput): ResourceProfiles {
    return data instanceof ResourceProfiles ? data : new ResourceProfiles(data)
  }

  constructor(data: ResourceProfilesInput = {}) {
    super()
    this.resource = data.resource && Resource.create(data.resource)
    this.scopeProfiles = (data.scopeProfiles || []).map(ScopeProfiles.create)
    this.schemaUrl = data.schemaUrl || ''
  }

  _measure(context: EncodeContext) {
    let total = 0
    total += measureMessageField(ResourceProfilesField.resource, this.resource, context)
    total += measureMessageArrayField(ResourceProfilesField.scopeProfiles, this.scopeProfiles, context)
    total += measureStringField(ResourceProfilesField.schemaUrl, this.schemaUrl)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset: number, context: EncodeContext): number {
    offset = encodeMessageField(buffer, offset, ResourceProfilesField.resource, this.resource, context)
    offset = encodeMessageArrayField(buffer, offset, ResourceProfilesField.scopeProfiles, this.scopeProfiles, context)
    offset = encodeStringField(buffer, offset, ResourceProfilesField.schemaUrl, this.schemaUrl)
    return offset
  }

  static decodeValue(data: ResourceProfilesInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case ResourceProfilesField.resource:
        if (isLengthDelim(wireType)) data.resource = Resource.decodeInput(buffer, start, end, data.resource)
        break
      case ResourceProfilesField.scopeProfiles:
        if (isLengthDelim(wireType)) data.scopeProfiles = push(ScopeProfiles.decodeInput(buffer, start, end), data.scopeProfiles)
        break
      case ResourceProfilesField.schemaUrl:
        if (isLengthDelim(wireType)) data.schemaUrl = decodeString(buffer, start, end)
        break
    }
  }

  static decodeInput(buffer: Uint8Array, start = 0, end = buffer.length, into?: ResourceProfilesInput): ResourceProfilesInput {
    return decodeFields(buffer, this.decodeValue, start, end, into)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): ResourceProfiles {
    return new this(this.decodeInput(buffer, start, end))
  }
}

const enum ScopeProfilesField {
  scope = 1,
  profiles = 2,
  schemaUrl = 3,
}

export type ScopeProfilesInput = {
  scope?: InstrumentationScopeInput
  profiles?: Array<ProfileInput>
  schemaUrl?: string
}

export class ScopeProfiles extends Message {
  scope?: InstrumentationScope
  profiles: Array<Profile>
  schemaUrl: string

  static create(data: ScopeProfilesInput): ScopeProfiles {
    return data instanceof ScopeProfiles ? data : new ScopeProfiles(data)
  }

  constructor(data: ScopeProfilesInput = {}) {
    super()
    this.scope = data.scope && InstrumentationScope.create(data.scope)
    this.profiles = (data.profiles || []).map(Profile.create)
    this.schemaUrl = data.schemaUrl || ''
  }

  _measure(context: EncodeContext) {
    let total = 0
    total += measureMessageField(ScopeProfilesField.scope, this.scope, context)
    total += measureMessageArrayField(ScopeProfilesField.profiles, this.profiles, context)
    total += measureStringField(ScopeProfilesField.schemaUrl, this.schemaUrl)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset: number, context: EncodeContext): number {
    offset = encodeMessageField(buffer, offset, ScopeProfilesField.scope, this.scope, context)
    offset = encodeMessageArrayField(buffer, offset, ScopeProfilesField.profiles, this.profiles, context)
    offset = encodeStringField(buffer, offset, ScopeProfilesField.schemaUrl, this.schemaUrl)
    return offset
  }

  static decodeValue(data: ScopeProfilesInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case ScopeProfilesField.scope:
        if (isLengthDelim(wireType)) data.scope = InstrumentationScope.decodeInput(buffer, start, end, data.scope)
        break
      case ScopeProfilesField.profiles:
        if (isLengthDelim(wireType)) data.profiles = push(Profile.decodeInput(buffer, start, end), data.profiles)
        break
      case ScopeProfilesField.schemaUrl:
        if (isLengthDelim(wireType)) data.schemaUrl = decodeString(buffer, start, end)
        break
    }
  }

  static decodeInput(buffer: Uint8Array, start = 0, end = buffer.length, into?: ScopeProfilesInput): ScopeProfilesInput {
    return decodeFields(buffer, this.decodeValue, start, end, into)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): ScopeProfiles {
    return new this(this.decodeInput(buffer, start, end))
  }
}

const enum ProfileField {
  sampleType = 1,
  samples = 2,
  timeUnixNano = 3,
  durationNano = 4,
  periodType = 5,
  period = 6,
  profileId = 7,
  droppedAttributesCount = 8,
  originalPayloadFormat = 9,
  originalPayload = 10,
  attributeIndices = 11,
}

export type ProfileInput = {
  sampleType?: ValueTypeInput
  samples?: Array<SampleInput>
  timeUnixNano?: Numeric
  durationNano?: Numeric
  periodType?: ValueTypeInput
  period?: Numeric
  profileId?: Uint8Array
  droppedAttributesCount?: number
  originalPayloadFormat?: string
  originalPayload?: Uint8Array
  attributeIndices?: Array<number>
}

export class Profile extends Message {
  sampleType?: ValueType
  samples: Array<Sample>
  timeUnixNano: Numeric
  durationNano: Numeric
  periodType?: ValueType
  period: Numeric
  profileId: Uint8Array
  droppedAttributesCount: number
  originalPayloadFormat: string
  originalPayload: Uint8Array
  attributeIndices: Array<number>

  static create(data: ProfileInput): Profile {
    return data instanceof Profile ? data : new Profile(data)
  }

  constructor(data: ProfileInput = {}) {
    super()
    this.sampleType = data.sampleType && ValueType.create(data.sampleType)
    this.samples = (data.samples || []).map(Sample.create)
    this.timeUnixNano = data.timeUnixNano || 0
    this.durationNano = data.durationNano || 0
    this.periodType = data.periodType && ValueType.create(data.periodType)
    this.period = data.period || 0
    this.profileId = data.profileId || new Uint8Array(0)
    this.droppedAttributesCount = data.droppedAttributesCount || 0
    this.originalPayloadFormat = data.originalPayloadFormat || ''
    this.originalPayload = data.originalPayload || new Uint8Array(0)
    this.attributeIndices = data.attributeIndices || []
  }

  _measure(context: EncodeContext) {
    let total = 0
    total += measureMessageField(ProfileField.sampleType, this.sampleType, context)
    total += measureMessageArrayField(ProfileField.samples, this.samples, context)
    total += measureFixed64Field(ProfileField.timeUnixNano, this.timeUnixNano)
    total += measureNumberField(ProfileField.durationNano, this.durationNano)
    total += measureMessageField(ProfileField.periodType, this.periodType, context)
    total += measureNumberField(ProfileField.period, this.period)
    total += measureBytesField(ProfileField.profileId, this.profileId)
    total += measureNumberField(ProfileField.droppedAttributesCount, this.droppedAttributesCount)
    total += measureStringField(ProfileField.originalPayloadFormat, this.originalPayloadFormat)
    total += measureBytesField(ProfileField.originalPayload, this.originalPayload)
    total += measurePackedNumbersField(ProfileField.attributeIndices, this.attributeIndices)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset: number, context: EncodeContext): number {
    offset = encodeMessageField(buffer, offset, ProfileField.sampleType, this.sampleType, context)
    offset = encodeMessageArrayField(buffer, offset, ProfileField.samples, this.samples, context)
    offset = encodeFixed64Field(buffer, offset, ProfileField.timeUnixNano, this.timeUnixNano)
    offset = encodeNumberField(buffer, offset, ProfileField.durationNano, this.durationNano)
    offset = encodeMessageField(buffer, offset, ProfileField.periodType, this.periodType, context)
    offset = encodeNumberField(buffer, offset, ProfileField.period, this.period)
    offset = encodeBytesField(buffer, offset, ProfileField.profileId, this.profileId)
    offset = encodeNumberField(buffer, offset, ProfileField.droppedAttributesCount, this.droppedAttributesCount)
    offset = encodeStringField(buffer, offset, ProfileField.originalPayloadFormat, this.originalPayloadFormat)
    offset = encodeBytesField(buffer, offset, ProfileField.originalPayload, this.originalPayload)
    offset = encodePackedNumbersField(buffer, offset, ProfileField.attributeIndices, this.attributeIndices)
    return offset
  }

  static decodeValue(data: ProfileInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case ProfileField.sampleType:
        if (isLengthDelim(wireType)) data.sampleType = ValueType.decodeInput(buffer, start, end, data.sampleType)
        break
      case ProfileField.samples:
        if (isLengthDelim(wireType)) data.samples = push(Sample.decodeInput(buffer, start, end), data.samples)
        break
      case ProfileField.timeUnixNano:
        if (isFixed64(wireType)) data.timeUnixNano = decodeFixed64(buffer, start)
        break
      case ProfileField.durationNano:
        if (isVarInt(wireType)) data.durationNano = decodeNumber(buffer, start, end)
        break
      case ProfileField.periodType:
        if (isLengthDelim(wireType)) data.periodType = ValueType.decodeInput(buffer, start, end, data.periodType)
        break
      case ProfileField.period:
        if (isVarInt(wireType)) data.period = decodeInt64(buffer, start, end)
        break
      case ProfileField.profileId:
        if (isLengthDelim(wireType)) data.profileId = decodeBytes(buffer, start, end)
        break
      case ProfileField.droppedAttributesCount:
        if (isVarInt(wireType)) data.droppedAttributesCount = Number(decodeNumber(buffer, start, end))
        break
      case ProfileField.originalPayloadFormat:
        if (isLengthDelim(wireType)) data.originalPayloadFormat = decodeString(buffer, start, end)
        break
      case ProfileField.originalPayload:
        if (isLengthDelim(wireType)) data.originalPayload = decodeBytes(buffer, start, end)
        break
      case ProfileField.attributeIndices:
        if (isPackedOrVarInt(wireType)) data.attributeIndices = pushAll(decodeInt32s(buffer, start, end), data.attributeIndices)
        break
    }
  }

  static decodeInput(buffer: Uint8Array, start = 0, end = buffer.length, into?: ProfileInput): ProfileInput {
    return decodeFields(buffer, this.decodeValue, start, end, into)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Profile {
    return new this(this.decodeInput(buffer, start, end))
  }
}

const enum LinkField {
  traceId = 1,
  spanId = 2,
}

export type LinkInput = {
  traceId?: Uint8Array
  spanId?: Uint8Array
}

export class Link extends Message {
  traceId: Uint8Array
  spanId: Uint8Array

  static create(data: LinkInput): Link {
    return data instanceof Link ? data : new Link(data)
  }

  constructor(data: LinkInput = {}) {
    super()
    this.traceId = data.traceId || new Uint8Array(0)
    this.spanId = data.spanId || new Uint8Array(0)
  }

  _measure() {
    let total = 0
    total += measureBytesField(LinkField.traceId, this.traceId)
    total += measureBytesField(LinkField.spanId, this.spanId)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeBytesField(buffer, offset, LinkField.traceId, this.traceId)
    offset = encodeBytesField(buffer, offset, LinkField.spanId, this.spanId)
    return offset
  }

  static decodeValue(data: LinkInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case LinkField.traceId:
        if (isLengthDelim(wireType)) data.traceId = decodeBytes(buffer, start, end)
        break
      case LinkField.spanId:
        if (isLengthDelim(wireType)) data.spanId = decodeBytes(buffer, start, end)
        break
    }
  }

  static decodeInput(buffer: Uint8Array, start = 0, end = buffer.length, into?: LinkInput): LinkInput {
    return decodeFields(buffer, this.decodeValue, start, end, into)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Link {
    return new this(this.decodeInput(buffer, start, end))
  }
}

const enum ValueTypeField {
  typeStrindex = 1,
  unitStrindex = 2,
}

export type ValueTypeInput = {
  typeStrindex?: number
  unitStrindex?: number
}

export class ValueType extends Message {
  typeStrindex: number
  unitStrindex: number

  static create(data: ValueTypeInput): ValueType {
    return data instanceof ValueType ? data : new ValueType(data)
  }

  constructor(data: ValueTypeInput = {}) {
    super()
    this.typeStrindex = data.typeStrindex || 0
    this.unitStrindex = data.unitStrindex || 0
  }

  _measure() {
    let total = 0
    total += measureNumberField(ValueTypeField.typeStrindex, this.typeStrindex)
    total += measureNumberField(ValueTypeField.unitStrindex, this.unitStrindex)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, ValueTypeField.typeStrindex, this.typeStrindex)
    offset = encodeNumberField(buffer, offset, ValueTypeField.unitStrindex, this.unitStrindex)
    return offset
  }

  static decodeValue(data: ValueTypeInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case ValueTypeField.typeStrindex:
        if (isVarInt(wireType)) data.typeStrindex = decodeInt32(buffer, start, end)
        break
      case ValueTypeField.unitStrindex:
        if (isVarInt(wireType)) data.unitStrindex = decodeInt32(buffer, start, end)
        break
    }
  }

  static decodeInput(buffer: Uint8Array, start = 0, end = buffer.length, into?: ValueTypeInput): ValueTypeInput {
    return decodeFields(buffer, this.decodeValue, start, end, into)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): ValueType {
    return new this(this.decodeInput(buffer, start, end))
  }
}

const enum SampleField {
  stackIndex = 1,
  attributeIndices = 2,
  linkIndex = 3,
  values = 4,
  timestampsUnixNano = 5,
}

export type SampleInput = {
  stackIndex?: number
  attributeIndices?: Array<number>
  linkIndex?: number
  values?: Array<Numeric>
  timestampsUnixNano?: Array<Numeric>
}

export class Sample extends Message {
  stackIndex: number
  attributeIndices: Array<number>
  linkIndex: number
  values: Array<Numeric>
  timestampsUnixNano: Array<Numeric>

  static create(data: SampleInput): Sample {
    return data instanceof Sample ? data : new Sample(data)
  }

  constructor(data: SampleInput = {}) {
    super()
    this.stackIndex = data.stackIndex || 0
    this.attributeIndices = data.attributeIndices || []
    this.linkIndex = data.linkIndex || 0
    this.values = data.values || []
    this.timestampsUnixNano = data.timestampsUnixNano || []
  }

  _measure() {
    let total = 0
    total += measureNumberField(SampleField.stackIndex, this.stackIndex)
    total += measurePackedNumbersField(SampleField.attributeIndices, this.attributeIndices)
    total += measureNumberField(SampleField.linkIndex, this.linkIndex)
    total += measurePackedNumbersField(SampleField.values, this.values)
    total += measurePackedFixed64Field(SampleField.timestampsUnixNano, this.timestampsUnixNano)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, SampleField.stackIndex, this.stackIndex)
    offset = encodePackedNumbersField(buffer, offset, SampleField.attributeIndices, this.attributeIndices)
    offset = encodeNumberField(buffer, offset, SampleField.linkIndex, this.linkIndex)
    offset = encodePackedNumbersField(buffer, offset, SampleField.values, this.values)
    offset = encodePackedFixed64Field(buffer, offset, SampleField.timestampsUnixNano, this.timestampsUnixNano)
    return offset
  }

  static decodeValue(data: SampleInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case SampleField.stackIndex:
        if (isVarInt(wireType)) data.stackIndex = decodeInt32(buffer, start, end)
        break
      case SampleField.attributeIndices:
        if (isPackedOrVarInt(wireType)) data.attributeIndices = pushAll(decodeInt32s(buffer, start, end), data.attributeIndices)
        break
      case SampleField.linkIndex:
        if (isVarInt(wireType)) data.linkIndex = decodeInt32(buffer, start, end)
        break
      case SampleField.values:
        if (isPackedOrVarInt(wireType)) data.values = pushAll(decodeInt64s(buffer, start, end), data.values)
        break
      case SampleField.timestampsUnixNano:
        // Packed, or one fixed64 value per element
        if (isLengthDelim(wireType)) {
          data.timestampsUnixNano = pushAll(decodeFixed64s(buffer, start, end), data.timestampsUnixNano)
        } else if (isFixed64(wireType)) {
          data.timestampsUnixNano = push(decodeFixed64(buffer, start), data.timestampsUnixNano)
        }
        break
    }
  }

  static decodeInput(buffer: Uint8Array, start = 0, end = buffer.length, into?: SampleInput): SampleInput {
    return decodeFields(buffer, this.decodeValue, start, end, into)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Sample {
    return new this(this.decodeInput(buffer, start, end))
  }
}

const enum MappingField {
  memoryStart = 1,
  memoryLimit = 2,
  fileOffset = 3,
  filenameStrindex = 4,
  attributeIndices = 5,
}

export type MappingInput = {
  memoryStart?: Numeric
  memoryLimit?: Numeric
  fileOffset?: Numeric
  filenameStrindex?: number
  attributeIndices?: Array<number>
}

export class Mapping extends Message {
  memoryStart: Numeric
  memoryLimit: Numeric
  fileOffset: Numeric
  filenameStrindex: number
  attributeIndices: Array<number>

  static create(data: MappingInput): Mapping {
    return data instanceof Mapping ? data : new Mapping(data)
  }

  constructor(data: MappingInput = {}) {
    super()
    this.memoryStart = data.memoryStart || 0
    this.memoryLimit = data.memoryLimit || 0
    this.fileOffset = data.fileOffset || 0
    this.filenameStrindex = data.filenameStrindex || 0
    this.attributeIndices = data.attributeIndices || []
  }

  _measure() {
    let total = 0
    total += measureNumberField(MappingField.memoryStart, this.memoryStart)
    total += measureNumberField(MappingField.memoryLimit, this.memoryLimit)
    total += measureNumberField(MappingField.fileOffset, this.fileOffset)
    total += measureNumberField(MappingField.filenameStrindex, this.filenameStrindex)
    total += measurePackedNumbersField(MappingField.attributeIndices, this.attributeIndices)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, MappingField.memoryStart, this.memoryStart)
    offset = encodeNumberField(buffer, offset, MappingField.memoryLimit, this.memoryLimit)
    offset = encodeNumberField(buffer, offset, MappingField.fileOffset, this.fileOffset)
    offset = encodeNumberField(buffer, offset, MappingField.filenameStrindex, this.filenameStrindex)
    offset = encodePackedNumbersField(buffer, offset, MappingField.attributeIndices, this.attributeIndices)
    return offset
  }

  static decodeValue(data: MappingInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case MappingField.memoryStart:
        if (isVarInt(wireType)) data.memoryStart = decodeNumber(buffer, start, end)
        break
      case MappingField.memoryLimit:
        if (isVarInt(wireType)) data.memoryLimit = decodeNumber(buffer, start, end)
        break
      case MappingField.fileOffset:
        if (isVarInt(wireType)) data.fileOffset = decodeNumber(buffer, start, end)
        break
      case MappingField.filenameStrindex:
        if (isVarInt(wireType)) data.filenameStrindex = decodeInt32(buffer, start, end)
        break
      case MappingField.attributeIndices:
        if (isPackedOrVarInt(wireType)) data.attributeIndices = pushAll(decodeInt32s(buffer, start, end), data.attributeIndices)
        break
    }
  }

  static decodeInput(buffer: Uint8Array, start = 0, end = buffer.length, into?: MappingInput): MappingInput {
    return decodeFields(buffer, this.decodeValue, start, end, into)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Mapping {
    return new this(this.decodeInput(buffer, start, end))
  }
}

const enum StackField {
  locationIndices = 1,
}

export type StackInput = {
  locationIndices?: Array<number>
}

export class Stack extends Message {
  locationIndices: Array<number>

  static create(data: StackInput): Stack {
    return data instanceof Stack ? data : new Stack(data)
  }

  constructor(data: StackInput = {}) {
    super()
    this.locationIndices = data.locationIndices || []
  }

  _measure() {
    return measurePackedNumbersField(StackField.locationIndices, this.locationIndices)
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    return encodePackedNumbersField(buffer, offset, StackField.locationIndices, this.locationIndices)
  }

  static decodeValue(data: StackInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case StackField.locationIndices:
        if (isPackedOrVarInt(wireType)) data.locationIndices = pushAll(decodeInt32s(buffer, start, end), data.locationIndices)
        break
    }
  }

  static decodeInput(buffer: Uint8Array, start = 0, end = buffer.length, into?: StackInput): StackInput {
    return decodeFields(buffer, this.decodeValue, start, end, into)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Stack {
    return new this(this.decodeInput(buffer, start, end))
  }
}

const enum LocationField {
  mappingIndex = 1,
  address = 2,
  lines = 3,
  attributeIndices = 4,
}

export type LocationInput = {
  mappingIndex?: number
  address?: Numeric
  lines?: Array<LineInput>
  attributeIndices?: Array<number>
}

export class Location extends Message {
  mappingIndex: number
  address: Numeric
  lines: Array<Line>
  attributeIndices: Array<number>

  static create(data: LocationInput): Location {
    return data instanceof Location ? data : new Location(data)
  }

  constructor(data: LocationInput = {}) {
    super()
    this.mappingIndex = data.mappingIndex || 0
    this.address = data.address || 0
    this.lines = (data.lines || []).map(Line.create)
    this.attributeIndices = data.attributeIndices || []
  }

  _measure(context: EncodeContext) {
    let total = 0
    total += measureNumberField(LocationField.mappingIndex, this.mappingIndex)
    total += measureNumberField(LocationField.address, this.address)
    total += measureMessageArrayField(LocationField.lines, this.lines, context)
    total += measurePackedNumbersField(LocationField.attributeIndices, this.attributeIndices)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset: number, context: EncodeContext): number {
    offset = encodeNumberField(buffer, offset, LocationField.mappingIndex, this.mappingIndex)
    offset = encodeNumberField(buffer, offset, LocationField.address, this.address)
    offset = encodeMessageArrayField(buffer, offset, LocationField.lines, this.lines, context)
    offset = encodePackedNumbersField(buffer, offset, LocationField.attributeIndices, this.attributeIndices)
    return offset
  }

  static decodeValue(data: LocationInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case LocationField.mappingIndex:
        if (isVarInt(wireType)) data.mappingIndex = decodeInt32(buffer, start, end)
        break
      case LocationField.address:
        if (isVarInt(wireType)) data.address = decodeNumber(buffer, start, end)
        break
      case LocationField.lines:
        if (isLengthDelim(wireType)) data.lines = push(Line.decodeInput(buffer, start, end), data.lines)
        break
      case LocationField.attributeIndices:
        if (isPackedOrVarInt(wireType)) data.attributeIndices = pushAll(decodeInt32s(buffer, start, end), data.attributeIndices)
        break
    }
  }

  static decodeInput(buffer: Uint8Array, start = 0, end = buffer.length, into?: LocationInput): LocationInput {
    return decodeFields(buffer, this.decodeValue, start, end, into)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Location {
    return new this(this.decodeInput(buffer, start, end))
  }
}

const enum LineField {
  functionIndex = 1,
  line = 2,
  column = 3,
}

export type LineInput = {
  functionIndex?: number
  line?: Numeric
  column?: Numeric
}

export class Line extends Message {
  functionIndex: number
  line: Numeric
  column: Numeric

  static create(data: LineInput): Line {
    return data instanceof Line ? data : new Line(data)
  }

  constructor(data: LineInput = {}) {
    super()
    this.functionIndex = data.functionIndex || 0
    this.line = data.line || 0
    this.column = data.column || 0
  }

  _measure() {
    let total = 0
    total += measureNumberField(LineField.functionIndex, this.functionIndex)
    total += measureNumberField(LineField.line, this.line)
    total += measureNumberField(LineField.column, this.column)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, LineField.functionIndex, this.functionIndex)
    offset = encodeNumberField(buffer, offset, LineField.line, this.line)
    offset = encodeNumberField(buffer, offset, LineField.column, this.column)
    return offset
  }

  static decodeValue(data: LineInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case LineField.functionIndex:
        if (isVarInt(wireType)) data.functionIndex = decodeInt32(buffer, start, end)
        break
      case LineField.line:
        if (isVarInt(wireType)) data.line = decodeInt64(buffer, start, end)
        break
      case LineField.column:
        if (isVarInt(wireType)) data.column = decodeInt64(buffer, start, end)
        break
    }
  }

  static decodeInput(buffer: Uint8Array, start = 0, end = buffer.length, into?: LineInput): LineInput {
    return decodeFields(buffer, this.decodeValue, start, end, into)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Line {
    return new this(this.decodeInput(buffer, start, end))
  }
}

const enum FunctionField {
  nameStrindex = 1,
  systemNameStrindex = 2,
  filenameStrindex = 3,
  startLine = 4,
}

export type FunctionInput = {
  nameStrindex?: number
  systemNameStrindex?: number
  filenameStrindex?: number
  startLine?: Numeric
}

export class Function extends Message {
  nameStrindex: number
  systemNameStrindex: number
  filenameStrindex: number
  startLine: Numeric

  static create(data: FunctionInput): Function {
    return data instanceof Function ? data : new Function(data)
  }

  constructor(data: FunctionInput = {}) {
    super()
    this.nameStrindex = data.nameStrindex || 0
    this.systemNameStrindex = data.systemNameStrindex || 0
    this.filenameStrindex = data.filenameStrindex || 0
    this.startLine = data.startLine || 0
  }

  _measure() {
    let total = 0
    total += measureNumberField(FunctionField.nameStrindex, this.nameStrindex)
    total += measureNumberField(FunctionField.systemNameStrindex, this.systemNameStrindex)
    total += measureNumberField(FunctionField.filenameStrindex, this.filenameStrindex)
    total += measureNumberField(FunctionField.startLine, this.startLine)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, FunctionField.nameStrindex, this.nameStrindex)
    offset = encodeNumberField(buffer, offset, FunctionField.systemNameStrindex, this.systemNameStrindex)
    offset = encodeNumberField(buffer, offset, FunctionField.filenameStrindex, this.filenameStrindex)
    offset = encodeNumberField(buffer, offset, FunctionField.startLine, this.startLine)
    return offset
  }

  static decodeValue(data: FunctionInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case FunctionField.nameStrindex:
        if (isVarInt(wireType)) data.nameStrindex = decodeInt32(buffer, start, end)
        break
      case FunctionField.systemNameStrindex:
        if (isVarInt(wireType)) data.systemNameStrindex = decodeInt32(buffer, start, end)
        break
      case FunctionField.filenameStrindex:
        if (isVarInt(wireType)) data.filenameStrindex = decodeInt32(buffer, start, end)
        break
      case FunctionField.startLine:
        if (isVarInt(wireType)) data.startLine = decodeInt64(buffer, start, end)
        break
    }
  }

  static decodeInput(buffer: Uint8Array, start = 0, end = buffer.length, into?: FunctionInput): FunctionInput {
    return decodeFields(buffer, this.decodeValue, start, end, into)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): Function {
    return new this(this.decodeInput(buffer, start, end))
  }
}

const enum KeyValueAndUnitField {
  keyStrindex = 1,
  value = 2,
  unitStrindex = 3,
}

export type KeyValueAndUnitInput = {
  keyStrindex?: number
  value?: AnyValueInput
  unitStrindex?: number
}

export class KeyValueAndUnit extends Message {
  keyStrindex: number
  value?: AnyValue
  unitStrindex: number

  static create(data: KeyValueAndUnitInput): KeyValueAndUnit {
    return data instanceof KeyValueAndUnit ? data : new KeyValueAndUnit(data)
  }

  constructor(data: KeyValueAndUnitInput = {}) {
    super()
    this.keyStrindex = data.keyStrindex || 0
    this.value = data.value && AnyValue.create(data.value)
    this.unitStrindex = data.unitStrindex || 0
  }

  _measure(context: EncodeContext) {
    let total = 0
    total += measureNumberField(KeyValueAndUnitField.keyStrindex, this.keyStrindex)
    total += measureMessageField(KeyValueAndUnitField.value, this.value, context)
    total += measureNumberField(KeyValueAndUnitField.unitStrindex, this.unitStrindex)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset: number, context: EncodeContext): number {
    offset = encodeNumberField(buffer, offset, KeyValueAndUnitField.keyStrindex, this.keyStrindex)
    offset = encodeMessageField(buffer, offset, KeyValueAndUnitField.value, this.value, context)
    offset = encodeNumberField(buffer, offset, KeyValueAndUnitField.unitStrindex, this.unitStrindex)
    return offset
  }

  static decodeValue(data: KeyValueAndUnitInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case KeyValueAndUnitField.keyStrindex:
        if (isVarInt(wireType)) data.keyStrindex = decodeInt32(buffer, start, end)
        break
      case KeyValueAndUnitField.value:
        if (isLengthDelim(wireType)) data.value = AnyValue.decodeInput(buffer, start, end, data.value)
        break
      case KeyValueAndUnitField.unitStrindex:
        if (isVarInt(wireType)) data.unitStrindex = decodeInt32(buffer, start, end)
        break
    }
  }

  static decodeInput(buffer: Uint8Array, start = 0, end = buffer.length, into?: KeyValueAndUnitInput): KeyValueAndUnitInput {
    return decodeFields(buffer, this.decodeValue, start, end, into)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): KeyValueAndUnit {
    return new this(this.decodeInput(buffer, start, end))
  }
}

/*
 * opentelemetry/proto/collector/profiles/v1development/profiles_service.proto
 */

export type ExportProfilesServiceRequestInput = ProfilesDataInput

/** OTLP profiles export body for gRPC or HTTP POST; same wire format as ProfilesData. */
export class ExportProfilesServiceRequest extends ProfilesData {
  static create(data: ExportProfilesServiceRequestInput): ExportProfilesServiceRequest {
    return data instanceof ExportProfilesServiceRequest ? data : new ExportProfilesServiceRequest(data)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): ExportProfilesServiceRequest {
    return new this(this.decodeInput(buffer, start, end))
  }
}

const enum ExportProfilesServiceResponseField {
  partialSuccess = 1,
}

export type ExportProfilesServiceResponseInput = {
  partialSuccess?: ExportProfilesPartialSuccessInput
}

export class ExportProfilesServiceResponse extends Message {
  partialSuccess?: ExportProfilesPartialSuccess

  static create(data: ExportProfilesServiceResponseInput): ExportProfilesServiceResponse {
    return data instanceof ExportProfilesServiceResponse ? data : new ExportProfilesServiceResponse(data)
  }

  constructor(data: ExportProfilesServiceResponseInput = {}) {
    super()
    this.partialSuccess = data.partialSuccess && ExportProfilesPartialSuccess.create(data.partialSuccess)
  }

  _measure(context: EncodeContext) {
    return measureMessageField(ExportProfilesServiceResponseField.partialSuccess, this.partialSuccess, context)
  }

  _encodeToBuffer(buffer: Uint8Array, offset: number, context: EncodeContext): number {
    return encodeMessageField(buffer, offset, ExportProfilesServiceResponseField.partialSuccess, this.partialSuccess, context)
  }

  static decodeValue(data: ExportProfilesServiceResponseInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case ExportProfilesServiceResponseField.partialSuccess:
        if (isLengthDelim(wireType)) data.partialSuccess = ExportProfilesPartialSuccess.decodeInput(buffer, start, end, data.partialSuccess)
        break
    }
  }

  static decodeInput(buffer: Uint8Array, start = 0, end = buffer.length, into?: ExportProfilesServiceResponseInput): ExportProfilesServiceResponseInput {
    return decodeFields(buffer, this.decodeValue, start, end, into)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): ExportProfilesServiceResponse {
    return new this(this.decodeInput(buffer, start, end))
  }
}

const enum ExportProfilesPartialSuccessField {
  rejectedProfiles = 1,
  errorMessage = 2,
}

export type ExportProfilesPartialSuccessInput = {
  rejectedProfiles?: Numeric
  errorMessage?: string
}

export class ExportProfilesPartialSuccess extends Message {
  rejectedProfiles: Numeric
  errorMessage: string

  static create(data: ExportProfilesPartialSuccessInput): ExportProfilesPartialSuccess {
    return data instanceof ExportProfilesPartialSuccess ? data : new ExportProfilesPartialSuccess(data)
  }

  constructor(data: ExportProfilesPartialSuccessInput = {}) {
    super()
    this.rejectedProfiles = data.rejectedProfiles || 0
    this.errorMessage = data.errorMessage || ''
  }

  _measure() {
    let total = 0
    total += measureNumberField(ExportProfilesPartialSuccessField.rejectedProfiles, this.rejectedProfiles)
    total += measureStringField(ExportProfilesPartialSuccessField.errorMessage, this.errorMessage)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, ExportProfilesPartialSuccessField.rejectedProfiles, this.rejectedProfiles)
    offset = encodeStringField(buffer, offset, ExportProfilesPartialSuccessField.errorMessage, this.errorMessage)
    return offset
  }

  static decodeValue(data: ExportProfilesPartialSuccessInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case ExportProfilesPartialSuccessField.rejectedProfiles:
        if (isVarInt(wireType)) data.rejectedProfiles = decodeInt64(buffer, start, end)
        break
      case ExportProfilesPartialSuccessField.errorMessage:
        if (isLengthDelim(wireType)) data.errorMessage = decodeString(buffer, start, end)
        break
    }
  }

  static decodeInput(buffer: Uint8Array, start = 0, end = buffer.length, into?: ExportProfilesPartialSuccessInput): ExportProfilesPartialSuccessInput {
    return decodeFields(buffer, this.decodeValue, start, end, into)
  }

  static decode(buffer: Uint8Array, start = 0, end = buffer.length): ExportProfilesPartialSuccess {
    return new this(this.decodeInput(buffer, start, end))
  }
}
