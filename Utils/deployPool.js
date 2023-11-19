import {ethers, BigNumber} from "ethers";
import {axios} from "axios";
import Web3Modal from "web3modal";

import bn from 'bignumber.js';
bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 });


const UNISWAP_V3_FACTORY_ADDRESS= "0x666F98d98AFcbEdF1b1239a675cFfA1d76b32EAB"
const NON_FUNGIBLE_MANAGER= "0xb23E35203500b16b60CC02f25Be8a2dBdF6779A5"



const artifacts = {
  UniswapV3Factory: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json"),
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
};


export const fetchPoolContract = (signerOrProvider) =>
new ethers.Contract(
  UNISWAP_V3_FACTORY_ADDRESS,
  artifacts.UniswapV3Factory.abi,
  signerOrProvider
);


export const fetchPositionContract = (signerOrProvider) =>
new ethers.Contract(
  NON_FUNGIBLE_MANAGER,
  artifacts.NonfungiblePositionManager.abi,
  signerOrProvider
);

const encodePriceSqrt = (reserve1, reserve0) => {
  return BigNumber.from(
    new bn(reserve1.toString())
      .div(reserve0.toString())
      .sqrt()
      .multipliedBy(new bn(2).pow(96))
      .integerValue(3)
      .toString()
  );
};

export const connectingWithPoolContract = async(
  address1,
  address2,
  fee,
  tokenFee1,
  tokenFee2
) => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    
    console.log("Provider:", provider);
    
    const signer = await provider.getSigner();
    
    console.log("Signer:", signer);
    console.log("Signer Address:", await signer.getAddress());
  
    const createPoolContract = await fetchPoolContract(signer);
    console.log("Available methods:", Object.keys(createPoolContract.functions));
    
    const price = encodePriceSqrt(tokenFee1, tokenFee2);
    console.log("Encoded Price:", price);
  
    const gasPriceInGwei = ethers.utils.parseUnits('30', 'gwei'); // Change the '30' to the gas price you want in Gwei

    const nonfungiblePositionManagerContract = await fetchPositionContract(signer);

    const transaction = await nonfungiblePositionManagerContract
        .connect(signer)
        .createAndInitializePoolIfNecessary(
            address1,
            address2,
            fee,
            price,
            {    gasLimit: 30000000,
              gasPrice: gasPriceInGwei }
        );
    
    await transaction.wait();
    
  
    const factory = await fetchPoolContract(signer);
    const poolAddress = await factory.getPool(address1, address2, fee);
    return poolAddress;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}


