import * as D from './decoders'
import { decode } from './decode'

test('decode()', () => {

  type User = {
    id: number
    username: string
    password: string
  }

  const shape: D.DecoderOf<User> = {
    id: D.number(),
    username: D.string(),
    password: D.string(),
  }

  const userJson = `
    {
      "id": 123,
      "username": "decoder",
      "password": "123"
    }
  `

  const userResult = decode(shape)(JSON.parse(userJson))
  if(userResult.failed){
    console.log('decoding failed')
  } else {
    console.log(userResult.result.id)
    console.log(userResult.result.username)
    console.log(userResult.result.password)
  }

})