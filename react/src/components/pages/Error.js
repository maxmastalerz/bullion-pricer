import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Content from '../sections/error/Content';

class Error extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Laramiss | Error</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Content/>
            </Fragment>
        );
    }
}

export default Error;