import React from 'react';
import style from './PoolConnect.module.css';
import images from "../../assets";
import Image from 'next/image';

function PoolConnect({ setClosePool, getLiquidityData, account, isLiquidityChecked}) {

  const token0Name = getLiquidityData?.poolExample?.token0?.name || '';
  const token1Name = getLiquidityData?.poolExample?.token1?.name || '';
  const fee = getLiquidityData?.poolExample?.fee || '';


  return (
    <div className={style.PoolConnect}>
      <div className={style.PoolConnect_box}>
        <div className={style.PoolConnect_box_header}>
          <h2>Pool</h2>
          <p onClick={() => setClosePool(true)}>+ New Position</p>
        </div>

        {!account && isLiquidityChecked ? (
          <div className={style.PoolConnect_box_Middle}>
            <Image src={images.wallet} alt='wallet' height={80} width={80} />
            <p>Your active v3 liquidity positions will appear here</p>
            <button>Connect Wallet</button>
          </div>
        ) : (
          <div className={style.PoolConnect_box_liquidity}>
            <div className={style.PoolConnect_box_liquidity_header}>
              <p>Your Position </p>
            </div>

            <div className={style.PoolConnect_box_liquidity_box}>
            <div className={style.PoolConnect_box_liquidity_list}>

      <p>
                    <small className="">
                      {token0Name}
                    </small>{" "}
                    <small className={style.mark}>
                      {token1Name}
                    </small>{" "}
                    <span className={`${style.paragraph} ${style.hide}`}>
                      {token0Name} / {token1Name}
                    </span>{" "}
                    <span className={style.paragraph}>
                      {fee}
                    </span>{" "}
                  </p>
                  <p className={style.highlight}>In Range</p>
                </div>
                <div className={style.PoolConnect_box_liquidity_list_info}>
                  <p>
                    <small>{fee}</small>{" "}
                    <span>
                      {token0Name} per {token1Name}
                    </span>{" "}
                    <span>--------</span><small>Max: 1.000</small>{" "}
                    <span className={style.hide}>
                      {token0Name} per {token1Name}
                    </span>
                  </p>
    </div>
</div>

          </div>
        )}

        <div className={style.PoolConnect_box_info}>
          <div className={style.PoolConnect_box_info_left}>
            <h5>Learn about providing liquidity</h5>
            <p>Check out our v3 LP walkthrough and migrate guide</p>
          </div>

          <div className={style.PoolConnect_box_info_right}>
            <h5>Top pools</h5>
            <p>Explore Uniswap Analytics</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PoolConnect;
