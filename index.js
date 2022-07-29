/*!
 * Private helpers. These are only used by other helpers.
 */
const lowMaxBig = 2n ** 32n - 1n
const lowMax = 2 ** 32 - 1

function countNumberBytes (buffer) {
  if (!buffer.length) return 0
  let i = 0
  while (i < buffer.length && buffer[i++] >= 0b10000000);
  return i
}

function decodeBigNumber (buffer) {
  if (!buffer.length) return BigInt(0)
  let value = BigInt(buffer[0] & 0b01111111)
  let i = 0
  while (buffer[i++] >= 0b10000000) {
    value |= BigInt(buffer[i] & 0b01111111) << BigInt(7 * i)
  }
  return value
}

function makeValue (value, offset = 0) {
  return { value, offset }
}

function getValue (mode, buffer) {
  switch (mode) {
    case kTypeVarInt:
      for (let i = 0; i < buffer.length; i++) {
        if (!(buffer[i] & 0b10000000)) {
          return makeValue(buffer.slice(0, i + 1))
        }
      }
      return makeValue(buffer)
    case kTypeLengthDelim: {
      const offset = countNumberBytes(buffer)
      const size = decodeNumber(buffer)
      return makeValue(buffer.slice(offset, Number(size) + 1), offset)
    }
    default:
      throw new Error(`Unrecognized value type: ${mode}`)
  }
}

function lowBits (number) {
  return typeof number === 'bigint'
    ? Number(number & lowMaxBig)
    : (number >>> 0) % (lowMax + 1)
}

function highBits (number) {
  return typeof number === 'bigint'
    ? Number(number >> 32n & lowMaxBig)
    : (number / (lowMax + 1)) >>> 0
}

function long (number) {
  const sign = number < 0
  if (sign) number = -number

  let lo = lowBits(number)
  let hi = highBits(number)

  if (sign) {
    hi = ~hi >>> 0
    lo = ~lo >>> 0
    if (++lo > lowMax) {
      lo = 0
      if (++hi > lowMax) { hi = 0 }
    }
  }

  return [hi, lo]
}

/**
 * Public helpers. These are used in the type definitions.
 */
const kTypeVarInt = 0
const kTypeLengthDelim = 2

function decodeNumber (buffer) {
  const size = countNumberBytes(buffer)
  if (size > 4) return decodeBigNumber(buffer)
  if (!buffer.length) return 0

  let value = buffer[0] & 0b01111111
  let i = 0
  while (buffer[i++] >= 0b10000000) {
    value |= (buffer[i] & 0b01111111) << (7 * i)
  }
  return value
}

function decodeNumbers (buffer) {
  const values = []
  let start = 0

  for (let i = 0; i < buffer.length; i++) {
    if ((buffer[i] & 0b10000000) === 0) {
      values.push(decodeNumber(buffer.slice(start, i + 1)))
      start = i + 1
    }
  }

  return values
}

function push (value, list) {
  return Array.isArray(list) ? list.concat(value) : [value]
}

function measureNumber (number) {
  const [hi, lo] = long(number)

  const a = lo
  const b = (lo >>> 28 | hi << 4) >>> 0
  const c = hi >>> 24

  if (c !== 0) {
    return c < 128 ? 9 : 10
  }

  if (b !== 0) {
    if (b < 16384) {
      return b < 128 ? 5 : 6
    }

    return b < 2097152 ? 7 : 8
  }

  if (a < 16384) {
    return a < 128 ? 1 : 2
  }

  return a < 2097152 ? 3 : 4
}

function measureValue (value) {
  if (typeof value === 'number' || typeof value === 'bigint') {
    return measureNumber(value)
  }
  if (typeof value === 'string') {
    const buffer = new TextEncoder().encode(value)
    return buffer.length
  }
  return value.length
}

function measureArray (list) {
  return list.map(measureValue).reduce((m, v) => m + v, 0)
}

function encodeNumber (buffer, number) {
  let [hi, lo] = long(number)

  let i = 0
  while (hi) {
    buffer[i++] = lo & 127 | 128
    lo = (lo >>> 7 | hi << 25) >>> 0
    hi >>>= 7
  }
  while (lo > 127) {
    buffer[i++] = lo & 127 | 128
    lo = lo >>> 7
  }
  buffer[i++] = lo

  return i
}

