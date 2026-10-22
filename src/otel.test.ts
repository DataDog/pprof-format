/**
 * Unless explicitly stated otherwise all files in this repository are licensed under the MIT License.
 *
 * This product includes software developed at Datadog (https://www.datadoghq.com/  Copyright 2026 Datadog, Inc.
 */

import { test } from 'node:test'
import assert from 'node:assert'

import otelProto from '../testing/otel-proto/otel.js'

import {
  AnyValue,
  ExportProfilesServiceRequest,
  ExportProfilesServiceRequestInput,
  ExportProfilesServiceResponse,
  KeyValue,
  Profile,
  ProfilesData,
  ProfilesDictionary,
  Sample,
  StringTable,
  emptyTableToken
} from './otel.js'
import { StringTable as PprofStringTable } from './index.js'

const pb = otelProto.opentelemetry.proto

function hex(buf: Uint8Array) {
  return Buffer.from(buf).toString('hex')
}

function fromHex(hex: string) {
  return Uint8Array.from(Buffer.from(hex, 'hex'))
}

/** Converts string tables to arrays and bigints to strings for protobufjs. */
function toProtobufjsObject(value: any): any {
  if (value instanceof StringTable) return value.strings
  if (typeof value === 'bigint') return value.toString()
  if (value instanceof Uint8Array) return value
  if (Array.isArray(value)) return value.map(toProtobufjsObject)
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, toProtobufjsObject(v)]))
  }
  return value
}

function encodeWithProtobufjs(input: ExportProfilesServiceRequestInput): Uint8Array {
  const { ExportProfilesServiceRequest } = pb.collector.profiles.v1development
  return ExportProfilesServiceRequest.encode(
    ExportProfilesServiceRequest.fromObject(toProtobufjsObject(input))
  ).finish()
}

/**
 * Covers every message and field, including oneof defaults, empty strings,
 * negative and 64-bit integers, UTF-8, and dictionary zero entries.
 * Avoid explicit scalar defaults outside oneofs: protobufjs encodes them;
 * we omit them.
 */
