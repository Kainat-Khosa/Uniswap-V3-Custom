import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { userStorageDataAddress, userStorageDataABI, BooTokenAddress, BooTokenABI, LifeTokenAddress, LifeTokenABI, SwapTokenAddress, SwapTokenABI, SwapMultiHopABI, SwapMultiHopAddress, IWETHABI, IWETHAddress } from "../Context/constants";

//Check if wallet connected
export const checkIfWalletConnected = async () => {
    try {
        if(!window.ethereum) return console.log("Install Metamask");
        const accounts = await window.ethereum.request({
            method:"eth_accounts",
        })
        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        console.log(error);
    }
};


//Connect Wallet
export const connectWallet = async () => {
    try {
        if(!window.ethereum) return console.log("Install Metamask");
        const accounts = await window.ethereum.request({
            method:"eth_requestAccounts",
        })
        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        console.log(error);
    }
};

  
//Boo Token Fetching
export const fetchBooContract = (signerOrProvider) => new ethers.Contract(BooTokenAddress, BooTokenABI, signerOrProvider);

//Connecting with Boo Token
export const connectingWithBooToken = async () => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchBooContract(signer);
        return contract;
    } catch (error) {
        console.log(error);
    }
}


//Life Token Fetching
export const fetchLifeContract = (signerOrProvider) => new ethers.Contract(LifeTokenAddress, LifeTokenABI, signerOrProvider);

//Connecting with Life Token
export const connectingWithLifeToken = async () => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchLifeContract(signer);
return contract;
    } catch (error) {
        console.log(error);
    }
}


//Swap Token Fetching
export const fetchSwapContract = (signerOrProvider) => new ethers.Contract(SwapTokenAddress, SwapTokenABI, signerOrProvider);

//Connecting with Swap Token
export const connectingWithSwapToken = async () => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchSwapContract(signer);
        return contract;
    } catch (error) {
        console.log(error);
    }
}


//Swap Multi Hop Fetching
export const fetchSwapMultiHopContract = (signerOrProvider) => new ethers.Contract(SwapMultiHopAddress, SwapMultiHopABI, signerOrProvider);

//Connecting with MultiSwap Token
export const connectingWithSwapMultiHop = async () => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchSwapMultiHopContract(signer);
        return contract;
    } catch (error) {
        console.log(error);
    }
}


//IWETH Fetching
export const fetchIWETHContract = (signerOrProvider) => new ethers.Contract(IWETHAddress, IWETHABI, signerOrProvider);

//Connecting with Weth Token
export const connectingWithIWETH = async () => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchIWETHContract(signer);
        return contract;
    } catch (error) {
        console.log(error);
    }
}


//DAI Fetching
const DAIAddress = "0xdc31ee1784292379fbb2964b3b9c4124d8f89c60";
//"0xd393b1E02dA9831Ff419e22eA105aAe4c47E1253";
export const fetchDAIContract = (signerOrProvider) => new ethers.Contract(DAIAddress, IWETHABI, signerOrProvider);

//Connecting with Dai Token
export const connectingWithDAI = async () => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchDAIContract(signer);
        return contract;
    } catch (error) {
        console.log(error);
    }
}

//Connecting with User Contract
export const fetchUserStorageDataContract = (signerOrProvider) => new ethers.Contract( userStorageDataAddress, userStorageDataABI, signerOrProvider);

export const connectingWithUserStorageData= async () => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchUserStorageDataContract(signer);
        return contract;
    } catch (error) {
        console.log(error);
    }
}

const LINK_ADDRESS ="0x326C977E6efc84E512bB9C30f76E30c160eD06FB"

//Link Token Fetching
export const fetchLINKToken = (signerOrProvider) => new ethers.Contract(LINK_ADDRESS, BooTokenABI, signerOrProvider);

//Connecting with Link Token
export const connectingWithLINKToken = async () => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchLINKToken(signer);
        return contract;
    } catch (error) {
        console.log(error);
    }
}