export declare type Assert<T> = {
    (input: any): boolean;
};
export declare const isBoolean: Assert<boolean>;
export declare const isString: Assert<string>;
export declare const isNumber: Assert<number>;
export declare const isInt: Assert<number>;
export declare const isFloat: Assert<number>;
export declare const isArray: Assert<Array<any>>;
export declare const isObject: Assert<object>;
