import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Videobg from '../../../assets/img/text-block/03.jpg';

class Cta extends Component {
    render() {
        return (
            <section className="text-block bg-black with-pattern pt-115 pb-115">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-6 col-md-10 order-2 order-lg-1">
                            <div className="block-text">
                                <div className="section-title mb-20">
                                    <span className="title-tag">design video</span>
                                    <h2>Have a look on medern design jewelry </h2>
                                </div>
                                <p className="pr-50">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
            you have to understand this.</p>
                                <Link to="/contact" className="main-btn btn-filled mt-40">See More</Link>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-10 order-1 order-lg-2 wow fadeInRight" data-wow-delay=".3s">
                            <div className="video-wrap video-wrap-two mb-small" style={{ backgroundImage: "url("+ Videobg +")" }}> <Link to="http://www.youtube.com/embed/watch?v=EEJFMdfraVY" className="popup-video"><i className="fas fa-play" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pattern-wrap">
                    <div className="pattern" />
                </div>
            </section>
        );
    }
}

export default Cta;