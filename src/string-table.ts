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

/** Encodes one string table entry, including its tag and length. */
export function encodeStringEntry(utf8: Uint8Array | Buffer, field: number): Uint8Array {
  const buffer = new Uint8Array(measureTag(field) + varintLength(utf8.length) + utf8.length)
  let offset = encodeTag(buffer, 0, field, kTypeLengthDelim)
  offset = encodeNumber(buffer, offset, utf8.length)
  if (utf8.length > 0) {
    buffer.set(utf8, offset)
  }
  return buffer
}

/**
 * A string table for the repeated string field `field` of its enclosing
 * message. Each format's subclass fixes the field, so tables of different
 * formats can't be mixed up.
 */
export abstract class StringTableBase {
  strings = new Array<string>()
  #encodings = new Array<Uint8Array>()
  #positions = new Map<string, number>()
  #field: number

  /** @param tok - emptyTableToken omits the initial empty string. */
  constructor(tok: typeof emptyTableToken | undefined, field: number) {
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

  dedup(value: string): number {
    if (typeof value === 'number') return value
    let position = this.#positions.get(value)
    if (position === undefined) {
      position = this.strings.push(value) - 1
      this.#positions.set(value, position)

      // Encode strings on insertion
      this.#encodings.push(encodeStringEntry(toUtf8(value), this.#field))
    }
    return position
  }

  _decodeString(buffer: Uint8Array) {
    const value = decodeString(buffer)
    this.#positions.set(value, this.strings.push(value) - 1)
    this.#encodings.push(encodeStringEntry(buffer, this.#field))
  }
}
