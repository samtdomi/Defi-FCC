const { getNamedAccounts, ethers } = require("hardhat")
const { getWeth, AMOUNT } = require("../scripts/getWeth")
const { getLendingPool } = require("../scripts/getLendingPool")
const { approveErc20 } = require("../scripts/approveErc20")
const { getBorrowUserData } = require("../scripts/getBorrowUserData")
const { getDaiPrice } = require("../scripts/getDaiPrice")
const { borrowDai } = require("../scripts/borrowDai.js")
const { repayDai } = require("../scripts/repayDai")

/* 
  This function will be our main function for carrying out all of our tasks
  and using each script and script function to fulfill our objectives
 * 1. deposit and convert ETH to WETH
 * 2. get the aave lending pool
 * 3. approve aave lending pool to be the spender
 * 4. deposit using the lending pool
 * 5. borrow DAI
 * 6. repay DAI
  */
async function main() {
    const { deployer } = await getNamedAccounts()

    // this function deposits ETH for WETH becasue AAVE only works with ERC20 tokens
    await getWeth()

    // script: calls getLendingPool function from getLendingPool script to get the lendingPoolContract
    const lendingPool = await getLendingPool(deployer)
    console.log(`LendingPool address: ${lendingPool.address}`)

    const wethTokenAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" // from getWeth()

    // approve and then deposit
    // script: approve the aave lendingPool to be the spender to deposit our funds
    await approveErc20(wethTokenAddress, lendingPool.address, AMOUNT, deployer)
    console.log("Depositing......")
    await lendingPool.deposit(wethTokenAddress, AMOUNT, deployer, 0)
    console.log("Deposited by the lending pool!!!!")

    // script: how much we have borrowed, and how much is still available to borrow
    let { availableBorrowsETH, totalDebtETH } = await getBorrowUserData(lendingPool, deployer)

    // script: What is the conversion rate of DAI ???
    const daiPrice = await getDaiPrice()
    //Calculate amount of DAI to Borrow, 95% of total available eth borrow amount * reciprical of daiEth Price
    const amountDaiToBorrow = availableBorrowsETH * 0.95 * (1 / daiPrice)
    console.log(`You can borrow: ${amountDaiToBorrow.toString()} DAI`)
    const amountDaiToBorrowWei = ethers.utils.parseEther(amountDaiToBorrow.toString())

    // script: BORROW DAI!!!!
    const daiTokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F" // dai mainnet token address on etherscan
    await borrowDai(daiTokenAddress, lendingPool, amountDaiToBorrowWei, deployer)

    // script: get new, updated user data after borrowing dai
    await getBorrowUserData(lendingPool, deployer)

    // script: repay the borrowed dai
    await repayDai(amountDaiToBorrowWei, daiTokenAddress, lendingPool, deployer)

    // script: get final user data amounts after repayment
    await getBorrowUserData(lendingPool, deployer)
}

// runs the function main()
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
