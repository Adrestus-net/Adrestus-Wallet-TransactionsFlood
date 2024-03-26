class BalanceModel{
    constructor(address,zone) {
        this.Address=address
        this.Zone=zone
    }

    get Address() {
        return this.address;
    }

    set Address(value) {
        this.address = value;
    }

    get Zone() {
        return this.zone;
    }

    set Zone(value) {
        this.zone = value;
    }
}
export default BalanceModel;