import React, {useState, useEffect} from "react";
import {ethers, BigNumber} from 'ethers';
import Web3Modal from 'web3modal';
import {checkIfWalletConnected, connectWallet,connectingWithLINKToken, connectingWithSwapToken, connectingWithUserStorageData} from '../Utils/appFeatures';
import{ getPrice } from "../Utils/fetchingPrice"
import { swapUpdatePrice } from "../Utils/swapUpdatePrice"
import ERC20 from './BooToken.json';
import {addLiquidityExternal} from "../Utils/addLiquidity";
import { getLiquidityData } from "../Utils/checkLiquidity";
import { connectingWithPoolContract } from "../Utils/deployPool";
import {Token, CurrencyAmount, TradeType, Percent} from "@uniswap/sdk-core"
import axios from "axios";

const abi = ERC20.abi;



export const SwapTokenContext = React.createContext();

export const SwapTokenContextProvider = ({children}) => {
    const [account, setAccount] = useState("");
    const [ether, setEther] = useState("");
    const [networkConnect, setNetworkConnect] = useState("");
    const [weth9, setWeth9] = useState("");
    const [dai, setDai] = useState("");
    const [topTokenList, setTopTokenList] = useState([]);
    const [tokenData, setTokenData] = useState([]);
    const [ getAllLiquidity, setGetAllLiquidity ] = useState([]);
    const [isLiquidityChecked, setIsLiquidityChecked] = useState(false);
    const LINK_ADDRESS ="0x326C977E6efc84E512bB9C30f76E30c160eD06FB"

const addToken = [
  "0xa11C9365ed6AFc7Dd363C7a09045494bf94068d6",
  "0x87CFBEA5084dFd583D719740a877e66fddad0A43",
  "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
  "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
];

//Fetch Data
const fetchingData = async () => {
    try {
      const userAccount = await checkIfWalletConnected();
      setAccount(userAccount);
  
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
  
      const balance = await provider.getBalance(userAccount);
      const convertBal = BigNumber.from(balance).toString();
      const ethValue = ethers.utils.formatEther(convertBal);
      setEther(ethValue);
  
      const network = await provider.getNetwork();
      setNetworkConnect(network.name);
  
      // Fetch all token balances
      const newTokenData = await Promise.all(addToken.map(async (el) => {
        const contract = new ethers.Contract(el, abi, provider);
        // get balance
        const userBalance = await contract.balanceOf(userAccount);
        const tokenLeft = BigNumber.from(userBalance).toString();
        const convertTokenBal = ethers.utils.formatEther(tokenLeft);
        // Get name and symbol
        const symbol = await contract.symbol();
        const name = await contract.name();
        return {
          name,
          symbol,
          tokenBalance: convertTokenBal,
          tokenAddress: el,
        };
      }));
      setTokenData(newTokenData);
  
      // Fetch liquidity data
      const userStorageData = await connectingWithUserStorageData();
      const userLiquidity = await userStorageData.getAllTransactions();
      console.log(userLiquidity);
  
      const newLiquidityData = await Promise.all(userLiquidity.map(async (el) => {
        console.log("Fetching liquidity data for pool:", el.poolAddress, el.tokenAddress0, el.tokenAddress1);
        const liquidityData = await getLiquidityData(
          el.poolAddress,
          el.tokenAddress0,
          el.tokenAddress1,
        );
        console.log("Received liquidity data:", liquidityData);
 
        setIsLiquidityChecked(true);  // Set the flag here
        return liquidityData;
    }));
    setGetAllLiquidity(newLiquidityData);
    console.log("get Data", getAllLiquidity)
    
  
      // Fetch top token list
      const URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";
      const query = `
      {
        tokens(orderBy: volumeUSD, orderDirection: desc, first:20){
            id
            name
            symbol
            decimals
            volume
            volumeUSD
            totalSupply
            feesUSD
            txCount
            poolCount
            totalValueLockedUSD
            totalValueLocked
            derivedETH
        }
      }
      `;
      const axiosData = await axios.post(URL, { query: query });
      setTopTokenList(axiosData.data.data.tokens);
  
    } catch (error) {
      console.log(error);
    }
  };
  

useEffect(() => {
    fetchingData();
}, []);


  useEffect(() => {
    console.log("useEffect triggered with getAllLiquidity", getAllLiquidity);
  }, [getAllLiquidity]);
  

//Create and Add Liquidity
const createLiquidityAndPool = async ({tokenAddress0, tokenAddress1, fee, tokenPrice1, tokenPrice2, slippage, deadline, tokenAmountOne, tokenAmountTwo}) => {
try {
    console.log("Arguments for createLiquidityAndPool:", tokenAddress0, tokenAddress1, fee, tokenPrice1, tokenPrice2, slippage, deadline, tokenAmountOne, tokenAmountTwo);  // Debugging Line
    //Create Pool
    const createPool = await connectingWithPoolContract(
        tokenAddress0,
        tokenAddress1,
        fee,
        tokenPrice1,
        tokenPrice2, {
            gasLimit: 500000,
        }
    );
    const poolAddress = createPool;
    //Create Liquidity
    const info = await addLiquidityExternal(
        tokenAddress0, tokenAddress1, poolAddress, fee, tokenAmountOne, tokenAmountTwo
    );

    //Add Data
        const userStorageData = await connectingWithUserStorageData();
        const userLiquidity = await userStorageData.addToBlockchain(
            poolAddress,
            tokenAddress0,
            tokenAddress1
        );
} catch (error) {
    console.log(error);
}
};


// Swap Token Single with prior transfer to contract
const singleSwapToken = async ({ token1, token2, swapAmount }) => {
  try {
      const swapTokenContract = await connectingWithSwapToken();
      const linkTokenContract = await connectingWithLINKToken();
      
      const amountIn = ethers.utils.parseUnits(swapAmount.toString(), 18);
      
      // User must approve the contract to spend their tokens first
      const approveTx = await linkTokenContract.approve(swapTokenContract.address, amountIn);
      await approveTx.wait();
      console.log(`Approval tx: ${approveTx.hash}`);
      
      // Now that the contract is approved to spend LINK, we send the LINK to the contract
      const transferTx = await linkTokenContract.transfer(swapTokenContract.address, amountIn);
      await transferTx.wait();
      console.log(`Transfer tx: ${transferTx.hash}`);
      
      // After the transfer, perform the swap
      const swapTx = await swapTokenContract.swapExactInputSingle(amountIn);
      const receipt = await swapTx.wait();
      console.log('Swap tx:', receipt);
      
      // Update the DAI balance after the swap
      const balance = await dai.balanceOf(account); // Assuming `dai` is a contract instance for DAI token
      const ethValue = ethers.utils.formatEther(balance);
      setDai(ethValue);
      console.log("Updated DAI Balance:", ethValue);

  } catch (error) {
      console.error("An error occurred:", error);
  }
};




    return (
    <SwapTokenContext.Provider value={{
        singleSwapToken, 
        tokenData, 
        getPrice,
        swapUpdatePrice,
        connectWallet, 
        account, 
        weth9, 
        dai, 
        networkConnect, 
        getLiquidityData,
        createLiquidityAndPool,
        ether,
        topTokenList,
        isLiquidityChecked,
        getAllLiquidity,
        setTopTokenList,
        }}>
        {children}
    </SwapTokenContext.Provider>
    );
};
