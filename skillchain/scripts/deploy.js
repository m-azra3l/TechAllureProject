// imports
const hre = require("hardhat");
const fs = require('fs');

// funtion to deploy the contracts
async function main() {

  // deploy the Contract
  const SkillChain = await hre.ethers.getContractFactory("SkillChain");
  const skillchain = await SkillChain.deploy();
  await skillchain.deployed();
  console.log("contract deployed to:", skillchain.address);


  // export the addresses
  fs.writeFileSync('./config.js', `
    export const contractAddress = "${skillchain.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
