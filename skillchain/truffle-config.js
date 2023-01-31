require("babel-register");
require("@babel/polyfill");

const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    mumbai: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },
  // Contract directory
  contracts_directory: "./contracts/",

  // Abi directory
  contracts_build_directory: "./src/abis/",

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.13",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  plugins: ["truffle-contract-size"],
};
