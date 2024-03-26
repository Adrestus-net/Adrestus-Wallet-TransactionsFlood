import Long from 'long';
class Murmur3 {
    static #X86_32_C1 = Long.fromNumber(0xcc9e2d51);
    static #X86_32_C2 = Long.fromNumber(0x1b873593);
    static #X64_128_C1 = Long.fromString(0x87c37b91114253d5n.toString());
    static #X64_128_C2 = Long.fromString(0x4cf5ad432745937fn.toString());

    static hash_x86_32(data, length, seed) {
        const nblocks = length >>> 2;
        let hash = seed;

        for (let i = 0; i < nblocks; i++) {
            const i4 = i << 2;

            let k1 = (data[i4] & 0xff) | ((data[i4 + 1] & 0xff) << 8) | ((data[i4 + 2] & 0xff) << 16) | ((data[i4 + 3] & 0xff) << 24);

            k1 = (k1 * Murmur3.#X86_32_C1) & 0xffffffff;
            k1 = (k1 << 15) | (k1 >>> 17);
            k1 = (k1 * Murmur3.#X86_32_C2) & 0xffffffff;

            hash ^= k1;
            hash = (hash << 13) | (hash >>> 19);
            hash = (((hash * 5) & 0xffffffff) + 0xe6546b64) & 0xffffffff;
        }

        let offset = nblocks << 2;
        let k1 = 0;

        switch (length & 3) {
            case 3:
                k1 ^= (data[offset + 2] & 0xff) << 16;

            case 2:
                k1 ^= (data[offset + 1] & 0xff) << 8;

            case 1:
                k1 ^= (data[offset] & 0xff);
                k1 = (k1 * Murmur3.#X86_32_C1) & 0xffffffff;
                k1 = (k1 << 15) | (k1 >>> 17);
                k1 = (k1 * Murmur3.#X86_32_C2) & 0xffffffff;
                hash ^= k1;
        }

        hash ^= length;
        hash = Murmur3.fmix32(hash);

        return hash >>> 0; // Ensure positive 32-bit unsigned integer
    }

    static rotateLeft(value, shift) {
        return value.shl(shift).or(value.shru(Long.fromString(64n.toString()).subtract(shift)));
    }

    static hash_x64_128(data, length, seed) {
        let h1 = seed;
        let h2 = seed;

        const buffer = Buffer.from(data);
        let offset = 0;

        while (offset + 16 <= data.length) {
            let k1 = Long.fromString(Murmur3.readBigUInt64LE(buffer,offset).toString());
            let k2 = Long.fromString(Murmur3.readBigUInt64LE(buffer,offset+8).toString());

            h1 = h1.xor(Murmur3.mixK1(k1));
            h1 = this.rotateLeft(h1, Long.fromInt(27));
            h1 = h1.add(h2);
            h1 = h1.mul(5).add(0x52dce729n.toString())

            h2 = h2.xor(Murmur3.mixK2(k2));
            h2 = this.rotateLeft(h2, Long.fromInt(31));
            h2 = h1.add(h2);
            h2 = h2.mul(5).add(0x38495ab5n.toString());

            offset += 16;
        }

        // Tail processing
        const remaining = buffer.length % 16;
        let k1 = Long.fromInt(0);
        let k2 = Long.fromInt(0);

        switch (remaining) {
            case 15:
                k2 = k2.xor(Long.fromString(buffer.readUInt8(offset+14).toString()).shl(Long.fromInt(48)));

            case 14:
                k2 = k2.xor(Long.fromString(buffer.readUInt8(offset+13).toString()).shl(Long.fromInt(40)));

            case 13:
                k2 = k2.xor(Long.fromString(buffer.readUInt8(offset+12).toString()).shl(Long.fromInt(32)));

            case 12:
                k2 = k2.xor(Long.fromString(buffer.readUInt8(offset+11).toString()).shl(Long.fromInt(24)));

            case 11:
                k2 = k2.xor(Long.fromString(buffer.readUInt8(offset+10).toString()).shl(Long.fromInt(16)));

            case 10:
                k2 = k2.xor(Long.fromString(buffer.readUInt8(offset+9).toString()).shl(Long.fromInt(8)));

            case 9:
                k2 = k2.xor(Long.fromString(buffer.readUInt8(offset+8).toString()));

            case 8:
                k1 = k1.xor(Long.fromString(Murmur3.readBigUInt64LE(buffer,offset).toString()));
                break;

            case 7:
                k1 = k1.xor(Long.fromString(buffer.readUInt8(offset+6).toString()).shl(Long.fromInt(48)));

            case 6:
                k1 = k1.xor(Long.fromString(buffer.readUInt8(offset+5).toString()).shl(Long.fromInt(40)));

            case 5:
                k1 = k1.xor(Long.fromString(buffer.readUInt8(offset+4).toString()).shl(Long.fromInt(32)));

            case 4:
                k1 = k1.xor(Long.fromString(buffer.readUInt8(offset+3).toString()).shl(Long.fromInt(24)));

            case 3:
                k1 = k1.xor(Long.fromString(buffer.readUInt8(offset+2).toString()).shl(Long.fromInt(16)));

            case 2:
                k1 = k1.xor(Long.fromString(buffer.readUInt8(offset+1).toString()).shl(Long.fromInt(8)));

            case 1:
                k1 = k1.xor(Long.fromString(buffer.readUInt8(offset+0).toString()));
                break;
            default:
                break;
        }

        h1 = h1.xor(Murmur3.mixK1(k1));
        h2 = h2.xor(Murmur3.mixK2(k2));

        // Finalization
        h1 = h1.xor(length);
        h2 = h2.xor(length);

        h1 = h1.add(h2);
        h2 = h2.add(h1);

        h1 = Murmur3.fmix64(h1);
        h2 = Murmur3.fmix64(h2);

        h1 = h1.add(h2);
        h2 = h2.add(h1);

        return [h1, h2];
    }

    static readBigUInt64LE(buffer, offset = 0) {
        const first = buffer[offset];
        const last = buffer[offset + 7];
        if (first === undefined || last === undefined) {
            throw new Error('Out of bounds');
        }

        const lo = first +
            buffer[++offset] * 2 ** 8 +
            buffer[++offset] * 2 ** 16 +
            buffer[++offset] * 2 ** 24;

        const hi = buffer[++offset] +
            buffer[++offset] * 2 ** 8 +
            buffer[++offset] * 2 ** 16 +
            last * 2 ** 24;

        return BigInt(lo) + (BigInt(hi) << 32n);
    }
    
    static mixK1(k1) {
        k1 = k1.mul(Murmur3.#X64_128_C1);
        k1 = this.rotateLeft(k1, Long.fromInt(31));
        k1 = k1.mul(Murmur3.#X64_128_C2);
        return k1;
    }

    static mixK2(k2) {
        k2 = k2.mul(Murmur3.#X64_128_C2);
        k2 = this.rotateLeft(k2, Long.fromInt(33));
        k2 = k2.mul(Murmur3.#X64_128_C1);

        return k2;
    }

    static rotl32(original, shift) {
        return ((original << shift) | (original >>> (32 - shift))) & 0xffffffff;
    }

    static fmix32(h) {
        h ^= h >>> 16;
        h = (h * 0x85ebca6b) & 0xffffffff;
        h ^= h >>> 13;
        h = (h * 0xc2b2ae35) & 0xffffffff;
        h ^= h >>> 16;

        return h;
    }

    static fmix64(k) {
        k = k.xor(k.shru(Long.fromInt(33)));
        k = k.mul(Long.fromString(0xff51afd7ed558ccdn.toString()));
        k = k.xor(k.shru(Long.fromInt(33)));
        k = k.mul(Long.fromString(0xc4ceb9fe1a85ec53n.toString()));
        k = k.xor(k.shru(Long.fromInt(33)));

        return k;
    }
}

class Murmur3HashFunction {
    #SEED = Long.fromNumber(0x7f3a21ea);

    isSingleValued() {
        return false;
    }

    hash(bytes) {
        return Murmur3.hash_x86_32(bytes, 0n, this.#SEED);
    }

    hashMultiple(bytes) {
        return Murmur3.hash_x64_128(bytes, 0n, this.#SEED);
    }
}

class BitSet {
    constructor(initialCapacity) {
        this.bitArraySize = Math.ceil(initialCapacity / 64) * 64;
        this.bitArray = new Array(this.bitArraySize).fill(false);
    }

    setBit(index) {
        this.bitArray[index] = true;
        return true;
    }

    size() {
        return this.bitArraySize;
    }

    asArray() {
        return this.bitArray;
    }
}

export default class Bloom {
    constructor(expectedInsertions, falsePositiveProbability) {
        this.numBitsRequired = this.optimalBitSizeOrM(expectedInsertions, falsePositiveProbability);
        this.numHashFunctions = this.optimalNumberofHashFunctionsOrK(expectedInsertions, this.numBitsRequired);
        this.bitSet = new BitSet(this.numBitsRequired);
        this.hasher = new Murmur3HashFunction();
    }

    add(item) {
        const utf8Encoder = new TextEncoder();
        const bytes = utf8Encoder.encode(item);
        const hash64 = this.getLongHash64(bytes);

        let bitsChanged = false;

        var hash1 = hash64.toInt();
        var hash2 = hash64.shr(32).toInt();

        for (let i = 1; i <= this.numHashFunctions; i++) {
            var nextHash = hash1 + (i * hash2 | 0) | 0;
            if (nextHash < 0) {
                nextHash = ~nextHash;
            }

            bitsChanged |= this.bitSet.setBit(nextHash % this.bitSet.size());
        }
        return bitsChanged;
    }

    getLongHash64(item) {
        if (this.hasher.isSingleValued()) {
            return this.hasher.hash(item);
        }

        return this.hasher.hashMultiple(item)[0];
    }

    hashFunction(item, seed) {
        let hash = 0;
        const str = item.toString();

        for (let i = 0; i < str.length; i++) {
            hash = (hash * seed + str.charCodeAt(i)) % this.numBitsRequired;
        }

        return hash;
    }

    optimalBitSizeOrM(expectedInsertions, falsePositiveProbability) {
        const LOG_2_SQUARE = Math.log(2) ** 2;
        return parseInt(-expectedInsertions * Math.log(falsePositiveProbability) / LOG_2_SQUARE);
    }

    optimalNumberofHashFunctionsOrK(expectedInsertions, numberOfBits) {
        return Math.max(1, parseInt(Math.round(numberOfBits / expectedInsertions * Math.log(2))));
    }

    getFilterInfo() {
        const numBitsRequired = this.numBitsRequired;
        const array = this.bitSet.asArray().reduce((result, bit, index) => {
            if (bit) {
                result.push(index);
            }
            return result;
        }, []);
        const hashFunctionNum = this.numHashFunctions;
        const result = {
            numBitsRequired,
            array,
            hashFunctionNum,
        };

        return `{"numBitsRequired": ${result.numBitsRequired}, "array": ${JSON.stringify(result.array)}, "hashFunctionNum": ${result.hashFunctionNum}}`;
    }
}