'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default = {
    checkParams: checkParams };


function hasValue(obj, key) {
    return obj.hasOwnProperty(key) && obj[key] !== 'undefined' ? true : false;
};

function checkParams(body, bodyArr) {
    for (var i = 0; i < bodyArr.length; i++) {
        if (!hasValue(body, bodyArr[i])) {
            return {
                success: false,
                value: bodyArr[i] };

        }
    }
    return {
        success: true };

}