import * as D from './../src'

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
  group: D.object<Group>({
    id: D.number(),
    label: D.string(),
  })
})

const json = `
  {
    "id": 123,
    "username": "deqode",
    "password": "secret",
    "group":{
      "id": 456,
      "label": "devs"
    }
  }
`
const decodeUserResult = decodeUser(JSON.parse(json))
if(decodeUserResult.ok){
  console.log(decodeUserResult.result)
}