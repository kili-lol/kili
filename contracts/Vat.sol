// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title The Vat — KILI mix-fee sink
/// @notice ETH lands here. No owner. No withdraw. No constructor.
contract Vat {
    event Received(address indexed from, uint256 amount);

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    fallback() external payable {
        emit Received(msg.sender, msg.value);
    }
}
