"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBoolean = function (input) {
    return typeof input === 'boolean';
};
exports.isString = function (input) {
    return typeof input === 'string';
};
exports.isNumber = function (input) {
    return typeof input === 'number' && !Number.isNaN(input);
};
exports.isInt = function (input) {
    return Number.isInteger(input);
};
exports.isFloat = function (input) {
    return typeof input === 'number' && (input === 0 || !Number.isInteger(input));
};
exports.isArray = function (input) {
    return Array.isArray(input);
};
exports.isObject = function (input) {
    return typeof input === 'object' && !exports.isArray(input);
};
