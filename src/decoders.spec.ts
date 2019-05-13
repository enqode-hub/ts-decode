import * as D from './decoders'

const failed = () => ({ failed: true })
const success = (input: any) => ({ failed: false, result: input })

test('number()', () => {
  expect(D.number()('yolo')).toEqual(failed())
  expect(D.number()('1.0')).toEqual(failed())
  expect(D.number()(1.0)).toEqual(success(1.0))
  expect(D.number()(-Math.PI)).toEqual(success(-Math.PI))
})

test('string()', () => {
  expect(D.string()('yolo')).toEqual(success('yolo'))
  expect(D.string()('1.0')).toEqual(success('1.0'))
  expect(D.string()(1.0)).toEqual(failed())
  expect(D.string()(-Math.PI)).toEqual(failed())
})

test('DecoderOf<T> (static typecheck)', () => {

  type Group = {
    id: number
    label: string
  }

  type Err = { error: true, message: string } | { error: false }

  type User = {
    username: string
    password: string
    group: Group
    keys: string[]
    error: Err
  }

  const userShape: D.DecoderOf<User> = {
    username: D.string(),
    password: D.string(),
    group: D.object({
      id: D.number(),
      label: D.string(),
    }),
    keys: D.array(D.string()),
    error: D.object({
      error: D.is<false>(false),
      message: D.string(),
    })
  }

})
