import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumbs';
import Footer from '../layouts/Footer';
import Content from '../sections/shopdetail/Content';

class Shopdetail extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Laramiss | Shop Detail</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Shop Detail'}}/>
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Shopdetail;
