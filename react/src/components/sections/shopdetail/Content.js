import React, { Component, Fragment } from 'react';
import Shopinfo from './Shopinfo';
import Shoprelated from '../../layouts/Shoprelated';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Shopinfo/>
                <Shoprelated/>
            </Fragment>
        );
    }
}

export default Content;