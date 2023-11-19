import axios from "axios";

const ETHERSCAN_API_KEY = "NQNVQITDJW1M7MS46MNT1MXIQXPNHBMYWW";

export async function getAbi(address) {
    const url = `https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${ETHERSCAN_API_KEY}`;
    const res = await axios.get(url);
    const abi = JSON.parse(res.data.result);
    return abi;
}

export async function getPoolImmutables(poolContract) {
    const [token0, token1, fee] = await Promise.all([
        poolContract.token0(),
        poolContract.token1(),
        poolContract.fee(),
    ]);

    const immutables = {
        token0: token0,
        token1: token1,
        fee: fee
    };

    return immutables;
}