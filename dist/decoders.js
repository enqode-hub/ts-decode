"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var A = __importStar(require("./assertions"));
exports.ok = function (value) {
    return ({ ok: true, result: value });
};
exports.fail = function () {
    return ({ ok: false });
};
exports.boolean = function () {
    return function (input) { return A.isBoolean(input) ? exports.ok(input) : exports.fail(); };
};
exports.number = function () {
    return function (input) { return A.isNumber(input) ? exports.ok(input) : exports.fail(); };
};
exports.string = function () {
    return function (input) { return A.isString(input) ? exports.ok(input) : exports.fail(); };
};
exports.optional = function (decode) {
    return function (input) { return input === undefined ? exports.ok(undefined) : decode(input); };
};
exports.is = function (value) {
    return function (input) { return input === value ? exports.ok(input) : exports.fail(); };
};
exports.object = function (decoder) {
    return function (input) {
        var result = {};
        for (var prop in decoder) {
            var value = decoder[prop](input ? input[prop] : undefined);
            if (!value.ok) {
                return exports.fail();
            }
            result[prop] = value.result;
        }
        return exports.ok(result);
    };
};
exports.array = function (decoder) {
    return function (input) {
        var result = [];
        if (!A.isArray(input)) {
            return exports.fail();
        }
        for (var i = 0; i < input.length; i++) {
            var value = decoder(input[i]);
            if (!value.ok) {
                return exports.fail();
            }
            result.push(value.result);
        }
        return exports.ok(result);
    };
};
exports.tuple = function (decoders) {
    return function (input) {
        if (!A.isArray(input)) {
            return exports.fail();
        }
        var result = [];
        var length = decoders.length > input.length ? decoders.length : input.length;
        for (var i = 0; i < length; i++) {
            var value = decoders[i](input[i]);
            if (!value.ok) {
                return exports.fail();
            }
            result.push(value.result);
        }
        return exports.ok(result);
    };
};
exports.pair = function (a, b) {
    return exports.tuple([a, b]);
};
exports.pairOf = function (decoder) {
    return exports.tuple([decoder, decoder]);
};
