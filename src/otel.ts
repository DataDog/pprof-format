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
  push,
  pushAll,
  toSigned,
} from './protobuf.js'
import { StringTable as BaseStringTable, emptyTableToken } from './string-table.js'

export { emptyTableToken }

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

/** Dictionary string table, with the required empty string at index 0. */
export class StringTable extends BaseStringTable {
  constructor(tok?: typeof emptyTableToken) {
    super(tok, 5)
  }
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

  _measure() {
    if (this.stringValue !== undefined) return measureStringField(1, this.stringValue, true)
    if (this.boolValue !== undefined) return measureBoolField(2, this.boolValue, true)
    if (this.intValue !== undefined) return measureNumberField(3, this.intValue, true)
    if (this.doubleValue !== undefined) return measureDoubleField(4, this.doubleValue, true)
    if (this.arrayValue !== undefined) return measureMessageField(5, this.arrayValue)
    if (this.kvlistValue !== undefined) return measureMessageField(6, this.kvlistValue)
    if (this.bytesValue !== undefined) return measureBytesField(7, this.bytesValue, true)
    if (this.stringValueStrindex !== undefined) return measureNumberField(8, this.stringValueStrindex, true)
    return 0
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    if (this.stringValue !== undefined) return encodeStringField(buffer, offset, 1, this.stringValue, true)
    if (this.boolValue !== undefined) return encodeBoolField(buffer, offset, 2, this.boolValue, true)
    if (this.intValue !== undefined) return encodeNumberField(buffer, offset, 3, this.intValue, true)
    if (this.doubleValue !== undefined) return encodeDoubleField(buffer, offset, 4, this.doubleValue, true)
    if (this.arrayValue !== undefined) return encodeMessageField(buffer, offset, 5, this.arrayValue)
    if (this.kvlistValue !== undefined) return encodeMessageField(buffer, offset, 6, this.kvlistValue)
    if (this.bytesValue !== undefined) return encodeBytesField(buffer, offset, 7, this.bytesValue, true)
    if (this.stringValueStrindex !== undefined) {
      return encodeNumberField(buffer, offset, 8, this.stringValueStrindex, true)
    }
    return offset
  }

  static decodeValue(data: AnyValueInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isLengthDelim(wireType)) setAnyValue(data, 'stringValue', decodeString(buffer, start, end))
        break
      case 2:
        if (isVarInt(wireType)) setAnyValue(data, 'boolValue', !!decodeNumber(buffer, start, end))
        break
      case 3:
        if (isVarInt(wireType)) setAnyValue(data, 'intValue', decodeInt64(buffer, start, end))
        break
      case 4:
        if (isFixed64(wireType)) setAnyValue(data, 'doubleValue', decodeDouble(buffer, start))
        break
      case 5:
        if (isLengthDelim(wireType)) setAnyValue(data, 'arrayValue', ArrayValue.decodeInput(buffer, start, end, data.arrayValue))
        break
      case 6:
        if (isLengthDelim(wireType)) setAnyValue(data, 'kvlistValue', KeyValueList.decodeInput(buffer, start, end, data.kvlistValue))
        break
      case 7:
        if (isLengthDelim(wireType)) setAnyValue(data, 'bytesValue', decodeBytes(buffer, start, end))
        break
      case 8:
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

  _measure() {
    return measureMessageArrayField(1, this.values)
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    return encodeMessageArrayField(buffer, offset, 1, this.values)
  }

