/**
 * Unless explicitly stated otherwise all files in this repository are licensed under the MIT License.
 *
 * This product includes software developed at Datadog (https://www.datadoghq.com/  Copyright 2026 Datadog, Inc.
 */

import {
  decodeString,
  encodeNumber,
  encodeTag,
  kTypeLengthDelim,
  measureTag,
  prepareBuffer,
  toUtf8,
  utf8Length,
  varintLength,
} from './protobuf.js'

export const emptyTableToken = Symbol()

// pprof's Profile.string_table, which the table's own encode() produces
const pprofStringTableField = 6

// A string's length prefix and UTF-8 bytes, which don't depend on the field
function encodeLengthDelimited(utf8: Uint8Array | Buffer): Uint8Array {
  const buffer = new Uint8Array(varintLength(utf8.length) + utf8.length)
  const offset = encodeNumber(buffer, 0, utf8.length)
  if (utf8.length > 0) {
    buffer.set(utf8, offset)
  }
  return buffer
}

const utf8ByteLength = typeof Buffer === 'undefined'
  ? utf8Length
  : (value: string) => Buffer.byteLength(value, 'utf8')

// Writes a string's UTF-8 bytes into `buffer` at `offset`
function utf8Writer(buffer: Uint8Array): (value: string, offset: number, length: number) => void {
  if (typeof Buffer === 'undefined') {
    const encoder = new TextEncoder()
    return (value, offset, length) => { encoder.encodeInto(value, buffer.subarray(offset, offset + length)) }
  }
  const view = Buffer.from(buffer.buffer, buffer.byteOffset, buffer.byteLength)
  return (value, offset, length) => { view.write(value, offset, length, 'utf8') }
}

/**
 * The strings of a profile. A string's UTF-8 bytes are written straight into
 * the output when the table is encoded, so adding a string allocates no
 * buffer. The enclosing message supplies the field number when it encodes the
 * table, so one table type serves both pprof and OTel.
 */
export class StringTable {
  strings = new Array<string>()
  #byteLengths = new Array<number>()
  #entries = new Array<string | Uint8Array>()
  #positions = new Map<string, number>()
  #encodedLength = 0

  /** @param tok - emptyTableToken omits the initial empty string. */
  constructor(tok?: typeof emptyTableToken) {
    if (tok !== emptyTableToken) {
      this.dedup('')
    }
  }

  /** The encoded length of the strings as pprof's string_table. */
  get encodedLength(): number {
    return this._measure(pprofStringTableField)
  }

  /** Measures the strings as the repeated string field `field`. */
  _measure(field: number): number {
    return this.#byteLengths.length * measureTag(field) + this.#encodedLength
  }

  /** Encodes the strings as the repeated string field `field`. */
  _encodeToBuffer(buffer: Uint8Array, offset: number, field: number): number {
    const writeUtf8 = utf8Writer(buffer)
    for (let i = 0; i < this.#byteLengths.length; i++) {
      const byteLength = this.#byteLengths[i]
      offset = encodeTag(buffer, offset, field, kTypeLengthDelim)
      offset = encodeNumber(buffer, offset, byteLength)
      const entry = this.#entries[i]
      if (typeof entry !== 'string') {
        buffer.set(entry, offset)
      } else if (byteLength > 0) {
        writeUtf8(entry, offset, byteLength)
      }
      offset += byteLength
    }
    return offset
  }

  /** Encodes the strings as pprof's string_table. */
  encode(buffer?: Uint8Array): Uint8Array {
    buffer = prepareBuffer(buffer, this.encodedLength)
    this._encodeToBuffer(buffer, 0, pprofStringTableField)
    return buffer
  }

  /** Encodes one pprof string_table entry, including its tag and length. */
  static _encodeStringFromUtf8(stringBuffer: Uint8Array | Buffer): Uint8Array {
    const entry = encodeLengthDelimited(stringBuffer)
    const buffer = new Uint8Array(measureTag(pprofStringTableField) + entry.length)
    buffer.set(entry, encodeTag(buffer, 0, pprofStringTableField, kTypeLengthDelim))
    return buffer
  }

  static _encodeString(string: string): Uint8Array {
    return StringTable._encodeStringFromUtf8(toUtf8(string))
  }

  dedup(value: string): number {
    if (typeof value === 'number') return value
    let position = this.#positions.get(value)
    if (position === undefined) {
      position = this.#add(value, utf8ByteLength(value))
    }
    return position
  }

  _decodeString(buffer: Uint8Array) {
    const bytes = buffer.length <= 64 || typeof Buffer === 'undefined'
      ? new Uint8Array(buffer)
      : Buffer.from(buffer)
    this.#add(decodeString(bytes), bytes.length, bytes)
  }

  #add(value: string, byteLength: number, entry: string | Uint8Array = value): number {
    const position = this.#entries.length
    this.strings.push(value)
    this.#positions.set(value, position)
    this.#byteLengths.push(byteLength)
    this.#entries.push(entry)
    this.#encodedLength += varintLength(byteLength) + byteLength
    return position
  }
}
