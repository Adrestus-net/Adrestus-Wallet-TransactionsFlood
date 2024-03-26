var crypto = require('crypto')

class HashFunction{

    constructor() {
    }
    hashString(value) {
        const hash = crypto.createHash('sha256');
        const sha256ValueHash = hash.update(value).digest('hex');
        return sha256ValueHash
    }
}
global.HashFunction=HashFunction
module.exports=HashFunction