export class StringTable extends Array {
  #map = new Map()

  constructor () {
    super()
    this.push('')
  }

  static from (values) {
    if (values instanceof StringTable) {
      return values
    }

    // Need to copy over manually to ensure the lookup map is correct
    const table = new StringTable()
    for (const value of values) {
      table.#map.set(value, table.push(value) - 1)
    }

    return table
  }

  dedup (string) {
    if (!string) return 0
    if (typeof string === 'number') return string
    if (!this.#map.has(string)) {
      this.#map.set(string, this.push(string) - 1)
    }
    return this.#map.get(string)
  }
}

class Base {
  encode (buffer = new Uint8Array(this.length)) {
    this.encodeToBuffer(buffer)
    return buffer
  }

  static decode (buffer) {
    const data = {}
    let index = 0

    while (index < buffer.length) {
      const field = buffer[index] >> 3
      const mode = buffer[index] & 0b111
      index++

      const { offset, value } = getValue(mode, buffer.slice(index))
      index += value.length + offset

      this.decodeValue(data, field, value)
    }

    return new this(data)
  }
}

export class ValueType extends Base {
  constructor (data) {
    super()
    this.type = data.type
    this.unit = data.unit
  }

  get length () {
    let size = 0
    if (typeof this.type !== 'undefined') size += 1 + measureNumber(this.type)
    if (typeof this.unit !== 'undefined') size += 1 + measureNumber(this.unit)
    return size
  }

  encodeToBuffer (buffer, offset = 0) {
    if (typeof this.type !== 'undefined') {
      buffer[offset++] = (1 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.type)
    }

    if (typeof this.unit !== 'undefined') {
      buffer[offset++] = (2 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.unit)
    }

    return offset
  }

  static decodeValue (data, field, buffer) {
    switch (field) {
      case 1:
        data.type = decodeNumber(buffer)
        break
      case 2:
        data.unit = decodeNumber(buffer)
        break
    }
  }
}

export class Label extends Base {
  constructor (data) {
    super()
    this.key = data.key
    this.str = data.str
    this.num = data.num
    this.numUnit = data.numUnit
  }

  get length () {
    let total = 0
    if (typeof this.key !== 'undefined') total += 1 + measureNumber(this.key)
    if (typeof this.str !== 'undefined') total += 1 + measureNumber(this.str)
    if (typeof this.num !== 'undefined') total += 1 + measureNumber(this.num)
    if (typeof this.numUnit !== 'undefined') total += 1 + measureNumber(this.numUnit)
    return total
  }

  encodeToBuffer (buffer, offset = 0) {
    if (typeof this.key !== 'undefined') {
      buffer[offset++] = (1 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.key)
    }

    if (typeof this.str !== 'undefined') {
      buffer[offset++] = (2 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.str)
    }

    if (typeof this.num !== 'undefined') {
      buffer[offset++] = (3 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.num)
    }

    if (typeof this.numUnit !== 'undefined') {
      buffer[offset++] = (4 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.numUnit)
    }

    return offset
  }

  static decodeValue (data, field, buffer) {
    switch (field) {
      case 1:
        data.key = decodeNumber(buffer)
        break
      case 2:
        data.str = decodeNumber(buffer)
        break
      case 3:
        data.num = decodeNumber(buffer)
        break
      case 4:
        data.numUnit = decodeNumber(buffer)
        break
    }
  }
}

export class Sample extends Base {
  constructor (data) {
    super()
    this.locationId = data.locationId || []
    this.value = data.value || []
    this.label = (data.label || []).map(l => new Label(l))
  }

  get length () {
    let total = 0
    if (this.locationId.length) total += 2 + measureArray(this.locationId)
    if (this.value.length) total += 2 + measureArray(this.value)
    if (this.label.length) total += (2 * this.label.length) + measureArray(this.label)
    return total
  }

