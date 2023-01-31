# SkillChain

## Project Description

A skill verification system built on blockchain technology can shorten the time needed for evaluating competency and increase trust in the management of skills and abilities within a company. By having their skills recorded and verified by previous managers or employers on a secure network, employees can demonstrate their competencies with confidence. A blockchain-based skill chain for an employee ensures that their skills, experience, learning progress, and competency level are fully verified, with a transparent record of who has endorsed them. This can also help companies to match the right employees to their business needs in an optimal way.

## Project Snapshot

## Project Website Link

Live website link: [SkillChain](https://skillchain.vercel.app/)

## How to Install and Run the Project

First step is to add metamask plugin to your supported browser (chrome) from this link [here](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) and login

Please pay close attention to the instructions provided. There may be problems with installing certain packages if they are not well-maintained. If you encounter any issues during the installation process, you can check some developer communities for help or reach out to me.

Fork the repository to your Github account
Clone the forked repository to your local machine

```git clone https://github.com/[username]/blocmusic.git```

### Dependecies

- Truffle
- Ganache
- Google Cloud
- Firebase
- Polygon Mumbai Test Network

### Truffle

1. Create a `.env` and `.secret` file

> Examples `.env.example` and `.secret.example` files hav been created to guide you. You can copy and paste the contents of the file and edit the variables or rename the files by removin the `.example` extensions.

2. Download Truffle

Visit https://www.trufflesuite.com/truffle for more information

```shell
npm install -g truffle
```

> Truffle assists us in tasks such as deploying, testing, and migrating.

3. Install node dependencies

```shell
npm install
```

### Ganache

1. Download Ganache GUI

Visit [Truffle Ganache](https://www.trufflesuite.com/ganache) to download the application

2. Create a ganache workspace & run ganache blockchain network

To create a new workspace project with the same truffle settings defined in the truffle-config.js file, click on 'New Workspace' and then under 'Add Project', select the truffle-config.js file from the Skillchain directory.

![](https://i.imgur.com/gnWVdrN.png)


When the workspace is open, the local ganache blockchain network should be active on the specified port and network ID.

> Note: Keep the workspace open so that it will run while working on your project

3. Deploy Smart Contracts

To make contract deployment easier, npm scripts have been added. You can see the commands used by looking at the package.json file for further clarification.

In the root directory of SKillChain, run the following commands one after the other:

```shell
truffle compile
npm run deploy:local
```

### Google Cloud

To create a Google Cloud Storage bucket, you can follow these steps:

1. Log in to your Google Cloud Console: Go to the [Google Cloud Console](https://console.cloud.google.com) and log in with your Google account.

2. Create a project: If you don't already have a project, create a new project by clicking on the project drop-down menu and selecting "New Project." Give your project a name and select a billing account, if you have one.

3. Access the Cloud Storage: From the Google Cloud Console, navigate to the Cloud Storage dashboard by clicking on the hamburger menu and selecting "Storage."

4. Create a new bucket: In the Cloud Storage dashboard, click on the "Create bucket" button to create a new bucket.

5. Configure your bucket: Give your bucket a unique name, select a location, and choose the storage class that best fits your needs. You can also set up access control and configure advanced settings if needed.

6. Create the bucket: After you have configured your bucket, click on the "Create" button to create your new Google Cloud Storage bucket.

That's it! Your new bucket will now be available for you to use in the Cloud Storage dashboard.

### Firebase

To create a Firebase project and web app that connects to a Google Cloud Storage bucket, you can follow these steps:

1. Create a Firebase project: Go to the [Firebase Console](https://console.firebase.google.com) and log in with your Google account. Click on the "Create a Project" button and give your project a name. You can also select a billing account if you have one.

2. Enable the Google Cloud Storage integration: In the Firebase Console, navigate to the "Storage" section. Click on the "Get started" button to enable the Google Cloud Storage integration. You will be asked to select a Google Cloud Storage bucket to use with your Firebase project.

3. Create a web app: In the Firebase Console, navigate to the "Develop" section and click on the "Web" button to create a new web app. Give your app a name and choose a region.

4. Connect your web app to Firebase: To connect your web app to Firebase, you will need to install the Firebase SDK in your web app. You can find the instructions to install the SDK in the Firebase Console.

5. Access your Google Cloud Storage bucket from your web app: Once you have connected your web app to Firebase, you can access your Google Cloud Storage bucket from your web app. You can do this by using the Firebase SDK in your web app and calling the appropriate API methods.

6. Deploy your web app: Finally, you can deploy your web app by following the instructions in the Firebase Console. Your web app will be hosted on Firebase and will be connected to your Google Cloud Storage bucket.

That's it! You now have a Firebase project and web app that connects to your Google Cloud Storage bucket.

### Setting up Blockchain on Polygon Mumbai Test Network

For our application, we will be running it on the Mumbai test network, feel free to use other test networks like Ropsten, just change the settings accordingly.

#### Getting ether on Mumbai

Before you are able to deploy the smart contracts, you will need some ether in your account first. Visit the [Mumbai faucet](https://mumbaifaucet.com/) and follow the instructions on the page to get some ether transferred to your account. You will be propmted to create an account on Alchemy platform.

#### Deploying Smart Contracts

First open your `.secret` file and paste your Metamask wallet phrase

Open your terminal and run:

```npx truffle deploy --network mumbai```

### Install the required dependencies for Client App

Open your terminal and run:
```yarn install```

### Start the Client App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### Available Script

In the project directory, you can run:

##### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### Option 1 - Let's connect to local blockchain

```shell
yarn start
```

To use the front-end application running at http://localhost:3000/, connect to the Localhost Network in metamask

You should see a Localhost:8545 on your MetaMask account networks

Import the account that was used to deploy the contracts, to do this, use the private key of the account, it can be found in the key symbol of the Ganache UI next to your account.

![](https://i.imgur.com/f090jmt.png)

#### Option 2 - To connect to Mumbai test network

```shell
yarn start
```

To use the front-end application running at http://localhost:3000/, connect to the Mumbai Test Network in metamask and use the account that you used to deploy the contracts.

> This will connect to the Goerli network with Infura, only for viewing of certificates. The other functions uses the Ethereum-based browsers (connected to Metamask wallets) to access the network.

---

## Testing

### Smart Contracts Funtionality Testing

This will run the testing files with the test cases defined the files, located under `/test` folder
Make sure the local ganache blockchain network is running first before testing. Testing will be done on the local network.

```shell
npx truffle test
```

> If these test cases pass, you are good. If not, please double check the local blockchain network is set up correctly (especially the Port number and network ID)

### Deploy Client App on Vercel

The easiest way to deploy your React.js app is to use the [Vercel Platform](https://vercel.com/).

## Team Members

- [Peculiar Richard](https://github.com/peculiarrichard)
- [Egar King David](https://github.com/KingDavid9991)
- [Oladapo Folayowon](https://github.com/folayowon)
- [Michael Damilare Adesina](https://github.com/m-azra3l)

## License

This project is licensed under GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007.
