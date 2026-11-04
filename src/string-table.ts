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

/**
 * The strings of a profile, each encoded once as it is added. The enclosing
 * message supplies the field number when it encodes the table, so one table
 * type serves both pprof and OTel.
 */
export class StringTable {
  strings = new Array<string>()
  #encodings = new Array<Uint8Array>()
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
    return this.#encodings.length * measureTag(field) + this.#encodedLength
  }

  /** Encodes the strings as the repeated string field `field`. */
  _encodeToBuffer(buffer: Uint8Array, offset: number, field: number): number {
    for (const encoded of this.#encodings) {
      offset = encodeTag(buffer, offset, field, kTypeLengthDelim)
      buffer.set(encoded, offset)
      offset += encoded.length
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

  dedup(string: string): number {
    if (typeof string === 'number') return string
    if (!this.#positions.has(string)) {
      const pos = this.strings.push(string) - 1
      this.#positions.set(string, pos)

      // Encode strings on insertion
      const encoded = encodeLengthDelimited(toUtf8(string))
      this.#encodings.push(encoded)
      this.#encodedLength += encoded.length
    }
    return this.#positions.get(string)!
  }

  _decodeString(buffer: Uint8Array) {
    const string = decodeString(buffer)
    this.#positions.set(string, this.strings.push(string) - 1)
    const encoded = encodeLengthDelimited(buffer)
    this.#encodings.push(encoded)
    this.#encodedLength += encoded.length
  }
}
