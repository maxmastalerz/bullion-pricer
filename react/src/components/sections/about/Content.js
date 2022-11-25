import React, { Fragment } from 'react';
import About from './About';
import ContactRedirect from './ContactRedirect';

function Content() {
    return (
        <Fragment>
            <About/>
            <ContactRedirect/>
        </Fragment>
    );
}

export default Content;