import { AlphaRouter } from "@uniswap/smart-order-router";
import {ethers, BigNumber} from "ethers";
import {Token, CurrencyAmount, TradeType, Percent} from "@uniswap/sdk-core";

const V3_SWAP_ROUTER_ADDRESS ="0xE592427A0AEce92De3Edee1F18E0157C05861564";

// Update the chainId to match Sepolia's chain ID
const chainId = 5;

const provider = new ethers.providers.JsonRpcProvider(
     "https://eth-goerli.g.alchemy.com/v2/UDnDEbTPbNKPmIqdEkQ09CSosrZtOf7W"
);

const router = new AlphaRouter({ chainId, provider: provider });

const name0 = "Wrapped Ether";
const symbal0= "WETH";
const decimals0= 18;
const address0 = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";

const name1 = "DAI";
const symbal1= "DAI";
const decimals1= 18;
const address1 = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";

const WETH = new Token(chainId, address0, decimals0, symbal0, name0);
const DAI = new Token(chainId, address1, decimals1, symbal1, name1);

export const swapUpdatePrice = async(
     inputAmount,
     slippageAmount,
     deadline,
     walletAddress
) => {
     const percentSlippage = new Percent(slippageAmount, 100);
     const wei = ethers.utils.parseUnits(inputAmount.toString(), decimals0);
     const currencyAmount = CurrencyAmount.fromRawAmount(
          WETH,
          BigNumber.from(wei)
     );

const route = await router.route(currencyAmount, DAI, TradeType.EXACT_INPUT, {
recipient: walletAddress,
slippageTolerance: percentSlippage,
deadline: deadline,
});


const transaction={
     data: route.methodParameters.calldata,
     to: V3_SWAP_ROUTER_ADDRESS,
     value: BigNumber.from(route.methodParameters.value),
     from: walletAddress,
     gasPrice: BigNumber.from(route.gasPriceWei),
     gasLimit: ethers.utils.hexlify(1000000),
}

const quoteAmountOut =route.quote.toFixed(6);
const ratio = (inputAmount/ quoteAmountOut).toFixed(3);
console.log(quoteAmountOut, ratio);

return [transaction, quoteAmountOut, ratio];
}