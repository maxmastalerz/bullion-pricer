import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ppimg1 from '../../assets/img/recent-post-wid/04.png';
import ppimg2 from '../../assets/img/recent-post-wid/05.png';
import ppimg3 from '../../assets/img/recent-post-wid/06.png';

import insta1 from '../../assets/img/instagram-wid/01.jpg';
import insta2 from '../../assets/img/instagram-wid/02.jpg';
import insta3 from '../../assets/img/instagram-wid/03.jpg';
import insta4 from '../../assets/img/instagram-wid/04.jpg';
import insta5 from '../../assets/img/instagram-wid/05.jpg';
import insta6 from '../../assets/img/instagram-wid/06.jpg';
import insta7 from '../../assets/img/instagram-wid/07.jpg';
import insta8 from '../../assets/img/instagram-wid/08.jpg';
import insta9 from '../../assets/img/instagram-wid/09.jpg';
// Popular Products
const popularproducts = [
    { img: ppimg1, title: 'Golden Pendant.', price: '500', discountprice: '580' },
    { img: ppimg2, title: 'Silver Pendant.', price: '400', discountprice: '520' },
    { img: ppimg3, title: 'Diamond Ring.', price: '390', discountprice: '450' },
];
// Cart Products
const cartproducts = [
    { img: ppimg1, title: 'Golden Pendant.', price: '500', discountprice: '580' },
    { img: ppimg2, title: 'Silver Pendant.', price: '400', discountprice: '520' },
    { img: ppimg3, title: 'Diamond Ring.', price: '390', discountprice: '450' },
];
// Color selection
const colorposts = [
    { name: 'Red' },
    { name: 'Green' },
    { name: 'Brown' },
    { name: 'Grey' },
    { name: 'Orange' },
];
// Instagram Feeds
const instafeeds = [
    { img: insta1 },
    { img: insta2 },
    { img: insta3 },
    { img: insta4 },
    { img: insta5 },
    { img: insta6 },
    { img: insta7 },
    { img: insta8 },
    { img: insta9 },
];
// Tags
const tags = [
    { title: 'Rings' },
    { title: 'earrings' },
    { title: 'necklace' },
    { title: 'bracelets' },
    { title: 'wedding ring' },
    { title: 'bangles' },
    { title: 'hard ring' },
    { title: 'ankle bracelet' },
    { title: 'silver bracelet' },
    { title: 'earring' },
    { title: 'copper bracelet' },
    { title: 'tech' },
];
class Shopsidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                {/* About Author Widget */}
                {/* Search Widget */}
                <div className="widget search-widget mb-40">
                    <h5 className="widget-title">Search Objects</h5>
                    <form action="#">
                        <input type="text" placeholder="Search your keyword..." />
                        <button type="submit"><i className="far fa-search" /></button>
                    </form>
                </div>
                {/* Popular Post Widget */}
                <div className="widget popular-feeds mb-40">
                    <h5 className="widget-title">Popular Products</h5>
                    <div className="popular-feed-loop">
                        {popularproducts.map((item, i) => (
                            <div key={i} className="single-popular-feed">
                                <div className="feed-img">
                                    <img src={item.img} alt="" />
                                </div>
                                <div className="feed-desc desc">
                                    <h6><Link to="/shop-detail">{item.title}</Link></h6>
                                    <span className="price">${item.price} <span>${item.discountprice}</span></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Cart Widget */}
                <div className="widget popular-feeds mb-40">
                    <h5 className="widget-title">Cart</h5>
                    <div className="popular-feed-loop">
                        {cartproducts.map((item, i) => (
                            <div key={i} className="single-popular-feed">
                                <div className="feed-img">
                                    <img src={item.img} alt="" />
                                </div>
                                <div className="feed-desc desc">
                                    <div className="cart-flex">
                                        <h6><Link to="#">{item.title}</Link></h6>
                                        <Link to="#" className="remove"><i className="fal fa-times" /></Link>
                                    </div>
                                    <span className="price">${item.price} <span>${item.discountprice}</span></span>
                                </div>
                            </div>
                        ))}
                        <div className="widget-cart-info">
                            <div className="cart-details">
                                <span>Subtotal:</span>
                                <span>$51.00</span>
                            </div>
                            <div className="cart-buttons">
                                <Link to="/cart" className="main-btn btn-filled">View Cart</Link>
                                <Link to="/checkout" className="main-btn btn-filled">Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Color Widget */}
                <div className="widget socail-widget mb-40">
                    <h5 className="widget-title">Color</h5>
                    <div className="filter-color">
                        <form>
                            {colorposts.map((item, i) => (
                                <label key={i} className="checkbox">
                                    <input type="checkbox" name="#" />
                                    <span className="custom-box" />
                                    {item.name}
                                </label>
                            ))}
                        </form>
                    </div>
                </div>
                {/* Instagram Feeds Widget */}
                <div className="widget instagram-feed-widget mb-40">
                    <h5 className="widget-title">Instagram Feeds</h5>
                    <ul>
                        {instafeeds.map((item, i) => (
                            <li key={i}><img src={item.img} alt="" /></li>
                        ))}
                    </ul>
                </div>
                {/* Popular Tags Widget */}
                <div className="widget popular-tag-widget">
                    <h5 className="widget-title">Popular Tags</h5>
                    <ul>
                        {tags.map((item, i) => (
                            <li key={i}><Link to="#">{item.title}</Link></li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Shopsidebar;