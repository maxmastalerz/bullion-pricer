import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Cursor from '../../layouts/Cursor';

import img1 from '../../../assets/img/banner/05.jpg';
import img2 from '../../../assets/img/banner/06.jpg';

const bannerposts = [
    { img: img1, tag: 'Jewelry Design With Love', title: "The Perfect Jewels For You ", btn1: 'explore more', btn2: 'Buy Now' },
    { img: img2, tag: 'Jewelry Design With Love', title: 'The Perfect Jewels For You ', btn1: 'explore more', btn2: 'Buy Now' },
];
class Banner extends Component {
    render() {
        const settings = {
            infinite: true,
            autoplay: true,
            autoplaySpeed: 5000,
            dots: false,
            fade: true,
            arrows: false,
        }
        return (
            <Slider className="banner-area banner-style-three" id="bannerSlider" {...settings}>
                {bannerposts.map((item, i) => (
                    <div key={i} className="single-banner d-flex align-items-center justify-content-center">
                        <Cursor />
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="banner-content">
                                        <span className="promo-tag" data-animation="fadeInDown" data-delay=".6s">{item.tag}</span>
                                        <h1 className="title" data-animation="fadeInLeft" data-delay=".9s">{item.title}</h1>
                                        <ul>
                                            <li data-animation="fadeInUp" data-delay="1.1s"> <Link className="main-btn btn-filled" to="/about">{item.btn1}</Link>
                                            </li>
                                            <li data-animation="fadeInUp" data-delay="1.3s"> <Link className="main-btn btn-border" to="/about">{item.btn2}</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* banner bg */}
                        <div className="banner-bg" style={{ backgroundImage: "url(" + item.img + ")" }} />
                        <div className="banner-overly" />
                    </div>
                ))}
            </Slider>
        );
    }
}

export default Banner;