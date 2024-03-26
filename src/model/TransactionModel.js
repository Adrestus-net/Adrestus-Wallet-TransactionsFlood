class TransactionModel{
    constructor(Transactiontype,type,status,timestamp,hash,nonce,blockNumber,from,to,zoneFrom,zoneTo,amount,amountWithTransactionFee,xaxis,yaxis,v,r,s,pub) {
        this.Transactiontype=Transactiontype;
        this.Type=type;
        this.Status=status
        this.Timestamp=timestamp;
        this.Hash=hash;
        this.Nonce=nonce;
        this.BlockNumber=blockNumber;
        this.From=from;
        this.To=to;
        this.ZoneFrom=zoneFrom;
        this.ZoneTo=zoneTo;
        this.Amount=amount;
        this.AmountWithTransactionFee = amountWithTransactionFee;
        this.Xaxis=xaxis;
        this.Yaxis=yaxis;
        this.Signature={
            "v":v,
            "r":r,
            "s":s,
            "pub":pub
        }

    }
    get Hash() {
        return this.hash;
    }

    set Hash(value) {
        this.hash = value;
    }

    get Type() {
        return this.type;
    }

    set Type(value) {
        this.type = value;
    }

    get BlockNumber() {
        return this.blockNumber;
    }
    set BlockNumber(value) {
        this.blockNumber = value;
    }
    get Status() {
        return this.status;
    }

    set  Status(value) {
        this.status = value;
    }

    get ZoneFrom() {
        return this.zoneFrom;
    }

    set ZoneFrom(value) {
        this.zoneFrom = value;
    }

    get ZoneTo() {
        return this.zoneTo;
    }

    set ZoneTo(value) {
        this.zoneTo = value;
    }

    get Timestamp() {
        return this.timestamp;
    }

    set Timestamp(value) {
        this.timestamp = value;
    }

    get From() {
        return this.from;
    }

    set From(value) {
        this.from = value;
    }

    get To() {
        return this.to;
    }

    set To(value) {
        this.to = value;
    }

    get Amount() {
        return this.amount;
    }

    set Amount(value) {
        this.amount = value;
    }

    get AmountWithTransactionFee() {
        return this.amountWithTransactionFee;
    }

    set AmountWithTransactionFee(value) {
        this.amountWithTransactionFee = value;
    }

    get Nonce() {
        return this.nonce;
    }

    set Nonce(value) {
        this.nonce = value;
    }

    get Xaxis() {
        return this.xaxis;
    }

    set Xaxis(value) {
        this.xaxis = value;
    }

    get Yaxis() {
        return this.yaxis;
    }

    set Yaxis(value) {
        this.yaxis = value;
    }


    get Signature(){
        return this.Signature;
    }

    set Signature(value) {
        this.signature = value;
    }

    get Transactiontype() {
        return this.transactiontype;
    }

    set Transactiontype(value) {
        this.transactiontype = value;
    }
}
export default TransactionModel;