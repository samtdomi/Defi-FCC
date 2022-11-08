/**
 * @dev FIRST, we need to APPROVE the aave lendingPool to make a transaction for
 *      us so the repayment can go through
 * @param amount is the amount that we are allowing aave to spend for us, the amount we want to repay
 * @param daiAddress is the dai token contract address on ethereum mainnet
 * @param lendingPool is the aave lendingPool contract, not contract address
 * @param account is the account that will be spending the dai, which is the deployer for us
 */

const { approveErc20 } = require("./approveErc20")

async function repayDai(amount, daiAddress, lendingPool, account) {
    // approves aave lending pool to make the dai transaction for our deployer account
    await approveErc20(daiAddress, lendingPool.address, amount, account)

    const repayTx = await lendingPool.repay(daiAddress, amount, 1, account)
    await repayTx.wait(1)

    console.log("Dai has been repayed successfully!!!")
}

module.exports = { repayDai }