  static decodeValue(data: ArrayValueInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
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

  _measure() {
    return measureMessageArrayField(1, this.values)
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    return encodeMessageArrayField(buffer, offset, 1, this.values)
  }

  static decodeValue(data: KeyValueListInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
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

  _measure() {
    let total = 0
    total += measureStringField(1, this.key)
    total += measureMessageField(2, this.value)
    total += measureNumberField(3, this.keyStrindex)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeStringField(buffer, offset, 1, this.key)
    offset = encodeMessageField(buffer, offset, 2, this.value)
    offset = encodeNumberField(buffer, offset, 3, this.keyStrindex)
    return offset
  }

  static decodeValue(data: KeyValueInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isLengthDelim(wireType)) data.key = decodeString(buffer, start, end)
        break
      case 2:
        if (isLengthDelim(wireType)) data.value = AnyValue.decodeInput(buffer, start, end, data.value)
        break
      case 3:
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

  _measure() {
    let total = 0
    total += measureStringField(1, this.name)
    total += measureStringField(2, this.version)
    total += measureMessageArrayField(3, this.attributes)
    total += measureNumberField(4, this.droppedAttributesCount)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeStringField(buffer, offset, 1, this.name)
    offset = encodeStringField(buffer, offset, 2, this.version)
    offset = encodeMessageArrayField(buffer, offset, 3, this.attributes)
    offset = encodeNumberField(buffer, offset, 4, this.droppedAttributesCount)
    return offset
  }

  static decodeValue(data: InstrumentationScopeInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isLengthDelim(wireType)) data.name = decodeString(buffer, start, end)
        break
      case 2:
        if (isLengthDelim(wireType)) data.version = decodeString(buffer, start, end)
        break
      case 3:
        if (isLengthDelim(wireType)) data.attributes = push(KeyValue.decodeInput(buffer, start, end), data.attributes)
        break
      case 4:
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
    total += measureStringField(1, this.schemaUrl)
    total += measureStringField(2, this.type)
    total += measureStringArrayField(3, this.idKeys)
    total += measureStringArrayField(4, this.descriptionKeys)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeStringField(buffer, offset, 1, this.schemaUrl)
    offset = encodeStringField(buffer, offset, 2, this.type)
    offset = encodeStringArrayField(buffer, offset, 3, this.idKeys)
    offset = encodeStringArrayField(buffer, offset, 4, this.descriptionKeys)
    return offset
  }

  static decodeValue(data: EntityRefInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isLengthDelim(wireType)) data.schemaUrl = decodeString(buffer, start, end)
        break
      case 2:
        if (isLengthDelim(wireType)) data.type = decodeString(buffer, start, end)
        break
      case 3:
        if (isLengthDelim(wireType)) data.idKeys = push(decodeString(buffer, start, end), data.idKeys)
        break
      case 4:
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

  _measure() {
    let total = 0
    total += measureMessageArrayField(1, this.attributes)
    total += measureNumberField(2, this.droppedAttributesCount)
    total += measureMessageArrayField(3, this.entityRefs)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeMessageArrayField(buffer, offset, 1, this.attributes)
    offset = encodeNumberField(buffer, offset, 2, this.droppedAttributesCount)
    offset = encodeMessageArrayField(buffer, offset, 3, this.entityRefs)
    return offset
  }

  static decodeValue(data: ResourceInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isLengthDelim(wireType)) data.attributes = push(KeyValue.decodeInput(buffer, start, end), data.attributes)
        break
      case 2:
        if (isVarInt(wireType)) data.droppedAttributesCount = Number(decodeNumber(buffer, start, end))
        break
      case 3:
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
    if (data.stringTable !== undefined && !(data.stringTable instanceof StringTable)) {
      // pprof uses field 6 for strings; OTel uses field 5.
      throw new TypeError('ProfilesDictionary.stringTable must be a StringTable from pprof-format/otel')
    }
    this.mappingTable = data.mappingTable ? data.mappingTable.map(Mapping.create) : [new Mapping()]
    this.locationTable = data.locationTable ? data.locationTable.map(Location.create) : [new Location()]
    this.functionTable = data.functionTable ? data.functionTable.map(Function.create) : [new Function()]
    this.linkTable = data.linkTable ? data.linkTable.map(Link.create) : [new Link()]
    this.stringTable = data.stringTable || new StringTable()
    this.attributeTable = data.attributeTable ? data.attributeTable.map(KeyValueAndUnit.create) : [new KeyValueAndUnit()]
    this.stackTable = data.stackTable ? data.stackTable.map(Stack.create) : [new Stack()]
  }

  _measure() {
    let total = 0
    total += measureMessageArrayField(1, this.mappingTable)
    total += measureMessageArrayField(2, this.locationTable)
    total += measureMessageArrayField(3, this.functionTable)
    total += measureMessageArrayField(4, this.linkTable)
    total += this.stringTable.encodedLength
    total += measureMessageArrayField(6, this.attributeTable)
    total += measureMessageArrayField(7, this.stackTable)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeMessageArrayField(buffer, offset, 1, this.mappingTable)
    offset = encodeMessageArrayField(buffer, offset, 2, this.locationTable)
    offset = encodeMessageArrayField(buffer, offset, 3, this.functionTable)
    offset = encodeMessageArrayField(buffer, offset, 4, this.linkTable)
    offset = this.stringTable._encodeToBuffer(buffer, offset)
    offset = encodeMessageArrayField(buffer, offset, 6, this.attributeTable)
    offset = encodeMessageArrayField(buffer, offset, 7, this.stackTable)
    return offset
  }

