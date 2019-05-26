import * as A from './assertions'

export type DecoderResult<T> = { ok: true, result: T } | { ok: false }

export type Decoder<T> =
  (input: any) => DecoderResult<T>

export type DecoderOf<T> = {
  [P in keyof T]: Decoder<T[P]>
}

export const ok = <T>(value: T): DecoderResult<T> =>
  ({ ok: true, result: value })

export const fail = <T>(): DecoderResult<T> =>
  ({ ok: false })

export const boolean = (): Decoder<boolean> =>
  (input: any) => A.isBoolean(input) ? ok(input) : fail()

export const number = (): Decoder<number> =>
  (input: any) => A.isNumber(input) ? ok(input) : fail()

export const string = (): Decoder<string> =>
  (input: any) => A.isString(input) ? ok(input) : fail()

export const optional = <T>(decode: Decoder<T>): Decoder<T | undefined> =>
  (input: any) => input === undefined ? ok(undefined) : decode(input)

export const is = <T>(value: T): Decoder<T> =>
  (input: any) => input === value ? ok(input) : fail()

export const object = <T>(decoder: DecoderOf<T>): Decoder<T> =>
  (input: any) => {
    const result: any = {}
    for(const prop in decoder){
      const value = decoder[prop](input ? input[prop] : undefined)
      if(!value.ok){
        return fail()
      }
      result[prop] = value.result
    }
    return ok(result)
  }

export const array = <T>(decoder: Decoder<T>): Decoder<T[]> =>
  (input: any) => {
    const result = []
    if(!A.isArray(input)){
      return fail()
    }
    for(let i=0; i<input.length; i++){
      const value = decoder(input[i])
      if(!value.ok){
        return fail()
      }
      result.push(value.result)
    }
    return ok(result)
  }

export const tuple = <T extends [...any[]]>(decoders: DecoderOf<T>): Decoder<T> =>
  (input: any) => {
    if(!A.isArray(input)){
      return fail()
    }
    const result = []
    const length = decoders.length > input.length ? decoders.length : input.length
    for(let i=0; i<length; i++){
      const value = decoders[i](input[i])
      if(!value.ok){
        return fail()
      }
      result.push(value.result)
    }
    return ok(result as T)
  }

export const pair = <A, B>(a: Decoder<A>, b: Decoder<B>): Decoder<[A, B]> =>
  tuple<[A, B]>([ a, b ])

export const pairOf = <A>(decoder: Decoder<A>): Decoder<[A, A]> =>
  tuple<[A, A]>([ decoder, decoder ])
