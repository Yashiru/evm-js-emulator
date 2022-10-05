import { utils } from 'ethers';
import type { HexString } from '../src/interfaces';
import type { UInt256 } from '../src/uint256';
import { storeSignature } from './test-utils';

export const HyVM = {
    BYTECODE: '61166480600a3d393df3600060206103400352610200611464602039600051803560f81c906001016000526002026020015160f01c565b7f6e6f7420696d706c656d656e7465643a0000000000000000000000000000000060107f41304fac00000000000000000000000000000000000000000000000000000000610220526020610220600401526102206020016004015261022060400160040152600060006101006102206a636f6e736f6c652e6c6f675afa50807ff5b1bba90000000000000000000000000000000000000000000000000000000061022052610220600401526000600060246102206a636f6e736f6c652e6c6f675afa505b00600051803560f81c906001016000526002026020015160f01c565b01600051803560f81c906001016000526002026020015160f01c565b02600051803560f81c906001016000526002026020015160f01c565b03600051803560f81c906001016000526002026020015160f01c565b04600051803560f81c906001016000526002026020015160f01c565b05600051803560f81c906001016000526002026020015160f01c565b06600051803560f81c906001016000526002026020015160f01c565b07600051803560f81c906001016000526002026020015160f01c565b08600051803560f81c906001016000526002026020015160f01c565b09600051803560f81c906001016000526002026020015160f01c565b0a600051803560f81c906001016000526002026020015160f01c565b0b600051803560f81c906001016000526002026020015160f01c565b10600051803560f81c906001016000526002026020015160f01c565b11600051803560f81c906001016000526002026020015160f01c565b12600051803560f81c906001016000526002026020015160f01c565b13600051803560f81c906001016000526002026020015160f01c565b14600051803560f81c906001016000526002026020015160f01c565b15600051803560f81c906001016000526002026020015160f01c565b16600051803560f81c906001016000526002026020015160f01c565b17600051803560f81c906001016000526002026020015160f01c565b18600051803560f81c906001016000526002026020015160f01c565b19600051803560f81c906001016000526002026020015160f01c565b1a600051803560f81c906001016000526002026020015160f01c565b1b600051803560f81c906001016000526002026020015160f01c565b1c600051803560f81c906001016000526002026020015160f01c565b1d600051803560f81c906001016000526002026020015160f01c565b6103400120600051803560f81c906001016000526002026020015160f01c565b30600051803560f81c906001016000526002026020015160f01c565b31600051803560f81c906001016000526002026020015160f01c565b32600051803560f81c906001016000526002026020015160f01c565b33600051803560f81c906001016000526002026020015160f01c565b34600051803560f81c906001016000526002026020015160f01c565b506000600051803560f81c906001016000526002026020015160f01c565b6000600051803560f81c906001016000526002026020015160f01c565b610340019050369037600051803560f81c906001016000526002026020015160f01c565b36600051803560f81c906001016000526002026020015160f01c565b6103400137600051803560f81c906001016000526002026020015160f01c565b3a600051803560f81c906001016000526002026020015160f01c565b3b600051803560f81c906001016000526002026020015160f01c565b9061034001903c600051803560f81c906001016000526002026020015160f01c565b3d600051803560f81c906001016000526002026020015160f01c565b610340013e600051803560f81c906001016000526002026020015160f01c565b3f600051803560f81c906001016000526002026020015160f01c565b40600051803560f81c906001016000526002026020015160f01c565b41600051803560f81c906001016000526002026020015160f01c565b42600051803560f81c906001016000526002026020015160f01c565b43600051803560f81c906001016000526002026020015160f01c565b44600051803560f81c906001016000526002026020015160f01c565b45600051803560f81c906001016000526002026020015160f01c565b46600051803560f81c906001016000526002026020015160f01c565b47600051803560f81c906001016000526002026020015160f01c565b61002c565b50600051803560f81c906001016000526002026020015160f01c565b6103400151600051803560f81c906001016000526002026020015160f01c565b6103400152600051803560f81c906001016000526002026020015160f01c565b6103400153600051803560f81c906001016000526002026020015160f01c565b54600051803560f81c906001016000526002026020015160f01c565b55600051803560f81c906001016000526002026020015160f01c565b803560f81c90600101600052605b141561078957600051803560f81c906001016000526002026020015160f01c565b7f657870656374696e67204a554d5044455354206f70636f64650000000000000060197f41304fac00000000000000000000000000000000000000000000000000000000610220526020610220600401526102206020016004015261022060400160040152600060006101006102206a636f6e736f6c652e6c6f675afa5060006000fd5b9061075a5750600051803560f81c906001016000526002026020015160f01c565b600160005103600051803560f81c906001016000526002026020015160f01c565b6000610340015903600051803560f81c906001016000526002026020015160f01c565b5a600051803560f81c906001016000526002026020015160f01c565b600051803560f81c906001016000526002026020015160f01c565b60016000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b60026000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b60036000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b60046000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b60056000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b60066000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b60076000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b60086000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b60096000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b600a6000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b600b6000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b600c6000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b600d6000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b600e6000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b600f6000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b60106000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b60116000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b60126000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b60136000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b60146000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b60156000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b60166000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b60176000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b60186000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b60196000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b601a6000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b601b6000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b601c6000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b601d6000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b601e6000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b601f6000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b60206000518035826020036008021c9101600052600051803560f81c906001016000526002026020015160f01c565b80600051803560f81c906001016000526002026020015160f01c565b81600051803560f81c906001016000526002026020015160f01c565b82600051803560f81c906001016000526002026020015160f01c565b83600051803560f81c906001016000526002026020015160f01c565b84600051803560f81c906001016000526002026020015160f01c565b85600051803560f81c906001016000526002026020015160f01c565b86600051803560f81c906001016000526002026020015160f01c565b87600051803560f81c906001016000526002026020015160f01c565b88600051803560f81c906001016000526002026020015160f01c565b89600051803560f81c906001016000526002026020015160f01c565b8a600051803560f81c906001016000526002026020015160f01c565b8b600051803560f81c906001016000526002026020015160f01c565b8c600051803560f81c906001016000526002026020015160f01c565b8d600051803560f81c906001016000526002026020015160f01c565b8e600051803560f81c906001016000526002026020015160f01c565b8f600051803560f81c906001016000526002026020015160f01c565b90600051803560f81c906001016000526002026020015160f01c565b91600051803560f81c906001016000526002026020015160f01c565b92600051803560f81c906001016000526002026020015160f01c565b93600051803560f81c906001016000526002026020015160f01c565b94600051803560f81c906001016000526002026020015160f01c565b95600051803560f81c906001016000526002026020015160f01c565b96600051803560f81c906001016000526002026020015160f01c565b97600051803560f81c906001016000526002026020015160f01c565b98600051803560f81c906001016000526002026020015160f01c565b99600051803560f81c906001016000526002026020015160f01c565b9a600051803560f81c906001016000526002026020015160f01c565b9b600051803560f81c906001016000526002026020015160f01c565b9c600051803560f81c906001016000526002026020015160f01c565b9d600051803560f81c906001016000526002026020015160f01c565b9e600051803560f81c906001016000526002026020015160f01c565b9f600051803560f81c906001016000526002026020015160f01c565b61034001a0600051803560f81c906001016000526002026020015160f01c565b61034001a1600051803560f81c906001016000526002026020015160f01c565b61034001a2600051803560f81c906001016000526002026020015160f01c565b61034001a3600051803560f81c906001016000526002026020015160f01c565b61034001a4600051803560f81c906001016000526002026020015160f01c565b61002c565b926103400192946103400194f1600051803560f81c906001016000526002026020015160f01c565b926103400192946103400194f2600051803560f81c906001016000526002026020015160f01c565b61034001f35b916103400191936103400193f4600051803560f81c906001016000526002026020015160f01c565b61002c565b916103400191936103400193fa600051803560f81c906001016000526002026020015160f01c565b61034001fd600051803560f81c906001016000526002026020015160f01c565bfe600051803560f81c906001016000526002026020015160f01c565b60006000fd5b7f756e6b6e6f776e206f70636f64653a0000000000000000000000000000000000600f7f41304fac00000000000000000000000000000000000000000000000000000000610220526020610220600401526102206020016004015261022060400160040152600060006101006102206a636f6e736f6c652e6c6f675afa50807ff5b1bba90000000000000000000000000000000000000000000000000000000061022052610220600401526000600060246102206a636f6e736f6c652e6c6f675afa5060006000fd00f0010c012801440160017c019801b401d001ec02080224139b139b139b139b0240025c0278029402b002cc02e803040320033c03580374039003ac139b139b03c8139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b03e804040420043c04580474049204af04d304ef050f052b05470569058505a505c105dd05f906150631064d0669068506a1139b139b139b139b139b139b139b06a606c206e207020722073e075a080d082e084f0872088e139b139b139b139b08a908d8090709360965099409c309f20a210a500a7f0aae0add0b0c0b3b0b6a0b990bc80bf70c260c550c840cb30ce20d110d400d6f0d9e0dcd0dfc0e2b0e5a0e890ea50ec10edd0ef90f150f310f4d0f690f850fa10fbd0fd90ff51011102d104910651081109d10b910d510f1110d112911451161117d119911b511d111ed12091229124912691289139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b139b12a912ae12d612fe1304132c139b139b139b139b1331139b139b135913791395',
    KNOWN_SEQUENCES: [{
        name: 'CONTINUE',
        code: new Uint8Array([
            0x60, 0, // push1 0
            0x51, // mload
            0x80, // dup1
            0x35, // calldataload
            0x60, 0xf8, // push1 F8
            0x1c, // shr
            0x90, // swap1
            0x60, 1, // push1 1
            0x01, // add
            0x60, 0, // push1 0
            0x52, // mstore
            0x60, 2, // push1 2
            0x02, // mul
            0x60, 0x20, //push1 0x20
            0x01, // add
            0x51, // mload
            0x60, 0xf0, //push1 0xf0
            0x1c, // shr
            0x56, // jump

        ])
    }, {
        name: 'FIX_MEMOFFSET',
        code: new Uint8Array([
            0x61, 0x03, 0x40, // PUSH2 0x0340
            0x01, // add
        ]),
    }, {
        name: 'GOTO_AND_ADVANCE',
        code: new Uint8Array([
            0x80, // dup1,
            0x35, // calldataload
            0x60, 0xf8, // push1 F8
            0x1c, // shr
            0x90, // swap1
            0x60, 1, // push1 1
            0x01, // add
            0x60, 0, // push1 0
            0x52, // mstore
        ]),
    }, {
        name: 'PICK_DATA',
        code: new Uint8Array([
            0x60, 0, // push1 0
            0x51, // mload
            0x80, // dup1
            0x35, // calldataload
            0x82, // dup3

            0x60, 0x20, // push1 x20
            0x03, // sub
            0x60, 0x8, // push1 8
            0x02, // mul

            0x1c, // shr

            0x91, // swap2
            0x01, // add

            0x60, 0, // push1 0
            0x52, // mstore

            // 0x80, // dup1
            // 0x60, 0x20, // push1 x20
            // 0x03, // sub
            // 0x60, 0, // push1 0
            // 0x51, // mload
            // 0x35, // calldataload
            // 0x90, // swap1
            // 0x60, 0x8, // push1 8
            // 0x02, // mul
            // 0x1c, // shr
            // 0x90, // swap1

            // // increment_exec_ptr_n
            // 0x60, 0, // push1 0
            // 0x51, // mload
            // 0x01, // add
            // 0x60, 0, // push1 0
            // 0x52, // mstore
        ]),
     }, {
            name: 'CONSOLE_LOG',
            code: new Uint8Array([
            0x7f, // PUSH32 0x41304fac00000000000000000000000000000000000000000000000000000000
            ...[0x41, 0x30, 0x4f, 0xac, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0],
            0x61, 0x2, 0x20,  // PUSH2 0x220
            0x52, // mstore

            0x60, 0x20, // push1 0x20
            0x61, 0x2, 0x20,  // PUSH2 0x220
            0x60, 0x4,  // PUSH1 4
            0x01, // add
            0x52, // mstore

            0x61, 0x2, 0x20,  // PUSH2 0x220
            0x60, 0x20,  // PUSH2 x20
            0x01, // add
            0x60, 0x4,  // PUSH1 4
            0x01, // add
            0x52, // mstore


            0x61, 0x2, 0x20,  // PUSH2 0x220
            0x60, 0x40,  // PUSH2 x40
            0x01, // add
            0x60, 0x4,  // PUSH1 4
            0x01, // add
            0x52, // mstore

            0x60, 0,  // PUSH1 0
            0x60, 0,  // PUSH1 0
            0x61, 0x1, 0,  // PUSH2 0x0100
            0x61, 0x2, 0x20,  // PUSH2 0x220
            0x6a,
            ...[0x63, 0x6f, 0x6e, 0x73, 0x6f, 0x6c, 0x65, 0x2e, 0x6c, 0x6f, 0x67], // PUSH11 0x636f6e736f6c652e6c6f67
            0x5a, // gas
            0xfa, // staticcall
            0x50, // pop
        ])
    }],
};

