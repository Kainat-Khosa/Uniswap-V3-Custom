import React, { useState, useContext, useEffect } from 'react';
import style from '../styles/Tokens.module.css';
import images from '../assets';
import Image from 'next/image';
import { AllTokens } from '../Components/index';
import { SwapTokenContext } from '../Context/SwapContext';

const Tokens = () => {
    const { topTokenList, setTopTokenList } = useContext(SwapTokenContext);

    const [search, setSearch] = useState('');

    useEffect(() => {
        // Function to handle search and update topTokenList based on search criteria
        const onHandleSearch = (value) => {
            if (value.trim() === '') {
                // If the search input is empty, reset to the original list
                setTopTokenList(topTokenList);
            } else {
                const filteredTokens = topTokenList.filter(({ name }) =>
                    name.toLowerCase().includes(value.toLowerCase())
                );
                setTopTokenList(filteredTokens);
            }
        };

        const timer = setTimeout(() => onHandleSearch(search), 1000);
        return () => clearTimeout(timer);
    }, [search, topTokenList, setTopTokenList]);

    return (
        <div className={style.Tokens}>
            <div className={style.Tokens_box}>
                <h2>Top tokens on Uniswap</h2>
                <div className={style.Tokens_box_header}>
                    <div className={style.Tokens_box_ethereum}>
                        <p>
                            <Image src={images.ether} alt="ether" width={20} height={20} />
                        </p>
                        <p>Ethereum</p>
                    </div>
                    <div className={style.Tokens_box_search}>
                        <p>
                            <Image src={images.search} alt="search" width={20} height={20} />
                        </p>
                        <input
                            type="text"
                            placeholder="Filter tokens"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                    </div>
                </div>

                <AllTokens allTokenList={topTokenList} />
            </div>
        </div>
    );
};

export default Tokens;
