import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Backtotop from './Backtotop';

class Footer extends Component {
    render() {
        return (
            <Fragment>
                <Backtotop />
                <footer>
                    <div className="footer-subscibe-area pt-120 pb-120">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    <div className="subscribe-text text-center">
                                        <div className="footer-logo mb-45">
                                        </div>
                                        <p>
                                            Looking for the latest info on the market or special offers. Subscribe to our newsletter for a chance to win a 5oz silver bar. Prizes are drawn monthly.
                                        </p>
                                        <form action="#" className="subscribe-form mt-50">
                                            <input type="email" placeholder="Enter your email address" />
                                            <button type="submit">subscribe</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="copyright-area pt-20 pb-20">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-md-5 order-2 order-md-1">
                                    <p className="copyright-text">©{new Date().getFullYear()} preciouspricer.com</p>
                                </div>
                                <div className="col-md-7 order-1 order-md-2">
                                    <div className="social-links">
                                        <Link to="#"><i className="fab fa-facebook-f" /></Link>
                                        <Link to="#"><i className="fab fa-twitter" /></Link>
                                        <Link to="#"><i className="fab fa-instagram" /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </Fragment>
        );
    }
}

export default Footer;