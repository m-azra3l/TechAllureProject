# SkillChain

## Project Description

A skill verification system built on blockchain technology can shorten the time needed for evaluating competency and increase trust in the management of skills and abilities within a company. By having their skills recorded and verified by previous managers or employers on a secure network, employees can demonstrate their competencies with confidence. A blockchain-based skill chain for an employee ensures that their skills, experience, learning progress, and competency level are fully verified, with a transparent record of who has endorsed them. This can also help companies to match the right employees to their business needs in an optimal way.

## Project Snapshot

## Project Website Link

Live website link: [SkillChain](https://tech-allure-project-m-azra3l.vercel.app/)

## Project Reference

- Guidebook [Create a blockchain-based Skill Verification system](https://learn.figment.io/tutorials/create-a-blockchain-skill-verification-system)

- Smart Contract Reference [Decentraskill](https://github.com/iamsdas/Decentraskill)

## How to Install and Run the Project

First step is to add metamask plugin to your supported browser (chrome) from this link [here](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) and login

Please pay close attention to the instructions provided. There may be problems with installing certain packages if they are not well-maintained. If you encounter any issues during the installation process, you can check some developer communities for help or reach out to me.

Fork the repository to your Github account
Clone the forked repository to your local machine

```git clone https://github.com/[username]/TechAllureProject.git```

### Dependecies

- Hardhat
- Waffle
- web3modal
- Infura
- IPFS
- Polygon Mumbai Test Network

### Hardhat

1. Create a `.env`

> Examples `.env.example` and  file has been created to guide you. You can copy and paste the contents of the file and edit the variables or rename the files by removing the `.example` extensions.

2. Install Hardhat


```shell
npm install -g hardhat
```

> Hardhat assists us in tasks such as deploying and testing.

3. Install node dependencies

```shell
npm install
```

### Setting up Blockchain on Polygon Mumbai Test Network

For our application, we will be running it on the Mumbai test network, feel free to use other test networks like Ropsten, just change the settings accordingly.

#### Getting ether on Mumbai

Before you are able to deploy the smart contracts, you will need some ether in your account first. Visit the [Mumbai faucet](https://mumbaifaucet.com/) and follow the instructions on the page to get some ether transferred to your account. You will be propmted to create an account on Alchemy platform.

#### Deploying Smart Contracts

Open your terminal and run:

```npx truffle deploy --network mumbai```

### Install the required dependencies

Open your terminal and run:
```yarn install```

### Compile and test the smart contract using hardhat and waffle

Open your terminal and run:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test

Deploy on localhost blockchain:
npx hardhat node
npx hardhat run scripts/deploy.js 

Deploy on Mumbai testnet:
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

### Start the development server

```This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).```

First, run the development server:

```shell

yarn dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.jsx`. The page auto-updates as you edit the file.

### Learn more about Next JS

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Team Members

- [Peculiar Richard](https://github.com/peculiarrichard)
- [Egar King David](https://github.com/KingDavid9991)
- [Oladapo Folayowon](https://github.com/folayowon)
- [Michael Damilare Adesina](https://github.com/m-azra3l)

## License

This project is licensed under GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007.