  encodeToBuffer (buffer, offset = 0) {
    if (this.locationId.length) {
      buffer[offset++] = (1 << 3) + kTypeLengthDelim
      offset += encodeNumber(buffer.subarray(offset++), measureArray(this.locationId))
      for (const locationId of this.locationId) {
        offset += encodeNumber(buffer.subarray(offset++), locationId)
      }
    }

    if (this.value.length) {
      buffer[offset++] = (2 << 3) + kTypeLengthDelim
      offset += encodeNumber(buffer.subarray(offset++), measureArray(this.value))
      for (const value of this.value) {
        offset += encodeNumber(buffer.subarray(offset++), value)
      }
    }

    for (const label of this.label) {
      buffer[offset++] = (3 << 3) + kTypeLengthDelim
      offset += encodeNumber(buffer.subarray(offset++), label.length)
      offset += label.encodeToBuffer(buffer.subarray(offset++, offset + label.length))
    }

    return offset
  }

  static decodeValue (data, field, buffer) {
    switch (field) {
      case 1:
        data.locationId = decodeNumbers(buffer)
        break
      case 2:
        data.value = decodeNumbers(buffer)
        break
      case 3:
        data.label = push(Label.decode(buffer), data.label)
        break
    }
  }
}

export class Mapping extends Base {
  constructor (data) {
    super()
    this.id = data.id
    this.memoryStart = data.memoryStart
    this.memoryLimit = data.memoryLimit
    this.fileOffset = data.fileOffset
    this.filename = data.filename
    this.buildId = data.buildId
    this.hasFunctions = !!data.hasFunctions
    this.hasFilenames = !!data.hasFilenames
    this.hasLineNumbers = !!data.hasLineNumbers
    this.hasInlineFrames = !!data.hasInlineFrames
  }

  get length () {
    let total = 0
    if (typeof this.id !== 'undefined') total += 1 + measureNumber(this.id)
    if (typeof this.memoryStart !== 'undefined') total += 1 + measureNumber(this.memoryStart)
    if (typeof this.memoryLimit !== 'undefined') total += 1 + measureNumber(this.memoryLimit)
    if (typeof this.fileOffset !== 'undefined') total += 1 + measureNumber(this.fileOffset)
    if (typeof this.filename !== 'undefined') total += 1 + measureNumber(this.filename)
    if (typeof this.buildId !== 'undefined') total += 1 + measureNumber(this.buildId)
    if (this.hasFunctions) total += 1 + measureNumber(this.hasFunctions)
    if (this.hasFilenames) total += 1 + measureNumber(this.hasFilenames)
    if (this.hasLineNumbers) total += 1 + measureNumber(this.hasLineNumbers)
    if (this.hasInlineFrames) total += 1 + measureNumber(this.hasInlineFrames)
    return total
  }

  encodeToBuffer (buffer, offset = 0) {
    if (typeof this.id !== 'undefined') {
      buffer[offset++] = (1 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.id)
    }
    if (typeof this.memoryStart !== 'undefined') {
      buffer[offset++] = (2 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.memoryStart)
    }
    if (typeof this.memoryLimit !== 'undefined') {
      buffer[offset++] = (3 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.memoryLimit)
    }
    if (typeof this.fileOffset !== 'undefined') {
      buffer[offset++] = (4 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.fileOffset)
    }
    if (typeof this.filename !== 'undefined') {
      buffer[offset++] = (5 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.filename)
    }
    if (typeof this.buildId !== 'undefined') {
      buffer[offset++] = (6 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.buildId)
    }
    if (this.hasFunctions) {
      buffer[offset++] = (7 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.hasFunctions)
    }
    if (this.hasFilenames) {
      buffer[offset++] = (8 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.hasFilenames)
    }
    if (this.hasLineNumbers) {
      buffer[offset++] = (9 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.hasLineNumbers)
    }
    if (this.hasInlineFrames) {
      buffer[offset++] = (10 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.hasInlineFrames)
    }
    return offset
  }

