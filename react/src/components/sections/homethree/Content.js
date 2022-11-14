import React, { Component, Fragment } from 'react';
import Banner from './Banner';
import Category from './Category';
import Habout from '../../layouts/Habout';
import Handpicked from './Handpicked';
import Counter from './Counter';
import Bestfeature from './Bestfeature';
import Latestproducts from '../../layouts/Latestproducts';
import Newsletter from './Newsletter';
import Cta from './Cta';
import About from './About';
import Blog from './Blog';

class Content extends Component {
    render() {
        return ( 
            <Fragment>
                <Banner/>
                <Category/>
                <Habout/>
                <Handpicked/>
                <Counter/>
                <Bestfeature/>
                <Latestproducts/>
                <Newsletter/>
                <Cta/>
                <About/>
                <Blog/>
            </Fragment>
        );
    }
}

export default Content;