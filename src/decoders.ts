import * as A from './assertions'

export type DecoderResult<T> = { failed: false, result: T } | { failed: true }

export type Decoder<T> = {
  (input: any): DecoderResult<T>
}

export type DecoderOf<T> = {
  [P in keyof T]: Decoder<T[P]>
}

export const boolean = (): Decoder<boolean> =>
  (input: any) => A.isBoolean(input) ? { failed: false, result: input } : { failed: true }

export const number = (): Decoder<number> =>
  (input: any) => A.isNumber(input) ? { failed: false, result: input } : { failed: true }

export const string = (): Decoder<string> =>
  (input: any) => A.isString(input) ? { failed: false, result: input } : { failed: true }

export const is = <T>(value: T): Decoder<T> =>
  (input: any) => ({ failed: true, result: input })

export const object = <T>(shape: DecoderOf<T>): Decoder<T> =>
  (input: any) => ({ failed: false, result: input }) as DecoderResult<T>

export const array = <T>(...decoders: Decoder<T>[]): Decoder<T[]> =>
  (input: any) => ({ failed: false, result: input }) as DecoderResult<T[]>
