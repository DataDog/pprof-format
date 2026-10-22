/**
 * Unless explicitly stated otherwise all files in this repository are licensed under the MIT License.
 *
 * This product includes software developed at Datadog (https://www.datadoghq.com/  Copyright 2026 Datadog, Inc.
 */

import {
  encodeNumber,
  kTypeLengthDelim,
  measureNumber,
  toUtf8,
} from './protobuf.js'

export const emptyTableToken = Symbol()

export class StringTable {
  strings = new Array<string>()
  #encodings = new Array<Uint8Array>()
  #positions = new Map<string, number>()
  #field: number

  /**
   * @param tok - emptyTableToken omits the initial empty string.
   * @param field - field number of the strings in the enclosing message.
   */
  constructor(tok?: typeof emptyTableToken, field = 6) {
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

  static _encodeStringFromUtf8(stringBuffer: Uint8Array | Buffer, field = 6): Uint8Array {
    const tag = field * 8 + kTypeLengthDelim
    const buffer = new Uint8Array(
      (measureNumber(tag) || 1) + (measureNumber(stringBuffer.length) || 1) + stringBuffer.length
    )
    let offset = encodeNumber(buffer, 0, tag)
    offset = encodeNumber(buffer, offset, stringBuffer.length)
    if (stringBuffer.length > 0) {
      buffer.set(stringBuffer, offset)
    }
    return buffer
  }

  static _encodeString(string: string, field = 6): Uint8Array {
    return StringTable._encodeStringFromUtf8(toUtf8(string), field)
  }

  dedup(string: string): number {
    if (typeof string === 'number') return string
    if (!this.#positions.has(string)) {
      const pos = this.strings.push(string) - 1
      this.#positions.set(string, pos)

      // Encode strings on insertion
      this.#encodings.push(StringTable._encodeString(string, this.#field))
    }
    return this.#positions.get(string)!
  }

  _decodeString(buffer: Uint8Array) {
    const string = new TextDecoder().decode(buffer)
    this.#positions.set(string, this.strings.push(string) - 1)
    this.#encodings.push(StringTable._encodeStringFromUtf8(buffer, this.#field))
  }
}
