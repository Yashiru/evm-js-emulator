import 'mocha';
import { assert, expect } from 'chai';
import { executeBytecode, uintBuffer } from './test-utils';
import { UInt256, U256 } from '../src';

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
        // Test that -2 / -1 equals 2
        let result = (await executeBytecode('7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0560005260ff6000f3')).result
        expect(result).to.deep.eq(uintBuffer(2, 0xff))
        // Test that 2 / -1 equals -2
        result = (await executeBytecode('7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60020560005260ff6000f3')).result
        let uintResult = new UInt256(new Uint8Array(result.slice(0, 32).reverse()).buffer)
        expect(uintResult).to.deep.eq(U256("fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe", 16))
        // Test that -2 / 1 equals -2
        result = (await executeBytecode('60017ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0560005260ff6000f3')).result
        uintResult = new UInt256(new Uint8Array(result.slice(0, 32).reverse()).buffer)
        expect(uintResult).to.deep.eq(U256("fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe", 16))
        // Test that 2 / 1 equals 2
        result = (await executeBytecode('600160020560005260ff6000f3')).result
        uintResult = new UInt256(new Uint8Array(result.slice(0, 32).reverse()).buffer)
        expect(result).to.deep.eq(uintBuffer(2, 0xff))
        // Test that MAX_INT256 / MIN_INT256 equals -1
        result = (await executeBytecode('7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f80000000000000000000000000000000000000000000000000000000000000000560005260ff6000f3')).result
        uintResult = new UInt256(new Uint8Array(result.slice(0, 32).reverse()).buffer)
        expect(uintResult).to.deep.eq(U256("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", 16))
    })

    it('mod', async () => {
        const {result} = await executeBytecode('600360100660005260ff6000f3')
        expect(result).to.deep.eq(uintBuffer(1, 0xff))
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