# Marketplace Dapp

Marketplace dapp is built on top of Ethereum ecosystem and allows users with a MetaMask wallet to add products to the market as well as purchase products from the market. The benefit of this dapp is that it connects buyers directly with the sellers, whilst maitaining privacy, transparency and secure & fast payments with Ether.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

* [Node.js](https://nodejs.org/en/download/)
* [npm](https://www.npmjs.com/get-npm) (downloaded automatically with Node.js)
* [ganache-cli](https://www.npmjs.com/package/ganache-cli)
* [MetaMask](https://metamask.io/)

### Installing

A step by step series of examples that tell you how to get a development env running

Get the code

```
git clone https://github.com/dt6120/Marketplace-Dapp.git marketplace
```

Install dependencies

```
cd marketplace
npm install
```

Configure the development network in the truffle-config.js file. I have used ganache-cli

```
development: {
     host: "127.0.0.1",
     port: 8545,
     network_id: "*",
}
```

As I have used ganache-cli, execute the following command to get the local blockchain instance up & running

```
ganache-cli
```

Compile the smart contracts before deploying them

```
truffle compile
```

Run tests for the smart contracts (optional)

```
truffle test
```

Deploy the smart contracts on the network specified in the truffle-config.js file

```
truffle migrate --reset
```

Run the server

```
npm start
```

After the browser window opens up, sign into MetaMask wallet & set appropriate network. If you are using ganache, then import the required accounts. The front-end has a form for adding products to the market and a table that lists the products and shows if the product can be purchased or not.

## Built With

* [React.js](https://reactjs.org/)
* [Truffle](https://www.trufflesuite.com/truffle)

## Authors

* **Dhruv Takwal**

## License

This project is licensed under the MIT License.
