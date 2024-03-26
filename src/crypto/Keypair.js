import ECDSASignature from "./ECDSASignature";

var elliptic = require('elliptic');
var ec = new elliptic.ec('secp256k1');
var Point = require("./PubPoint")
const BN = require('bn.js');
class Keypair {


    ec
    Keypair
    private_key
    public_key

    PubPoint

    PubBigInteger
    Y_Axis

    constructor(random) {
        this.Keypair = ec.keyFromPrivate(random);
        this.private_key = this.Keypair.getPrivate("hex");
        this.public_key = this.Keypair.getPublic("hex")
        this.PubPoint = new Point(this.Keypair.getPublic().getX().toString(), this.Keypair.getPublic().getY().toString());
    }

    get getKeypair() {
        return this.Keypair;
    }

    get getPublicKey() {
        return this.public_key;
    }

    get getPrivateKey() {
        return this.private_key;
    }

    get getPubPoint() {
        return this.PubPoint;
    }

    get getPubBigInteger() {
        return new BN(this.Keypair.getPublic().encode('hex').substr(2), 16).toString();
    }
}
global.Keypair = Keypair;
module.exports = Keypair