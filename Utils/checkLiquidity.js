import UniswapV3Pool from "@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json";
import { Contract, ethers } from "ethers";
import { Pool } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
import Web3Modal from "web3modal";
import ERC20 from "../Context/WETH9.json";
const abi = ERC20.abi;

async function getPoolData(poolContract) {
  const [tickSpacing, fee, liquidity, slot0, factory, token0, token1, maxLiquidityPerTick] = await Promise.all([
    poolContract.tickSpacing(),
    poolContract.fee(),
    poolContract.liquidity(),
    poolContract.slot0(),
    poolContract.factory(),
    poolContract.token0(),
    poolContract.token1(),
    poolContract.maxLiquidityPerTick(),
  ])
  console.log("Returning pool data:", {
    factory: factory,
    token0: token0,
    token1: token1,
    maxLiquidityPerTick: maxLiquidityPerTick,
    tickSpacing: tickSpacing,
    fee: fee,
    liquidity: liquidity.toString(),
    sqrtPriceX96: slot0[0],
    tick: slot0[1],
    observationIndex: slot0[2],
    observationCardinality: slot0[3],
    observationCardinalityNext: slot0[4],
    feeProtocol: slot0[5],
    unlocked: slot0[6]
  });

  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);

  const token0Contract = new Contract(token0, abi, provider);
  const token1Contract = new Contract(token1, abi, provider);
  
const { chainId } = await provider.getNetwork();

  const token0Name = await token0Contract.name();
  const token0Symbol = await token0Contract.symbol();
  const token0Decimals = await token0Contract.decimals();

  const token1Name = await token1Contract.name();
  const token1Symbol = await token1Contract.symbol();
  const token1Decimals = await token1Contract.decimals();

  const TokenA = new Token(chainId, token0, token0Decimals, token0Name, token0Symbol);
  const TokenB = new Token(chainId, token1, token1Decimals, token1Name, token1Symbol);

  const poolExample = new Pool(
    TokenA,
    TokenB,
    fee,
    slot0[0].toString(),
    liquidity.toString(),
    slot0[1]
  );
  

  return {
    factory: factory,
    token0: token0,
    token1: token1,
    maxLiquidityPerTick: maxLiquidityPerTick,
    tickSpacing: tickSpacing,
    fee: fee,
    liquidity: liquidity.toString(),
    sqrtPriceX96: slot0[0],
    tick: slot0[1],
    observationIndex: slot0[2],
    observationCardinality:slot0[3],
    observationCardinalityNext: slot0[4],
    feeProtocol: slot0[5],
    unlocked: slot0[6],
    poolExample,
  };

}


export const getLiquidityData = async (poolAddress) => {
  if (!poolAddress) {
    // Handle the case where poolAddress is not defined
    console.error("Invalid poolAddress: Pool address is not defined.");
    // You can return an appropriate value or throw an error
    // Example: throw new Error("Pool address is required.");
    return null; // Returning null as an example
  }

  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);

  try {
    const poolContract = new Contract(poolAddress, UniswapV3Pool.abi, provider);
    const poolData = await getPoolData(poolContract);
    return poolData;
  } catch (error) {
    console.error("Error fetching pool data:", error);
    // You can handle the error as needed, such as logging and returning an error value
    // Example: throw new Error("Failed to fetch pool data: " + error.message);
    return null; // Returning null in case of an error
  }
};