function exampleRequest(): ExportProfilesServiceRequestInput {
  const strings = new StringTable()
  const s = (string: string) => strings.dedup(string)
  return {
    resourceProfiles: [{
      resource: {
        attributes: [
          { key: 'service.name', value: { stringValue: 'my-service ✓' } },
          { key: 'process.pid', value: { intValue: 1234 } },
          { key: 'empty', value: { stringValue: '' } },
          { key: 'flag', value: { boolValue: false } },
          { key: 'ratio', value: { doubleValue: 0.25 } },
          { key: 'list', value: { arrayValue: { values: [{ intValue: 0 }, { bytesValue: new Uint8Array([1, 2]) }] } } },
          { key: 'map', value: { kvlistValue: { values: [{ key: 'k', value: { stringValueStrindex: 0 } }] } } },
          { keyStrindex: s('indexed.key'), value: { stringValueStrindex: s('indexed value') } },
          { key: 'no value' }
        ],
        droppedAttributesCount: 2,
        entityRefs: [{
          schemaUrl: 'https://example.com/schema',
          type: 'service',
          idKeys: ['service.name', ''],
          descriptionKeys: ['service.version']
        }]
      },
      scopeProfiles: [{
        scope: {
          name: '@datadog/pprof',
          version: '6.0.0',
          attributes: [{ key: 'negative', value: { intValue: -1 } }],
          droppedAttributesCount: 1
        },
        profiles: [{
          sampleType: { typeStrindex: s('cpu'), unitStrindex: s('nanoseconds') },
          samples: [
            {
              stackIndex: 1,
              attributeIndices: [1, 2],
              linkIndex: 1,
              values: [10000000, 20000000],
              timestampsUnixNano: [1700000000123456789n, 1700000000223456789n]
            },
            { stackIndex: 2, values: [-5, 2n ** 40n] }
          ],
          timeUnixNano: 1700000000000000000n,
          durationNano: 65000000000,
          periodType: { typeStrindex: s('cpu'), unitStrindex: s('nanoseconds') },
          period: 10000000,
          profileId: new Uint8Array(16).fill(7),
          droppedAttributesCount: 3,
          originalPayloadFormat: 'pprof',
          originalPayload: new Uint8Array([0x1f, 0x8b]),
          attributeIndices: [3]
        }],
        schemaUrl: 'https://opentelemetry.io/schemas/1.38.0'
      }],
      schemaUrl: 'https://opentelemetry.io/schemas/1.38.0'
    }],
    dictionary: {
      mappingTable: [
        {},
        { memoryStart: 0x1000, memoryLimit: 0x2000n, fileOffset: 0x100, filenameStrindex: s('/usr/lib/libfoo.so'), attributeIndices: [4] }
      ],
      locationTable: [
        {},
        { mappingIndex: 1, address: 0x1234, lines: [{ functionIndex: 1, line: 42, column: 7 }, { functionIndex: 2, line: 10 }], attributeIndices: [5] },
        { lines: [{ functionIndex: 2, line: 3 }] }
      ],
      functionTable: [
        {},
        { nameStrindex: s('foo'), systemNameStrindex: s('_Z3foov'), filenameStrindex: s('foo.js'), startLine: 40 },
        { nameStrindex: s('main') }
      ],
      linkTable: [
        { traceId: new Uint8Array(16), spanId: new Uint8Array(8) },
        { traceId: Uint8Array.from({ length: 16 }, (_, i) => i + 1), spanId: Uint8Array.from({ length: 8 }, (_, i) => 0xf0 + i) }
      ],
      stringTable: strings,
      attributeTable: [
        {},
        { keyStrindex: s('thread.name'), value: { stringValue: 'main' } },
        { keyStrindex: s('thread.id'), value: { intValue: 1 } },
        { keyStrindex: s('allocation_size'), value: { intValue: 128 }, unitStrindex: s('By') },
        { keyStrindex: s('k4'), value: { boolValue: true } },
        { keyStrindex: s('profile.frame.type'), value: { stringValue: 'v8js' } }
      ],
      stackTable: [{}, { locationIndices: [1, 2] }, { locationIndices: [2] }]
    }
  }
}

test('ExportProfilesServiceRequest', async (t) => {
  await t.test('encodes the same bytes as protobufjs', () => {
    const input = exampleRequest()
    assert.strictEqual(hex(new ExportProfilesServiceRequest(input).encode()), hex(encodeWithProtobufjs(input)))
  })

  await t.test('decodes what protobufjs encodes', () => {
    const encoded = encodeWithProtobufjs(exampleRequest())
    const request = ExportProfilesServiceRequest.decode(encoded)
    assert.strictEqual(hex(request.encode()), hex(encoded), 're-encodes to the same bytes')

    const [resourceProfiles] = request.resourceProfiles
    const attributes = resourceProfiles.resource!.attributes
    assert.strictEqual(attributes[0].value!.stringValue, 'my-service ✓')
    assert.strictEqual(attributes[2].value!.stringValue, '')
    assert.strictEqual(attributes[3].value!.boolValue, false)
    assert.strictEqual(attributes[4].value!.doubleValue, 0.25)
    assert.strictEqual(attributes[5].value!.arrayValue!.values[0].intValue, 0)
    assert.deepStrictEqual(attributes[5].value!.arrayValue!.values[1].bytesValue, new Uint8Array([1, 2]))
    assert.strictEqual(attributes[8].value, undefined)
    assert.deepStrictEqual(resourceProfiles.resource!.entityRefs[0].idKeys, ['service.name', ''])
    assert.strictEqual(Number(resourceProfiles.scopeProfiles[0].scope!.attributes[0].value!.intValue), -1)

    const [profile] = resourceProfiles.scopeProfiles[0].profiles
    assert.strictEqual(profile.timeUnixNano, 1700000000000000000n)
    assert.deepStrictEqual(profile.samples[0].timestampsUnixNano, [1700000000123456789n, 1700000000223456789n])
    assert.deepStrictEqual(profile.samples[1].values.map(Number), [-5, 2 ** 40])
    assert.deepStrictEqual(profile.profileId, new Uint8Array(16).fill(7))

    const dictionary = request.dictionary!
    assert.ok(dictionary.stringTable instanceof StringTable)
    const strings = dictionary.stringTable.strings
    assert.strictEqual(strings[0], '')
    const fn = dictionary.functionTable[dictionary.locationTable[1].lines[0].functionIndex]
    assert.strictEqual(strings[fn.nameStrindex], 'foo')
    assert.strictEqual(dictionary.locationTable[1].lines[0].column, 7)
    assert.deepStrictEqual(dictionary.stackTable[1].locationIndices, [1, 2])
    assert.deepStrictEqual(dictionary.linkTable[0].traceId, new Uint8Array(16))
  })

  await t.test('has the wire format of ProfilesData', () => {
    const input = exampleRequest()
    const { ProfilesData: PbProfilesData } = pb.profiles.v1development
    const viaProtobufjs = PbProfilesData.encode(PbProfilesData.fromObject(toProtobufjsObject(input))).finish()
    assert.strictEqual(hex(new ProfilesData(input).encode()), hex(viaProtobufjs))
    assert.ok(ProfilesData.decode(viaProtobufjs) instanceof ProfilesData)
    assert.ok(ExportProfilesServiceRequest.decode(viaProtobufjs) instanceof ExportProfilesServiceRequest)
  })
})