export const DOUBLE_SWAP = {
    NATIVE_ADDRESS: '0x185a4dc360ce69bdccee33b3784b0282f7961aea' as HexString,
    NATIVE_BYTECODE: '608060405234801561001057600080fd5b50610742806100206000396000f3fe6080604052600436106100225760003560e01c806364c2c7851461002e57600080fd5b3661002957005b600080fd5b34801561003a57600080fd5b50610043610045565b005b6040516370a0823160e01b815230600482015260009073a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48906370a0823190602401602060405180830381865afa158015610097573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100bb9190610506565b90506305f5e1008110156101045760405162461bcd60e51b815260206004820152600c60248201526b139bdd08195b9bdd59da080960a21b604482015260640160405180910390fd5b60405163095ea7b360e01b8152737a250d5630b4cf539739df2c5dacb4c659f2488d6004820152600019602482015273a0b86991c6218b36c1d19d4a2e9eb0ce3606eb489063095ea7b3906044016020604051808303816000875af1158015610171573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610195919061051f565b506040805160028082526060820183524792600092919060208301908036833701905050905073a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48816000815181106101e3576101e361055e565b60200260200101906001600160a01b031690816001600160a01b03168152505073c02aaa39b223fe8d0a0e5c4f27ead9083c756cc28160018151811061022b5761022b61055e565b6001600160a01b03909216602092830291909101909101526040516318cbafe560e01b8152737a250d5630b4cf539739df2c5dacb4c659f2488d906318cbafe590610287906305f5e100906000908690309042906004016105b8565b6000604051808303816000875af11580156102a6573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102ce91908101906105f4565b5060006102db83476106b2565b6040516370a0823160e01b8152306004820152909150600090736b175474e89094c44da98b954eedeac495271d0f906370a0823190602401602060405180830381865afa158015610330573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103549190610506565b905073c02aaa39b223fe8d0a0e5c4f27ead9083c756cc28360008151811061037e5761037e61055e565b60200260200101906001600160a01b031690816001600160a01b031681525050736b175474e89094c44da98b954eedeac495271d0f836001815181106103c6576103c661055e565b6001600160a01b0390921660209283029190910190910152604051637ff36ab560e01b8152737a250d5630b4cf539739df2c5dacb4c659f2488d90637ff36ab590849061041e906000908890309042906004016106d7565b60006040518083038185885af115801561043c573d6000803e3d6000fd5b50505050506040513d6000823e601f3d908101601f1916820160405261046591908101906105f4565b506040516370a0823160e01b81523060048201526000908290736b175474e89094c44da98b954eedeac495271d0f906370a0823190602401602060405180830381865afa1580156104ba573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104de9190610506565b6104e891906106b2565b90506622d10c4ecc80008110156104fe57600080fd5b505050505050565b60006020828403121561051857600080fd5b5051919050565b60006020828403121561053157600080fd5b8151801515811461054157600080fd5b9392505050565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b600081518084526020808501945080840160005b838110156105ad5781516001600160a01b031687529582019590820190600101610588565b509495945050505050565b85815284602082015260a0604082015260006105d760a0830186610574565b6001600160a01b0394909416606083015250608001529392505050565b6000602080838503121561060757600080fd5b825167ffffffffffffffff8082111561061f57600080fd5b818501915085601f83011261063357600080fd5b81518181111561064557610645610548565b8060051b604051601f19603f8301168101818110858211171561066a5761066a610548565b60405291825284820192508381018501918883111561068857600080fd5b938501935b828510156106a65784518452938501939285019261068d565b98975050505050505050565b6000828210156106d257634e487b7160e01b600052601160045260246000fd5b500390565b8481526080602082015260006106f06080830186610574565b6001600160a01b0394909416604083015250606001529291505056fea26469706673582212200c3371b61f04e0916b8ed6f53c39fb661a5aca1845a32355066990cd3d6e985e64736f6c634300080f0033',
    HyVM_BYTECODE: '608060405234801561001057600080fd5b506040516370a0823160e01b815230600482015260009073a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48906370a0823190602401602060405180830381865afa158015610063573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061008791906104d5565b90506305f5e1008110156100d05760405162461bcd60e51b815260206004820152600c60248201526b139bdd08195b9bdd59da080960a21b604482015260640160405180910390fd5b60405163095ea7b360e01b8152737a250d5630b4cf539739df2c5dacb4c659f2488d6004820152600019602482015273a0b86991c6218b36c1d19d4a2e9eb0ce3606eb489063095ea7b3906044016020604051808303816000875af115801561013d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061016191906104ee565b506040805160028082526060820183524792600092919060208301908036833701905050905073a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48816000815181106101af576101af61052d565b60200260200101906001600160a01b031690816001600160a01b03168152505073c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2816001815181106101f7576101f761052d565b6001600160a01b03909216602092830291909101909101526040516318cbafe560e01b8152737a250d5630b4cf539739df2c5dacb4c659f2488d906318cbafe590610253906305f5e10090600090869030904290600401610587565b6000604051808303816000875af1158015610272573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261029a91908101906105c3565b5060006102a78347610680565b6040516370a0823160e01b8152306004820152909150600090736b175474e89094c44da98b954eedeac495271d0f906370a0823190602401602060405180830381865afa1580156102fc573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061032091906104d5565b905073c02aaa39b223fe8d0a0e5c4f27ead9083c756cc28360008151811061034a5761034a61052d565b60200260200101906001600160a01b031690816001600160a01b031681525050736b175474e89094c44da98b954eedeac495271d0f836001815181106103925761039261052d565b6001600160a01b0390921660209283029190910190910152604051637ff36ab560e01b8152737a250d5630b4cf539739df2c5dacb4c659f2488d90637ff36ab59084906103ea906000908890309042906004016106a5565b60006040518083038185885af1158015610408573d6000803e3d6000fd5b50505050506040513d6000823e601f3d908101601f1916820160405261043191908101906105c3565b506040516370a0823160e01b81523060048201526000908290736b175474e89094c44da98b954eedeac495271d0f906370a0823190602401602060405180830381865afa158015610486573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104aa91906104d5565b6104b49190610680565b90506622d10c4ecc80008110156104ca57600080fd5b5050505050506106da565b6000602082840312156104e757600080fd5b5051919050565b60006020828403121561050057600080fd5b8151801515811461051057600080fd5b9392505050565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b600081518084526020808501945080840160005b8381101561057c5781516001600160a01b031687529582019590820190600101610557565b509495945050505050565b85815284602082015260a0604082015260006105a660a0830186610543565b6001600160a01b0394909416606083015250608001529392505050565b600060208083850312156105d657600080fd5b82516001600160401b03808211156105ed57600080fd5b818501915085601f83011261060157600080fd5b81518181111561061357610613610517565b8060051b604051601f19603f8301168101818110858211171561063857610638610517565b60405291825284820192508381018501918883111561065657600080fd5b938501935b828510156106745784518452938501939285019261065b565b98975050505050505050565b6000828210156106a057634e487b7160e01b600052601160045260246000fd5b500390565b8481526080602082015260006106be6080830186610543565b6001600160a01b03949094166040830152506060015292915050565b603f806106e86000396000f3fe6080604052600080fdfea264697066735822122063738389f9bb99c69e3e116c8689083565cf1b602a78b64e6d2784f72acc9ea364736f6c634300080f0033',
    HUFF_BYTECODE: '608e8060093d393df36370a0823160005230600452602060006024600073a0b86991c6218b36c1d19d4a2e9eb0ce3606eb485afa156000516305f5e10010176100885763095ea7b3600052737a250d5630b4cf539739df2c5dacb4c659f2488d6004526305f5e1006024526020600060446000600073a0b86991c6218b36c1d19d4a2e9eb0ce3606eb485af115610088575b60006000fd',
};


