import React, {useState} from 'react'
import Image from 'next/image'
import Style from './Model.module.css'
import images from "../../assets"

const Model = ({setOpneModel, connectWallet}) => {
  const walletMenu =["MetaMask", "CoinBase", "ConnectWallet"]
  const [] = useState()
  return (
    <div className={Style.Model}>
         <div className={Style.Model_box}>
         <div className={Style.Model_box_heading}>
         <p>{checkIfWalletConnected ? 'Connected Wallet' : 'Connect Wallet'}</p>
    <div className={Style.Model_box_heading_img}>
    <Image src={images.close} alt='close' width={50} height={50} onClick={()=> setOpneModel(false)}/>
    </div>
    </div>

          <div className={Style.Model_box_wallet}>
            {walletMenu.map((el, i) => (
              <p key={i + 1} onClick={() => connectWallet()}>
                {el}
              </p>
            ))}
          </div>
    <p className={Style.Model_box_para}>By Connecting Wallet You agree to UniSwap Lab's Terms of Service and consent to it's Privacy Policy</p>
    </div>
    </div>
  )
}

export default Model
