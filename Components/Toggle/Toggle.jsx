import React, {useState, useContext, useEffect} from 'react'
import style from './Toggle.module.css'
import images from "../../assets"
import Image from 'next/image'

const Toggle = ({label}) => {
  return (
    <div className={style.Toggle}>
          <div className={style.Toggle_switch_box}>
    <input type='checkbox' className={style.Toggle_checkbox} name={label} id={label}/>
    <label className={style.Toggle_label} htmlFor={label}>
      <span className={style.Toggle_inner}/>
      <span className={style.Toggle_switch}/>
    </label>
    </div>
    </div>
  )
}

export default Toggle
