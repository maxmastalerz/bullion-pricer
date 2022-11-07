import React, { Component, Fragment } from 'react';
import About from './About';
import Core from './Core';
import Counter from './Counter';
import News from './News';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <About/>
                <Core/>
                <Counter/>
                <News/>
            </Fragment>
        );
    }
}

export default Content;