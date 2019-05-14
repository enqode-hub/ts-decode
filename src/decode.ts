import * as A from './assertions'
import { DecoderOf, DecoderResult } from './decoders'

export const decode = <T>(shape: DecoderOf<T>) => (input: any): DecoderResult<T> => {

  if(A.isObject(input)){
    for(const [prop, value] of Object.entries(input)){
      console.log(prop, value)
    }
    return{
      failed: false,
      result:{
        // ..
      } as T,
    }
  }

  if(A.isArray(input)){
    return{
      failed: false,
      result:{
        // ..
      } as T,
    }
  }

  return{
    failed: true
  }

}

export const deqode = decode