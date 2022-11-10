import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <div className="section about-style-2 pt-80 pb-50">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="about-text-descr">
                                <p className="text-white mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="section-title-wrap section-header">
                                <h5 className="custom-primary">About Us</h5>
                                <h2 className="title text-white">We have experience more than 30 years </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;