  static decodeValue(data: ProfilesDictionaryInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isLengthDelim(wireType)) data.mappingTable = push(Mapping.decodeInput(buffer, start, end), data.mappingTable)
        break
      case 2:
        if (isLengthDelim(wireType)) data.locationTable = push(Location.decodeInput(buffer, start, end), data.locationTable)
        break
      case 3:
        if (isLengthDelim(wireType)) data.functionTable = push(Function.decodeInput(buffer, start, end), data.functionTable)
        break
      case 4:
        if (isLengthDelim(wireType)) data.linkTable = push(Link.decodeInput(buffer, start, end), data.linkTable)
        break
      case 5: {
        if (!isLengthDelim(wireType)) break
        if (data.stringTable === undefined) {
          data.stringTable = new StringTable(emptyTableToken)
        }
        data.stringTable._decodeString(buffer.subarray(start, end))
        break
      }
      case 6:
        if (isLengthDelim(wireType)) data.attributeTable = push(KeyValueAndUnit.decodeInput(buffer, start, end), data.attributeTable)
        break
      case 7:
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

  _measure() {
    let total = 0
    total += measureMessageArrayField(1, this.resourceProfiles)
    total += measureMessageField(2, this.dictionary)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeMessageArrayField(buffer, offset, 1, this.resourceProfiles)
    offset = encodeMessageField(buffer, offset, 2, this.dictionary)
    return offset
  }

  static decodeValue(data: ProfilesDataInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isLengthDelim(wireType)) data.resourceProfiles = push(ResourceProfiles.decodeInput(buffer, start, end), data.resourceProfiles)
        break
      case 2:
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

  _measure() {
    let total = 0
    total += measureMessageField(1, this.resource)
    total += measureMessageArrayField(2, this.scopeProfiles)
    total += measureStringField(3, this.schemaUrl)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeMessageField(buffer, offset, 1, this.resource)
    offset = encodeMessageArrayField(buffer, offset, 2, this.scopeProfiles)
    offset = encodeStringField(buffer, offset, 3, this.schemaUrl)
    return offset
  }

  static decodeValue(data: ResourceProfilesInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isLengthDelim(wireType)) data.resource = Resource.decodeInput(buffer, start, end, data.resource)
        break
      case 2:
        if (isLengthDelim(wireType)) data.scopeProfiles = push(ScopeProfiles.decodeInput(buffer, start, end), data.scopeProfiles)
        break
      case 3:
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

  _measure() {
    let total = 0
    total += measureMessageField(1, this.scope)
    total += measureMessageArrayField(2, this.profiles)
    total += measureStringField(3, this.schemaUrl)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeMessageField(buffer, offset, 1, this.scope)
    offset = encodeMessageArrayField(buffer, offset, 2, this.profiles)
    offset = encodeStringField(buffer, offset, 3, this.schemaUrl)
    return offset
  }

  static decodeValue(data: ScopeProfilesInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isLengthDelim(wireType)) data.scope = InstrumentationScope.decodeInput(buffer, start, end, data.scope)
        break
      case 2:
        if (isLengthDelim(wireType)) data.profiles = push(Profile.decodeInput(buffer, start, end), data.profiles)
        break
      case 3:
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

  _measure() {
    let total = 0
    total += measureMessageField(1, this.sampleType)
    total += measureMessageArrayField(2, this.samples)
    total += measureFixed64Field(3, this.timeUnixNano)
    total += measureNumberField(4, this.durationNano)
    total += measureMessageField(5, this.periodType)
    total += measureNumberField(6, this.period)
    total += measureBytesField(7, this.profileId)
    total += measureNumberField(8, this.droppedAttributesCount)
    total += measureStringField(9, this.originalPayloadFormat)
    total += measureBytesField(10, this.originalPayload)
    total += measurePackedNumbersField(11, this.attributeIndices)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeMessageField(buffer, offset, 1, this.sampleType)
    offset = encodeMessageArrayField(buffer, offset, 2, this.samples)
    offset = encodeFixed64Field(buffer, offset, 3, this.timeUnixNano)
    offset = encodeNumberField(buffer, offset, 4, this.durationNano)
    offset = encodeMessageField(buffer, offset, 5, this.periodType)
    offset = encodeNumberField(buffer, offset, 6, this.period)
    offset = encodeBytesField(buffer, offset, 7, this.profileId)
    offset = encodeNumberField(buffer, offset, 8, this.droppedAttributesCount)
    offset = encodeStringField(buffer, offset, 9, this.originalPayloadFormat)
    offset = encodeBytesField(buffer, offset, 10, this.originalPayload)
    offset = encodePackedNumbersField(buffer, offset, 11, this.attributeIndices)
    return offset
  }

