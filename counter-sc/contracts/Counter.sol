pragma solidity ^0.8.9;

contract Counter {
  uint256 public counter = 23;

  function increment() public returns (uint256) {
    counter = counter + 1;
    return counter;
  }

  function decrement() public returns (uint256) {
    require(counter > 0);
    counter = counter - 1;
    return counter;
  }
}