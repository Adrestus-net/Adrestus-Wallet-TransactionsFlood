
const BN = require('bn.js');
class UtilBase64 {

    constructor() {
    }
    convertToBase64(hexstring){
        return new Buffer(new BN(hexstring).toArray()).toString('base64');
    }
}
global.UtilBase64 = UtilBase64;
module.exports = UtilBase64