// solc tests/contracts/Dummy.sol  --bin
//  ... but I removed the deployment header (see: solc tests/contracts/Dummy.sol  --asm)
export const DUMMY = {
    BYTECODE: '608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80634c0811381461003b57806357de26a414610057575b600080fd5b610055600480360381019061005091906100c3565b610075565b005b61005f61007f565b60405161006c91906100ff565b60405180910390f35b8060008190555050565b60008054905090565b600080fd5b6000819050919050565b6100a08161008d565b81146100ab57600080fd5b50565b6000813590506100bd81610097565b92915050565b6000602082840312156100d9576100d8610088565b5b60006100e7848285016100ae565b91505092915050565b6100f98161008d565b82525050565b600060208201905061011460008301846100f0565b9291505056fea264697066735822122005423a9444d314e0e7b2cd4bfd07c44339d8d9f826f414e6b15941adf8e719bf64736f6c634300080f0033',

    CALL_SETTER: (deployedDummy: UInt256) => new Uint8Array([
        // store signature
        ...storeSignature(0, DUMMY['assign(uint256)']),

        // store arg value
        0x60, 0x42, // push1 0x42 (value)
        0x60, 0x04, // push1 0 (offset)
        0x52, // mstore

        // perform call
        0x60, 0x0, // push1 0 (retSize)
        0x60, 0x0, // push1 0 (retOffset)
        0x60, 0x24, // push1 0x24 (argSize)
        0x60, 0x00, // push1 0x00 (argOffset)
        0x60, 0x00, // push1 0x00 (value)
        0x7f, ...deployedDummy.toByteArray(), // push32 contract (contract)
        0x7f, ...Array(32).fill(0xff), // push32 0xfff... (gas)
        0xf1, // call
    ]),

    CALL_GETTER: (deployedDummy: UInt256) => new Uint8Array([
        // store signature
        ...storeSignature(0, DUMMY['read()']),

        // perform call
        0x60, 0x0, // push1 0 (retSize)
        0x60, 0x0, // push1 0 (retOffset)
        0x60, 0x04, // push1 0x04 (argSize)
        0x60, 0x00, // push1 0x00 (argOffset)
        0x60, 0x00, // push1 0x00 (value)
        0x7f, ...deployedDummy.toByteArray(), // push32 contract (contract)
        0x7f, ...Array(32).fill(0xff), // push32 0xfff... (gas)
        0xf1, // call

        // copy result to array
        0x3d, // RETURNDATASIZE
        0x80, // dup1
        0x60, 0, // push1 0
        0x60, 0xff, // push1 0xff
        0x3e, // returndatacopy

        // return result
        0x60, 0xff, // push1 0xff
        0xf3
    ]),
        //  solc tests/contracts/Dummy.sol  --hashes
    'assign(uint256)': '4c081138',
    'read()': '57de26a4',
};


