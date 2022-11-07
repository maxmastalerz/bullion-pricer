import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cursor from '../../layouts/Cursor';

import bannerimg from '../../../assets/img/banner/05.jpg';

class Banner extends Component {
    render() {
        return (
            <section className="banner-area banner-style-three">
                <div className="single-banner d-flex align-items-center justify-content-center">
                    {/* Follow Circle */}
                    <Cursor />
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="banner-content">
                                    <span className="promo-tag" data-animation="fadeInDown" data-delay=".6s"> Jewelry Design With Love</span>
                                    <h1 className="title" data-animation="fadeInLeft" data-delay=".9s">Vintage And Modern <br /> Estate Jewelry</h1>
                                    <div className="book-wrapper"> <Link to="/shop-left" className="menu-btn" data-animation="fadeInUp" data-delay="1.1s">Shop Now<span className="book-arrow">
                                        <i className="fal fa-arrow-right" />
                                    </span>
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-none d-md-block vertical-text wow fadeIn" data-wow-delay=".3s"> <span>Call Us on: </span>
                        <span>+123 456 789</span>
                    </div>
                    {/* banner bg */}
                    <div className="banner-bg" style={{ backgroundImage: "url("+ bannerimg +")" }} />
                    <div className="banner-overly" />
                </div>
            </section>
        );
    }
}

export default Banner;