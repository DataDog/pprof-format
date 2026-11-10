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
  toUtf8,
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

// The UTF-8 length of a string, counting a lone surrogate as U+FFFD the way
// Buffer and TextEncoder write it
function utf8Length(value: string): number {
  let length = value.length
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i)
    if (code < 0x80) continue
    if (code < 0x800) {
      length += 1
    } else if (code >= 0xd800 && code <= 0xdbff && i + 1 < value.length &&
      (value.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
      length += 2
      i++
    } else {
      length += 2
    }
  }
  return length
}

const utf8ByteLength = typeof Buffer === 'undefined'
  ? utf8Length
  : (value: string) => Buffer.byteLength(value, 'utf8')

// Writes a string's UTF-8 bytes into `buffer` at `offset`
function utf8Writer(buffer: Uint8Array): (value: string, offset: number) => void {
  if (typeof Buffer === 'undefined') {
    const encoder = new TextEncoder()
    return (value, offset) => { encoder.encodeInto(value, buffer.subarray(offset)) }
  }
  const view = Buffer.from(buffer.buffer, buffer.byteOffset, buffer.byteLength)
  return (value, offset) => { view.write(value, offset, 'utf8') }
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
  // The bytes of strings read from a profile, which re-encoding reproduces exactly
  #decoded = new Array<Uint8Array | undefined>()
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
      const decoded = this.#decoded[i]
      if (decoded !== undefined) {
        buffer.set(decoded, offset)
      } else if (byteLength > 0) {
        writeUtf8(this.strings[i], offset)
      }
      offset += byteLength
    }
    return offset
  }

  /** Encodes the strings as pprof's string_table. */
  encode(buffer = new Uint8Array(this.encodedLength)): Uint8Array {
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
    const position = this.#add(decodeString(buffer), buffer.length)
    this.#decoded[position] = buffer.slice()
  }

  #add(value: string, byteLength: number): number {
    const position = this.strings.push(value) - 1
    this.#positions.set(value, position)
    this.#byteLengths.push(byteLength)
    this.#encodedLength += varintLength(byteLength) + byteLength
    return position
  }
}
