import React, { Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumbs';
import Footer from '../layouts/Footer';
import Content from '../sections/about/Content';


function AboutUs(){
    return (
        <Fragment>
            <MetaTags>
                <title>Precious Pricer | About Us</title>
                <meta
                    name="description"
                    content="#"
                />
            </MetaTags>
            <Header/>
            <Breadcrumb breadcrumb={{pagename:'About Us'}} />
            <Content/>
            <Footer/>
        </Fragment>
    );
}

export default AboutUs;
