/**
 * Unless explicitly stated otherwise all files in this repository are licensed under the MIT License.
 *
 * This product includes software developed at Datadog (https://www.datadoghq.com/  Copyright 2026 Datadog, Inc.
 */

import {
  decodeString,
  encodeNumber,
  encodeTag,
  kEncodeToBuffer,
  kMeasure,
  kTypeLengthDelim,
  measureTag,
  prepareBuffer,
  utf8Length,
  varintLength,
} from './protobuf.js'

export const emptyTableToken = Symbol()
export const kDecodeString = Symbol()

// pprof's Profile.string_table, which the table's own encode() produces
const pprofStringTableField = 6

// A string's length prefix and UTF-8 bytes, which don't depend on the field
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
    return this[kMeasure](pprofStringTableField)
  }

  /** Measures the strings as the repeated string field `field`. */
  /** @internal */
  [kMeasure](field: number): number {
    return this.#byteLengths.length * measureTag(field) + this.#encodedLength
  }

  /** Encodes the strings as the repeated string field `field`. */
  /** @internal */
  [kEncodeToBuffer](buffer: Uint8Array, offset: number, field: number): number {
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
  encode(buffer?: Uint8Array): Uint8Array {
    buffer = prepareBuffer(buffer, this.encodedLength)
    this[kEncodeToBuffer](buffer, 0, pprofStringTableField)
    return buffer
  }

  dedup(value: string): number {
    if (typeof value === 'number') return value
    let position = this.#positions.get(value)
    if (position === undefined) {
      position = this.#add(value, utf8ByteLength(value))
    }
    return position
  }

  /** @internal */
  [kDecodeString](buffer: Uint8Array) {
    const position = this.#add(decodeString(buffer), buffer.length)
    this.#decoded[position] = buffer.length <= 64 || typeof Buffer === 'undefined'
      ? new Uint8Array(buffer)
      : Buffer.from(buffer)
  }

  #add(value: string, byteLength: number): number {
    const position = this.strings.push(value) - 1
    this.#positions.set(value, position)
    this.#byteLengths.push(byteLength)
    this.#encodedLength += varintLength(byteLength) + byteLength
    return position
  }
}
