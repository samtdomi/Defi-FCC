/*
 * Using Chainlink PriceFeed contract to get the Dai price
 *
 */
const { ethers } = require("hardhat")

async function getDaiPrice() {
    // doesnt need deployer account connected becasue it is just reading from the contract
    const daiEthPriceFeed = await ethers.getContractAt(
        "AggregatorV3Interface",
        "0x773616e4d11a78f511299002da57a0a94577f1f4" // dai/eth pricefeed mainnet address
    )
    // price is the value at index 1 of the latestRoundData() returned values
    const price = (await daiEthPriceFeed.latestRoundData())[1]

    console.log(`The DAI/ETH price is ${price.toString()}`)

    return price
}

module.exports = { getDaiPrice }
