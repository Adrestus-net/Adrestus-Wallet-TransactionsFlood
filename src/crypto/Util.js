'use strict';
module.exports = class Util {
    static arrayCopy(src, srcIndex, dest, destIndex, length) {
        dest.splice(destIndex, length, ...src.slice(srcIndex, srcIndex + length));
    }

    static bytesToBinaryAsChars(bytes) {
        let binaryStringBuilder = "";
        for (let i = 0; i < bytes.length; i++) {
            var binary = Number(bytes[i]).toString(2)
            binaryStringBuilder += binary;
        }
        return binaryStringBuilder.split("");
    }

    static charSubarray(source, startIndex, endIndex) {
        let subarray = Array(endIndex - startIndex);
        this.arrayCopy(source, startIndex, subarray, 0, endIndex - startIndex)
        return subarray;
    }

    static binaryCharsToInt(wordIndexAsChars) {
        let str = wordIndexAsChars.toString().replaceAll(',', '');
        return parseInt(str, 2)
    }

    static isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }

    static trimJsonStringNumbers(val) {
        const regex = /"(-|)([0-9]+(?:\.[0-9]+)?)"/g
        return val.replace(regex, '$1$2')
    }
}
