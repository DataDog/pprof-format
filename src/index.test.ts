/**
 * Unless explicitly stated otherwise all files in this repository are licensed under the MIT License.
 *
 * This product includes software developed at Datadog (https://www.datadoghq.com/  Copyright 2022 Datadog, Inc.
 */

import { test } from 'node:test'
import type { TestContext } from 'node:test'
import assert from 'node:assert'
import { gunzipSync } from 'zlib'
import * as fs from 'fs'

import proto from '../testing/proto/profile.js'

const {decode, toObject} = proto.perftools.profiles.Profile

import {
  Function,
  Label,
  Line,
  Location,
  Mapping,
  Profile,
  Sample,
  ValueType,
  StringTable,
  emptyTableToken
} from './index.js'

type Data = {
  [key: string]: any
}

type Encoding = {
  field: string
  value: string
}

// Recursive loose subset match, mirroring tap's `t.has`: every property in
// `wanted` must be present in `found` and compare loosely (==), recursing into
// objects and arrays. Extra properties on `found` are ignored.
function hasMatch(found: any, wanted: any): boolean {
  if (wanted !== null && typeof wanted === 'object') {
    if (found === null || typeof found !== 'object') return false
    for (const key of Object.keys(wanted)) {
      if (!hasMatch(found[key], wanted[key])) return false
    }
    return true
  }
  return found == wanted
}

function assertHas(found: any, wanted: any, message?: string) {
  assert.ok(hasMatch(found, wanted), message)
}

async function constructs(t: TestContext, Type: any, data: Data, encodings: Encoding[], message = 'construction') {
  await t.test(message, async () => {
    const value = new Type(data)
    for (const { field } of encodings) {
      if (typeof data[field] === 'object') {
        assertHas(value[field], data[field], `has given ${field}`)
      } else {
        assert.strictEqual(value[field], data[field], `has given ${field}`)
      }
    }
  })
}

async function encodes(t: TestContext, Type: any, data: Data, encodings: Encoding[], message = 'encoding') {
  await t.test(message, async (t: TestContext) => {
    await t.test('per-field validation', async () => {
      for (const { field, value } of encodings) {
        const fun = new Type({
          // Hack to exclude stringTable data from any checks except for the string table itself
          stringTable: new StringTable(emptyTableToken),
          [field]: data[field]
        })
        assert.strictEqual(bufToHex(fun.encode()), value, `has expected encoding of ${field} field`)
      }
    })

    await t.test('full object validation', async () => {
      const fun = new Type(data)
      assert.strictEqual(
        bufToHex(fun.encode()),
        fullEncoding(encodings),
        'has expected encoding of full object'
      )
    })
  })
}

async function decodes(t: TestContext, Type: any, data: Data, encodings: Encoding[], message = 'decoding') {
  await t.test(message, async (t: TestContext) => {
    await t.test('per-field validation', async () => {
      for (const { field, value } of encodings) {
        if (!value) continue
        const fun = Type.decode(hexToBuf(value))
        assertHas(fun, { [field]: data[field] }, `has expected decoding of ${field} field`)
      }
    })

    await t.test('full object validation', async () => {
      const fun = Type.decode(hexToBuf(fullEncoding(encodings)))
      assertHas(fun, data, 'has expected encoding of full object')
    })
  })
}

const stringTable = new StringTable()

const functionData = {
  id: 123,
  name: stringTable.dedup('fn name'),
  systemName: stringTable.dedup('fn systemName'),
  filename: stringTable.dedup('fn filename'),
  startLine: 789
}

const functionEncodings = [
  { field: 'id', value: '087b' },
  { field: 'name', value: '1001' },
  { field: 'systemName', value: '1802' },
  { field: 'filename', value: '2003' },
  { field: 'startLine', value: '289506' }
]

test('Function', async (t) => {
  await constructs(t, Function, functionData, functionEncodings)
  await encodes(t, Function, functionData, functionEncodings)
  await decodes(t, Function, functionData, functionEncodings)
})

const labelData = {
  key: stringTable.dedup('label key'),
  str: stringTable.dedup('label str'),
  num: 123,
  numUnit: stringTable.dedup('label numUnit')
}