  static decodeValue (data, field, buffer) {
    switch (field) {
      case 1:
        data.id = decodeNumber(buffer)
        break
      case 2:
        data.memoryStart = decodeNumber(buffer)
        break
      case 3:
        data.memoryLimit = decodeNumber(buffer)
        break
      case 4:
        data.fileOffset = decodeNumber(buffer)
        break
      case 5:
        data.filename = decodeNumber(buffer)
        break
      case 6:
        data.buildId = decodeNumber(buffer)
        break
      case 7:
        data.hasFunctions = !!decodeNumber(buffer)
        break
      case 8:
        data.hasFilenames = !!decodeNumber(buffer)
        break
      case 9:
        data.hasLineNumbers = !!decodeNumber(buffer)
        break
      case 10:
        data.hasInlineFrames = !!decodeNumber(buffer)
        break
    }
  }
}

export class Line extends Base {
  constructor (data) {
    super()
    this.functionId = data.functionId
    this.line = data.line
  }

  get length () {
    let size = 0
    if (typeof this.functionId !== 'undefined') size += 1 + measureNumber(this.functionId)
    if (typeof this.line !== 'undefined') size += 1 + measureNumber(this.line)
    return size
  }

  encodeToBuffer (buffer, offset = 0) {
    if (typeof this.functionId !== 'undefined') {
      buffer[offset++] = (1 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.functionId)
    }

    if (typeof this.line !== 'undefined') {
      buffer[offset++] = (2 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.line)
    }

    return offset
  }

  static decodeValue (data, field, buffer) {
    switch (field) {
      case 1:
        data.functionId = decodeNumber(buffer)
        break
      case 2:
        data.line = decodeNumber(buffer)
        break
    }
  }
}

export class Location extends Base {
  constructor (data) {
    super()
    this.id = data.id
    this.mappingId = data.mappingId
    this.address = data.address
    this.line = (data.line || []).map(l => new Line(l))
    this.isFolded = !!data.isFolded
  }

  get length () {
    let total = 0
    if (typeof this.id !== 'undefined') total += 1 + measureNumber(this.id)
    if (typeof this.mappingId !== 'undefined') total += 1 + measureNumber(this.mappingId)
    if (typeof this.address !== 'undefined') total += 1 + measureNumber(this.address)
    if (this.line.length) total += (2 * this.line.length) + measureArray(this.line)
    if (this.isFolded) total += 1 + measureNumber(this.isFolded)
    return total
  }

  encodeToBuffer (buffer, offset = 0) {
    if (typeof this.id !== 'undefined') {
      buffer[offset++] = (1 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.id)
    }
    if (typeof this.mappingId !== 'undefined') {
      buffer[offset++] = (2 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.mappingId)
    }
    if (typeof this.address !== 'undefined') {
      buffer[offset++] = (3 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.address)
    }
    for (const line of this.line) {
      buffer[offset++] = (4 << 3) + kTypeLengthDelim
      offset += encodeNumber(buffer.subarray(offset++), line.length)
      offset += line.encodeToBuffer(buffer.subarray(offset++, offset + line.length))
    }
    if (this.isFolded) {
      buffer[offset++] = (5 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.isFolded)
    }

    return offset
  }

  static decodeValue (data, field, buffer) {
    switch (field) {
      case 1:
        data.id = decodeNumber(buffer)
        break
      case 2:
        data.mappingId = decodeNumber(buffer)
        break
      case 3:
        data.address = decodeNumber(buffer)
        break
      case 4:
        data.line = push(Line.decode(buffer), data.line)
        break
      case 5:
        data.isFolded = !!decodeNumber(buffer)
        break
    }
  }
}

export class Function extends Base {
  constructor (data) {
    super()
    this.id = data.id
    this.name = data.name
    this.systemName = data.systemName
    this.filename = data.filename
    this.startLine = data.startLine
  }

  get length () {
    let total = 0
    if (typeof this.id !== 'undefined') total += 1 + measureNumber(this.id)
    if (typeof this.name !== 'undefined') total += 1 + measureNumber(this.name)
    if (typeof this.systemName !== 'undefined') total += 1 + measureNumber(this.systemName)
    if (typeof this.filename !== 'undefined') total += 1 + measureNumber(this.filename)
    if (typeof this.startLine !== 'undefined') total += 1 + measureNumber(this.startLine)
    return total
  }

