import * as D from './decoders'

const ok = (input: any) => ({ ok: true, result: input })
const fail = () => ({ ok: false })

const numbers = [Number.MIN_SAFE_INTEGER, -1337, -42, 42, 1337, Number.MAX_SAFE_INTEGER]
const floats = [-13.37, -Math.PI, Math.PI, 13.37]
const zeros = [0, 0.0]
const strings = ['-13.37', '-1337', '', '0', '13.37',, '1337', 'typesafe decoding']
const booleans = [true, false]
const others = [ null, undefined, NaN, () => true, [], {} ]

/**
 * Primitives
 */

test('D.number()', () => {
  const decode = D.number()
  numbers.map(x => expect(decode(x)).toEqual(ok(x)))
  floats.map(x => expect(decode(x)).toEqual(ok(x)))
  zeros.map(x => expect(decode(x)).toEqual(ok(x)))
  strings.map(x => expect(decode(x)).toEqual(fail()))
  booleans.map(x => expect(decode(x)).toEqual(fail()))
  others.map(x => expect(decode(x)).toEqual(fail()))
})

test('D.string()', () => {
  const decode = D.string()
  numbers.map(x => expect(decode(x)).toEqual(fail()))
  floats.map(x => expect(decode(x)).toEqual(fail()))
  zeros.map(x => expect(decode(x)).toEqual(fail()))
  strings.map(x => expect(decode(x)).toEqual(ok(x)))
  booleans.map(x => expect(decode(x)).toEqual(fail()))
  others.map(x => expect(decode(x)).toEqual(fail()))
})

test('D.boolean()', () => {
  const decode = D.boolean()
  numbers.map(x => expect(decode(x)).toEqual(fail()))
  floats.map(x => expect(decode(x)).toEqual(fail()))
  zeros.map(x => expect(decode(x)).toEqual(fail()))
  strings.map(x => expect(decode(x)).toEqual(fail()))
  booleans.map(x => expect(decode(x)).toEqual(ok(x)))
  others.map(x => expect(decode(x)).toEqual(fail()))
})

test('D.is()', () => {
  const decode = D.optional(D.number())
  numbers.map(x => expect(decode(x)).toEqual(ok(x)))
  floats.map(x => expect(decode(x)).toEqual(ok(x)))
  zeros.map(x => expect(decode(x)).toEqual(ok(x)))
  strings.map(x => expect(decode(x)).toEqual(fail()))
  booleans.map(x => expect(decode(x)).toEqual(fail()))
  others.filter(x => x !== undefined).map(x => expect(decode(x)).toEqual(fail()))
  expect(decode(undefined)).toEqual(ok(undefined))
})

test('D.is()', () => {
  const decode = D.is('yolo')
  numbers.map(x => expect(decode(x)).toEqual(fail()))
  floats.map(x => expect(decode(x)).toEqual(fail()))
  zeros.map(x => expect(decode(x)).toEqual(fail()))
  strings.map(x => expect(decode(x)).toEqual(fail()))
  booleans.map(x => expect(decode(x)).toEqual(fail()))
  others.map(x => expect(decode(x)).toEqual(fail()))
  expect(decode('yolo')).toEqual(ok('yolo'))
})

/**
 * Object
 */
test('D.object()', () => {

  type Group = {
    id: number
    label: string
  }

  type User = {
    id: number
    username: string
    password: string
    group: Group
  }

  const decodeUser = D.object<User>({
    id: D.number(),
    username: D.string(),
    password: D.string(),
    group: D.object({
      id: D.number(),
      label: D.string(),
    })
  })

  const userJson = `
    {
      "id": 123,
      "username": "decoder",
      "password": "secret",
      "group":{
        "id": 456,
        "label": "admins"
      }
    }
  `

  const userResult = decodeUser(JSON.parse(userJson))
  
  expect(userResult.ok).toBe(true)
  if(userResult.ok){
    expect(userResult.result).toEqual({
      id: 123,
      username: 'decoder',
      password: 'secret',
      group:{
        id: 456,
        label: 'admins',
      }
    })
  }

})

/**
 * Array
 */
test('D.array()', () => {
  const decode = D.array<number>(D.number())
  expect(decode(null)).toEqual(fail())
  expect(decode({})).toEqual(fail())
  expect(decode([])).toEqual(ok([]))
  expect(decode([1, 2, 3])).toEqual(ok([1, 2, 3]))
  expect(decode([1, '2', 3])).toEqual(fail())
})

/**
 * Tuple
 */
test('D.tuple()', () => {
  const decode = D.tuple<[string, number]>([
    D.string(),
    D.number(),
  ])
  expect(decode(null)).toEqual(fail())
  expect(decode({})).toEqual(fail())
  expect(decode([])).toEqual(fail())
  expect(decode([1])).toEqual(fail())
  expect(decode([1, "2"])).toEqual(fail())
  expect(decode(["1", 2])).toEqual(ok(["1", 2]))
})