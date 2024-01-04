import React, { Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumbs';
import Footer from '../layouts/Footer';
import Content from '../sections/contact/Content';

function Contact() {
    return (
        <Fragment>
            <MetaTags>
                <title>BullionPricer | Contact Us</title>
                <meta
                    name="description"
                    content="#"
                />
            </MetaTags>
            <Header/>
            <Breadcrumb breadcrumb={{pagename:'Contact Us'}}/>
            <Content/>
            <Footer/>
        </Fragment>
    );
}

export default Contact;
