import React, {useState, useContext, useEffect} from 'react'
import style from './HeroSection.module.css'
import images from "../../assets"
import Image from 'next/image'
import {Token, SearchToken} from "../index.js"
import { SwapTokenContext } from '../../Context/SwapContext.js'

const HeroSection = ({ }) => {
  const [openSetting, setOpenSetting] = useState(false);
  const [openToken, setOpenToken] = useState(false);
  const [openTokenstwo, setOpenTokenstwo] = useState(false);
  const [tokenSwapOutPut, setTokenSwapOutPut] = useState(0);
  const [poolMessage, setPoolMessage] = useState('');
  const [search, setSearch] = useState(false);
  const [swapAmount, setSwapAmount] = useState(0);


  const{singleSwapToken, connectWallet, account, weth9, dai, ether, tokenData, getPrice, swapUpdatePrice} = useContext(SwapTokenContext);


  //Token 1
  const [tokenOne, setTokenOne] = useState({
    name:"",
    image:"",
    symbol: "",
    tokenBalance: "",
    tokenAddress:"",
  });


  //Token2
  const [tokenTwo, setTokenTwo] = useState({
    name:"",
    image:"",
    symbol: "",
    tokenBalance: "",
    tokenAddress:"",
  });


const callOutPut = async (value) => {
const yourAccount = account;
const deadline = 10;
const slippageAmount = 25;
const data = await swapUpdatePrice(
  value,
  slippageAmount,
  deadline,
  yourAccount
);

console.log(data);
setTokenSwapOutPut(data[1]);
setSearch(false);


const poolAddress ="0x4Cff90F02897259E1aB69FF6bbD370EA14529bD8";
const poolData = await getPrice(value, poolAddress);
const message = `${value} ${tokenOne.symbol || 'WETH'} = ${data[1]} ${tokenTwo.symbol || 'WETH'}`;
setPoolMessage(message);
};

  return (
    <div className={style.HeroSection}>
         <div className={style.HeroSection_box}>
         <div className={style.HeroSection_box_heading}>
          <p>Swap</p>
          <div className={style.HeroSection_box_heading_img}>
            <Image src={images.settings} alt='image'  width={25} height={20} onClick={() => setOpenSetting(true)}/>
            </div>
    </div>

    <div className={style.HeroSection_box_input}>
      <input type='number' placeholder='0' onChange={(e) => (callOutPut(e.target.value), setSwapAmount(e.target.value), setSearch(true))} />
      <button onClick={() => setOpenToken(true)}>
        <Image src={tokenOne.image || images.ether} alt='image' width={20} height={20}/>
      {tokenOne.symbol || "Eth"}
      <small>{tokenOne.tokenBalance.slice(0, 7)}</small>
      </button>
    </div>

    <div className={style.HeroSection_box_input}>
      {/* <input type='number' placeholder='0' /> */}
      <p>{search ? (
      <Image src={images.image || images.ether} alt='loading' width={100} height={40}/>

      ): tokenSwapOutPut
      }</p>
      <button onClick={() => setOpenTokenstwo(true)}>
        <Image src={tokenTwo.image || images.ether} alt='image' width={20} height={20}/>
      {tokenTwo.symbol || "Eth"}
      <small>{tokenTwo.tokenBalance.slice(0, 7)}</small>
      </button>
    </div>

    {search ? (
      <Image src={images.image || images.ether} alt='loading' width={100} height={40}/>

      ): poolMessage
      }

    {account ? (
            <button 
            className={style.HeroSection_box_btn} 
            onClick={() => singleSwapToken({
              token1: tokenOne,
              token2 : tokenTwo,
              swapAmount
            })}
            >
              Swap
              </button>
    ) : (
      <button onClick={() => connectWallet()} className={style.HeroSection_box_btn}>Connect Wallet</button>
      )}
    </div>

    {openSetting && <Token setOpenSetting={setOpenSetting} />}
    {openToken && (
      <SearchToken openToken={setOpenToken} tokens={setTokenOne} tokenData={tokenData} />
    )}
     {openTokenstwo && (
      <SearchToken openToken={setOpenTokenstwo} tokens={setTokenTwo} tokenData={tokenData} />
    )}
    </div>
  )
}

export default HeroSection
