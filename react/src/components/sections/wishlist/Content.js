import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import img1 from '../../../assets/img/shop/cart-1.png';
import img2 from '../../../assets/img/shop/cart-2.png';
import img3 from '../../../assets/img/shop/cart-3.png';
import img4 from '../../../assets/img/shop/cart-4.png';
import img5 from '../../../assets/img/shop/cart-5.png';

const wishlistposts = [
    { img: img1, name: 'Product1', price: '109', instock: 'In Stock', total: '320' },
    { img: img2, name: 'Product2', price: '109', outstock: 'Out Of Stock', total: '320' },
    { img: img3, name: 'Product3', price: '109', outstock: 'Out Of Stock', total: '320' },
    { img: img4, name: 'Product4', price: '109', instock: 'In Stock', total: '320' },
    { img: img5, name: 'Product5', price: '109', instock: 'In Stock', total: '320' },
];
class Content extends Component {
    render() {
        return (
            <section className="cart-section wishlist pt-120 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="w-100 table-responsive mb-60">
                                <table className="table cw-cart-table mb-0">
                                    <thead>
                                        <tr>
                                            <th />
                                            <th scope="col" className="product-name">Product</th>
                                            <th scope="col" className="product-qty">Price</th>
                                            <th scope="col" className="product-price">Availability</th>
                                            <th scope="col" className="product-price">Total</th>
                                            <th scope="col" className="product-price">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {wishlistposts.map((item, i) => (
                                            <tr key={i}>
                                                <td className="product-remove text-center cw-align">
                                                    <Link to="#"><i className="fas fa-times" /></Link>
                                                </td>
                                                <td data-title="Product" className="has-title">
                                                    <div className="product-thumbnail">
                                                        <img src={item.img} alt="" />
                                                    </div>
                                                    <Link to="/shop-detail">{item.name}</Link>
                                                </td>
                                                <td className="product-price text-white cw-align has-title" data-title="Price">
                                                    <span className="product-currency"><b>$</b></span> <span className="product-amount"><b>{item.price}</b></span>
                                                </td>
                                                <td data-title="Availability" className="has-title">
                                                    <span className="text-success fw-600">{item.instock}</span>
                                                    <span className="text-danger fw-600">{item.outstock}</span>
                                                </td>
                                                <td className="product-price text-white cw-align has-title" data-title="Total">
                                                    <span className="product-currency"><b>$</b></span> <span className="product-amount"><b>{item.total}</b></span>
                                                </td>
                                                <td data-title="Actions" className="has-title">
                                                    <Link to="#" className="main-btn btn-filled">Add to Cart</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="share-wishlist text-center">
                                <h4>Share Your Wishlist</h4>
                                <div className="social-media">
                                    <Link to="#"><i className="fab fa-facebook-f" /></Link>
                                    <Link to="#"><i className="fab fa-twitter" /></Link>
                                    <Link to="#"><i className="fab fa-behance" /></Link>
                                    <Link to="#"><i className="fab fa-linkedin" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

export default Content;