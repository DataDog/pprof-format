/**
 * Unless explicitly stated otherwise all files in this repository are licensed under the MIT License.
 *
 * This product includes software developed at Datadog (https://www.datadoghq.com/  Copyright 2026 Datadog, Inc.
 */

/* Internal protobuf wire-format helpers shared by the codecs. */

const lowMaxBig = 2n ** 32n - 1n
const lowMax = 2 ** 32 - 1
const lowMaxPlus1 = lowMax + 1
// Largest high 32 bits of a 64-bit integer that still fits in a safe integer.
const safeHighMax = 2 ** 21 - 1

export type Numeric = number | bigint

export const kTypeVarInt = 0
export const kTypeFixed64 = 1
export const kTypeLengthDelim = 2
export const kTypeFixed32 = 5

// Prefer Buffer.from for speed; use TextEncoder in browsers.
export const toUtf8 = typeof Buffer === 'undefined'
  ? (value: string) => new TextEncoder().encode(value)
  : (value: string) => Buffer.from(value, 'utf8')

/* Private helpers. */

function decodeBigNumber(buffer: Uint8Array, start = 0): bigint {
  if (start >= buffer.length) return BigInt(0)
  // The low 4 bytes hold 28 bits and the rest at most 42, so both fit in a
  // Number exactly
  let lo = 0
  let hi = 0
  let fac = 1
  let i = 0
  let byte
  do {
    byte = buffer[start + i]
    if (i < 4) {
      lo |= (byte & 0b01111111) << (7 * i)
    } else {
      hi += (byte & 0b01111111) * fac
      fac *= 128
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

/* Message helpers. */

// Decodes the varint spanning buffer[start..end)
export function decodeNumber(buffer: Uint8Array, start = 0, end = buffer.length): Numeric {
  if (end - start > 4) return decodeBigNumber(buffer, start)
  return decodeSmallNumber(buffer, start, end)
}

export function decodeNumbers(buffer: Uint8Array, from = 0, to = buffer.length): Array<Numeric> {
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

/** Decodes a little-endian uint64 as a number if safe, or a bigint otherwise. */
export function decodeFixed64(buffer: Uint8Array, start = 0): Numeric {
  const lo = (buffer[start] | buffer[start + 1] << 8 | buffer[start + 2] << 16 | buffer[start + 3] << 24) >>> 0
  const hi = (buffer[start + 4] | buffer[start + 5] << 8 | buffer[start + 6] << 16 | buffer[start + 7] << 24) >>> 0
  return hi <= safeHighMax
    ? hi * lowMaxPlus1 + lo
    : BigInt(hi) << 32n | BigInt(lo)
}

export function decodeFixed64s(buffer: Uint8Array, from = 0, to = buffer.length): Array<Numeric> {
  const values = []
  for (let i = from; i + 8 <= to; i += 8) {
    values.push(decodeFixed64(buffer, i))
  }
  return values
}

export function decodeDouble(buffer: Uint8Array, start = 0): number {
  return new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength).getFloat64(start, true)
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
 * Submessage lengths for one encode, recorded in length-prefix order and read
 * back sequentially to avoid remeasuring. No state is stored on the messages.
 */
export type EncodeContext = {
  lengths: number[]
  cursor: number
}

export function newEncodeContext(): EncodeContext {
  return { lengths: [], cursor: 0 }
}

let currentContext: EncodeContext | undefined

/**
 * Runs `fn` in this context, then restores the previous one. Async encodes must
 * restore their context on each resume, since other encodes may run between yields.
 */
export function withEncodeContext<R>(context: EncodeContext, fn: () => R): R {
  const previous = currentContext
  currentContext = context
  try {
    return fn()
  } finally {
    currentContext = previous
  }
}

/**
 * Measures before encoding and records submessage lengths in an EncodeContext.
 * Do not mutate the message until encoding completes.
 */
export abstract class Message {
  /** The encoded length of the message in bytes. */
  get length(): number {
    return this._measure()
  }

  /** Recorded length during encoding; measured on demand otherwise. */
  get _recordedLength(): number {
    const context = currentContext
    return context === undefined ? this._measure() : context.lengths[context.cursor++]
  }

  abstract _measure(): number

  abstract _encodeToBuffer(buffer: Uint8Array, offset: number): number

  /** Encodes into the given buffer or a new one. Throws RangeError if too small. */
  encode(buffer?: Uint8Array): Uint8Array {
    return withEncodeContext(newEncodeContext(), () => {
      const length = this._measure()
      const target = prepareBuffer(buffer, length)
      verifyEncodedLength(this._encodeToBuffer(target, 0), length)
      return target
    })
  }
}

/** Allocates a buffer if needed; throws RangeError if the given one is too small. */
export function prepareBuffer(buffer: Uint8Array | undefined, length: number): Uint8Array {
  if (buffer === undefined) return new Uint8Array(length)
  if (buffer.length < length) {
    throw new RangeError(`Buffer of ${buffer.length} bytes is too small for a message of ${length} bytes`)
  }
  return buffer
}

/**
 * Rejects length mismatches caused by a codec bug or mutation during encoding.
 */
export function verifyEncodedLength(end: number, length: number) {
  if (end !== length) {
    throw new Error(`Encoded ${end} bytes but measured ${length}`)
  }
}

/*
 * Field helpers take a field number and omit default values. Message fields
 * are omitted only if undefined.
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

// Only +0 is the default value of a double field; -0 and NaN are encoded.
export function measureDoubleField(field: number, value: number): number {
  return Object.is(value, 0) ? 0 : measureTag(field) + 8
}

export function encodeDoubleField(buffer: Uint8Array, offset: number, field: number, value: number): number {
  if (Object.is(value, 0)) return offset
  offset = encodeTag(buffer, offset, field, kTypeFixed64)
  new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength).setFloat64(offset, value, true)
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

/** Measures a string field from its UTF-8 bytes. */
export function measureStringField(field: number, utf8: Uint8Array): number {
  return measureBytesField(field, utf8)
}

export function encodeStringField(buffer: Uint8Array, offset: number, field: number, utf8: Uint8Array): number {
  return encodeBytesField(buffer, offset, field, utf8)
}

export function measureMessageField(field: number, message: Message | undefined): number {
  if (message === undefined) return 0
  const context = currentContext
  let length
  if (context === undefined) {
    length = message._measure()
  } else {
    // Reserve the parent's slot first to match length-prefix order.
    const slot = context.lengths.push(0) - 1
    length = message._measure()
    context.lengths[slot] = length
  }
  return measureTag(field) + (measureNumber(length) || 1) + length
}

export function encodeMessageField(buffer: Uint8Array, offset: number, field: number, message: Message | undefined): number {
  if (message === undefined) return offset
  offset = encodeTag(buffer, offset, field, kTypeLengthDelim)
  offset = encodeNumber(buffer, offset, message._recordedLength)
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

/*
 * Skip mismatched wire types like unknown fields. Accept undefined for callers
 * that omit the optional wire type when calling decodeValue directly.
 */

export function isVarInt(wireType: number | undefined): boolean {
  return wireType === undefined || wireType === kTypeVarInt
}

export function isLengthDelim(wireType: number | undefined): boolean {
  return wireType === undefined || wireType === kTypeLengthDelim
}

/** Accepts both packed and unpacked varints for repeated fields. */
export function isPackedOrVarInt(wireType: number | undefined): boolean {
  return isVarInt(wireType) || wireType === kTypeLengthDelim
}

/**
 * Decodes buffer[from..to), passing each field's number, value range and wire
 * type to the decoder. Ranges exclude length prefixes and are capped at `to`.
 */
export function decodeFields<T>(
  buffer: Uint8Array,
  decoder: (data: T, field: number, buffer: Uint8Array, start: number, end: number, wireType: number) => void,
  from = 0,
  to = buffer.length
): T {
  const data = {} as T
  let index = from

  while (index < to) {
    let tagValue = buffer[index++]
    if (tagValue >= 0b10000000) {
      // Tags of fields 16 and above span multiple bytes
      tagValue &= 0b01111111
      let byte
      let fac = 128
      do {
        byte = buffer[index++]
        tagValue += (byte & 0b01111111) * fac
        fac *= 128
      } while (byte >= 0b10000000 && index < to)
    }
    const field = tagValue < 0x80000000 ? tagValue >>> 3 : Math.floor(tagValue / 8)
    const mode = tagValue & 0b111

    let start = index
    let end = index
    switch (mode) {
      case kTypeVarInt:
        while (end < to && buffer[end++] >= 0b10000000);
        break
      case kTypeFixed64:
        end = Math.min(index + 8, to)
        break
      case kTypeLengthDelim: {
        while (start < to && buffer[start++] >= 0b10000000);
        const size = start - index > 4
          ? Number(decodeBigNumber(buffer, index))
          : decodeSmallNumber(buffer, index, start)
        end = Math.min(start + size, to)
        break
      }
      case kTypeFixed32:
        end = Math.min(index + 4, to)
        break
      default:
        throw new Error(`Unrecognized value type: ${mode}`)
    }

    decoder(data, field, buffer, start, end, mode)
    index = end
  }

  return data
}
