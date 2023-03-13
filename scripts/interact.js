const { ethers } = require("hardhat");

const API_KEY = process.env.API_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const contract = require("../artifacts/contracts/helloworld.sol/HelloWorld.json");

const alchemyProvider = new ethers.providers.AlchemyProvider(network = "goerli", API_KEY);

const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
    const message = await helloWorldContract.message();
    console.log(message);

    const tx = await helloWorldContract.update("good bye world!");
    await tx.wait();

    const newMessage = await helloWorldContract.message();
    console.log(newMessage);
}

main().then(() => process.exit(0)).catch((error) => {
    console.log(error);
    process.exit(1);
});