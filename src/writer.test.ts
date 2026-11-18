/**
 * Unless explicitly stated otherwise all files in this repository are licensed under the MIT License.
 *
 * This product includes software developed at Datadog (https://www.datadoghq.com/  Copyright 2026 Datadog, Inc.
 */

import assert from 'node:assert/strict'
import { test } from 'node:test'

import proto from '../testing/proto/profile.js'
import { Profile, ProfileWriter, StringTable } from './index.js'
import type { LabelInput, ProfileInput } from './index.js'

test('writer preserves every profile field and existing samples', () => {
  const strings = new StringTable()
  const name = strings.dedup('cpu 🌍')
  const samples = strings.dedup('samples')
  const count = strings.dedup('count')
  const threadId = strings.dedup('thread id')
  const data: ProfileInput = {
    sampleType: [{type: samples, unit: count}, {type: name, unit: 0}],
    sample: [{locationId: [1], value: [1, 2], label: [{key: name, str: name}]}],
    mapping: [{id: 1, memoryStart: 128, memoryLimit: 16384, fileOffset: 3, filename: name,
      buildId: name, hasFunctions: true, hasFilenames: true, hasLineNumbers: true, hasInlineFrames: true}],
    location: [{id: 1, mappingId: 1, address: 4096, line: [{functionId: 1, line: 2, column: 3}], isFolded: true}],
    function: [{id: 1, name, systemName: name, filename: name, startLine: 2}],
    stringTable: strings,
    dropFrames: name, keepFrames: name, timeNanos: 1700000000000000000n,
    durationNanos: 65000000000n, periodType: {type: name, unit: name}, period: 10000000,
    comment: [name, 0, name], defaultSampleType: name, docUrl: strings.dedup('https://example.com/profile'),
  }
  const writer = new ProfileWriter()
  writer.writeSample([1], [123, -456])
  writer.writeLabel(name, name)
  writer.writeLabel(threadId, 0, -123n, name)
  const sample = {locationId: [1], value: [123, -456], label: [{key: name, str: name},
    {key: threadId, num: -123n, numUnit: name}]}
  const expected = new Profile({...data, sample: [...data.sample!, sample]}).encode()
  const actual = writer.encode(data)
  assert.deepEqual(actual, expected)
  const decoded = proto.perftools.profiles.Profile.toObject(proto.perftools.profiles.Profile.decode(actual),
    {longs: String})
  assert.deepEqual(decoded.sample[1], {locationId: ['1'], value: ['123', '-456'],
    label: [{key: String(name), str: String(name)}, {key: String(threadId), num: '-123', numUnit: String(name)}]})
  assert.deepEqual(writer.encode(data), expected)
  const profile = new Profile(data)
  assert.deepEqual(writer.encode(profile), expected)
  assert.equal(profile.sample.length, 1)
  assert.equal(data.sample!.length, 1)
  assert.equal(data.sampleType!.length, 2)
})

test('writer preserves numeric defaults and 64-bit encodings', () => {
  const values = [0, -0, 0n, 1, 127, 128, 16383, 16384, 2097151, 2097152, 268435455,
    268435456, 4294967295, 4294967296, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER,
    1.9, -1.9, -1, NaN, Infinity, -Infinity, -(1n << 63n), (1n << 64n) - 1n, 1n << 100n]
  for (const value of values) {
    const writer = new ProfileWriter()
    writer.writeSample([value], [value, 0, 0n])
    writer.writeLabel(value, value, value, value)
    const profile = new Profile({sample: [{locationId: [value], value: [value, 0, 0n],
      label: [{key: value, str: value, num: value, numUnit: value}]}]})
    assert.deepEqual(writer.encode(), profile.encode(), String(value))
  }
})

test('writer normalizes plain records added to a Profile', () => {
  const data = Object.assign(new Profile(), {sample: [{locationId: [1], value: [2]}]})
  const writer = new ProfileWriter()
  assert.deepEqual(writer.encode(data), new Profile(data).encode())
})

test('writer takes its sample snapshot before reading metadata', () => {
  const writer = new ProfileWriter()
  writer.writeSample([1], [2])
  const data = {
    get location() {
      writer.writeSample([1], [3])
      return [{id: 1}]
    },
  }
  const first = writer.encode(data)
  assert.deepEqual(first, new Profile({location: [{id: 1}], sample: [{locationId: [1], value: [2]}]}).encode())
  assert.deepEqual(writer.encode({location: [{id: 1}]}), new Profile({location: [{id: 1}], sample: [
    {locationId: [1], value: [2]}, {locationId: [1], value: [3]},
  ]}).encode())
})

test('writer preserves empty profiles, samples, and labels', () => {
  const writer = new ProfileWriter()
  assert.deepEqual(writer.encode(), new Profile().encode())
  writer.writeSample([], [])
  writer.writeSample([], [])
  writer.writeLabel()
  writer.writeLabel(0n, 0n, 0n, 0n)
  assert.deepEqual(writer.encode(), new Profile({sample: [{}, {label: [{}, {}]}]}).encode())
})

