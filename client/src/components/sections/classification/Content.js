import React, { Component, Fragment } from 'react';
import Category from './Category';
import Trending from './Trending';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Category/>
                <Trending/>
            </Fragment>
        );
    }
}

export default Content;