/* 
The function getBorrowUserData is being called from the 
lendingPool contract and will be used in the main() script 
* @param lendingPool argument will be the lendingPool contract not the address
*/

async function getBorrowUserData(lendingPool, account) {
    const { totalCollateralETH, totalDebtETH, availableBorrowsETH } =
        await lendingPool.getUserAccountData(account)

    console.log(`You have ${totalCollateralETH} worth of ETH down as collateral`)
    console.log(`You have ${totalDebtETH} worth of ETH borrowed.`)
    console.log(`You have ${availableBorrowsETH} Worth of ETH available to borrow`)

    return { availableBorrowsETH, totalDebtETH }
}

module.exports = { getBorrowUserData }
