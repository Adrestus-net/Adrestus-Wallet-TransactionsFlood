'use strict';
import Keypair from "./Keypair";

var crypto = require('crypto')
var RIPEMD160 = require('ripemd160')
var base32 = require('hi-base32');
var Util=require("./Util.js")
class WalletAddress {
    SEPERATOR
    ADR_CHECKSUM;
    ADR_CHECKSUM_BYTES
    constructor() {
        this.SEPERATOR = "-";
        this.ADR_CHECKSUM = "ADR"+this.SEPERATOR
        this.ADR_CHECKSUM_BYTES = 4;
    }

     generate_address(version, pubkey) {
        var version=Buffer.from(version);
        const hash = crypto.createHash('sha256');
        var sha256PublicKeyHash=hash.update(pubkey).digest();

        var ripemd160StepOneHash=new RIPEMD160().update(sha256PublicKeyHash).digest();
        var versionPrefixedRipemd160Hash=Buffer.concat([version,ripemd160StepOneHash],version.length+ripemd160StepOneHash.length);
        var stepThreeChecksum=this.generateChecksum(versionPrefixedRipemd160Hash);
        var concatStepThreeAndStepSix=Buffer.concat([versionPrefixedRipemd160Hash,stepThreeChecksum],versionPrefixedRipemd160Hash.length+stepThreeChecksum.length);
        var HG=concatStepThreeAndStepSix.toString('hex')
        var encoded = base32.encode(concatStepThreeAndStepSix);

       return this.preety_print(encoded);
    }

     preety_print(encoded){
        let res= this.ADR_CHECKSUM.concat(encoded)
        let parts = encoded.match(/.{1,4}/g);
        let encoded_seperators = parts.join(this.SEPERATOR);
        let final= this.ADR_CHECKSUM.concat(encoded_seperators);
        return final;
    }

     generateChecksum(versionPrefixedRipemd160Hash){
        let hash = crypto.createHash('sha256');
        let sha3StepThreeHash=hash.update(versionPrefixedRipemd160Hash).digest();
        let arr2=[];
        Util.arrayCopy(sha3StepThreeHash, 0, arr2, 0, this.ADR_CHECKSUM_BYTES);
        return Buffer.from(arr2);
    }
}
global.WalletAddress = WalletAddress;
module.exports = WalletAddress