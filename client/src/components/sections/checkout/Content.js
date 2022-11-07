import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const checkouttableposts = [
    { title: 'Apples', piece: 1, qty: 1, total: 32.00 },
    { title: 'Oranges', piece: 1, qty: 1, total: 32.80 },
    { title: 'Mangoes', piece: 1, qty: 1, total: 50.99 },
];
class Content extends Component {
    render() {
        return (
            <section className="checkout pt-120 pb-120">
                <div className="container">
                    <form method="post">
                        <div className="row">
                            <div className="col-xl-7">
                                <div className="checkout-form">
                                    <h4>Billing Details</h4>
                                    <div className="row">
                                        <div className="col-xl-6 input-group input-group-two mb-20">
                                            <label>First Name
                  <span className="text-danger">*</span>
                                            </label>
                                            <input type="text" placeholder="First name" name="fname" />
                                        </div>
                                        <div className="col-xl-6 input-group input-group-two mb-20">
                                            <label>Last Name
                  <span className="text-danger">*</span>
                                            </label>
                                            <input type="text" placeholder="Last name" name="lname" />
                                        </div>
                                        <div className="col-12 input-group input-group-two mb-20">
                                            <label>Company Name
                </label>
                                            <input type="text" placeholder="Company Name (Optional)" name="cname" />
                                        </div>
                                        <div className="col-12 input-group input-group-two mb-20">
                                            <label>Country
                  <span className="text-danger">*</span>
                                            </label>
                                            <select className="nice-select">
                                                <option value selected>Select A Country</option>
                                                <option value="United Kingdom">United Kingdom</option>
                                                <option value="Australia">Australia</option>
                                                <option value="Germany">Germany</option>
                                                <option value="France">France</option>
                                                <option value="UAE">United Arab Emirates</option>
                                            </select>
                                        </div>
                                        <div className="col-12 input-group input-group-two mb-20">
                                            <label>Address
                  <span className="text-danger">*</span>
                                            </label>
                                            <input type="text" placeholder="Your Address" name="address" required />
                                        </div>
                                        <div className="col-12 input-group input-group-two mb-20">
                                            <label>City
                  <span className="text-danger">*</span>
                                            </label>
                                            <input type="text" placeholder="City" name="city" required />
                                        </div>
                                        <div className="col-xl-6 input-group input-group-two mb-20">
                                            <label>Last Name
                  <span className="text-danger">*</span>
                                            </label>
                                            <input type="text" placeholder="Phone Number" name="number" required />
                                        </div>
                                        <div className="col-xl-6 input-group input-group-two mb-20">
                                            <label>Email Address
                  <span className="text-danger">*</span>
                                            </label>
                                            <input type="text" placeholder="Your Email" name="lname" required />
                                        </div>
                                        <div className="col-12 input-group input-group-two">
                                            <label>Your Messsage
                </label>
                                            <textarea placeholder="Type Your Message" name="comment" rows={7} defaultValue={""} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5 space-top">
                                <div className="checkout-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {checkouttableposts.map((item, i) => (
                                                <tr key={i}>
                                                    <td data-title="product">
                                                        <div className="product-name">
                                                            <h6>
                                                                <Link to="#">{item.title}</Link>
                                                            </h6>
                                                            <p>{item.piece} Piece</p>
                                                        </div>
                                                    </td>
                                                    <td data-title="Quantity">x{item.qty}</td>
                                                    <td data-title="Total">
                                                        <strong>{item.total}$</strong>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr className="total">
                                                <td>
                                                    <h6 className="mb-0">Total</h6>
                                                </td>
                                                <td />
                                                <td>
                                                    <strong>115.79$</strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row">
                                    <div className="col-12 input-group input-group-two mb-20">
                                        <label>Card Number
              </label>
                                        <input type="text" placeholder="Card Number" name="Card" required />
                                    </div>
                                    <div className="col-12 input-group input-group-two mb-20">
                                        <label>Full Name
              </label>
                                        <input type="text" placeholder="Full name" name="full-name" required />
                                    </div>
                                    <div className="col-xl-6 input-group input-group-two mb-20">
                                        <label>Expiry Date
              </label>
                                        <input type="text" placeholder="Expiry Date (MM/YY)" name="exp-date" required />
                                    </div>
                                    <div className="col-xl-6 input-group input-group-two mb-20">
                                        <label>CVV*
              </label>
                                        <input type="text" placeholder="CVV" name="CVV-no" required />
                                    </div>
                                    <div className="col-12">
                                        <p className="small mb-20">
                                            Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our
                <Link to="#">Privacy Policy</Link>
                                        </p>
                                        <button type="submit" className="main-btn btn-filled w-100">Place Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

        );
    }
}

export default Content;