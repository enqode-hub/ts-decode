export declare type DecoderResult<T> = {
    ok: true;
    result: T;
} | {
    ok: false;
};
export declare type Decoder<T> = (input: any) => DecoderResult<T>;
export declare type DecoderOf<T> = {
    [P in keyof T]: Decoder<T[P]>;
};
export declare const ok: <T>(value: T) => DecoderResult<T>;
export declare const fail: <T>() => DecoderResult<T>;
export declare const boolean: () => Decoder<boolean>;
export declare const number: () => Decoder<number>;
export declare const string: () => Decoder<string>;
export declare const optional: <T>(decode: Decoder<T>) => Decoder<T | undefined>;
export declare const is: <T>(value: T) => Decoder<T>;
export declare const object: <T>(decoder: DecoderOf<T>) => Decoder<T>;
export declare const array: <T>(decoder: Decoder<T>) => Decoder<T[]>;
export declare const tuple: <T extends any[]>(decoders: DecoderOf<T>) => Decoder<T>;
export declare const pair: <A, B>(a: Decoder<A>, b: Decoder<B>) => Decoder<[A, B]>;
export declare const pairOf: <A>(decoder: Decoder<A>) => Decoder<[A, A]>;
