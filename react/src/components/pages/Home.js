import React, { Fragment, useState } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Content from '../sections/home/Content';

function Home() {

    const [currency, setCurrency] = useState(window.localStorage.getItem('currencySelected') || 'USD');

    const onChangeCurrency = (e) => {
        setCurrency(e.target.value);
        window.localStorage.setItem('currencySelected', e.target.value);
    }

    return (
        <Fragment>
            <MetaTags>
                <title>PreciousPricer</title>
                <meta
                    name="description"
                    content="#"
                />
            </MetaTags>
            <Header onChangeCurrency={onChangeCurrency} currency={currency} />
            <Content currency={currency} />
            <Footer/>
        </Fragment>
    );
}

export default Home;