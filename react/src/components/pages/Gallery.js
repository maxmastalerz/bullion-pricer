import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumbs';
import Footer from '../layouts/Footer';
import Content from '../sections/gallery/Content';

class Gallery extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Laramiss | Gallery</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Gallery'}}/>
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Gallery;
