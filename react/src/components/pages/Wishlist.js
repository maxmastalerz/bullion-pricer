import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumbs';
import Footer from '../layouts/Footer';
import Content from '../sections/wishlist/Content';

class Wishlist extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Laramiss | Wishlist</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Wishlist'}}/>
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Wishlist;
