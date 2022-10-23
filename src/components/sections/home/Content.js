import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../layouts/Pagination';
import ProductFilterLeft from '../../layouts/ProductFilterLeft';
import ProductFilterTop from '../../layouts/ProductFilterTop';

import img1 from '../../../assets/img/shop/01.jpg';
import img2 from '../../../assets/img/shop/02.jpg';
import img3 from '../../../assets/img/shop/03.jpg';

/* All prices are stored and processed as USD by us. */
/* Only if a user selects a different currency do we calculate the exchange price. */
const shopgridpost = [
    { img: img1, title: '1 oz 2022 Canadian Maple Leaf Silver Coin | Royal Canadian Mint', price: 390, seller: 'Silver Gold Bull', mint: 'Royal Canadian Mint' },
    { img: img2, title: '100 oz Pure Assorted Silver Bar', price: 290, seller: 'Canadian PMX', mint: 'Various' },
    { img: img3, title: '1 gram Platinum Bar | Valcambi', price: 450, seller: 'Canadian PMX', mint: 'Valcambi' },

    { img: img1, title: '1 oz Fortuna Platinum Bar | PAMP Suisse', price: 780, seller: 'Silver Gold Bull', mint: 'PAMP Suisse' },
    { img: img2, title: 'PAMP SUISSE GOLD BAR, 10 GRAM .9999', price: 290, seller: 'Canadian PMX', mint: 'PAMP Suisse' },
    { img: img3, title: '1 kg | kilo Johnson Matthey Silver Bar', price: 890, seller: 'Silver Gold Bull', mint: 'Johnson Matthey' },

    { img: img1, title: '1 oz Random Year Canadian Maple Leaf Gold Coin | Royal Canadian Mint', price: 580, seller: 'Silver Gold Bull', mint: 'Royal Canadian Mint' },
    { img: img2, title: '10 oz Silver Bar | Royal Canadian Mint', price: 290, seller: 'Canadian PMX', mint: 'Royal Canadian Mint' },
    { img: img3, title: '1 kg | Kilo Heraeus Silver Bar', price: 800, seller: 'Canadian PMX', mint: 'Heraeus' }
];
class Content extends Component {
    render() {
        return (
            <section className="Shop-section pt-shop-section pb-120">
                <div className="container">
                    <div className="row justify-content-center">
                        {/* Shop Sidebar */}
                        <div className="col-lg-4 col-md-10 col-sm-10">
                            <ProductFilterLeft />
                        </div>
                        <div className="col-lg-8 col-md-10">
                            <ProductFilterTop />

                            <div className="shop-products-wrapper pt-shop-section">
                                <div className="shop-product-top">
                                    <p>Showing 1 To 9 Of 60 results</p>
                                    <div className="sorting-box">
                                        <select name="guests" id="guests" className="nice-select">
                                            <option value={1}>Sort By Price:Low to High</option>
                                            <option value={2}>Sort By Price:High to Low</option>
                                            <option value={3}>Sort By Mint:Ascending</option>
                                            <option value={4}>Sort By Mint:Descending</option>
                                            <option value={5}>Sort By Seller:Ascending</option>
                                            <option value={6}>Sort By Seller:Descending</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="product-wrapper restaurant-tab-area">
                                    <div className="row">
                                        {shopgridpost.map((item, i) => (
                                            <div key={i} className="col-lg-4 col-md-6">
                                                <div className="food-box shop-box">
                                                    <div className="thumb">
                                                        <img src={item.img} alt="" />
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
                                                        <span className="price">
                                                            ${item.price}
                                                        </span>
                                                        <span className="mint">
                                                            <span> {item.mint} </span>
                                                        </span><br/>
                                                        <span className="seller">
                                                            <span> {item.seller} </span>
                                                        </span>
                                                        <Link to="/shop-detail" className="link"><i className="fal fa-arrow-right" /></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="pagination-wrap">
                                <Pagination />
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Content;