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
                    <title>BullionPricer | Frequently Asked Questions</title>
                    <meta
                        name="description"
                        content="Not sure how to use Bullion Pricer and already read the About page? Please check out this FAQ before contacting us."
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:"FAQ"}}/>
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Faq;
