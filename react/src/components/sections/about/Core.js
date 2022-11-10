import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Core extends Component {
    render() {
        return (
            <section className="core-feature-section bg-black pt-115 pb-115">
                <div className="container">
                    <div className="section-title white-color text-center mb-50">
                        <div className="section-title-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width={45} height={45} x={0} y={0} viewBox="0 0 512 512" xmlSpace="preserve">
                                <path d="M369.853,250.251l-100-241C267.53,3.65,262.062,0,255.999,0s-11.531,3.65-13.854,9.251l-100,241    c-1.527,3.681-1.527,7.817,0,11.498l100,241c2.323,5.601,7.791,9.251,13.854,9.251s11.531-3.65,13.854-9.251l100-241    C371.381,258.068,371.381,253.932,369.853,250.251z M255.999,457.861L172.239,256l83.76-201.861L339.759,256L255.999,457.861z" fill="#ffffff" />
                                <path className="diamond-spark spark-1" d="M139.606,118.393l-63-63c-5.858-5.857-15.356-5.857-21.213,0c-5.858,5.858-5.858,15.356,0,21.213l63,63    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394C145.465,133.748,145.465,124.25,139.606,118.393z" fill="#ffffff" />
                                <path className="diamond-spark spark-2" d="M456.607,55.393c-5.858-5.857-15.356-5.857-21.213,0l-63,63c-5.858,5.858-5.858,15.356,0,21.213    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394l63-63C462.465,70.748,462.465,61.25,456.607,55.393z" fill="#ffffff" />
                                <path className="diamond-spark spark-3" d="M139.606,372.393c-5.858-5.857-15.356-5.857-21.213,0l-63,63c-5.858,5.858-5.858,15.356,0,21.213    C58.322,459.535,62.16,461,65.999,461s7.678-1.465,10.607-4.394l63-63C145.465,387.748,145.465,378.25,139.606,372.393z" fill="#ffffff" />
                                <path className="diamond-spark spark-4" d="M456.607,435.393l-63-63c-5.858-5.857-15.356-5.857-21.213,0c-5.858,5.858-5.858,15.356,0,21.213l63,63    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394C462.465,450.748,462.465,441.25,456.607,435.393z" fill="#ffffff" />
                            </svg>
                        </div>
                        <span className="title-tag"> avail our offer </span>
                        <h2>Our Best Feature </h2>
                    </div>
                    {/* Featre Loop */}
                    <div className="row features-loop">
                        <div className="col-lg-4 col-sm-6 order-1">
                            <div className="feature-box dark-box wow fadeInLeft" data-wow-delay=".3s">
                                <span className="count">01</span>
                                <h3><Link to="#">Get On Offer Price</Link></h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna..
                                </p>
                                <div className="icon">
                                    <i className="flaticon-rating" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 order-2">
                            <div className="feature-box dark-box wow fadeInDown" data-wow-delay=".4s">
                                <span className="count">02</span>
                                <h3><Link to="#">Quiet Hours Offer</Link></h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna..
                                </p>
                                <div className="icon">
                                    <i className="flaticon-clock" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 order-3 order-sm-4 order-lg-3">
                            <div className="feature-box dark-box wow fadeInRight" data-wow-delay=".5s">
                                <span className="count">03</span>
                                <h3><Link to="#">Assured Quality</Link></h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna..
                                </p>
                                <div className="icon">
                                    <i className="flaticon-location-pin" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 order-4 order-sm-3 order-lg-4">
                            <div className="feature-box dark-box wow fadeInLeft" data-wow-delay=".6s">
                                <span className="count">04</span>
                                <h3><Link to="#">Free Cancellation</Link></h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna..
                                </p>
                                <div className="icon">
                                    <i className="flaticon-clock-1" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 order-5">
                            <div className="feature-box dark-box wow fadeInUp" data-wow-delay=".7s">
                                <span className="count">05</span>
                                <h3><Link to="#">Payment Options</Link></h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna..
                                </p>
                                <div className="icon">
                                    <i className="flaticon-credit-card" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 order-6">
                            <div className="feature-box dark-box wow fadeInRight" data-wow-delay=".8s">
                                <span className="count">06</span>
                                <h3><Link to="#">Online Special Offers</Link></h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna..
                                </p>
                                <div className="icon">
                                    <i className="flaticon-discount" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Core;