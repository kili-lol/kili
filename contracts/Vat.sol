// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title The Vat — KILI mix-fee sink
/// @notice ETH lands here. No owner. No withdraw. No constructor.
/// @dev Call socials() after verify. Mix fees only — never an EOA.
contract Vat {
    event Received(address indexed from, uint256 amount);

    string public constant NAME = "The Vat";
    string public constant TICKER = "KILI";

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    fallback() external payable {
        emit Received(msg.sender, msg.value);
    }

    function description() public pure returns (string memory) {
        return
            "KILI mix-fee sink. Mutate Your Cats. A cat is four organs. Mix two. Fifty-fifty. Six percent mutant. Coat mismatch: chimera. Keep the wrong ones. Ticker $KILI. Nursery unit KIT. https://www.kili.lol";
    }

    function website() public pure returns (string memory) {
        return "https://www.kili.lol";
    }

    function twitter() public pure returns (string memory) {
        return "https://x.com/kili_RH";
    }

    function github() public pure returns (string memory) {
        return "https://github.com/kili-lol/kili";
    }

    function socials()
        external
        pure
        returns (
            string memory name_,
            string memory ticker_,
            string memory description_,
            string memory website_,
            string memory twitter_,
            string memory github_
        )
    {
        return (NAME, TICKER, description(), website(), twitter(), github());
    }
}
