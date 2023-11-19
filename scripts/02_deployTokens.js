const fs = require('fs');
const { promisify } = require('util');

async function main() {
  const [owner] = await ethers.getSigners();


  Tether = await ethers.getContractFactory('Tether');
  tether = await Tether.deploy();

  Usdc = await ethers.getContractFactory('UsdCoin');
  usdc = await Usdc.deploy();


  WrappedBitcoin = await ethers.getContractFactory('WrappedBitcoin');
  wrappedBitcoin = await WrappedBitcoin.deploy();


  let addresses = [
    `USDC_ADDRESS=${usdc.address}`,
    `TETHER_ADDRESS=${tether.address}`,
    `WRAPPED_BITCOIN_ADDRESS=${wrappedBitcoin.address}`,
  ]
  const data = '\n' + addresses.join('\n')

  const writeFile = promisify(fs.appendFile);
  const filePath = '.env';
  return writeFile(filePath, data)
      .then(() => {
        console.log('Addresses recorded.');
      })
      .catch((error) => {
        console.error('Error logging addresses:', error);
        throw error;
      });
}

/*
  npx hardhat run --network localhost scripts/02_deployTokens.js
*/

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
