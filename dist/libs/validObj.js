"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validObj = void 0;
function validObj(obj) {
    return Object.values(obj).filter((e) => e != 'undefined').length > 0;
}
exports.validObj = validObj;