test('writer handles sample length prefixes and buffer growth', () => {
  for (const count of [1, 125, 126, 16380, 16381, 65536]) {
    const value = Array<number>(count).fill(0)
    const writer = new ProfileWriter()
    writer.writeSample([], value)
    writer.writeSample([1], [2])
    writer.writeLabel(1, 2)
    const bytes = writer.encode()
    assert.deepEqual(bytes, new Profile({sample: [{value}, {locationId: [1], value: [2],
      label: [{key: 1, str: 2}]}]}).encode(), String(count))
    const decoded = proto.perftools.profiles.Profile.decode(bytes)
    assert.equal(decoded.sample[0].value?.length, count)
    assert.equal(decoded.sample[1].locationId?.[0].toString(), '1')
  }
})

test('writer grows for many labels and samples', () => {
  const writer = new ProfileWriter()
  const label: LabelInput[] = []
  for (let index = 0; index < 2000; index++) {
    const value = {key: index, str: index + 1, num: -1n, numUnit: index + 2}
    writer.writeSample([index], [index])
    writer.writeLabel(value.key, value.str, value.num, value.numUnit)
  }
  writer.writeSample([], [])
  for (let index = 0; index < 2000; index++) {
    writer.writeLabel(index, 0, -(1n << 63n), 1n << 63n)
    label.push({key: index, num: -(1n << 63n), numUnit: 1n << 63n})
  }
  const sample = Array.from({length: 2000}, (_, index) => ({locationId: [index], value: [index],
    label: [{key: index, str: index + 1, num: -1n, numUnit: index + 2}]}))
  assert.deepEqual(writer.encode(), new Profile({sample: [...sample, {locationId: [], value: [], label}]}).encode())
})

test('writer owns written data and encoded results', () => {
  const writer = new ProfileWriter()
  const locationId = [1]
  const value = [2]
  writer.writeSample(locationId, value)
  locationId[0] = 3
  value[0] = 4
  writer.writeLabel(1, 2)
  const first = writer.encode()
  const expected = new Profile({sample: [{locationId: [1], value: [2], label: [{key: 1, str: 2}]}]}).encode()
  assert.deepEqual(first, expected)
  writer.writeSample(Object.freeze([3]), Object.freeze([4]))
  const second = writer.encode()
  assert.deepEqual(second, new Profile({sample: [{locationId: [1], value: [2], label: [{key: 1, str: 2}]},
    {locationId: [3], value: [4]}]}).encode())
  second.fill(0)
  assert.deepEqual(first, expected)
  assert.notDeepEqual(writer.encode(), second)
})

test('writers can be interleaved without sharing state', () => {
  const first = new ProfileWriter()
  const second = new ProfileWriter()
  first.writeSample([1], [2])
  second.writeSample([3], [4])
  first.writeLabel(5, 6)
  second.writeLabel(7, 8)
  assert.deepEqual(second.encode(), new Profile({sample: [{locationId: [3], value: [4],
    label: [{key: 7, str: 8}]}]}).encode())
  assert.deepEqual(first.encode(), new Profile({sample: [{locationId: [1], value: [2],
    label: [{key: 5, str: 6}]}]}).encode())
})

test('labels require an open sample', () => {
  const writer = new ProfileWriter()
  assert.throws(() => writer.writeLabel(1, 2), {message: 'writeLabel() requires an open sample'})
  writer.writeSample([], [])
  writer.writeLabel(1, 2)
  writer.encode()
  assert.throws(() => writer.writeLabel(1, 2), {message: 'writeLabel() requires an open sample'})
})

for (const failure of ['length mismatch', 'measurement read error', 'encoding read error'] as const) {
  test(`writer omits a rejected sample after a ${failure}`, () => {
    const writer = new ProfileWriter()
    writer.writeSample([1], [2])
    let reads = 0
    const value = [1]
    Object.defineProperty(value, 0, {
      get() {
        if (++reads === 1) {
          if (failure === 'measurement read error') throw new Error(failure)
          return 1
        }
        if (failure === 'encoding read error') throw new Error(failure)
        return 128
      },
    })
    const message = failure === 'length mismatch' ? 'Encoded 4 bytes but measured 3' : failure
    assert.throws(() => writer.writeSample([], value), {message})
    assert.throws(() => writer.writeLabel(1, 2), {message: 'writeLabel() requires an open sample'})
    assert.deepEqual(writer.encode(), new Profile({sample: [{locationId: [1], value: [2]}]}).encode())
    writer.writeSample([3], [4])
    assert.deepEqual(writer.encode(), new Profile({sample: [
      {locationId: [1], value: [2]}, {locationId: [3], value: [4]},
    ]}).encode())
  })
}
