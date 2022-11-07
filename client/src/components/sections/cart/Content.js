import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import img1 from '../../../assets/img/shop/cart-1.png';
import img2 from '../../../assets/img/shop/cart-2.png';

const cartlistpost = [
    { img: img1, title: 'Blue Blast', total: 109, qty: 1 },
    { img: img2, title: "Florida's Finest", total: 44, qty: 1 },
];
class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicks: 1,
            show: true,
        };
    }
    IncrementItem = () => {
        this.setState({ clicks: this.state.clicks + 1 });
    };

    DecreaseItem = () => {
        if (this.state.clicks < 1) {
            this.setState({
                clicks: 0,
            });
        } else {
            this.setState({
                clicks: this.state.clicks - 1,
            });
        }
    };
    handleChange(event) {
        this.setState({ clicks: event.target.value });
    }
    render() {
        return (
            <section className="cart-section pt-120 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="w-100 table-responsive mb-60">
                                <table className="table cw-cart-table mb-0">
                                    <thead>
                                        <tr>
                                            <th />
                                            <th scope="col" className="product-name">Product</th>
                                            <th scope="col" className="product-qty">Quantity</th>
                                            <th scope="col" className="product-price">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartlistpost.map((item, i) => (
                                            <tr key={i}>
                                                <td className="product-remove text-center cw-align">
                                                    <Link to="#"><i className="fas fa-times" /></Link>
                                                </td>
                                                <td data-title="Product" className="has-title">
                                                    <div className="product-thumbnail">
                                                        <img src={item.img} alt="product_thumbnail" />
                                                    </div>
                                                    <Link to="/shop-detail">{item.title}</Link>
                                                </td>
                                                <td className="quantity shop-detail-content cw-qty-sec cw-align has-title" data-title="Quantity">
                                                    <div className="quantity-box">
                                                        <button type="button" className="minus-btn" onClick={this.DecreaseItem}>
                                                            <i className="fal fa-minus" />
                                                        </button>
                                                        <input type="text" className="input-qty" name="name" value={this.state.clicks} onChange={this.handleChange.bind(this)} readOnly />
                                                        <button type="button" className="plus-btn" onClick={this.IncrementItem}>
                                                            <i className="fal fa-plus" />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="product-price text-white cw-align has-title" data-title="Price">
                                                    <span className="product-currency"><b>$</b></span> <span className="product-amount"><b>{item.total}</b></span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={4}>
                                                <button className="main-btn btn-filled float-left">Continue Shoping</button>
                                                <button className="main-btn btn-filled float-right">Update Cart</button>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 mb-60">
                                    <div className="cw-product-promo">
                                        <div className="cw-title">
                                            <h5>Discount Code</h5>
                                        </div>
                                        <form>
                                            <div className="form-group mb-0">
                                                <label htmlFor="couponCode">Enter coupon code</label>
                                                <input type="text" className="form-control" placeholder="Coupon Code" id="couponCode" />
                                                <button type="submit" className="main-btn btn-filled mt-4">Apply</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="offset-lg-6 col-lg-6 col-md-12">
                                    <div className="cw-product-promo">
                                        <table className="table cw-table-borderless">
                                            <tbody>
                                                <tr>
                                                    <td> <b>Subtotal</b> </td>
                                                    <td className="text-right">$ 99.99</td>
                                                </tr>
                                                <tr>
                                                    <td> <b>Shipping</b> </td>
                                                    <td className="text-right">$ 2.99</td>
                                                </tr>
                                                <tr>
                                                    <td> <b>Total</b> </td>
                                                    <td className="text-right">$ 103.99</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <Link to="/checkout" className="main-btn btn-filled w-100">Proceed to Checkout</Link>
                                    </div>
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