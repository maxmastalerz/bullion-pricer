import React from 'react';
import { Link } from 'react-router-dom';

import breadcrumbimg from '../../assets/img/bg/04.jpg';

function Breadcrumbs(props){
    return (
        <section className="breadcrumb-area" style={{ backgroundImage: "url(" + breadcrumbimg + ")" }}>
            <div className="container">
                <div className="breadcrumb-text">
                    <span>Bullion Pricer</span>
                    <h2 className="page-title">{props.breadcrumb.pagename}</h2>
                    <ul className="breadcrumb-nav">
                        <li><Link to="/">Home</Link></li>
                        <li className="active">{props.breadcrumb.pagename}</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default Breadcrumbs;