// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title Nursery — KILI kits (KIT)
/// @notice Four organs, 50/50 mix, 6% mutant, coat mismatch = chimera.
///         Mix fee is forwarded to The Vat. Ticker $KILI is a separate PAIR V2 token.
contract Nursery {
    address public immutable vat;
    uint256 public constant mixFee = 0.0003 ether;
    uint256 public nextId = 1;

    struct Kit {
        uint8 head;
        uint8 body;
        uint8 tail;
        uint8 legs;
        uint8 coat;
        uint8 line;
        uint16 generation;
        bool chimera;
        bool mutant;
        address keeper;
    }

    mapping(uint256 => Kit) public kits;

    event Mixed(uint256 indexed id, address indexed keeper, bool chimera, bool mutant, uint8 line);
    event FounderMinted(uint256 indexed id, address indexed keeper, uint8 founder);

    constructor(address vat_) {
        require(vat_ != address(0), "vat");
        vat = vat_;
    }

    function mix(uint256 a, uint256 b) external payable returns (uint256 id) {
        require(msg.value == mixFee, "fee");
        Kit memory pa = kits[a];
        Kit memory pb = kits[b];
        require(pa.keeper == msg.sender && pb.keeper == msg.sender, "keeper");
        require(a != b && a != 0 && b != 0, "parents");

        bytes32 entropy = keccak256(
            abi.encodePacked(block.prevrandao, block.timestamp, msg.sender, a, b, nextId)
        );

        Kit memory child;
        child.head = _pick(pa.head, pb.head, entropy, 0);
        child.body = _pick(pa.body, pb.body, entropy, 1);
        child.tail = _pick(pa.tail, pb.tail, entropy, 2);
        child.legs = _pick(pa.legs, pb.legs, entropy, 3);
        child.coat = _pick(pa.coat, pb.coat, entropy, 4);
        child.chimera = child.coat != child.head;
        child.mutant = uint8(entropy[5]) < 16; // 16/256 ≈ 6.25%
        if (child.mutant) {
            child.line = 1 + (uint8(entropy[6]) % 6);
            uint8 organ = uint8(entropy[7]) % 4;
            if (organ == 0) child.head = child.line;
            else if (organ == 1) child.body = child.line;
            else if (organ == 2) child.tail = child.line;
            else child.legs = child.line;
        }
        uint16 g = pa.generation > pb.generation ? pa.generation : pb.generation;
        child.generation = g + 1;
        child.keeper = msg.sender;

        id = nextId++;
        kits[id] = child;

        (bool ok,) = vat.call{value: msg.value}("");
        require(ok, "vat");

        emit Mixed(id, msg.sender, child.chimera, child.mutant, child.line);
    }

    /// @notice Seed a founder KIT (0..6) for the caller. Off-chain lab does this locally until launch.
    function claimFounder(uint8 founder) external returns (uint256 id) {
        require(founder <= 6, "founder");
        Kit memory k;
        k.head = founder;
        k.body = founder;
        k.tail = founder;
        k.legs = founder;
        k.coat = founder;
        k.line = founder == 6 ? 0 : founder + 1;
        k.mutant = founder != 6;
        k.keeper = msg.sender;
        id = nextId++;
        kits[id] = k;
        emit FounderMinted(id, msg.sender, founder);
    }

    function socials()
        external
        pure
        returns (string memory description, string memory website, string memory twitter, string memory github)
    {
        return (
            "Mutate Your Cats. Four organs. Keep the wrong ones.",
            "https://www.kili.lol",
            "https://x.com/kili_RH",
            "https://github.com/kili-lol/kili"
        );
    }

    function _pick(uint8 a, uint8 b, bytes32 entropy, uint8 slot) internal pure returns (uint8) {
        return uint8(entropy[slot]) % 2 == 0 ? a : b;
    }
}
