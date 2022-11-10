import React, { Component, Fragment } from 'react';
import About from './About';
import Banner from './Banner';
import Counter from './Counter';
import Locations from './Locations';
import Habout from '../../layouts/Habout';
import Ourproducts from '../../layouts/Ourproducts';
import Cta from './Cta';
import Blogpost from '../../layouts/Blogpost';
import Newsletter from '../homethree/Newsletter';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Banner/>
                <About/>
                <Locations/>
                <Habout/>
                <Ourproducts/>
                <Counter/>
                <Cta/>
                <Blogpost/>
                <Newsletter/>
            </Fragment>
        );
    }
}

export default Content;