  static decodeValue(data: ProfileInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isLengthDelim(wireType)) data.sampleType = ValueType.decodeInput(buffer, start, end, data.sampleType)
        break
      case 2:
        if (isLengthDelim(wireType)) data.samples = push(Sample.decodeInput(buffer, start, end), data.samples)
        break
      case 3:
        if (isFixed64(wireType)) data.timeUnixNano = decodeFixed64(buffer, start)
        break
      case 4:
        if (isVarInt(wireType)) data.durationNano = decodeNumber(buffer, start, end)
        break
      case 5:
        if (isLengthDelim(wireType)) data.periodType = ValueType.decodeInput(buffer, start, end, data.periodType)
        break
      case 6:
        if (isVarInt(wireType)) data.period = decodeInt64(buffer, start, end)
        break
      case 7:
        if (isLengthDelim(wireType)) data.profileId = decodeBytes(buffer, start, end)
        break
      case 8:
        if (isVarInt(wireType)) data.droppedAttributesCount = Number(decodeNumber(buffer, start, end))
        break
      case 9:
        if (isLengthDelim(wireType)) data.originalPayloadFormat = decodeString(buffer, start, end)
        break
      case 10:
        if (isLengthDelim(wireType)) data.originalPayload = decodeBytes(buffer, start, end)
        break
      case 11:
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
    total += measureBytesField(1, this.traceId)
    total += measureBytesField(2, this.spanId)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeBytesField(buffer, offset, 1, this.traceId)
    offset = encodeBytesField(buffer, offset, 2, this.spanId)
    return offset
  }

  static decodeValue(data: LinkInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isLengthDelim(wireType)) data.traceId = decodeBytes(buffer, start, end)
        break
      case 2:
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
    total += measureNumberField(1, this.typeStrindex)
    total += measureNumberField(2, this.unitStrindex)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, 1, this.typeStrindex)
    offset = encodeNumberField(buffer, offset, 2, this.unitStrindex)
    return offset
  }

  static decodeValue(data: ValueTypeInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isVarInt(wireType)) data.typeStrindex = decodeInt32(buffer, start, end)
        break
      case 2:
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
    total += measureNumberField(1, this.stackIndex)
    total += measurePackedNumbersField(2, this.attributeIndices)
    total += measureNumberField(3, this.linkIndex)
    total += measurePackedNumbersField(4, this.values)
    total += measurePackedFixed64Field(5, this.timestampsUnixNano)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, 1, this.stackIndex)
    offset = encodePackedNumbersField(buffer, offset, 2, this.attributeIndices)
    offset = encodeNumberField(buffer, offset, 3, this.linkIndex)
    offset = encodePackedNumbersField(buffer, offset, 4, this.values)
    offset = encodePackedFixed64Field(buffer, offset, 5, this.timestampsUnixNano)
    return offset
  }

  static decodeValue(data: SampleInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isVarInt(wireType)) data.stackIndex = decodeInt32(buffer, start, end)
        break
      case 2:
        if (isPackedOrVarInt(wireType)) data.attributeIndices = pushAll(decodeInt32s(buffer, start, end), data.attributeIndices)
        break
      case 3:
        if (isVarInt(wireType)) data.linkIndex = decodeInt32(buffer, start, end)
        break
      case 4:
        if (isPackedOrVarInt(wireType)) data.values = pushAll(decodeInt64s(buffer, start, end), data.values)
        break
      case 5:
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
    total += measureNumberField(1, this.memoryStart)
    total += measureNumberField(2, this.memoryLimit)
    total += measureNumberField(3, this.fileOffset)
    total += measureNumberField(4, this.filenameStrindex)
    total += measurePackedNumbersField(5, this.attributeIndices)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, 1, this.memoryStart)
    offset = encodeNumberField(buffer, offset, 2, this.memoryLimit)
    offset = encodeNumberField(buffer, offset, 3, this.fileOffset)
    offset = encodeNumberField(buffer, offset, 4, this.filenameStrindex)
    offset = encodePackedNumbersField(buffer, offset, 5, this.attributeIndices)
    return offset
  }

  static decodeValue(data: MappingInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isVarInt(wireType)) data.memoryStart = decodeNumber(buffer, start, end)
        break
      case 2:
        if (isVarInt(wireType)) data.memoryLimit = decodeNumber(buffer, start, end)
        break
      case 3:
        if (isVarInt(wireType)) data.fileOffset = decodeNumber(buffer, start, end)
        break
      case 4:
        if (isVarInt(wireType)) data.filenameStrindex = decodeInt32(buffer, start, end)
        break
      case 5:
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
    return measurePackedNumbersField(1, this.locationIndices)
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    return encodePackedNumbersField(buffer, offset, 1, this.locationIndices)
  }

  static decodeValue(data: StackInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
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

  _measure() {
    let total = 0
    total += measureNumberField(1, this.mappingIndex)
    total += measureNumberField(2, this.address)
    total += measureMessageArrayField(3, this.lines)
    total += measurePackedNumbersField(4, this.attributeIndices)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, 1, this.mappingIndex)
    offset = encodeNumberField(buffer, offset, 2, this.address)
    offset = encodeMessageArrayField(buffer, offset, 3, this.lines)
    offset = encodePackedNumbersField(buffer, offset, 4, this.attributeIndices)
    return offset
  }

  static decodeValue(data: LocationInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isVarInt(wireType)) data.mappingIndex = decodeInt32(buffer, start, end)
        break
      case 2:
        if (isVarInt(wireType)) data.address = decodeNumber(buffer, start, end)
        break
      case 3:
        if (isLengthDelim(wireType)) data.lines = push(Line.decodeInput(buffer, start, end), data.lines)
        break
      case 4:
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
    total += measureNumberField(1, this.functionIndex)
    total += measureNumberField(2, this.line)
    total += measureNumberField(3, this.column)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, 1, this.functionIndex)
    offset = encodeNumberField(buffer, offset, 2, this.line)
    offset = encodeNumberField(buffer, offset, 3, this.column)
    return offset
  }

  static decodeValue(data: LineInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isVarInt(wireType)) data.functionIndex = decodeInt32(buffer, start, end)
        break
      case 2:
        if (isVarInt(wireType)) data.line = decodeInt64(buffer, start, end)
        break
      case 3:
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
    total += measureNumberField(1, this.nameStrindex)
    total += measureNumberField(2, this.systemNameStrindex)
    total += measureNumberField(3, this.filenameStrindex)
    total += measureNumberField(4, this.startLine)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, 1, this.nameStrindex)
    offset = encodeNumberField(buffer, offset, 2, this.systemNameStrindex)
    offset = encodeNumberField(buffer, offset, 3, this.filenameStrindex)
    offset = encodeNumberField(buffer, offset, 4, this.startLine)
    return offset
  }

  static decodeValue(data: FunctionInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isVarInt(wireType)) data.nameStrindex = decodeInt32(buffer, start, end)
        break
      case 2:
        if (isVarInt(wireType)) data.systemNameStrindex = decodeInt32(buffer, start, end)
        break
      case 3:
        if (isVarInt(wireType)) data.filenameStrindex = decodeInt32(buffer, start, end)
        break
      case 4:
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

  _measure() {
    let total = 0
    total += measureNumberField(1, this.keyStrindex)
    total += measureMessageField(2, this.value)
    total += measureNumberField(3, this.unitStrindex)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, 1, this.keyStrindex)
    offset = encodeMessageField(buffer, offset, 2, this.value)
    offset = encodeNumberField(buffer, offset, 3, this.unitStrindex)
    return offset
  }

  static decodeValue(data: KeyValueAndUnitInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isVarInt(wireType)) data.keyStrindex = decodeInt32(buffer, start, end)
        break
      case 2:
        if (isLengthDelim(wireType)) data.value = AnyValue.decodeInput(buffer, start, end, data.value)
        break
      case 3:
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

  _measure() {
    return measureMessageField(1, this.partialSuccess)
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    return encodeMessageField(buffer, offset, 1, this.partialSuccess)
  }

  static decodeValue(data: ExportProfilesServiceResponseInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
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
    total += measureNumberField(1, this.rejectedProfiles)
    total += measureStringField(2, this.errorMessage)
    return total
  }

  _encodeToBuffer(buffer: Uint8Array, offset = 0): number {
    offset = encodeNumberField(buffer, offset, 1, this.rejectedProfiles)
    offset = encodeStringField(buffer, offset, 2, this.errorMessage)
    return offset
  }

  static decodeValue(data: ExportProfilesPartialSuccessInput, field: number, buffer: Uint8Array, start = 0, end = buffer.length, wireType?: number) {
    switch (field) {
      case 1:
        if (isVarInt(wireType)) data.rejectedProfiles = decodeInt64(buffer, start, end)
        break
      case 2:
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
