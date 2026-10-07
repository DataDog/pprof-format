/**
 * Unless explicitly stated otherwise all files in this repository are licensed under the MIT License.
 *
 * This product includes software developed at Datadog (https://www.datadoghq.com/  Copyright 2022 Datadog, Inc.
 */

import { test } from 'node:test'
import assert from 'node:assert'

import {
  Message,
  Numeric,
  decodeDouble,
  decodeFields,
  decodeFixed64,
  decodeFixed64s,
  decodeNumber,
  encodeBytesField,
  encodeDoubleField,
  encodeFixed64Field,
  encodeMessageField,
  encodeNumberField,
  encodePackedFixed64Field,
  kTypeFixed32,
  kTypeFixed64,
  kTypeLengthDelim,
  kTypeVarInt,
  measureBytesField,
  measureDoubleField,
  measureFixed64Field,
  measureMessageField,
  measureNumberField,
  measurePackedFixed64Field
} from './protobuf.js'
import { Profile, Sample, StringTable, ValueType } from './index.js'

function hex(buf: Uint8Array) {
  return Buffer.from(buf).toString('hex')
}

function fromHex(hex: string) {
  return Uint8Array.from(Buffer.from(hex, 'hex'))
}

/**
 * Encodes a single field with the given measure and encode helpers, checking
 * that the measured length matches the encoded one.
 */
function encodeField<T>(
  measure: (field: number, value: T) => number,
  encode: (buffer: Uint8Array, offset: number, field: number, value: T) => number,
  field: number,
  value: T
): Uint8Array {
  const buffer = new Uint8Array(measure(field, value))
  assert.strictEqual(encode(buffer, 0, field, value), buffer.length, 'measured length')
  return buffer
}

function decodeSingle(buffer: Uint8Array) {
  const fields: Array<[number, number, Uint8Array]> = []
  decodeFields(buffer, (_data, field, value, wireType) => {
    fields.push([field, wireType, value])
  })
  assert.strictEqual(fields.length, 1)
  return fields[0]
}

test('multi-byte tags', async (t) => {
  for (const field of [15, 16, 2047, 2048, 536870911]) {
    await t.test(`field ${field}`, () => {
      const buffer = encodeField(measureNumberField, encodeNumberField, field, 300)
      const [decodedField, wireType, value] = decodeSingle(buffer)
      assert.strictEqual(decodedField, field)
      assert.strictEqual(wireType, kTypeVarInt)
      assert.strictEqual(decodeNumber(value), 300)
    })
  }
})

test('fixed64', async (t) => {
  const cases: Array<[Numeric, string]> = [
    [1, '0100000000000000'],
    [2 ** 53 - 1, 'ffffffffffff1f00'],
    [1700000000123456789n, '15cd853dfe9c9717'],
    [-1, 'ffffffffffffffff']
  ]
  for (const [number, encoded] of cases) {
    await t.test(`encodes and decodes ${number}`, () => {
      const buffer = encodeField(measureFixed64Field, encodeFixed64Field, 3, number)
      assert.strictEqual(hex(buffer), '19' + encoded)
      const [field, wireType, value] = decodeSingle(buffer)
      assert.strictEqual(field, 3)
      assert.strictEqual(wireType, kTypeFixed64)
      const expected = number === -1 ? 2n ** 64n - 1n : number
      assert.strictEqual(decodeFixed64(value), expected)
    })
  }

  await t.test('omits zero', () => {
    assert.strictEqual(measureFixed64Field(3, 0), 0)
  })

  await t.test('encodes and decodes packed values', () => {
    const values = [1, 1700000000123456789n]
    const buffer = encodeField(measurePackedFixed64Field, encodePackedFixed64Field, 5, values)
    assert.strictEqual(hex(buffer), '2a10' + '0100000000000000' + '15cd853dfe9c9717')
    const [, wireType, value] = decodeSingle(buffer)
    assert.strictEqual(wireType, kTypeLengthDelim)
    assert.deepStrictEqual(decodeFixed64s(value), values)
  })
})

