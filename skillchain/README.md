# SkillChain

## Project Description

A skill verification system built on blockchain technology can shorten the time needed for evaluating competency and increase trust in the management of skills and abilities within a company. By having their skills recorded and verified by previous managers or employers on a secure network, employees can demonstrate their competencies with confidence. A blockchain-based skill chain for an employee ensures that their skills, experience, learning progress, and competency level are fully verified, with a transparent record of who has endorsed them. This can also help companies to match the right employees to their business needs in an optimal way.

## Project Snapshot

- Landing Page
![Screenshot (154)](https://user-images.githubusercontent.com/26850963/224640695-1e75d120-1318-4613-a637-b4c7cdcdb2d5.png)

- Signup Page
![Screenshot (150)](https://user-images.githubusercontent.com/26850963/224640924-01def794-31ca-4733-a1da-825a4374d87e.png)
![Screenshot (151)](https://user-images.githubusercontent.com/26850963/224640931-c5e54639-65c8-4307-b138-b00a987ae2d2.png)
![Screenshot (152)](https://user-images.githubusercontent.com/26850963/224640936-f4606b95-7e7d-4c31-9855-5e4427834b07.png)

- Signin Page
![Screenshot (153)](https://user-images.githubusercontent.com/26850963/224641020-27ed93ab-38a1-42dd-823f-54eff01a4e69.png)

- Organization Dashboard
![Screenshot (146)](https://user-images.githubusercontent.com/26850963/224641303-f4364042-76e3-4919-8a7f-1c16f055931b.png)
![Screenshot (147)](https://user-images.githubusercontent.com/26850963/224641316-0d7521e2-687e-469e-8697-871e9d7bf971.png)

- User Dashboard
![Screenshot (158)](https://user-images.githubusercontent.com/26850963/224641971-00263f2e-97cb-4674-813a-7b759b27675b.png)

- User List
![Screenshot (148)](https://user-images.githubusercontent.com/26850963/224642053-dbe45914-0956-40c3-9e69-6dd8bb57ba48.png)

- Organization List
![Screenshot (149)](https://user-images.githubusercontent.com/26850963/224642156-0b9efde1-0acf-4174-b646-ea057a85c488.png)

- View User
![Screenshot (155)](https://user-images.githubusercontent.com/26850963/224642252-478658de-85fc-494f-8e1b-bb250a540107.png)
![Screenshot (156)](https://user-images.githubusercontent.com/26850963/224642260-0ca243eb-5148-492c-9fda-9d920b71a589.png)

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

### Infura IPFS

Here are the steps to create an Infura IPFS project, get the project ID and project secret key, and add them to the .env file:

1. Sign up for an account on Infura's website and create a new project.

2. In the project dashboard, click on the "Keys" tab and generate a new API key for IPFS.

3. Copy the Project ID and Project Secret Key from the project dashboard.

4. Rename `.env.example` to `.env` in the root directory of your project.

5. Add the following lines to the .env file, replacing YOUR_PROJECT_ID and YOUR_PROJECT_SECRET_KEY with the actual values:

IPFS_ID = "Your infura ipfs project Id "
IPFS_KEY = "Your infura ipfs project key"

6. Save the .env file.
Now you can use the project ID and project secret key in your application by accessing the IPFS_ID and IPFS_KEY environment variables.

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
