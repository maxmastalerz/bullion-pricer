import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import shapeicon from '../../../assets/img/icon/06.png';
import img1 from '../../../assets/img/menu/menu-gallery-1.jpg';
import img2 from '../../../assets/img/menu/menu-gallery-2.jpg';
import img3 from '../../../assets/img/menu/menu-gallery-3.jpg';
const galleryposts = [
    { img: img1 },
    { img: img2 },
    { img: img3 },
    { img: img1 },
    { img: img2 },
    { img: img3 },
];

class Gallery extends Component {
    render() {
        const settings = {
            slidesToShow: 3,
            slidesToScroll: 1,
            fade: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 4000,
            arrows: false,
            dots: false,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                },
            },
            ],
        }
        return (
            <div className="menu-area style-2 bg-white menu-with-shape menu-nagative-gallery">
                {/* Gallery */}
                <div className="gallery-wrap">
                    <div className="container">
                        <Slider className="row gallery-slider text-center" {...settings}>
                            {galleryposts.map((item, i) => (
                                <div key={i} className="col-lg-12">
                                    <Link to={item.img} className="gallery-popup">
                                        <img src={item.img} alt="gallery" />
                                    </Link>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                {/* Shape */}
                <div className="shape-two">
                    <img src={shapeicon} alt="Icon" />
                </div>
            </div>

        );
    }
}

export default Gallery;