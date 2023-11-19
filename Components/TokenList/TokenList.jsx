import React from 'react';
import style from './TokenList.module.css';
import images from "../../assets";
import Image from 'next/image';

const TokenList = ({ tokenDate, setOpenTokenBox }) => {

  // Remove duplicates based on the 'symbol' property
  const uniqueTokenData = Array.from(new Set(tokenDate.map(a => a.symbol)))
    .map(symbol => {
      return tokenDate.find(a => a.symbol === symbol);
    });

  return (
    <div className={style.TokenList}>
      <p className={style.TokenList_close} onClick={() => setOpenTokenBox(false)}>
        <Image src={images.close} alt='close' height={50} width={50} />
      </p>
      <div className={style.TokenList_title}>
        <h2>Your Token List</h2>
      </div>
      {uniqueTokenData.map((el, i) => (
        <div className={style.TokenList_box} key={i}>
          <div className={style.TokenList_box_info}>
            <p className={style.TokenList_box_info_symbol}>
              {el.symbol}
            </p>
            <p>
              <span>
                {el.tokenBalance}
              </span>
              {el.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TokenList;
