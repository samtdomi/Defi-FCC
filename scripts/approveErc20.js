/**
 * @dev this function needs to be ran before any transaction in the main() function
 * @param spenderAddress is the address that will be approved to spend the amount
 * @param erc20Address is the token address of the ASSET that will be appeoved to be spent
 * @notice captures and calls the approve function of the IERC20 interface
 * @dev arguments will be passed in when called from the main() function
 */
async function approveErc20(erc20Address, spenderAddress, amountToSpend, account) {
    const erc20Token = await ethers.getContractAt("IERC20", erc20Address, account)
    const tx = await erc20Token.approve(spenderAddress, amountToSpend)
    await tx.wait(1)
    console.log("Spender Approved!")
}

module.exports = { approveErc20 }
