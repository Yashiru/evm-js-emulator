import 'mocha';
import { assert, expect } from 'chai';
import { executeBytecode, uintBuffer, VALID_CHAIN_IDS} from './test-utils';
import { UInt256, toUint } from '../src';

describe('Gas consumption', () => {
    it('Check calldatacopy gas usage', async () => {
        // Test a simple calldatacopy with destOffset = 0, size = 0x20
        let res = await executeBytecode('60206000600037')
        expect(res.exec.state.gasSpent.eq(new UInt256(18))).to.be.true

        // Test a simple calldatacopy with destOffset = 0x20, size = 0x20
        res = await executeBytecode('60206000602037')
        expect(res.exec.state.gasSpent.eq(new UInt256(21))).to.be.true

        // Test a simple calldatacopy with destOffset = 0x60, size = 0xff
        res = await executeBytecode('60ff6000606037')
        expect(res.exec.state.gasSpent.eq(new UInt256(69))).to.be.true

        // Test a simple calldatacopy with destOffset = 0xff, size = 0xffff
        res = await executeBytecode('60ff600061ffff37')
        expect(res.exec.state.gasSpent.eq(new UInt256(14460))).to.be.true
    })
    it('Check codecopy gas usage', async () => {
        // Test a simple calldatacopy with destOffset = 0, size = 0xa
        let res = await executeBytecode('61ffff50386000600039')
        console.log(res.exec.state.gasSpent);
        expect(res.exec.state.gasSpent.eq(new UInt256(22))).to.be.true
        // Test a simple calldatacopy with destOffset = 0xffff, size = 0x17
        res = await executeBytecode('61ffff5061ffff5061ffff5061ffff5038600061ffff39')
        console.log(res.exec.state.gasSpent);
        expect(res.exec.state.gasSpent.eq(new UInt256(14381))).to.be.true
        // Test a simple calldatacopy with destOffset = 0, size = 0x48
        res = await executeBytecode('7dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000005050386000600039')
        console.log(res.exec.state.gasSpent);
        expect(res.exec.state.gasSpent.eq(new UInt256(39))).to.be.true
    })
})