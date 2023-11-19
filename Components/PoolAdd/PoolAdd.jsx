import React, {useState, useEffect} from 'react';
import style from './PoolAdd.module.css';
import images from "../../assets";
import Image from 'next/image';
import {Token, SearchToken} from "../../Components";

const PoolAdd = ({setClosePool, createLiquidityAndPool, tokenData}) => {
    const [openModel, setOpenModel] = useState(false);
    const [openTokenModelOne, setOpenTokenModelOne] = useState(false);
    const [openTokenModelTwo, setOpenTokenModelTwo] = useState(false);
    const [active, setActive] = useState(1);
    const [openFee, setOpenFee] = useState(false);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    //New State
    const [fee, setFee] = useState(0);
    const [slippage, setSlippage] = useState(25);
    const [deadline, setDeadline] = useState(10);
    const [tokenAmountOne, setTokenAmountOne] = useState(0);
    const [tokenAmountTwo, setTokenAmountTwo] = useState(0);

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


const feePairs=[
    {
        fee:"0.05%",
        info:"Best for stable pairs",
        number:"0% Select",
        feeSystem: 500
    },
    {
        fee:"0.03%",
        info:"Best for stable pairs",
        number:"0% Select",
        feeSystem: 3000

    },
    {
        fee:"1%",
        info:"Best for stable pairs",
        number:"0% Select",
        feeSystem: 30000

    },
];

const minPriceRange = (text) => {
    if(text == "+"){
        setMinPrice(minPrice + 1);
    } else if(text == "-"){
        setMinPrice(minPrice - 1);
    }
};

const maxPriceRange = (text) => {
    if(text == "+"){
        setMaxPrice(maxPrice + 1);
    } else if(text == "-"){
        setMaxPrice(maxPrice - 1);
    }
};

  return (
    <div className={style.PoolAdd}>
      <div className={style.PoolAdd_box}>
        <div className={style.PoolAdd_box_header}>
        <div className={style.PoolAdd_box_header_left}>
            <Image src={images.arrowLeft} alt='img' width={30} height={30} onClick={() => setClosePool(false)} />
            </div>
            <div className={style.PoolAdd_box_header_middle}>
            <p>Add Liquidity</p>
            </div>
            <div className={style.PoolAdd_box_header_right}>
             <p>
                {tokenOne.name || ""} {tokenOne.tokenBalance.slice(0,9) || ""}{" "}{" "}
                {tokenTwo.name || ""} {tokenTwo.tokenBalance.slice(0,9) || ""}

             </p>
             <Image src={images.settings} alt='img' width={30} height={30} onClick={() => setOpenModel(true)}/>
            </div>
        </div>

        {/* //Select Price Range */}
        <div className={style.PoolAdd_box_price}>
            
            {/*Left */}
            <div className={style.PoolAdd_box_price_left}>
                <h4>Select Price</h4>
                <div className={style.PoolAdd_box_price_left_token}>
                <div className={style.PoolAdd_box_price_left_token_input} onClick={()=> setOpenTokenModelOne(true) }>
                <p>
                <Image src={images.ether} alt='img' width={20} height={20}/>
                </p>
                <p>{tokenOne.name || "ETH"}</p>
                <p>&#129035;</p>
                </div>
                <div className={style.PoolAdd_box_price_left_token_info}
                onClick={() => setOpenTokenModelTwo(true)}
                >
                <p>
                <Image src={images.ether} alt='img' width={20} height={20}/>
                </p>
                <p>{tokenTwo.name || "Select"}</p>
                <p>&#129035;</p>
                </div>
                </div>

                {/*Fee */}
                <div className={style.PoolAdd_box_price_left_fee}>
                <div className={style.PoolAdd_box_price_left_fee_left}>
                    <h4>Fee Tier</h4>
                    <p>The % you will earn in fees</p>
                    </div>
                    {openFee ? (
                        <button onClick={() => setOpenFee(false)}>
                            Hide
                        </button>
                    ) : (
                        <button onClick={() => setOpenFee(true)}>
                        Show
                    </button>
                    )
                }
                </div>

                {/* Fee list */}
                {openFee && (
                 <div className={style.PoolAdd_box_price_left_list}>
                 {feePairs.map((el,i) => (
                  <div className={style.PoolAdd_box_price_left_list_item} key ={i +1} onClick={() => (setActive(i + 1), setFee(el.feeSystem))}>
                   <div className={style.PoolAdd_box_price_left_list_items}>
                     <p>{el.fee}</p>
                     <p>
                      {active == i + 1 ? (
                        <Image src={images.tick} alt='img' width={40} height={40}/>
                           ) : (
                             ""
                            )}
                            </p>
                            </div>
                            <small>{el.info}</small>
                            <p className={style.PoolAdd_box_price_left_list_item_para}>
                            {el.number}
                            </p>
                         </div>
                        ))} 
                        </div>
                )}

              {/* Deposit Amount */}
              <div className={style.PoolAdd_box_deposit}>
                <h4>Deposit</h4>
                <div className={style.PoolAdd_box_deposit_box}>
                    <input type='number' placeholder={tokenOne.tokenBalance.slice(0,9)} onChange={(e) => setTokenAmountOne(e.target.value)} />
                    <div className={style.PoolAdd_box_deposit_box_input}>
            <p>
                <small>{tokenOne.name || "ETH"}</small> {" "} {" "}{tokenOne.symbol || "Ether"}
            </p>

                    </div>
                </div>

                <div className={style.PoolAdd_box_deposit_box}>
                <input type='number' placeholder={tokenTwo.tokenBalance.slice(0,9)} onChange={(e) => setTokenAmountTwo(e.target.value)} />
                    <div className={style.PoolAdd_box_deposit_box_input}>
            <p>
            <small>{tokenTwo.name || "Select"}</small> {" "} {" "}{tokenTwo.symbol || "Ether"}
            </p>
          
                    </div>
                </div>
              </div>
            </div>


            {/* Right */}
            <div className={style.PoolAdd_box_price_right}>
                <h4>Set Price Range</h4>
                <div className={style.PoolAdd_box_price_right_box}>
                    <p className={style.PoolAdd_box_price_right_box_para}>
                        Current Price: 41.1494 {tokenOne.name || "ETH"} per {tokenTwo.name || "Select"}
                    </p>
                <Image src={images.wallet} alt='wallet' height={80} width={80} />
                <h3>Your position will appear here</h3>
                </div>

            {/* Price Range */}
            <div className={style.PoolAdd_box_price_right_range}>
            <div className={style.PoolAdd_box_price_right_range_box}>
           <p>Min Price</p>
        <input type='number' placeholder='0.000' min="0.00" step="0.001" className={style.PoolAdd_box_price_right_range_box_para} onChange={(e) => setMinPrice(e.target.value)}/>
           <p>{tokenOne.name || "ETH"} per {tokenTwo.name || "Select"}</p>
            </div>

                  {/* Max */}
            <div className={style.PoolAdd_box_price_right_range_box}>
           <p>Max Price</p>
           <input type='number' placeholder='0.000' min="0.00" step="0.001" className={style.PoolAdd_box_price_right_range_box_para} onChange={(e) => setMaxPrice(e.target.value)}/>

           <p>{tokenOne.name || "ETH"} per {tokenTwo.name || "Select"}</p>
            </div>
            </div>

            {/*Button */}
          
            <div className={style.PoolAdd_box_price_right_amount}>
                <button onClick={() =>  createLiquidityAndPool({
                    tokenAddress0: tokenOne.tokenAddress.tokenAddress,
                    tokenAddress1: tokenTwo.tokenAddress.tokenAddress,
                    fee: fee,
                    tokenPrice1: minPrice,
                    tokenPrice2: maxPrice,
                    slippage: slippage,
                    deadline: deadline,
                    tokenAmountOne: tokenAmountOne,
                    tokenAmountTwo: tokenAmountTwo

                })} >Add Liquidity</button>
            </div>
            </div>
            </div>
</div>
            {openModel && (
                <div className={style.token}>
                    <Token setOpenSetting={setOpenModel}
                    setSlippage={setSlippage}
                    slippage={slippage}
                    deadline={deadline}
                    setDeadline={setDeadline}
                    />
                    </div>
            )}

            {openTokenModelOne && (
                <div className={style.token}>
                    <SearchToken tokens={setTokenOne} tokenData={tokenData} openToken={setOpenTokenModelOne} />
                    </div>
            )}
             {openTokenModelTwo && (
                <div className={style.token}>
                    <SearchToken tokens={setTokenTwo} tokenData={tokenData} openToken={setOpenTokenModelTwo} />
                    </div>
            )}
        </div>
  )
}

export default PoolAdd
