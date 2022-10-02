import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import ctabg from '../../../assets/img/others/product.png';

class Cta extends Component {
    render() {
        return (
            <section className="pt-115 pb-115 bg-white cta-sec" style={{ backgroundImage: "url("+ ctabg +")" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="block-text">
                                <div className="section-title mb-20">
                                    <span className="title-tag">Buy Now</span>
                                    <h2>Rare Collections.</h2>
                                </div>
                                <p className="pr-50">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, aliquip ex ea commodo consequat you have to understand this.
                                </p>
                                <Link to="/shop-left" className="main-btn btn-filled mt-40">Shop now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

export default Cta;