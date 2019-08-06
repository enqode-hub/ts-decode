export type Assert<T> =
  (input: any) => boolean

export const isBoolean: Assert<boolean> = (input: any): input is boolean =>
  typeof input === 'boolean'

export const isString: Assert<string> = (input: any): input is string =>
  typeof input === 'string'

export const isNumber: Assert<number> = (input: any): input is number =>
  typeof input === 'number' && !Number.isNaN(input)

export const isInt: Assert<number> = (input: any): input is number =>
  Number.isInteger(input)

export const isFloat: Assert<number> = (input: any): input is number =>
  typeof input === 'number' && (input === 0 || !Number.isInteger(input))

export const isArray: Assert<Array<any>> = (input: any): input is Array<any> =>
  Array.isArray(input)

export const isObject: Assert<object> = (input: any): input is object =>
  typeof input === 'object' && !isArray(input)
