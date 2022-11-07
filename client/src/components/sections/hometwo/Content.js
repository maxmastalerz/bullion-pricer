import React, { Component, Fragment } from 'react';
import Banner from './Banner';
import Categorybox from './Categorybox';
import Collection from './Collection';
import Video from './Video';
import Latestproducts from '../../layouts/Latestproducts';
import Jwelsale from './Jwelsale';
import Bestfeature from './Bestfeature';
import Handpick from './Handpick';
import Productslider from './Productslider';
import Blogpost from '../../layouts/Blogpost';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Banner/>
                <Collection/>
                <Categorybox/>
                <Video/>
                <Latestproducts/>
                <Jwelsale/>
                <Bestfeature/>
                <Handpick/>
                <Productslider/>
                <Blogpost/>
            </Fragment>
        );
    }
}

export default Content;