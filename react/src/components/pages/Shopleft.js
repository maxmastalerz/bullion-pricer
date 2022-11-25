import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumbs';
import Footer from '../layouts/Footer';
import Content from '../sections/shopleft/Content';

class Shopleft extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Laramiss | Shop Left</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Shop Left'}}/>
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Shopleft;
