// imports
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

const MUMBAI_INFURA = process.env.MUMBAI_INFURA;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    // set mumbai testnet for deploying smart contract
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    },
    //infura mumbai testnet for deploying smart contract
    infura_mumbai: {
      url: MUMBAI_INFURA,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};