const labelEncodings = [
  { field: 'key', value: '0804' },
  { field: 'str', value: '1005' },
  { field: 'num', value: '187b' },
  { field: 'numUnit', value: '2006' }
]

test('Label', async (t) => {
  await constructs(t, Label, labelData, labelEncodings)
  await encodes(t, Label, labelData, labelEncodings)
  await decodes(t, Label, labelData, labelEncodings)
})

const lineData = {
  functionId: 1234,
  line: 5678
}

const lineEncodings = [
  { field: 'functionId', value: '08d209' },
  { field: 'line', value: '10ae2c' },
]

test('Line', async (t) => {
  await constructs(t, Line, lineData, lineEncodings)
  await encodes(t, Line, lineData, lineEncodings)
  await decodes(t, Line, lineData, lineEncodings)
})

const locationData = {
  id: 12,
  mappingId: 34,
  address: 56,
  line: [lineData],
  isFolded: true
}

const locationEncodings = [
  { field: 'id', value: '080c' },
  { field: 'mappingId', value: '1022' },
  { field: 'address', value: '1838' },
  { field: 'line', value: embeddedField('22', lineEncodings) },
  { field: 'isFolded', value: '2801' },
]

test('Location', async (t) => {
  await constructs(t, Location, locationData, locationEncodings)
  await encodes(t, Location, locationData, locationEncodings)
  await decodes(t, Location, locationData, locationEncodings)
})

const mappingData = {
  id: 1,
  memoryStart: 2,
  memoryLimit: 3,
  fileOffset: 4,
  filename: stringTable.dedup('mapping filename'),
  buildId: stringTable.dedup('mapping build id'),
  hasFunctions: true,
  hasFilenames: true,
  hasLineNumbers: true,
  hasInlineFrames: true,
}

const mappingEncodings = [
  { field: 'id', value: '0801' },
  { field: 'memoryStart', value: '1002' },
  { field: 'memoryLimit', value: '1803' },
  { field: 'fileOffset', value: '2004' },
  { field: 'filename', value: '2807' },
  { field: 'buildId', value: '3008' },
  { field: 'hasFunctions', value: '3801' },
  { field: 'hasFilenames', value: '4001' },
  { field: 'hasLineNumbers', value: '4801' },
  { field: 'hasInlineFrames', value: '5001' },
]

test('Mapping', async (t) => {
  await constructs(t, Mapping, mappingData, mappingEncodings)
  await encodes(t, Mapping, mappingData, mappingEncodings)
  await decodes(t, Mapping, mappingData, mappingEncodings)
})

const sampleData = {
  locationId: [1, 2, 3],
  value: [...Array(180).keys()],
  label: [labelData]
}

const sampleEncodings = [
  { field: 'locationId', value: '0a03010203' },
  { field: 'value', value: embeddedField('12', sampleData.value.map(x => ({field: '', value: hexVarInt(x)}))) },
  { field: 'label', value: embeddedField('1a', labelEncodings) },
]

test('Sample', async (t) => {
  await constructs(t, Sample, sampleData, sampleEncodings)
  await encodes(t, Sample, sampleData, sampleEncodings)
  await decodes(t, Sample, sampleData, sampleEncodings)
})

const valueTypeData = {
  type: stringTable.dedup('value type type'),
  unit: stringTable.dedup('value type unit')
}

const valueTypeEncodings = [
  { field: 'type', value: '0809' },
  { field: 'unit', value: '100a' },
]

test('ValueType', async (t) => {
  await constructs(t, ValueType, valueTypeData, valueTypeEncodings)
  await encodes(t, ValueType, valueTypeData, valueTypeEncodings)
  await decodes(t, ValueType, valueTypeData, valueTypeEncodings)
})

const profileData = {
  sampleType: [valueTypeData],
  sample: [sampleData],
  mapping: [mappingData],
  location: [locationData],
  function: [functionData],
  stringTable,
  timeNanos: 1_000_000n,
  durationNanos: 1234,
  periodType: valueTypeData,
  period: 1234 / 2,
  comment: [
    stringTable.dedup('some very very very very very very very very very very very very very very very very very very very very very very very very comment'),
    stringTable.dedup('another comment')
  ]
}

