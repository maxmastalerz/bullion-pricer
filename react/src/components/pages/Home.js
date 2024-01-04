import React, { Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Content from '../sections/home/Content';

function Home() {
    return (
        <Fragment>
            <MetaTags>
                <title>BullionPricer | Find the cheapest gold, silver, platinum, and palladium products.</title>
                <meta
                    name="description"
                    content="Find the cheapest Gold, Silver, Platinum, & Palladium products across online dealers! Hourly pricing updates let you compare products and find the best deals."
                />
            </MetaTags>
            <Header />
            <Content />
            <Footer/>
        </Fragment>
    );
}

export default Home;