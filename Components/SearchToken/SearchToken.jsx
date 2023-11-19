import React, { useState, useContext, useEffect } from 'react';
import style from './SearchToken.module.css';
import images from "../../assets";
import Image from 'next/image';

const SearchToken = ({ openToken, tokens, tokenData }) => {
  const [active, setActive] = useState(1);

  // Use a Set to ensure unique tokens
  const uniqueTokens = new Set(tokenData.map(token => JSON.stringify(token)));
  const tokenList = Array.from(uniqueTokens).map(token => JSON.parse(token));

  return (
    <div className={style.SearchToken}>
      <div className={style.SearchToken_box}>
        <div className={style.SearchToken_box_heading}>
          <h4>Select a token</h4>
          <Image src={images.close} alt='close' height={50} width={50} onClick={() => openToken(false)} />
        </div>
        <div className={style.SearchToken_box_search}>
          <div className={style.SearchToken_box_search_img}>
            <Image src={images.search} alt='close' height={20} width={20} onClick={() => openToken(false)} />
          </div>
          <input type='text' placeholder='Search and paste the address' />
        </div>
        <div className={style.SearchToken_box_tokens}>
          {tokenList.map((el, i) => (
            <span key={i + 1} className={active === i + 1 ? `${style.active}` : ""}
              onClick={() => (setActive(i + 1), tokens({ 
                name: el.name, 
                image: el.img, 
                symbol: el.symbol, 
                tokenBalance: el.tokenBalance, 
                tokenAddress: el,
               }))}
            >
              <Image src={el.img || images.ether} alt='image' height={30} width={30} />
              {el.symbol}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchToken;
