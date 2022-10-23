import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 

const ctafeatures = [
    { icon: 'flaticon-necklace', title: 'Online Jewelry To Your Door', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', number: '01' },
    { icon: 'flaticon-like', title: 'Great User Feedback', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', number: '02' },
    { icon: 'flaticon-headphones', title: 'Available For Support', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
];
class Cta extends Component {
    render() {
        return (
            <section className="pt-201 section cta-section dark-bg">
                <div className="container">
                    <div className="cta-inner">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-8 col-sm-9 col-10 order-2 order-lg-1">
                                <div className="cta-text">
                                    <div className="section-title mb-20">
                                        <span className="title-tag">get everything online</span>
                                        <h2>The Royal Design</h2>
                                    </div>
                                    <p>Get all jewelry on online store , visit us today</p>
                                    <Link to="/about" className="main-btn btn-filled">Explore Jewels</Link>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-10 col-sm-11 col-10 order-1 order-lg-2">
                                {/* feature loop */}
                                <div className="cta-features">
                                    {/* feature box */}
                                    {ctafeatures.map((item, i) => (
                                        <div key={i} className="single-feature wow fadeInUp">
                                            <div className="icon"> <i className={item.icon} />
                                            </div>
                                            <div className="cta-desc">
                                                <h3><Link to="#">{item.title}</Link></h3>
                                                <p>{item.text}</p>
                                                <span className="count">{item.number}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Cta;