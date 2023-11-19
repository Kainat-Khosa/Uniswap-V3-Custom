import booToken from './BooToken.json';
import lifeToken from './LifeToken.json';
import swapToken from './SwapToken.json';
import swapMultiHop from './SwapMultiHop.json';
import IWETH from './IWETH.json';
import  userStorageData  from "./UserStorageData.json";

export const BooTokenAddress="0x3489745eff9525CCC3d8c648102FE2cf3485e228";
export const BooTokenABI = booToken.abi;

export const LifeTokenAddress="0x43b9Ef43D415e84aD9964567002d648b11747A8f";
export const LifeTokenABI = lifeToken.abi;

export const SwapTokenAddress="0x2C3de9e2e261BF8E18720AD82D1C1a524e330915";
export const SwapTokenABI = swapToken.abi;

export const SwapMultiHopAddress="0x3489745eff9525CCC3d8c648102FE2cf3485e228";
export const SwapMultiHopABI = swapMultiHop.abi;


export const IWETHAddress="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const IWETHABI= IWETH.abi;

export const userStorageDataAddress ="0x1229EBFfDEd4b88E8e6E2B5CC8591D26Ee264BdF";
export const userStorageDataABI = userStorageData.abi;