  encodeToBuffer (buffer, offset = 0) {
    if (typeof this.id !== 'undefined') {
      buffer[offset++] = (1 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.id)
    }
    if (typeof this.name !== 'undefined') {
      buffer[offset++] = (2 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.name)
    }
    if (typeof this.systemName !== 'undefined') {
      buffer[offset++] = (3 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.systemName)
    }
    if (typeof this.filename !== 'undefined') {
      buffer[offset++] = (4 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.filename)
    }
    if (typeof this.startLine !== 'undefined') {
      buffer[offset++] = (5 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.startLine)
    }

    return offset
  }

  static decodeValue (data, field, buffer) {
    switch (field) {
      case 1:
        data.id = decodeNumber(buffer)
        break
      case 2:
        data.name = decodeNumber(buffer)
        break
      case 3:
        data.systemName = decodeNumber(buffer)
        break
      case 4:
        data.filename = decodeNumber(buffer)
        break
      case 5:
        data.startLine = decodeNumber(buffer)
        break
    }
  }
}

export class Profile extends Base {
  constructor (data = {}) {
    super()
    this.sampleType = (data.sampleType || []).map(v => new ValueType(v))
    this.sample = (data.sample || []).map(v => new Sample(v))
    this.mapping = (data.mapping || []).map(v => new Mapping(v))
    this.location = (data.location || []).map(v => new Location(v))
    this.function = (data.function || []).map(v => new Function(v))
    this.stringTable = StringTable.from(data.stringTable || [])
    this.dropFrames = data.dropFrames
    this.keepFrames = data.keepFrames
    this.timeNanos = data.timeNanos
    this.durationNanos = data.durationNanos
    this.periodType = data.periodType ? new ValueType(data.periodType) : undefined
    this.period = data.period
    this.comment = data.comment || []
    this.defaultSampleType = data.defaultSampleType
  }

  get length () {
    let total = 0
    if (this.sampleType.length) total += (2 * this.sampleType.length) + measureArray(this.sampleType)
    if (this.sample.length) total += (2 * this.sample.length) + measureArray(this.sample)
    if (this.mapping.length) total += (2 * this.mapping.length) + measureArray(this.mapping)
    if (this.location.length) total += (2 * this.location.length) + measureArray(this.location)
    if (this.function.length) total += (2 * this.function.length) + measureArray(this.function)
    if (this.stringTable.length > 1) {
      const contentLengths = this.stringTable.slice(1).map(measureValue)
      // Add a field + mode byte for each string
      total += contentLengths.length +
        // Measure length indicators for each string
        measureArray(contentLengths) +
        // Measure each string
        contentLengths.reduce((m, v) => m + v, 0)
    }
    if (typeof this.dropFrames !== 'undefined') total += 1 + measureNumber(this.dropFrames)
    if (typeof this.keepFrames !== 'undefined') total += 1 + measureNumber(this.keepFrames)
    if (typeof this.timeNanos !== 'undefined') total += 1 + measureNumber(this.timeNanos)
    if (typeof this.durationNanos !== 'undefined') total += 1 + measureNumber(this.durationNanos)
    if (typeof this.periodType !== 'undefined') total += 2 + measureValue(this.periodType)
    if (typeof this.period !== 'undefined') total += 1 + measureNumber(this.period)
    if (this.comment.length) total += 2 + measureArray(this.comment)
    if (typeof this.defaultSampleType !== 'undefined') total += 1 + measureNumber(this.defaultSampleType)
    return total
  }