test('ExportProfilesServiceResponse', () => {
  const { ExportProfilesServiceResponse: PbResponse } = pb.collector.profiles.v1development
  const encoded = PbResponse.encode(PbResponse.fromObject({
    partialSuccess: { rejectedProfiles: 2, errorMessage: 'bad profile' }
  })).finish()
  const response = ExportProfilesServiceResponse.decode(encoded)
  assert.strictEqual(response.partialSuccess!.rejectedProfiles, 2)
  assert.strictEqual(response.partialSuccess!.errorMessage, 'bad profile')
  assert.strictEqual(hex(response.encode()), hex(encoded))
  assert.strictEqual(ExportProfilesServiceResponse.decode(new Uint8Array(0)).partialSuccess, undefined)
})

test('AnyValue', async (t) => {
  await t.test('encodes a default value', () => {
    assert.strictEqual(hex(new AnyValue({ intValue: 0 }).encode()), '1800')
    assert.strictEqual(hex(new AnyValue({ stringValue: '' }).encode()), '0a00')
    assert.strictEqual(hex(new AnyValue({ boolValue: false }).encode()), '1000')
    assert.strictEqual(hex(new AnyValue().encode()), '')
  })

  await t.test('holds at most one value', () => {
    assert.throws(() => new AnyValue({ intValue: 1, stringValue: 'x' }), TypeError)
  })

  await t.test('decodes the last of several values', () => {
    // string_value "x", then int_value 5
    const value = AnyValue.decode(fromHex('0a0178' + '1805'))
    assert.strictEqual(value.stringValue, undefined)
    assert.strictEqual(value.intValue, 5)
  })
})

test('ProfilesDictionary', async (t) => {
  await t.test('defaults each table to its zero value', () => {
    const dictionary = new ProfilesDictionary()
    assert.deepStrictEqual(dictionary.stringTable.strings, [''])
    assert.strictEqual(hex(dictionary.encode()), '0a00' + '1200' + '1a00' + '2200' + '2a00' + '3200' + '3a00')
  })

  await t.test('rejects a pprof string table', () => {
    assert.throws(() => new ProfilesDictionary({ stringTable: new PprofStringTable() as StringTable }), TypeError)
  })
})

