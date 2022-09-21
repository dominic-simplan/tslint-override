"use strict";
// tslint:disable callable-types
// tslint:disable variable-name
exports.__esModule = true;
exports.Override = exports.override = exports.ctx = void 0;
exports.ctx = typeof global === 'undefined' ? (typeof self === 'undefined' ? undefined : self) : global;
var override = function () { };
exports.override = override;
var Override = function () { };
exports.Override = Override;
if (exports.ctx) {
    exports.ctx.override = exports.override;
    exports.ctx.Override = exports.Override;
}
