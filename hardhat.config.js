require("@nomicfoundation/hardhat-toolbox")
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

const GOERLI_RPC_URL =
    process.env.GOERLI_RPC_URL ||
    "https://eth-goerli.g.alchemy.com/v2/hldxuXgSTR_Bp9QroWxKuN7OMICdfmTk" // alchemy goerli rpc url
const MAINNET_RPC_URL =
    process.env.MAINNET_RPC_URL ||
    "https://eth-mainnet.g.alchemy.com/v2/53UCuKiUcu8h2itQW33i45PiFSVtmY4h"
const PRIVATE_KEY = process.env.PRIVATE_KEY // metamask wallet
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY // etherscan
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY // coinmarketcap

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        compilers: [
            { version: "0.8.17" },
            { version: "0.8.4" },
            { version: "0.8.0" },
            { version: "0.4.19" },
            { version: "0.6.12" },
        ],
    },

    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1,
        },
    },

    defaultNetwork: "hardhat",

    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 6,
        },
        hardhat: {
            chainId: 31337,
            forking: {
                url: MAINNET_RPC_URL,
            },
        },
    },

    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },

    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "MATIC",
    },

    mocha: {
        // time limit for the Promise and Listener in test.js
        // if the listener doesnt get resolved in 300 seconds, its error's out
        timeout: 500000, // 500,000 miliseconds, 500 seconds
    },
}
