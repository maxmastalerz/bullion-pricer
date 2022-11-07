import React, { Component } from 'react';

class Newsletter extends Component {
    render() {
        return (
            <div className="Subscribe-map-sec">
                <div className="footer-subscibe-area style-2 pt-50 pb-50">
                    <div className="container">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-lg-3">
                                <div className="subscribe">
                                    <h3 className="mb-0 text-white">Subscribe</h3>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="subscribe-text">
                                    <form action="#" className="subscribe-form">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-4">
                                                <input type="text" placeholder="Your name" />
                                            </div>
                                            <div className="col-lg-5 col-md-5">
                                                <input type="email" placeholder="Your email" />
                                            </div>
                                            <div className="col-lg-3 col-md-3">
                                                <button type="submit" className="main-btn btn-filled btn-block">subscribe</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Newsletter;