test('string fields are encoded as UTF-8', () => {
  for (const key of ['plain', 'café', '✓', '😀', 'lone \ud800 surrogate']) {
    const utf8 = Buffer.from(key, 'utf8')
    const encoded = new KeyValue({ key }).encode()
    assert.strictEqual(hex(encoded), '0a' + utf8.length.toString(16).padStart(2, '0') + utf8.toString('hex'), key)
    assert.strictEqual(KeyValue.decode(encoded).key, Buffer.from(utf8).toString('utf8'))
  }
})

test('Sample decoding', async (t) => {
  await t.test('accepts non-packed timestamps', () => {
    // timestamps_unix_nano (field 5) as two fixed64 fields
    const sample = Sample.decode(fromHex('29' + '0100000000000000' + '29' + '0200000000000000'))
    assert.deepStrictEqual(sample.timestampsUnixNano, [1, 2])
  })

  await t.test('skips fields with mismatched wire types', () => {
    // stack_index (field 1) as length-delimited, then link_index (field 3)
    const sample = Sample.decode(fromHex('0a0105' + '1807'))
    assert.strictEqual(sample.stackIndex, 0)
    assert.strictEqual(sample.linkIndex, 7)
  })
})

// Round trips don't test merging; supply repeated occurrences explicitly.
test('decoding merges occurrences of singular message fields', async (t) => {
  await t.test('merges the fields of each occurrence', () => {
    // sample_type { type_strindex: 1 } followed by sample_type { unit_strindex: 2 }
    const profile = Profile.decode(fromHex('0a020801' + '0a021002'))
    assert.strictEqual(profile.sampleType!.typeStrindex, 1)
    assert.strictEqual(profile.sampleType!.unitStrindex, 2)
  })

  await t.test('merges a message member of a oneof encoded again', () => {
    const array = (i: number) => new AnyValue({ arrayValue: { values: [{ intValue: i }] } }).encode()
    const merged = AnyValue.decode(new Uint8Array([...array(1), ...array(2)]))
    assert.deepStrictEqual(merged.arrayValue!.values.map(v => v.intValue), [1, 2])

    // A different member in between replaces the earlier array
    const int = new AnyValue({ intValue: 5 }).encode()
    const replaced = AnyValue.decode(new Uint8Array([...array(1), ...int, ...array(2)]))
    assert.deepStrictEqual(replaced.arrayValue!.values.map(v => v.intValue), [2])
    assert.strictEqual(replaced.intValue, undefined)
  })

  await t.test('merges dictionaries before applying table defaults', () => {
    const strings = new StringTable()
    strings.dedup('a')
    const first = new ProfilesData({ dictionary: { functionTable: [{}, { nameStrindex: 1 }], stringTable: strings } })
    const moreStrings = new StringTable(emptyTableToken)
    moreStrings.dedup('b')
    const second = new ProfilesData({
      dictionary: {
        mappingTable: [],
        locationTable: [],
        functionTable: [{ nameStrindex: 2 }],
        linkTable: [],
        stringTable: moreStrings,
        attributeTable: [],
        stackTable: []
      }
    })
    const { dictionary } = ProfilesData.decode(new Uint8Array([...first.encode(), ...second.encode()]))
    assert.deepStrictEqual(dictionary!.functionTable.map(f => f.nameStrindex), [0, 1, 2])
    assert.deepStrictEqual(dictionary!.stringTable.strings, ['', 'a', 'b'])
    assert.strictEqual(dictionary!.mappingTable.length, 1, 'no extra zero entry')
  })
})

test('decoding preserves a leading U+FEFF in strings', () => {
  const value = new AnyValue({ stringValue: '\uFEFFhello' })
  assert.strictEqual(AnyValue.decode(value.encode()).stringValue, '\uFEFFhello')

  const strings = new StringTable()
  strings.dedup('\uFEFFx')
  const dictionary = ProfilesDictionary.decode(new ProfilesDictionary({ stringTable: strings }).encode())
  assert.deepStrictEqual(dictionary.stringTable.strings, ['', '\uFEFFx'])
})
