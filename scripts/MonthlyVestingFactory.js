const hre = require('hardhat')

async function main() {
  const MonthlyVestingFactory = await hre.ethers.getContractFactory(
    'MonthlyVestingFactory',
  )
  const monthlyVestingFactory = await MonthlyVestingFactory.deploy()

  await monthlyVestingFactory.deployed()

  console.log(
    'MonthlyVestingFactory deployed to:',
    monthlyVestingFactory.address,
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
