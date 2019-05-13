import {
  isBoolean,
  isNumber,
  isInt,
  isFloat,
  isString,
  isArray,
  isObject
} from './assertions'

test('isBoolean', () => {
  expect(isBoolean(null)).toBe(false)
  expect(isBoolean(undefined)).toBe(false)
  expect(isBoolean(0)).toBe(false)
  expect(isBoolean('')).toBe(false)
  expect(isBoolean('true')).toBe(false)
  expect(isBoolean(false)).toBe(true)
  expect(isBoolean(false)).toBe(true)
  expect(isBoolean(false)).toBe(true)
})

test('isNumber()', () => {
  expect(isNumber(null)).toBe(false)
  expect(isNumber('0')).toBe(false)
  expect(isNumber(10)).toBe(true)
  expect(isNumber(-10)).toBe(true)
  expect(isNumber(0)).toBe(true)
  expect(isNumber(10.10)).toBe(true)
  expect(isNumber(-10.10)).toBe(true)
})

test('isInt()', () => {
  expect(isInt(null)).toBe(false)
  expect(isInt('0')).toBe(false)
  expect(isInt(10)).toBe(true)
  expect(isInt(-10)).toBe(true)
  expect(isInt(0)).toBe(true)
  expect(isInt(10.10)).toBe(false)
  expect(isInt(-10.10)).toBe(false)
})

test('isFloat()', () => {
  expect(isFloat(null)).toBe(false)
  expect(isFloat('0')).toBe(false)
  expect(isFloat(10)).toBe(false)
  expect(isFloat(-10)).toBe(false)
  expect(isFloat(0.0)).toBe(true)
  expect(isFloat(10.10)).toBe(true)
  expect(isFloat(-10.10)).toBe(true)
})

test('isString', () => {
  expect(isString([1, 2, 3])).toBe(false)
  expect(isString(123)).toBe(false)
  expect(isString(() => false)).toBe(false)
  expect(isString('')).toBe(true)
  expect(isString('foo')).toBe(true)
})

test('isArray', () => {
  expect(isArray([1, 2, 3])).toBe(true)
  expect(isArray([])).toBe(true)
  expect(isArray({ length: 0 })).toBe(false)
  expect(isArray({})).toBe(false)
})

test('isObject', () => {
  expect(isObject(1337)).toBe(false)
  expect(isObject([1, 2, 3])).toBe(false)
  expect(isObject([])).toBe(false)
  expect(isObject({ length: 0 })).toBe(true)
  expect(isObject({})).toBe(true)
})
