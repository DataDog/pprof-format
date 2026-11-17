import assert from 'node:assert/strict'
import process from 'node:process'
import { performance } from 'node:perf_hooks'

const codec = await import(process.env.CODEC ?? '../dist/esm/index.js')
const { Label, Profile, ProfileWriter, Sample, StringTable } = codec
const name = process.argv[2] ?? 'writer'
const count = Number(process.env.SAMPLES ?? 6500)
const samples = Array.from({ length: count },
  /**
   * @param {undefined} value
   * @param {number} index
   */
  (value, index) => ({
    stack: Array.from({ length: 4 + index % 29 },
      /**
       * @param {undefined} value
       * @param {number} frame
       */
      (value, frame) => frame + 1),
    value: [1, 10000000],
    labels: [[1, 2, 0, 0], [3, 0, index % 8, 0], [4, 0, 4294967296 + index, 0],
      [5, 0, 9223372036854775807n - BigInt(index), 0]],
  }))

function metadata() {
  const strings = new StringTable()
  for (const value of ['thread name', 'main', 'thread id', 'span id', 'trace id', 'samples', 'count', 'cpu',
    'nanoseconds', 'main.js']) {
    strings.dedup(value)
  }
  return new Profile({
    sampleType: [{ type: 6, unit: 7 }, { type: 8, unit: 9 }],
    function: [{ id: 1, name: 2, filename: 10 }],
    location: Array.from({ length: 32 },
      /**
       * @param {undefined} value
       * @param {number} index
       */
      (value, index) => ({ id: index + 1, line: [{ functionId: 1, line: index }] })),
    stringTable: strings,
    timeNanos: 1700000000000000000n,
    durationNanos: 65000000000,
    periodType: { type: 8, unit: 9 },
    period: 10000000,
  })
}

function objects() {
  const profile = metadata()
  for (const sample of samples) {
    const label = []
    for (const [key, str, num, numUnit] of sample.labels) {
      label.push(new Label({ key, str, num, numUnit }))
    }
    profile.sample.push(new Sample({ locationId: sample.stack, value: sample.value, label }))
  }
  return profile.encode()
}

function direct() {
  const profile = metadata()
  const writer = new ProfileWriter()
  for (const sample of samples) {
    writer.writeSample(sample.stack, sample.value)
    for (const [key, str, num, numUnit] of sample.labels) {
      writer.writeLabel(key, str, num, numUnit)
    }
  }
  return writer.encode(profile)
}

const operation = name === 'baseline' ? objects : direct
const expected = objects()
assert.deepEqual(operation(), expected)
let checksum = 0
for (let round = 0; round < 150; round++) {
  checksum += operation().length
}
const cpu = process.cpuUsage()
const start = performance.now()
for (let round = 0; round < 100; round++) {
  checksum += operation().length
}
const meanMs = (performance.now() - start) / 100
const usage = process.cpuUsage(cpu)
process.stdout.write(JSON.stringify({ name, node: process.version, v8: process.versions.v8, samples: count,
  meanMs, cpuMs: (usage.user + usage.system) / 100000, bytes: expected.length, checksum, wireEquality: true }) + '\n')
