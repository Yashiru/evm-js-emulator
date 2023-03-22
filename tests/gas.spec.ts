import 'mocha';
import { assert, expect } from 'chai';
import { executeBytecode, uintBuffer, VALID_CHAIN_IDS} from './test-utils';
import { UInt256, toUint } from '../src';

describe('Gas usage', () => {
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
    it('Check returndatacopy gas usage', async () => { // TODO: fix when the call gas usage is implemented
        // Test a simple calldatacopy with destOffset = 0, size = 0xa
        let res = await executeBytecode('7f70a08231000000000000000000000000000000000000000000000000000000006000527f00000000000000000000000038ef2745ae704fc743d5e620d6562640d8cb8a5d6004526020600060246000600073a0b86991c6218b36c1d19d4a2e9eb0ce3606eb485af1506020600060003e')
        console.log(res.exec.state.gasSpent);
        expect(res.exec.state.gasSpent.eq(new UInt256(40472))).to.be.true
    })
})