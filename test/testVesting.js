const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
require("web3");

beforeEach(async function () { 
  

});


describe("MonthlyVesting", function () {
  it("Should release 0 tokens before cliff ends/start time", async function () {
    const [deployer] = await ethers.getSigners();
    
    const MonthlyVesting = await ethers.getContractFactory("MonthlyVesting");
    const monthlyVesting = await MonthlyVesting.deploy(10*60);
    await monthlyVesting.deployed();

    const TestERC20 = await ethers.getContractFactory("TestERC")
    const testERC20 = await TestERC20.deploy(ethers.utils.parseEther("1000"))
    await testERC20.deployed();

    let deployerBalance = await testERC20.balanceOf(deployer.address);
    let vestingBalance = await testERC20.balanceOf(monthlyVesting.address);
    // expect(await testERC20.totalSupply()).to.equal(deployerBalance);
    await testERC20.transfer(monthlyVesting.address,deployerBalance);




    deployerBalance = await testERC20.balanceOf(deployer.address);
    assert.equal(deployerBalance,0);

    await monthlyVesting.release(testERC20.address);
    console.log(monthlyVesting)
    let latestBlock = await hre.ethers.provider.getBlock("latest")


    await hre.ethers.provider.send("evm_setNextBlockTimestamp", [1658960969]) // Jul 28, 2022
    await hre.ethers.provider.send("evm_mine");

    // await ethers.provider.getSigner(0).sendTransaction({ to: monthlyVesting.address, value: ethers.utils.parseEther("1"), data: });

    latestBlock = await hre.ethers.provider.getBlock("latest")



    // expect(await monthlyVesting.greet()).to.equal("Hello, world!");

    // const setGreetingTx = await monthlyVesting.setGreeting("Hola, mundo!");

    // // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await monthlyVesting.greet()).to.equal("Hola, mundo!");
  });
});