export const HyVM_CALLER = {
    ABI: new utils.Interface([{ "inputs": [{ "internalType": "address", "name": "hyvm", "type": "address" }, { "internalType": "bytes", "name": "bytecode", "type": "bytes" }], "name": "callNvm", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }]),
    BYTECODE: '608060405234801561001057600080fd5b506101d3806100206000396000f3fe6080604052600436106100225760003560e01c8063ca60cd8d1461002e57600080fd5b3661002957005b600080fd5b34801561003a57600080fd5b5061004e6100493660046100fc565b610050565b005b6000836001600160a01b0316838360405161006c92919061018d565b600060405180830381855af49150503d80600081146100a7576040519150601f19603f3d011682016040523d82523d6000602084013e6100ac565b606091505b50509050806100f65760405162461bcd60e51b81526020600482015260126024820152714661696c656420746f2063616c6c204e564d60701b604482015260640160405180910390fd5b50505050565b60008060006040848603121561011157600080fd5b83356001600160a01b038116811461012857600080fd5b9250602084013567ffffffffffffffff8082111561014557600080fd5b818601915086601f83011261015957600080fd5b81358181111561016857600080fd5b87602082850101111561017a57600080fd5b6020830194508093505050509250925092565b818382376000910190815291905056fea26469706673582212207d7c6de913231d67d52591fd1455e3193631f4595f9c6e2f66f9750619575ad564736f6c634300080f0033',
};