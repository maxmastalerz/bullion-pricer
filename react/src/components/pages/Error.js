import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Content from '../sections/error/Content';

class Error extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>BullionPricer | Ooops! Page doesn't exist!</title>
                    <meta
                        name="description"
                        content="It appears there's been an issue. The page you are looking for does not exist."
                    />
                </MetaTags>
                <Content/>
            </Fragment>
        );
    }
}

export default Error;