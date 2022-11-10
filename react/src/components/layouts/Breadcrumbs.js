import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import breadcrumbimg from '../../assets/img/bg/04.jpg'

class Breadcrumbs extends Component {
    render() {
        return (
            <section className="breadcrumb-area" style={{ backgroundImage: "url(" + breadcrumbimg + ")" }}>
                <div className="container">
                    <div className="breadcrumb-text">
                        <span>DESIGNER JEWELRY</span>
                        <h2 className="page-title">{this.props.breadcrumb.pagename}</h2>
                        <ul className="breadcrumb-nav">
                            <li><Link to="/">Home</Link></li>
                            <li className="active">{this.props.breadcrumb.pagename}</li>
                        </ul>
                    </div>
                </div>
            </section>
        );
    }
}

export default Breadcrumbs;