import React, {useState, useContext, useEffect} from 'react'
import style from './Token.module.css'
import images from "../../assets"
import Image from 'next/image'
import {Toggle} from '../index'

const Token = ({setOpenSetting}) => {
  return (
    <div className={style.Token}>
         <div className={style.Token_box}>
         <div className={style.Token_box_heading}>
    <h4>Setting</h4>
    <Image src={images.close} alt='close' width={30} height={30} onClick={() => setOpenSetting(false)}/>
    </div>
    <p className={style.Token_box_para}>
        Slippage Tolerance{""}
        <Image src={images.lock} alt='img' width={20} height={20}/>
    </p>
    <div className={style.Token_box_input}>
        <button>
            Auto
        </button>
        <input type='text' placeholder='0.10%'/>
    </div>
    <p className={style.Token_box_para}>
        Slippage Tolerance{""}
        <Image src={images.lock} alt='img' width={20} height={20}/>
    </p>
    <div className={style.Token_box_input}>
   
        <input type='text' placeholder='30'/>
        <button>
            minutes
        </button>
    </div>
    <h2>Interface Setting</h2>
    <div className={style.Token_box_toggle}>
        <p className={style.Token_box_para}>Transaction Deadline</p>
        <Toggle label='No' />
    </div>
    </div>
    </div>
  )
}

export default Token
