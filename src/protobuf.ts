/**
 * Unless explicitly stated otherwise all files in this repository are licensed under the MIT License.
 *
 * This product includes software developed at Datadog (https://www.datadoghq.com/  Copyright 2022 Datadog, Inc.
 */

/*!
 * Protocol buffer wire format helpers, shared by the message types of the
 * formats implemented in this package. Internal to the package.
 */

const lowMaxBig = 2n ** 32n - 1n
const lowMax = 2 ** 32 - 1
const lowMaxPlus1 = lowMax + 1
// Largest high 32 bits of a 64-bit integer that still fits in a safe integer.
const safeHighMax = 2 ** 21 - 1

export type Numeric = number | bigint

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

export const kTypeVarInt = 0
export const kTypeFixed64 = 1
export const kTypeLengthDelim = 2
export const kTypeFixed32 = 5

// Buffer.from(string, 'utf8') is faster, when available. Browsers have no
// Buffer, and use TextEncoder instead.
export const toUtf8 = typeof Buffer === 'undefined'
  ? (value: string) => new TextEncoder().encode(value)
  : (value: string) => Buffer.from(value, 'utf8')

/*!
 * Private helpers. These are only used by other helpers.
 */

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
          return makeValue(buffer.subarray(0, i + 1))
        }
      }
      return makeValue(buffer)
    case kTypeFixed64:
      return makeValue(buffer.subarray(0, 8))
    case kTypeLengthDelim: {
      const offset = countNumberBytes(buffer)
      const size = decodeNumber(buffer)
      return makeValue(buffer.subarray(offset, Number(size) + offset), offset)
    }
    case kTypeFixed32:
      return makeValue(buffer.subarray(0, 4))
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

function tag(field: number, wireType: number): number {
  return field * 8 + wireType
}

function measureTag(field: number): number {
  // Tags of fields 1 to 15 fit in one byte
  return field < 16 ? 1 : measureNumber(tag(field, 0))
}

function encodeTag(buffer: Uint8Array, offset: number, field: number, wireType: number): number {
  if (field < 16) {
    buffer[offset++] = tag(field, wireType)
    return offset
  }
  return encodeNumber(buffer, offset, tag(field, wireType))
}

/*!
 * Public helpers. These are used in the type definitions.
 */