test('double', () => {
  const buffer = encodeField(measureDoubleField, encodeDoubleField, 4, 0.5)
  assert.strictEqual(hex(buffer), '21000000000000e03f')
  const [, wireType, value] = decodeSingle(buffer)
  assert.strictEqual(wireType, kTypeFixed64)
  assert.strictEqual(decodeDouble(value), 0.5)
})

test('bytes', () => {
  const bytes = fromHex('0102ff')
  const buffer = encodeField(measureBytesField, encodeBytesField, 2, bytes)
  assert.strictEqual(hex(buffer), '12030102ff')
  const [, wireType, value] = decodeSingle(buffer)
  assert.strictEqual(wireType, kTypeLengthDelim)
  assert.deepStrictEqual(value, bytes)
  assert.strictEqual(measureBytesField(2, new Uint8Array(0)), 0)
})

test('message fields', async (t) => {
  await t.test('encodes an empty message that is present', () => {
    const empty = new ValueType({})
    const buffer = encodeField(measureMessageField, encodeMessageField, 11, empty)
    assert.strictEqual(hex(buffer), '5a00')
    assert.strictEqual(measureMessageField(11, undefined), 0)
  })

  await t.test('measures empty submessages of a profile', () => {
    const profile = new Profile({
      stringTable: new StringTable(),
      periodType: new ValueType({}),
      sample: [new Sample({})]
    })
    const encoded = profile.encode()
    assert.strictEqual(encoded.length, profile.length)
    const decoded = Profile.decode(encoded)
    assert.strictEqual(decoded.sample.length, 1)
    assert.ok(decoded.periodType instanceof ValueType)
  })

  await t.test('re-measures after mutation', () => {
    const sample = new Sample({ value: [1] })
    const profile = new Profile({ sample: [sample] })
    const before = profile.encode()
    sample.value.push(300)
    const after = profile.encode()
    assert.strictEqual(after.length, before.length + 2)
    assert.deepStrictEqual(Profile.decode(after).sample[0].value, [1, 300])
  })

  await t.test('encode measures even when given a buffer', () => {
    class Wrapper extends Message {
      constructor(public inner: ValueType) {
        super()
      }

      _measure() {
        return measureMessageField(1, this.inner)
      }

      _encodeToBuffer(buffer: Uint8Array, offset = 0) {
        return encodeMessageField(buffer, offset, 1, this.inner)
      }
    }
    const inner = new ValueType({ type: 1 })
    const wrapper = new Wrapper(inner)
    wrapper.encode()
    inner.unit = 2
    const buffer = new Uint8Array(6)
    wrapper.encode(buffer)
    assert.strictEqual(hex(buffer), '0a0408011002')
  })
})

test('decoders skip unknown fields of all wire types', () => {
  const unknown = [
    // field 20, varint
    'a00105',
    // field 21, fixed64
    'a9010102030405060708',
    // field 22, length-delimited
    'b2010201ff',
    // field 23, fixed32
    'bd0101020304'
  ].join('')
  const sample = Sample.decode(fromHex('0a0105' + unknown + '120107'))
  assert.deepStrictEqual(sample.locationId, [5])
  assert.deepStrictEqual(sample.value, [7])

  const wireTypes: number[] = []
  decodeFields(fromHex(unknown), (_data, _field, _value, wireType) => {
    wireTypes.push(wireType)
  })
  assert.deepStrictEqual(wireTypes, [kTypeVarInt, kTypeFixed64, kTypeLengthDelim, kTypeFixed32])
})

test('StringTable field number', () => {
  const table = new StringTable(undefined, 5)
  table.dedup('hi')
  assert.strictEqual(hex(table.encode()), '2a00' + '2a026869')
  assert.strictEqual(hex(new StringTable().encode()), '3200')
})
