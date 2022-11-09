/**
 * Unless explicitly stated otherwise all files in this repository are licensed under the MIT License.
 * 
 * This product includes software developed at Datadog (https://www.datadoghq.com/  Copyright 2022 Datadog, Inc.
 */

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
  function: [fun],
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

console.log(copied)