  encodeToBuffer (buffer, offset = 0) {
    for (const sampleType of this.sampleType) {
      buffer[offset++] = (1 << 3) + kTypeLengthDelim
      offset += encodeNumber(buffer.subarray(offset++), sampleType.length)
      offset += sampleType.encodeToBuffer(buffer.subarray(offset++, offset + sampleType.length))
    }

    for (const sample of this.sample) {
      buffer[offset++] = (2 << 3) + kTypeLengthDelim
      offset += encodeNumber(buffer.subarray(offset++), sample.length)
      offset += sample.encodeToBuffer(buffer.subarray(offset++, offset + sample.length))
    }

    for (const mapping of this.mapping) {
      buffer[offset++] = (3 << 3) + kTypeLengthDelim
      offset += encodeNumber(buffer.subarray(offset++), mapping.length)
      offset += mapping.encodeToBuffer(buffer.subarray(offset++, offset + mapping.length))
    }

    for (const location of this.location) {
      buffer[offset++] = (4 << 3) + kTypeLengthDelim
      offset += encodeNumber(buffer.subarray(offset++), location.length)
      offset += location.encodeToBuffer(buffer.subarray(offset++, offset + location.length))
    }

    for (const fun of this.function) {
      buffer[offset++] = (5 << 3) + kTypeLengthDelim
      offset += encodeNumber(buffer.subarray(offset++), fun.length)
      offset += fun.encodeToBuffer(buffer.subarray(offset++, offset + fun.length))
    }

    for (const string of this.stringTable) {
      const stringBuffer = new TextEncoder().encode(string)
      if (!stringBuffer.length) continue

      buffer[offset++] = (6 << 3) + kTypeLengthDelim
      offset += encodeNumber(buffer.subarray(offset++), stringBuffer.length)
      buffer.subarray(offset++, offset + stringBuffer.length + 1).set(stringBuffer)
      offset += stringBuffer.length - 1
    }

    if (typeof this.dropFrames !== 'undefined') {
      buffer[offset++] = (7 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.dropFrames)
    }

    if (typeof this.keepFrames !== 'undefined') {
      buffer[offset++] = (8 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.keepFrames)
    }

    if (typeof this.timeNanos !== 'undefined') {
      buffer[offset++] = (9 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.timeNanos)
    }

    if (typeof this.durationNanos !== 'undefined') {
      buffer[offset++] = (10 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.durationNanos)
    }

    if (typeof this.periodType !== 'undefined') {
      buffer[offset++] = (11 << 3) + kTypeLengthDelim
      offset += encodeNumber(buffer.subarray(offset++), this.periodType.length)
      offset += this.periodType.encodeToBuffer(buffer.subarray(offset++, offset + this.periodType.length))
    }

    if (typeof this.period !== 'undefined') {
      buffer[offset++] = (12 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.period)
    }

    if (this.comment.length) {
      buffer[offset++] = (13 << 3) + kTypeLengthDelim
      offset += encodeNumber(buffer.subarray(offset++), measureArray(this.comment))
      for (const comment of this.comment) {
        offset += encodeNumber(buffer.subarray(offset++), comment)
      }
    }

    if (typeof this.defaultSampleType !== 'undefined') {
      buffer[offset++] = (14 << 3) + kTypeVarInt
      offset += encodeNumber(buffer.subarray(offset++), this.defaultSampleType)
    }

    return offset
  }

  static decodeValue (data, field, buffer) {
    switch (field) {
      case 1:
        data.sampleType = push(ValueType.decode(buffer), data.sampleType)
        break
      case 2:
        data.sample = push(Sample.decode(buffer), data.sample)
        break
      case 3:
        data.mapping = push(Mapping.decode(buffer), data.mapping)
        break
      case 4:
        data.location = push(Location.decode(buffer), data.location)
        break
      case 5:
        data.function = push(Function.decode(buffer), data.function)
        break
      case 6: {
        const string = new TextDecoder().decode(buffer)
        data.stringTable = push(string, data.stringTable)
        break
      }
      case 7:
        data.dropFrames = decodeNumber(buffer)
        break
      case 8:
        data.keepFrames = decodeNumber(buffer)
        break
      case 9:
        data.timeNanos = decodeNumber(buffer)
        break
      case 10:
        data.durationNanos = decodeNumber(buffer)
        break
      case 11:
        data.periodType = ValueType.decode(buffer)
        break
      case 12:
        data.period = decodeNumber(buffer)
        break
      case 13:
        data.comment = push(decodeNumber(buffer), data.comment)
        break
      case 14:
        data.defaultSampleType = decodeNumber(buffer)
        break
    }
  }
}
