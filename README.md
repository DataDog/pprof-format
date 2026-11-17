# pprof-format

A pure JavaScript PProf encoder and decoder library with zero dependencies and
browser support. No protobuf, because the pprof spec only uses a tiny fraction
of the features. Uint8Arrays rather than Node.js buffers so it can work in the
browser. Carefully tuned to be as fast as possible.

## Install

```sh
npm install pprof-format
```

## Usage

```js
import {
  Function,
  Label,
  Line,
  Location,
  Mapping,
  Profile,
  Sample,
  ValueType,
  StringTable
} from 'pprof-format'

const stringTable = new StringTable()

const periodType = new ValueType({
  type: stringTable.dedup('cpu'),
  unit: stringTable.dedup('nanoseconds')
})

const fun = new Function({
  id: 1,
  name: stringTable.dedup('name'),
  systemName: stringTable.dedup('system name'),
  filename: stringTable.dedup('filename'),
  startLine: 123
})

const mapping = new Mapping({
  id: 1
})

const location = new Location({
  id: 1,
  mappingId: mapping.id,
  address: 123,
  line: [
    new Line({
      functionId: fun.id,
      line: 1234
    })
  ]
})

const profile = new Profile({
  sampleType: [
    new ValueType({
      type: stringTable.dedup('sample'),
      unit: stringTable.dedup('count')
    }),
    periodType
  ],
  sample: [
    new Sample({
      locationId: [location.id],
      value: [123, 456],
      label: [
        new Label({
          key: stringTable.dedup('label key'),
          str: stringTable.dedup('label str')
        }),
        new Label({
          key: stringTable.dedup('label key'),
          num: 12345,
          numUnit: stringTable.dedup('label num unit')
        })
      ]
    })
  ],
  mapping: [mapping],
  location: [location],
  'function': [fun],
  stringTable,
  timeNanos: BigInt(Date.now()) * 1_000_000n,
  durationNanos: 1234,
  periodType,
  period: 1234 / 2,
  comment: [
    stringTable.dedup('some comment')
  ]
})

// Encode to Uint8Array
console.log(profile.encode())

// Decode from Uint8Array
const copied = Profile.decode(profile.encode())

// Should match the structure of the original profile object
console.log(copied)
```

## Writing samples directly

Use `ProfileWriter` when samples arrive incrementally and you only need encoded
bytes. It avoids constructing and retaining `Sample` and `Label` objects.

```js
import { ProfileWriter, StringTable } from 'pprof-format'

const strings = new StringTable()
const writer = new ProfileWriter()

writer.writeSample([1], [123, 456])
writer.writeLabel(strings.dedup('thread name'), strings.dedup('main'))
writer.writeLabel(strings.dedup('thread id'), 0, 1)

const bytes = writer.encode({
  sampleType: [{ type: strings.dedup('samples'), unit: strings.dedup('count') },
    { type: strings.dedup('cpu'), unit: strings.dedup('nanoseconds') }],
  location: [{ id: 1 }],
  stringTable: strings
})
```

`writeSample(locationId, value)` consumes both arrays immediately. Subsequent
`writeLabel(key, str = 0, num = 0, numUnit = 0)` calls add labels to that sample.
Label keys, strings, and units are string-table indices, as with `Label`.

`encode(data = {}, buffer?)` accepts the same metadata and destination buffer as
`Profile`. Any samples in `data` precede the written samples. Encoding closes the
current sample, so another label requires a new `writeSample` call. You can encode
again or append more samples. Each allocated result owns its bytes. The writer
retains its encoded samples until you release it.

## OpenTelemetry profiles

The `pprof-format/otel` entry point encodes and decodes the OpenTelemetry
profiles signal, as defined by
[opentelemetry-proto](https://github.com/open-telemetry/opentelemetry-proto)
v1.11.1. The signal is still in development, so its messages may change.

Its classes mirror the proto messages, with camelCase field names. Profiles
refer to functions, locations, stacks, strings and other entries by index into
a dictionary shared by all profiles of a request. Each dictionary table starts
with the zero value of its type at index 0, which means "not set"; tables that
aren't given default to just that entry.

```js
import {
  ExportProfilesServiceRequest,
  StringTable
} from 'pprof-format/otel'

const strings = new StringTable()
const cpu = {
  typeStrindex: strings.dedup('cpu'),
  unitStrindex: strings.dedup('nanoseconds')
}

const request = new ExportProfilesServiceRequest({
  resourceProfiles: [{
    resource: {
      attributes: [{ key: 'service.name', value: { stringValue: 'my-service' } }]
    },
    scopeProfiles: [{
      scope: { name: 'my-profiler', version: '1.0.0' },
      profiles: [{
        sampleType: cpu,
        periodType: cpu,
        period: 10_000_000,
        timeUnixNano: BigInt(Date.now()) * 1_000_000n,
        durationNano: 60_000_000_000,
        samples: [{ stackIndex: 1, values: [10_000_000] }]
      }]
    }]
  }],
  dictionary: {
    functionTable: [{}, {
      nameStrindex: strings.dedup('main'),
      filenameStrindex: strings.dedup('main.js')
    }],
    locationTable: [{}, { lines: [{ functionIndex: 1, line: 12, column: 3 }] }],
    stackTable: [{}, { locationIndices: [1] }],
    stringTable: strings
  }
})

// Encode to Uint8Array, e.g. as the body of an OTLP export request
const body = request.encode()

// Decode from Uint8Array
const copied = ExportProfilesServiceRequest.decode(body)
```
