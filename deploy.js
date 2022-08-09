require('dotenv').config();
const Web3      = require('web3');
const HDWalletProvider  = require('@truffle/hdwallet-provider');
const { interface, bytecode }   = require('./compile');

const provider  = new HDWalletProvider(
    process.env.MNEMONIC,
    process.env.INFURA_ENDPOINT
);

const web3  = new Web3(provider); 

const deploy = async() => {
    const accounts  = await web3.eth.getAccounts();

    console.log('Deploying contract using account ', accounts[0]);

    const result    = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Greetings!'] })
        .send({ gas: '1000000', from: accounts[0]  });

    console.log('Contract deployed to ', result.options.address);
}
deploy();