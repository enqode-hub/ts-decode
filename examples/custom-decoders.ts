import * as D from './../src'

type Superpower =  'freeze' | 'burn' | 'flash'

type Hero = {
  name: string
  superpower: Superpower
  hp: number | undefined
}

const json = `
  {
    "name": "Decodeman",
    "superpower": "burn",
    "hp": 100.10
  }
`

const isSuperpower: D.Assert<Superpower> = (input: any): input is Superpower =>
  [ 'freeze', 'burn', 'flash' ].some(x => x === input)

const superpower = (): D.Decoder<Superpower> => (input: any): D.DecoderResult<Superpower> =>
  isSuperpower(input) ? D.ok(input) : D.fail()

const decodeHero = D.object<Hero>({
  name: D.string(),
  superpower: superpower(),
  hp: D.optional(D.number())
})

const decodeHeroResult = decodeHero(JSON.parse(json))
console.log(decodeHeroResult)
