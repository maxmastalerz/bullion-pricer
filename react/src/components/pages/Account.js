import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumbs';
import Instafeeds from '../layouts/Instafeeds';
import Footer from '../layouts/Footer';
import Content from '../sections/account/Content';

class Account extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Laramiss | My Account</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'My Account'}} />
                <Content/>
                <Instafeeds/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Account;