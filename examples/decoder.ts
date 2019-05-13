import { number, string, object, array, is, DecoderOf } from './../src/decoders'

type Group = {
  id: number
  label: string
}

type User = {
  username: string
  password: string
  group: Group
}

const userShape: DecoderOf<User> = {
  username: string(),
  password: string(),
  group: object({
    id: number(),
    label: string(),
  }),
}