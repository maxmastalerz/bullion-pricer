import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import texture from '../../../assets/img/texture-1.png';
import img1 from '../../../assets/img/shop/01.jpg';
import img2 from '../../../assets/img/shop/02.jpg';
import img3 from '../../../assets/img/shop/03.jpg';
import img4 from '../../../assets/img/shop/04.jpg';

const shopposts = [
    { img: img1, discount: 15, title: 'Ankle Bracelet', price: 390 },
    { img: img2, discount: '', title: 'Stud Earrings', price: 290 },
    { img: img3, discount: 10, title: 'Crumpled Ring', price: 450 },
    { img: img4, discount: 25, title: 'Moon Necklace', price: 500 },
    { img: img1, discount: 15, title: 'Ankle Bracelet', price: 390 },
    { img: img2, discount: '', title: 'Stud Earrings', price: 290 },
    { img: img3, discount: 10, title: 'Crumpled Ring', price: 450 },
    { img: img4, discount: 25, title: 'Moon Necklace', price: 500 },
];
class Bestselling extends Component {
    render() {
        const settings = {
            slidesToShow: 4,
            slidesToScroll: 1,
            fade: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 4000,
            arrows: false,
            dots: false,
            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                },
            },
            ],
        }
        return (
            <section className="pt-115 pb-115 container-wide restaurant-tab-area position-relative">
                <img src={texture} alt="texture" className="texture-1" />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="block-text">
                                <div className="section-title mb-20">
                                    <span className="title-tag">Buy Now</span>
                                    <h2>Bestselling Products </h2>
                                </div>
                                <p className="pr-50">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, aliquip ex ea commodo consequat you have to understand this.
          </p>
                                <Link to="/shop-left" className="main-btn btn-filled mt-40">Shop now</Link>
                            </div>
                        </div>
                        <div className="px-2 w-100">
                            <Slider className="row wide-shop-post-slider mt-80" {...settings}>
                                {shopposts.map((item, i) => (
                                    <div key={i} className="col-12">
                                        <div className="food-box shop-box">
                                            <div className="thumb">
                                                <img src={item.img} alt="images" />
                                                <div className="badges">
                                                    {
                                                        item.discount > 0 || item.discount !== '' ? <span className="price">Sale</span> : ''
                                                    }
                                                    {
                                                        item.discount > 0 || item.discount !== '' ? <span className="price discounted">-{item.discount}%</span> : ''
                                                    }
                                                </div>
                                                <div className="button-group">
                                                    <Link to="#"><i className="far fa-heart" /></Link>
                                                    <Link to="#"><i className="far fa-sync-alt" /></Link>
                                                    <Link to="#"><i className="far fa-eye" /></Link>
                                                </div>
                                            </div>
                                            <div className="desc">
                                                <h4>
                                                    <Link to="/shop-detail">{item.title}</Link>
                                                </h4>
                                                <span className="price">${item.price}
                                                    {item.discount > 0 || item.discount !== '' ? <span> ${Math.ceil(item.price * (item.discount / 100))} </span> : ''}</span>
                                                <Link to="/shop-detail" className="link"><i className="fal fa-arrow-right" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

export default Bestselling;