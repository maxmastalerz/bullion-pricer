import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumbs';
import Footer from '../layouts/Footer';
import Content from '../sections/register/Content';

class Register extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Laramiss | Register</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Register'}}/>
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Register;
