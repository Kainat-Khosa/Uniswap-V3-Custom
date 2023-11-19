const hre = require("hardhat");

async function main() {
//Boo Token
  //const BooToken= await hre.ethers.getContractFactory("BooToken");
  //const booToken= await BooToken.deploy();
  //await booToken.deployed();
  //console.log(`BooToken deployed to ${booToken.address}` );


  //Life Token
  //const LifeToken= await hre.ethers.getContractFactory("LifeToken");
//const lifeToken= await LifeToken.deploy();
  //await lifeToken.deployed();
  //console.log(`LifeToken deployed to ${lifeToken.address}` );


  //Swap Token
    const SwapToken = await ethers.getContractFactory("SwapToken");
    const swapToken = await SwapToken.deploy();

    await swapToken.deployed();
    console.log(`SwapToken deployed to ${swapToken.address}` );


  //Multi Swap Token
      //const SwapMultiHop= await hre.ethers.getContractFactory("SwapMultiHop");
      //const swapMultiHop= await SwapMultiHop.deploy();
      //await swapMultiHop.deployed();
      //console.log(`SwapMultiHop deployed to ${swapMultiHop.address}` );

    //User Detail contract
      const UserStorageData= await hre.ethers.getContractFactory("UserStorageData");
      const userStorageData= await UserStorageData.deploy();
      await userStorageData.deployed();
      console.log(`UserStorageData deployed to ${userStorageData.address}` );
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
