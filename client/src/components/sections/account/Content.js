import React, { Component } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import img1 from '../../../assets/img/shop/cart-1.png';
import img2 from '../../../assets/img/shop/cart-2.png';
import img3 from '../../../assets/img/shop/cart-3.png';

const orderlists = [
    { img: img1, title: 'Product1', id: 'b123jhk4h', date: '12-Sep-2022' },
    { img: img2, title: 'Product2', id: 'b673juyk4h', date: '14-Sep-2022' },
    { img: img3, title: 'Product3', id: 'Q123jh4h', date: '12-Sep-2022' },
    { img: img1, title: 'Product4', id: 'R444lo98', date: '20-Sep-2022' },
];
class Content extends Component {
    render() {
        return (
            <section className="account-sec pt-120 pb-120">
                <Tab.Container defaultActiveKey="dashboard">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="account-tabs">
                                    <Nav variant="tabs" className="flex-column border-0">
                                        <Nav.Item>
                                            <Nav.Link eventKey="dashboard">
                                                Dashboard
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="orders">
                                                Orders
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="downloads">
                                                Downloads
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="addresses">
                                                Addresses
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="acdetails">
                                                Account Details
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link className="logout">
                                                <i className="fal fa-power-off" /> Logout
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <Tab.Content>
                                    <Tab.Pane eventKey="dashboard">
                                        <div className="dashboard-content">
                                            <p className="text-white mb-30">Hello <b>John Benjamin</b> (not <b>John Benjamin</b>?
                                                <Link to="/">Log Out</Link>)
                                            </p>
                                            <p className="text-white">From Your Account Dashboard You can View Your <Link to="#">Recent Orders</Link>, Manage Your<Link to="#">Shipping and Billing Addresses</Link> and <Link to="#">Edit Your Password and Account Details</Link></p>
                                        </div>

                                    </Tab.Pane>
                                    <Tab.Pane eventKey="orders">
                                        <div>
                                            <div className="content-heading mb-50">
                                                <h3>My Orders</h3>
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                            </div>
                                            <div className="order-table">
                                                <table className="table cw-cart-table mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th />
                                                            <th scope="col" className="product-name">My Order</th>
                                                            <th scope="col" className="product-qty">Order ID</th>
                                                            <th scope="col" className="product-price">Order Date</th>
                                                            <th scope="col" className="product-price">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {orderlists.map((item, i) => (
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
                                                                <td className="product-price text-white cw-align has-title" data-title="Order ID">#{item.id}</td>
                                                                <td className="product-price text-white cw-align has-title" data-title="Order Date">{item.date}</td>
                                                                <td data-title="Actions" className="has-title">
                                                                    <Link to="#" className="main-btn btn-filled">Order Now</Link>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </Tab.Pane>
                                    <Tab.Pane eventKey="downloads">
                                        <div className="content-heading download-content">
                                            <h3>You Haven't Downloaded Any Product</h3>
                                            <p>You still havent saved any products yet, Go back to the products page and check some of your favorite products</p>
                                            <Link to="/shop-left" className="main-btn btn-outline mt-20">Browse Products</Link>
                                        </div>

                                    </Tab.Pane>
                                    <Tab.Pane eventKey="addresses">
                                        <div className="address-content">
                                            <p className="mb-30">The Following Address will Be Used on Checkout Page by Default</p>
                                            <div className="extra-info mb-30">
                                                <div className="billing-info">
                                                    <h3>Billing Address</h3>
                                                    <p>John Benjamin</p>
                                                </div>
                                                <Link to="#" className="btn-link">Edit</Link>
                                            </div>
                                            <div className="extra-info">
                                                <div className="shipping-info">
                                                    <h3>Shipping Address</h3>
                                                    <p>You have not Setup this Type of Address Yet.</p>
                                                </div>
                                                <Link to="#" className="btn-link">Add</Link>
                                            </div>
                                        </div>

                                    </Tab.Pane>
                                    <Tab.Pane eventKey="acdetails">
                                        <div className="profile-content">
                                            <div className="content-heading mb-50">
                                                <h3>Welcome Back</h3>
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                            </div>
                                            <form method="post">
                                                <div className="row">
                                                    <div className="col-lg-6 input-group input-group-two mb-20">
                                                        <label>First Name
          <span className="text-danger">*</span>
                                                        </label>
                                                        <input type="text" placeholder="John" name="fname" />
                                                    </div>
                                                    <div className="col-lg-6 input-group input-group-two mb-20">
                                                        <label>Last Name
          <span className="text-danger">*</span>
                                                        </label>
                                                        <input type="text" placeholder="Benjamin" name="lname" />
                                                    </div>
                                                    <div className="col-12 input-group input-group-two mb-20">
                                                        <label>Display Name
          <span className="text-danger">*</span>
                                                        </label>
                                                        <input type="text" placeholder="John Benjamin" name="dname" />
                                                        <p className="mt-2">This is how your Name will be Displayed in the Account Section and Reviews..</p>
                                                    </div>
                                                    <div className="col-12 input-group input-group-two mb-20">
                                                        <label>Email Address
          <span className="text-danger">*</span>
                                                        </label>
                                                        <input type="text" placeholder="abc@email.com" name="email" />
                                                    </div>
                                                    <div className="col-12 input-group input-group-two mb-20">
                                                        <label>Current Password(Leave Blank to Leave Unchanged)
        </label>
                                                        <input type="text" placeholder="Current Password" name="c-password" />
                                                    </div>
                                                    <div className="col-12 input-group input-group-two mb-20">
                                                        <label>New Password(Leave Blank to Leave Unchanged)
        </label>
                                                        <input type="text" placeholder="New Password" name="n-password" />
                                                    </div>
                                                    <div className="col-12 input-group input-group-two mb-20">
                                                        <label>Confirm New Password
        </label>
                                                        <input type="text" placeholder="Confirm Password" name="c-password" />
                                                    </div>
                                                </div>
                                                <button type="submit" className="main-btn btn-filled">Save Changes</button>
                                            </form>
                                        </div>

                                    </Tab.Pane>
                                </Tab.Content>
                            </div>
                        </div>
                    </div>
                </Tab.Container>
            </section>
        );
    }
}

export default Content;