export function decodeNumber(buffer: Uint8Array): Numeric {
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

export function decodeNumbers(buffer: Uint8Array): Array<Numeric> {
  const values = []
  let start = 0

  for (let i = 0; i < buffer.length; i++) {
    if ((buffer[i] & 0b10000000) === 0) {
      values.push(decodeNumber(buffer.subarray(start, i + 1)))
      start = i + 1
    }
  }

  return values
}

/**
 * Decodes a little-endian 64-bit integer. Returns a number when it is a safe
 * integer, and a bigint otherwise.
 */
export function decodeFixed64(buffer: Uint8Array): Numeric {
  const lo = (buffer[0] | buffer[1] << 8 | buffer[2] << 16 | buffer[3] << 24) >>> 0
  const hi = (buffer[4] | buffer[5] << 8 | buffer[6] << 16 | buffer[7] << 24) >>> 0
  return hi <= safeHighMax
    ? hi * lowMaxPlus1 + lo
    : BigInt(hi) << 32n | BigInt(lo)
}

export function decodeFixed64s(buffer: Uint8Array): Array<Numeric> {
  const values = []
  for (let i = 0; i + 8 <= buffer.length; i += 8) {
    values.push(decodeFixed64(buffer.subarray(i, i + 8)))
  }
  return values
}

export function decodeDouble(buffer: Uint8Array): number {
  return new DataView(buffer.buffer, buffer.byteOffset, 8).getFloat64(0, true)
}

export function push<T>(value: T, list?: Array<T>): Array<T> {
  if (list == null) {
    return [value]
  }
  list.push(value)
  return list
}

export function pushAll<T>(values: Array<T>, list?: Array<T>): Array<T> {
  if (list == null) {
    return values
  }
  for (const value of values) {
    list.push(value)
  }
  return list
}

export function measureNumber(number: Numeric): number {
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

export function encodeNumber(buffer: Uint8Array, i: number, number: Numeric): number {
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

export function encodeFixed64(buffer: Uint8Array, i: number, number: Numeric): number {
  const [hi, lo] = long(number)
  buffer[i++] = lo & 255
  buffer[i++] = lo >>> 8 & 255
  buffer[i++] = lo >>> 16 & 255
  buffer[i++] = lo >>> 24
  buffer[i++] = hi & 255
  buffer[i++] = hi >>> 8 & 255
  buffer[i++] = hi >>> 16 & 255
  buffer[i++] = hi >>> 24
  return i
}

/**
 * Base class of encodable messages.
 *
 * Reading `length` measures the message and caches the measured length of it
 * and of all its submessages, which `_encodeToBuffer` then uses for the
 * submessages' length prefixes. `encode` always measures before encoding, so
 * the cached lengths are never stale.
 */
export abstract class Message {
  #length = -1

  /** The encoded length of the message in bytes. */
  get length(): number {
    this.#length = this._measure()
    return this.#length
  }

  /** The length as of the last read of `length`. */
  get _cachedLength(): number {
    return this.#length < 0 ? this.length : this.#length
  }

  abstract _measure(): number

  abstract _encodeToBuffer(buffer: Uint8Array, offset: number): number

  encode(buffer?: Uint8Array): Uint8Array {
    const length = this.length
    buffer ??= new Uint8Array(length)
    this._encodeToBuffer(buffer, 0)
    return buffer
  }
}

/*!
 * Field helpers. Each measures or encodes one field of a message, given its
 * field number. Fields with default values (zero, false, empty) are omitted,
 * except for singular message fields, which are omitted only if undefined.
 */

export function measureNumberField(field: number, number: Numeric): number {
  const length = measureNumber(number)
  return length ? measureTag(field) + length : 0
}

export function encodeNumberField(buffer: Uint8Array, offset: number, field: number, number: Numeric): number {
  if (!number) return offset
  offset = encodeTag(buffer, offset, field, kTypeVarInt)
  return encodeNumber(buffer, offset, number)
}

export function measureBoolField(field: number, value: boolean): number {
  return value ? measureTag(field) + 1 : 0
}

export function encodeBoolField(buffer: Uint8Array, offset: number, field: number, value: boolean): number {
  if (!value) return offset
  offset = encodeTag(buffer, offset, field, kTypeVarInt)
  buffer[offset++] = 1
  return offset
}

function measurePackedNumbers(values: Numeric[]): number {
  let total = 0
  for (const value of values) {
    // Arrays should always include zeros to keep positions consistent
    total += measureNumber(value) || 1
  }
  return total
}

export function measurePackedNumbersField(field: number, values: Numeric[]): number {
  // Packed arrays are encoded as Tag,Len,ConcatenatedElements
  const total = measurePackedNumbers(values)
  return total ? measureTag(field) + measureNumber(total) + total : 0
}

export function encodePackedNumbersField(buffer: Uint8Array, offset: number, field: number, values: Numeric[]): number {
  if (!values.length) return offset
  offset = encodeTag(buffer, offset, field, kTypeLengthDelim)
  offset = encodeNumber(buffer, offset, measurePackedNumbers(values))
  for (const value of values) {
    offset = encodeNumber(buffer, offset, value)
  }
  return offset
}

export function measureFixed64Field(field: number, number: Numeric): number {
  return number ? measureTag(field) + 8 : 0
}

export function encodeFixed64Field(buffer: Uint8Array, offset: number, field: number, number: Numeric): number {
  if (!number) return offset
  offset = encodeTag(buffer, offset, field, kTypeFixed64)
  return encodeFixed64(buffer, offset, number)
}

export function measurePackedFixed64Field(field: number, values: Numeric[]): number {
  const total = values.length * 8
  return total ? measureTag(field) + measureNumber(total) + total : 0
}

export function encodePackedFixed64Field(buffer: Uint8Array, offset: number, field: number, values: Numeric[]): number {
  if (!values.length) return offset
  offset = encodeTag(buffer, offset, field, kTypeLengthDelim)
  offset = encodeNumber(buffer, offset, values.length * 8)
  for (const value of values) {
    offset = encodeFixed64(buffer, offset, value)
  }
  return offset
}

export function measureDoubleField(field: number, value: number): number {
  return value ? measureTag(field) + 8 : 0
}

export function encodeDoubleField(buffer: Uint8Array, offset: number, field: number, value: number): number {
  if (!value) return offset
  offset = encodeTag(buffer, offset, field, kTypeFixed64)
  new DataView(buffer.buffer, buffer.byteOffset + offset, 8).setFloat64(0, value, true)
  return offset + 8
}

export function measureBytesField(field: number, bytes: Uint8Array): number {
  const length = bytes.length
  return length ? measureTag(field) + measureNumber(length) + length : 0
}

export function encodeBytesField(buffer: Uint8Array, offset: number, field: number, bytes: Uint8Array): number {
  if (!bytes.length) return offset
  offset = encodeTag(buffer, offset, field, kTypeLengthDelim)
  offset = encodeNumber(buffer, offset, bytes.length)
  buffer.set(bytes, offset)
  return offset + bytes.length
}

/**
 * Measures a string field. The string must already be UTF-8 encoded.
 */
export function measureStringField(field: number, utf8: Uint8Array): number {
  return measureBytesField(field, utf8)
}

export function encodeStringField(buffer: Uint8Array, offset: number, field: number, utf8: Uint8Array): number {
  return encodeBytesField(buffer, offset, field, utf8)
}

export function measureMessageField(field: number, message: Message | undefined): number {
  if (message === undefined) return 0
  const length = message.length
  return measureTag(field) + (measureNumber(length) || 1) + length
}

export function encodeMessageField(buffer: Uint8Array, offset: number, field: number, message: Message | undefined): number {
  if (message === undefined) return offset
  offset = encodeTag(buffer, offset, field, kTypeLengthDelim)
  offset = encodeNumber(buffer, offset, message._cachedLength)
  return message._encodeToBuffer(buffer, offset)
}

export function measureMessageArrayField(field: number, messages: Message[]): number {
  let total = 0
  for (const message of messages) {
    total += measureMessageField(field, message)
  }
  return total
}

export function encodeMessageArrayField(buffer: Uint8Array, offset: number, field: number, messages: Message[]): number {
  for (const message of messages) {
    offset = encodeMessageField(buffer, offset, field, message)
  }
  return offset
}

/**
 * Decodes the fields of a message, passing each field's number, value and
 * wire type to the decoder. A varint or length-delimited value is passed as
 * its encoded bytes (without the length prefix), a fixed64 or fixed32 value as
 * its 8 or 4 bytes.
 */
export function decodeFields<T>(
  buffer: Uint8Array,
  decoder: (data: any, field: number, value: Uint8Array, wireType: number) => void
): DeepPartial<T> {
  const data: any = {}
  let index = 0

  while (index < buffer.length) {
    let byte = buffer[index++]
    let tagValue = byte & 0b01111111
    for (let shift = 7; byte >= 0b10000000; shift += 7) {
      byte = buffer[index++]
      tagValue += (byte & 0b01111111) * 2 ** shift
    }
    const field = Math.floor(tagValue / 8)
    const mode = tagValue & 0b111

    const { offset, value } = getValue(mode, buffer.subarray(index))
    index += value.length + offset

    decoder(data, field, value, mode)
  }

  return data
}
