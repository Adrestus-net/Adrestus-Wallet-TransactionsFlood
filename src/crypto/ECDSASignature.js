var EC = require('elliptic').ec;
const crypto = require("crypto");

class ECDSASignature {

    constructor() {
    }
     sign(keypair, message) {
        let hash = crypto.createHash('sha256');
        hash.update(message);
        var msgHash = hash.digest('hex');
        let signature = keypair.sign(msgHash);
        return signature
    }

   verify(message, signature) {
        var ec = new EC('secp256k1');
        let hash = crypto.createHash('sha256');
        hash.update(message);
        var msgHash = hash.digest('hex');

        let hexToDecimal = (x) => ec.keyFromPrivate(x, "hex").getPrivate().toString(10);
        let pubKeyRecovered = ec.recoverPubKey(hexToDecimal(msgHash), signature, signature.recoveryParam, "hex");

        return ec.verify(msgHash, signature, pubKeyRecovered);
    }

    signwithNohash(keypair, message) {
        let signature = keypair.sign(message);
        return signature
    }

     verifywithNohash(message, signature) {
        var ec = new EC('secp256k1');
        let hexToDecimal = (x) => ec.keyFromPrivate(x, "hex").getPrivate().toString(10);
        let pubKeyRecovered = ec.recoverPubKey(hexToDecimal(message), signature, signature.recoveryParam, "hex");
        return ec.verify(message, signature, pubKeyRecovered);
    }
}

global.ECDSASignature = ECDSASignature;
module.exports = ECDSASignature