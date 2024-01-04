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
                    content="Contact us about indexing new gold, silver, platinum, or palladium products. We are also happy to answer any other questions you may have."
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
