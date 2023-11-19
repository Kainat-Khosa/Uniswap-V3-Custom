import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Style from './Navbar.module.css';
import images from '../../assets';
import { Model, TokenList } from '../index';
import { SwapTokenContext } from '../../Context/SwapContext';

const Navbar = () => {
  const { tokenData, ether, account, networkConnect, connectWallet } = useContext(SwapTokenContext);
  const menuItems = [
    {
      name: 'Swap',
      link: '/',
    },
    {
      name: 'Tokens',
      link: '/Tokens',
    },
    {
      name: 'Pools',
      link: '/Pools',
    },
  ];
  const [openModel, setOpneModel] = useState(false);
  const [openTokenBox, setOpenTokenBox] = useState(false);

  return (
    <div className={Style.Navbar}>
      <div className={Style.Navbar_box}>
        {/* Left Section */}
        <div className={Style.Navbar_box_left}>
          <div className={Style.Navbar_box_left_img}>
            <Image src={images.uniswap} alt="logo" width={50} height={50} />
          </div>
          <div className={Style.Navbar_box_left_menu}>
            {menuItems.map((el, i) =>
              el.name === 'Swap' ? (
                <Link key={i + 1} href="/">
                  <p className={Style.Navbar_box_left_menu_item}>{el.name}</p>
                </Link>
              ) : (
                <Link key={i + 1} href={el.link}>
                  <p className={Style.Navbar_box_left_menu_item}>{el.name}</p>
                </Link>
              )
            )}
          </div>
        </div>

        {/* Middle Section */}
        <div className={Style.Navbar_box_middle}>
          <div className={Style.Navbar_box_middle_search}>
            <div className={Style.Navbar_box_middle_search_img}>
              <Image src={images.search} alt="search" width={20} height={20} />
            </div>
            <input type="text" placeholder="Search Token" />
          </div>
        </div>

        {/* Right Section */}
        <div className={Style.Navbar_box_right}>
          <div className={Style.Navbar_box_right_box}>
            <div className={Style.Navbar_box_right_box_img}>
              <Image src={images.ether} alt="eth logo" width={30} height={30} />
            </div>
            <p>{networkConnect}</p>
          </div>

          {account ? (
            <button onClick={() => setOpenTokenBox(true)}>{account.slice(0, 20)}...</button>
          ) : (
            <button onClick={() => setOpneModel(true)}>Connect</button>
          )}

          {openModel && <Model setOpneModel={setOpneModel} connectWallet={connectWallet} />}
        </div>
      </div>

      {/* Token list Components */}
      {openTokenBox && <TokenList tokenDate={tokenData} setOpenTokenBox={setOpenTokenBox} />}
    </div>
  );
};

export default Navbar;
