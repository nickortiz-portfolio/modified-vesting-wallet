
const hre = require("hardhat");

async function main() {
  const receiver = '0xA6827b05ACf553550a61aDE21dd51ea43eD576da';
  const time_OneDay = 24 * 60 * 60;
  const time_TenMinutes = 10 * 60;
  const startTime = 1638976562; // dec 8 

  const MonthlyVesting = await hre.ethers.getContractFactory("MonthlyVesting");
  const monthlyVesting = await MonthlyVesting.deploy(time_TenMinutes, receiver, startTime, time_OneDay);

  await monthlyVesting.deployed();

  console.log("MonthlyVesting deployed to:", monthlyVesting.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
