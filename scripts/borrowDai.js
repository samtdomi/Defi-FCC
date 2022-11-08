/**
 * @notice this script will call the borrow function on the aave lendingpool address
 * @param daiAddress // DAI token contract address on ethereum mainnet
 * @param lendingPool is the lendingPool aave contract
 * @param amountDaiToBorrowWei is the amount of dai to borrow converted to wei
 * @param account is the deployer account from the main() function
 */

async function borrowDai(daiAddress, lendingPool, amountDaiToBorrowWei, account) {
    // lendingPool.borrow(asset, amount, interestRateMode, referralCode, onBehalfOf)
    const borrowTx = await lendingPool.borrow(daiAddress, amountDaiToBorrowWei, 1, 0, account)
    await borrowTx.wait(1)
    console.log("You have borrowed Dai !!!!")
}

module.exports = { borrowDai }
