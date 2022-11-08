// The purpopse of this script is to deposit our ETH for WETH token

const { getNamedAccounts, ethers } = require("hardhat")

const AMOUNT = ethers.utils.parseEther("0.02")

/**
 * @notice we will call the deploy function on the iweth erc20 interface
 * @notice the function call will deposit eth and return us weth
 */
async function getWeth() {
    const { deployer } = await getNamedAccounts()
    // call the deposit function on the weth contract to deposit eth and get weth
    // need the abi & contract address of the weth interface (create the interface and compile)
    // 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
    // ethers.getContractAt(abi, address, deployer) <-- gets a contract at an outside address and its abi
    const iWeth = await ethers.getContractAt(
        "Iweth", // name of interface contract name, which will read its abi
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // mainnet rpc url
        deployer
    )
    const tx = await iWeth.deposit({ value: AMOUNT }) // calls deposit function on weth contract
    await tx.wait(1)
    const wethBalance = await iWeth.balanceOf(deployer)
    console.log(`weth balance is: ${wethBalance.toString()}`)
}

module.exports = { getWeth, AMOUNT }
