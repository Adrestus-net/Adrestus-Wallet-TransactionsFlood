import Bloom from "./Bloom.js";

const expectedInsertions = 100;
const falsePositiveProbability = 0.1;

class BloomFilter {

    constructor() {
        if (BloomFilter._instance) {
            return BloomFilter._instance;
        }
        BloomFilter._instance = this;
        this.bloomFilterItem = new Bloom(
            expectedInsertions,
            falsePositiveProbability
        );
    }

    getStringRepresentation(address) {
        this.bloomFilterItem.add(address);
        return this.bloomFilterItem.getFilterInfo();
    }
}

global.BloomFilter = BloomFilter;
module.exports = BloomFilter