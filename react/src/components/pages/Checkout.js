import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumbs';
import Footer from '../layouts/Footer';
import Content from '../sections/checkout/Content';

class Checkout extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Laramiss | Checkout</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Checkout'}}/>
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Checkout;