const profileEncodings = [
  { field: 'sampleType', value: embeddedField('0a', valueTypeEncodings) },
  { field: 'sample', value: embeddedField('12', sampleEncodings) },
  { field: 'mapping', value: embeddedField('1a', mappingEncodings) },
  { field: 'location', value: embeddedField('22', locationEncodings) },
  { field: 'function', value: embeddedField('2a', functionEncodings) },
  { field: 'stringTable', value: encodeStringTable(stringTable) },
  { field: 'timeNanos', value: '48c0843d' },
  { field: 'durationNanos', value: '50d209' },
  { field: 'periodType', value: embeddedField('5a', valueTypeEncodings) },
  { field: 'period', value: '60e904' },
  { field: 'comment', value: '6a020b0c' },
]

test('Profile', async (t) => {
  await constructs(t, Profile, profileData, profileEncodings)
  await encodes(t, Profile, profileData, profileEncodings)
  await decodes(t, Profile, profileData, profileEncodings)

  // Profiles additionally can be encoded asynchronously to break up
  // encoding into smaller chunks to have less latency impact.
  await t.test('async encoding', async (t: TestContext) => {
    await t.test('per-field validation', async () => {
      for (const { field, value } of profileEncodings) {
        const fun = new Profile({
          // Hack to exclude stringTable data from any checks except for the string table itself
          stringTable: new StringTable(emptyTableToken),
          [field]: (profileData as Data)[field]
        })
        assert.strictEqual(bufToHex(await fun.encodeAsync()), value, `has expected encoding of ${field} field`)
      }
    })

    await t.test('full object validation', async () => {
      const fun = new Profile(profileData)
      assert.strictEqual(
        bufToHex(await fun.encodeAsync()),
        fullEncoding(profileEncodings),
        'has expected encoding of full object'
      )
    })
  })
})

function encodeStringTable(strings: StringTable) {
  return strings.strings.map(s => {
    const buf = new TextEncoder().encode(s)
    return `32${hexVarInt(buf.length)}${bufToHex(buf)}`
  }).join('')
}

function hexNum(d: number) {
  let hex = Number(d).toString(16);

  if (hex.length == 1) {
    hex = "0" + hex;
  }

  return hex;
}

function hexVarInt(num: number) {
  let n = BigInt(num)
  if (n < 0) {
    // take two's complement to encode negative number
    n = 2n ** 64n - n
  }
  let str = ''
  const maxbits = 7n
  const max = (1n << maxbits) - 1n
  while (n > max) {
    str += hexNum(Number((n & max) | (1n << maxbits)))
    n >>= maxbits
  }
  str += hexNum(Number(n))
  return str
}

function embeddedField(fieldBit: string, data: Encoding[]) {
  const encoded = fullEncoding(data)
  const size = hexVarInt(encoded.length / 2)
  return [fieldBit, size, encoded].join('')
}

function fullEncoding(encodings: Encoding[]) {
  return encodings.map(e => e.value).join('')
}

function hexToBuf(hex: string) {
  return Uint8Array.from((hex.match(/.{2}/g) || []).map(v => parseInt(v, 16)))
}

function bufToHex(buf: Uint8Array) {
  return Array.from(buf).map(hexNum).join('')
}

test('StringTable', async (t) => {
  await t.test('encodes correctly', async () => {
    const encodings = {
      '': '3200',
      'hello': '320568656c6c6f'
    }
    const table = new StringTable()
    assert.strictEqual(bufToHex(table.encode()), encodings[''])
    table.dedup('hello')
    assert.strictEqual(bufToHex(table.encode()), encodings[''] + encodings['hello'])
  })
})

function profileToObject(profile: any): object {
  profile.stringTable = profile.stringTable.strings
  return profile
}

test('Protobufjs compat', async (t) => {
  await t.test('encodes correctly', async () => {
    const profile = new Profile(profileData)
    const encodedProfile = profile.encode()
    const decodedProfile = decode(encodedProfile)
    assert.deepEqual(profileToObject(profile), toObject(decodedProfile, {longs: String, defaults: true}))
  })

  await t.test('decodes correctly', async () => {
    const buf = gunzipSync(fs.readFileSync('./testing/test.pprof'))
    assert.deepEqual(profileToObject(Profile.decode(buf)), toObject(decode(buf), {longs: String, defaults: true}))
  })
})
