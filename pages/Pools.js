import React, { useState, useContext, useEffect } from 'react';
import style from '../styles/Pool.module.css';
import { PoolAdd, PoolConnect } from '../Components/index';
import { SwapTokenContext } from '../Context/SwapContext';

const Pools = () => {
  // Get data from context
  const { account, createLiquidityAndPool, tokenData, getLiquidityData, getAllLiquidity } = useContext(SwapTokenContext);

  // Local state to hold the fetched liquidity data
  const [liquidityData, setLiquidityData] = useState([]);
  
  // Local state to control the Pool UI
  const [closePool, setClosePool] = useState(false);

  // Fetch liquidity data
  useEffect(() => {
    const fetchData = async () => {
      const data = await getLiquidityData(/* Parameters if required */);
      setLiquidityData(data);
    };

    fetchData();
  }, [getLiquidityData]);  // Dependency on the getLiquidityData function

  return (
    <div className={style.Pool}>
      {closePool ? (
        <PoolAdd 
          account={account} 
          setClosePool={setClosePool} 
          tokenData={tokenData} 
          createLiquidityAndPool={createLiquidityAndPool} 
        />
      ) : (
        <PoolConnect 
  setClosePool={setClosePool} 
  getLiquidityData={liquidityData}  // Pass the fetched data here
  account={account} 
/>

      )}
    </div>
  );
};

export default Pools;
