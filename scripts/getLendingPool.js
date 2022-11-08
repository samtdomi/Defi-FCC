/* 
 This function goes through the aave process of calling the getLendingPool function
 from the getLendingPoolAddresses contract to ensure we work with the most recent
 lendingPool contract and get its correct address.
 We call this function from Main() and return it the correct lendingPool contract
*/
async function getLendingPool(account) {
    const lendingPoolAddressesProvider = await ethers.getContractAt(
        "ILendingPoolAddressesProvider", // interface contract name, which will read its abi
        "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5", // LendingPool Mainnet contract address
        account
    )
    const lendingPoolAddress = await lendingPoolAddressesProvider.getLendingPool()

    // lendingPool Mainnet contract address: is the output of getlendingPool function above
    const lendingPool = await ethers.getContractAt("ILendingPool", lendingPoolAddress, account)

    return lendingPool
}

module.exports = { getLendingPool }
