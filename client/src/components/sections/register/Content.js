import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import registerbg from "../../../assets/img/login.png";

class Content extends Component {
    render() {
        return (
            <section className="login-sec pt-120 pb-120">
                <div className="container">
                    <div className="account-wrapper">
                        <div className="row no-gutters">
                            <div className="col-lg-6">
                                <div className="login-content" style={{ backgroundImage: "url(" + registerbg + ")" }}>
                                    <div className="description text-center">
                                        <h2>Hello World!</h2>
                                        <p className="text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="login-form">
                                    <h2>Sign Up</h2>
                                    <form method="post">
                                        <div className="input-group input-group-two mb-20">
                                            <input type="text" placeholder="Username" name="username" />
                                        </div>
                                        <div className="input-group input-group-two mb-20">
                                            <input type="email" placeholder="Email Address" name="email" />
                                        </div>
                                        <div className="input-group input-group-two mb-30">
                                            <input type="password" placeholder="Password" name="password" />
                                        </div>
                                        <Link to="#">Forgot Password?</Link>
                                        <button type="submit" className="main-btn btn-filled mt-20 login-btn">Signup</button>
                                        <div className="form-seperator">
                                            <span>OR</span>
                                        </div>
                                        <div className="social-buttons">
                                            <button type="button" className="main-btn btn-border facebook mb-20">
                                                <i className="fab fa-facebook-f" />
                  Continue with Facebook
                </button>
                                            <button type="button" className="main-btn btn-filled mb-30">
                                                <i className="fab fa-google" />
                  Continue with Google
                </button>
                                        </div>
                                        <p>Already have an Account?
                                        <Link to="/login" className="d-inline-block">Login</Link>
                                        </p>
                                    </form>
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