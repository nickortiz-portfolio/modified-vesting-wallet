pragma solidity ^0.8.0;

import "@openzeppelin/contracts/finance/VestingWallet.sol";

contract MonthlyVesting2 is VestingWallet {
    uint64 constant time_OneDay = 24 * 60 * 60;
    uint64 constant time_OneHour = 60 * 60;
    uint64 constant time_TenMinutes = 10 * 60;
    uint64 constant time_FiveMinutes = 5 * 60;
    uint64 constant time_OneYear = 365 * 24 * 60 * 60;
    uint public x = 2;


    uint64 timeStep = time_FiveMinutes;
    constructor(uint64 _timeStep) VestingWallet(0xA6827b05ACf553550a61aDE21dd51ea43eD576da,1638857000, time_OneDay) {
        timeStep = _timeStep;
    }

    
    function _vestingSchedule(uint256 totalAllocation, uint64 timestamp) internal view override returns (uint256) {
        if (timestamp < start()) {
            return 0;
        } else if (timestamp > start() + duration()) {
            return totalAllocation;
        } else {
            uint256 timeElapsed = timestamp - start();
            return (totalAllocation * (timeElapsed - (timeElapsed % timeStep)) / duration());
        }
    }
}
