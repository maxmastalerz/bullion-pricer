import React, { Fragment, useRef } from 'react';
import Backtotop from './Backtotop';

const Footer = () => {
    const emailAddressRef = useRef();

    const subscribeToNewsletter = (e) => {
        e.preventDefault();

        fetch('/api/subscribeToNewsletter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ emailAddress: emailAddressRef.current.value })
        })
        .then((response) => response.json())
        .then((results) => {
            emailAddressRef.current.value = "";
            if(results.error) {
                alert(results.error.message);
            } else if(results.data) {
                alert(results.data.message);
            }
        });
    };

    return (
        <Fragment>
            <Backtotop />
            <footer>
                <div className="footer-subscibe-area pb-45">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="subscribe-text text-center">
                                    <div className="footer-logo mt-45">
                                    </div>
                                    <p>
                                        Looking for the latest info on the market or special offers?<br/>Subscribe to our newsletter for a chance to win a 5 oz silver bar. Prizes are drawn quarterly.
                                    </p>
                                    <form onSubmit={subscribeToNewsletter} className="subscribe-form mt-50">
                                        <input type="email" placeholder="Enter your email address" ref={emailAddressRef} />
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
                                <p className="copyright-text">©{new Date().getFullYear()} bullionpricer.com</p>
                            </div>
                            <div className="col-md-7 order-1 order-md-2">
                                <div className="social-links">
                                    <a href="https://instagram.com/BullionPricer" target="_blank" rel="noreferrer"><i className="fab fa-instagram" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    );
}

export default Footer;