
require("ethers");
const hre = require("hardhat");

async function main() {

  const TestERC = await hre.ethers.getContractFactory("TestERC");
  const testERC = await TestERC.deploy(ethers.utils.parseEther("333333"));

  await testERC.deployed();

  console.log("TestERC deployed to:", testERC.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
