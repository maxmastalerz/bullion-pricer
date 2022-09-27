import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Footer from '../layouts/Footertwo';
import Newsletter from '../layouts/Newsletter';
import Content from '../sections/homefour/Content';

class Homefour extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Laramiss | Homepage</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Newsletter/>
                <Header/>
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Homefour;