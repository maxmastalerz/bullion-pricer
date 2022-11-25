import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumbs';
import Footer from '../layouts/Footer';
import Content from '../sections/faq/Content';

class Faq extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Laramiss | FAQ's</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:"FAQ's"}}/>
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Faq;
