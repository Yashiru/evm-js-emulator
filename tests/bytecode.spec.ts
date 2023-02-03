import 'mocha';
import { assert, expect } from 'chai';
import { executeBytecode, uintBuffer } from './test-utils';
import { UInt256, U256, toUint } from '../src';

describe('Bytecode', () => {

    it('add', async () => {
        const {result} = await executeBytecode('600360040160005260ff6000f3')
        expect(result).to.deep.eq(uintBuffer(7, 0xff))
    })

    it('mul', async () => {
        const {result} = await executeBytecode('600360040260005260ff6000f3')
        expect(result).to.deep.eq(uintBuffer(12, 0xff))
    })

    it('sub', async () => {
        const {result} = await executeBytecode('600360070360005260ff6000f3')
        expect(result).to.deep.eq(uintBuffer(4, 0xff))
    })

    it('div', async () => {
        const {result} = await executeBytecode('6003600f0460005260ff6000f3')
        expect(result).to.deep.eq(uintBuffer(5, 0xff))
    })

    it('mulmod', async () => {
        const {result} = await executeBytecode('6008600a60030960005260ff6000f3')
        expect(result).to.deep.eq(uintBuffer(6, 0xff))
    })

    it('sdiv', async () => {
        /* ----------------------------- CLASSIC CASES ------------------------------ */
        // Test that 8 / 2 equals 4
        let result = (await executeBytecode('600260080560005260206000f3')).result
        expect(toUint(new Uint8Array(result)))
            .to.deep.eq(new UInt256(4))

        // Test that 16 / 7 equals 2
        result = (await executeBytecode('6007600f0560005260206000f3')).result
        expect(toUint(new Uint8Array(result)))
            .to.deep.eq(new UInt256(2))

        // Test that 10 / 3 equals 3
        result = (await executeBytecode('6003600a0560005260206000f3')).result
        expect(toUint(new Uint8Array(result)))
            .to.deep.eq(new UInt256(3))

        // Test that 54 / -5 equals -10
        result = (await executeBytecode('7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb60360560005260206000f3')).result
        expect(toUint(new Uint8Array(result)))
            .to.deep.eq(new UInt256(10).negate())

        // Test that -16 / -7 equals 2
        result = (await executeBytecode('7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff97ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00560005260206000f3')).result
        expect(toUint(new Uint8Array(result)))
            .to.deep.eq(new UInt256(2))

        /* ------------------------------- EDGE CASES ------------------------------- */
        // Test that -2 / -1 equals 2
        result = (await executeBytecode('7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0560005260206000f3')).result
        expect(toUint(new Uint8Array(result)))
            .to.deep.eq(new UInt256(2))

        // Test that 2 / -1 equals -2
        result = (await executeBytecode('7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60020560005260206000f3')).result
        expect(toUint(new Uint8Array(result)))
            .to.deep.eq(new UInt256(2).negate())

        // Test that -2 / 1 equals -2
        result = (await executeBytecode('60017ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0560005260206000f3')).result
        expect(toUint(new Uint8Array(result)))
            .to.deep.eq(new UInt256(2).negate())

        // Test that 2 / 1 equals 2
        result = (await executeBytecode('600160020560005260206000f3')).result
        expect(toUint(new Uint8Array(result)))
            .to.deep.eq(new UInt256(2))

        // Test that MAX_INT256 / MIN_INT256 equals -1
        result = (await executeBytecode('7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f80000000000000000000000000000000000000000000000000000000000000000560005260206000f3')).result
        expect(toUint(new Uint8Array(result)))
            .to.deep.eq(new UInt256(1).negate())
    })

    it('mod', async () => {
        const {result} = await executeBytecode('600360100660005260ff6000f3')
        expect(result).to.deep.eq(uintBuffer(1, 0xff))
    })

    it('smod', async () => {
        /* ------------------------------ Classic cases ----------------------------- */
        // Test that 10 % 3 equals 1
        let {result} = await executeBytecode('600360100660005260ff6000f3')
        expect(result).to.deep.eq(uintBuffer(1, 0xff))

        // Test that -8 % -3 equals -2
        result = (await executeBytecode('7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffd7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80760005260206000f3')).result
        expect(toUint(new Uint8Array(result)))
            .to.deep.eq(new UInt256(2).negate())

        // Test that -25 % -7 equals -4
        result = (await executeBytecode('7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff97fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe70760005260206000f3')).result
        expect(toUint(new Uint8Array(result)))
            .to.deep.eq(new UInt256(4).negate())

        // Test that -25 % 7 equals -4
        result = (await executeBytecode('60077fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe70760005260206000f3')).result
        expect(toUint(new Uint8Array(result)))
            .to.deep.eq(new UInt256(4).negate())

        // Test that 25 % -7 equals 4
        result = (await executeBytecode('7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff960190760005260206000f3')).result
        expect(toUint(new Uint8Array(result)))
            .to.deep.eq(new UInt256(4))

        /* ------------------------------- Edge cases ------------------------------- */
        // Test that -25 % 1 equals 0
        result = (await executeBytecode('60017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe70760005260206000f3')).result
        expect(toUint(new Uint8Array(result)))
            .to.deep.eq(new UInt256(0))

        // Test that 25 % 1 equals 0
        result = (await executeBytecode('600160190760005260206000f3')).result
        expect(toUint(new Uint8Array(result)))
            .to.deep.eq(new UInt256(0))

        // Test that 25 % -1 equals 0
        result = (await executeBytecode('600160190760005260206000f3')).result
        expect(toUint(new Uint8Array(result)))
            .to.deep.eq(new UInt256(0))
        
        // Test that MAX_INT256 % MIN_INT256 equals -1
        result = (await executeBytecode('7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f80000000000000000000000000000000000000000000000000000000000000000760005260206000f3')).result
        expect(toUint(new Uint8Array(result)))
            .to.deep.eq(new UInt256(1).negate())
    })

    it('lt1', async () => {
        const {result} = await executeBytecode('601060091060005260ff6000f3')
        expect(result).to.deep.eq(uintBuffer(1, 0xff))
    })

    it('shl', async () => {
        const {result} = await executeBytecode('600160011b60005260ff6000f3')
        expect(result).to.deep.eq(uintBuffer(2, 0xff))
    })

    it('shr', async () => {
        const {result} = await executeBytecode('600260011c60005260ff6000f3')
        expect(result).to.deep.eq(uintBuffer(1, 0xff))
    })
})