import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../layouts/Pagination';
import Sidebar from '../../layouts/Shopsidebar';

import img1 from '../../../assets/img/shop/01.jpg';
import img2 from '../../../assets/img/shop/02.jpg';
import img3 from '../../../assets/img/shop/03.jpg';

const shopgridpost = [
    { img: img1, title: 'Ankle Bracelet', discount: 15, price: 390 },
    { img: img2, title: 'Stud Earrings', discount: '', price: 290 },
    { img: img3, title: 'Crumpled Ring', discount: 10, price: 450 },

    { img: img1, title: 'Golden Pendant', discount: 15, price: 780 },
    { img: img2, title: 'Silver Pendant.', discount: '', price: 290 },
    { img: img3, title: 'Diamond Ring.', discount: 10, price: 890 },

    { img: img1, title: 'Stud Earrings', discount: 15, price: 580 },
    { img: img2, title: 'Ankle Bracelet', discount: 40, price: 290 },
    { img: img3, title: 'Diamond Ring.', discount: 10, price: 800 },

    { img: img1, title: 'Ankle Bracelet', discount: 15, price: 390 },
    { img: img2, title: 'Stud Earrings', discount: '', price: 290 },
    { img: img3, title: 'Crumpled Ring', discount: 10, price: 450 },
];

class Content extends Component {
    render() {
        return (
            <section className="Shop-section pt-120 pb-120">
                <div className="container">
                    <div className="row justify-content-center">
                        {/* Shop Sidebar */}
                        <div className="col-lg-8 col-md-10">
                            <div className="shop-products-wrapper">
                                <div className="shop-product-top">
                                    <p>Showing 1 To 9 Of 60 results</p>
                                    <div className="sorting-box">
                                        <select name="guests" id="guests" className="nice-select">
                                            <option value={0}>Default Sorting</option>
                                            <option value={1}>Sort By Popularity</option>
                                            <option value={2}>Sort By Latest</option>
                                            <option value={4}>Sort By Rating</option>
                                            <option value={8}>Sort By Price:Low to High</option>
                                            <option value={8}>Sort By Price:High to Low</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="product-wrapper restaurant-tab-area">
                                    <div className="row">
                                        {shopgridpost.map((item, i) => (
                                            <div key={i} className="col-lg-4 col-md-6">
                                                <div className="food-box shop-box style-2">
                                                    <div className="thumb">
                                                        <img src={item.img} alt="" />
                                                        <div className="badges">
                                                            {
                                                                item.discount > 0 || item.discount !== '' ? <span className="price discounted">Sale</span> : ''
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
                                                    <div className="desc text-center">
                                                        <h4>
                                                            <Link to="/shop-detail">{item.title} </Link>
                                                        </h4>
                                                        <span className="price">${item.price}
                                                            {item.discount > 0 || item.discount !== '' ? <span> ${Math.ceil(item.price * (item.discount / 100))} </span> : ''}</span>
                                                        <Link to="#" className="main-btn btn-filled mt-10">Add to Cart</Link>
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
                        <div className="col-lg-4 col-md-10 col-sm-10">
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

export default Content;