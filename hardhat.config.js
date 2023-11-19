require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.7.6",
        settings: {
          evmVersion: "istanbul",
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.8.0",  // Additional compiler
        settings: {
          evmVersion: "istanbul",
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.15",
        settings: {
          evmVersion: "istanbul",
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  networks:{
    sepolia: {
      url: 
      "https://eth-goerli.g.alchemy.com/v2/UDnDEbTPbNKPmIqdEkQ09CSosrZtOf7W",
      //"https://eth-sepolia.g.alchemy.com/v2/PlcEcIo2bq14VDRY-dAIdbm0ikqchbYQ",
      //"https://polygon-mumbai.g.alchemy.com/v2/qtZq0FXigiE9s0t_Z34OeahujWvKX4YL",
      accounts: [
        "13863d8a18a76c5d39740fb6a28db4de63b21a101b05e6e6214ee908b9f677ee", // Removed 0x prefix
      ],
    },
    hardhat:{
      forking:{
        url:"https://eth-mainnet.g.alchemy.com/v2/AI-wtdI5HZyEg8yTaIwV6cmMP1hru9IC",
        accounts: [
          "0x0e7ef5005e3a5ed83d9f56151713d77c72d456e1ab32e7d8ad4349b18ed63d5c",

        ],
      },
   
    },
   
  },
};