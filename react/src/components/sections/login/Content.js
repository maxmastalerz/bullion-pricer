import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import loginbg from '../../../assets/img/login.png';

class Content extends Component {
    render() {
        return (
            <section className="login-sec pt-120 pb-120">
                <div className="container">
                    <div className="account-wrapper">
                        <div className="row no-gutters">
                            <div className="col-lg-6">
                                <div className="login-content" style={{ backgroundImage: "url(" + loginbg + ")" }}>
                                    <div className="description text-center">
                                        <h2>Welcome Back!</h2>
                                        <p className="text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="login-form">
                                    <h2>Log in</h2>
                                    <form method="post">
                                        <div className="input-group input-group-two mb-20">
                                            <input type="text" placeholder="Username" name="username" />
                                        </div>
                                        <div className="input-group input-group-two mb-30">
                                            <input type="password" placeholder="Password" name="username" />
                                        </div>
                                        <Link to="#">Forgot Password?</Link>
                                        <button type="submit" className="main-btn btn-filled mt-20 login-btn">Login</button>
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
                                        <p>Don't have an Account?
                <Link to="/register" className="d-inline-block">Create One</Link>
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