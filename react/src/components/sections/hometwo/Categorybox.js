import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import catimg1 from '../../../assets/img/others/pr-1.png';
import catimg2 from '../../../assets/img/others/pr-2.png';
import catimg3 from '../../../assets/img/others/pr-3.png';
import catimg4 from '../../../assets/img/others/pr-4.png';

class Categorybox extends Component {
    render() {
        return (
            <div className="category-box-sec pb-155 bg-black">
                <div className="container-fluid p-0">
                    <div className="row no-gutters">
                        <div className="col-lg-6">
                            <div className="category-box-wrap">
                                <div className="category-box-image">
                                    <img src={catimg1} alt="img" />
                                </div>
                                <div className="category-box-content">
                                    <div className="content text-center">
                                        <h3 className="title"><Link to="/shop-left">Diamond’s Haven</Link></h3>
                                        <Link to="/shop-left" className="main-btn btn-filled">View Details</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="category-box-wrap">
                                <div className="category-box-image">
                                    <img src={catimg2} alt="img" />
                                </div>
                                <div className="category-box-content">
                                    <div className="content text-center">
                                        <h3 className="title"><Link to="/shop-left">Best Summer Sale</Link></h3>
                                        <Link to="/shop-left" className="main-btn btn-filled">View Details</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="category-box-wrap">
                                <div className="category-box-content">
                                    <div className="content text-center">
                                        <h3 className="title"><Link to="/shop-left">Necklaces</Link></h3>
                                        <Link to="/shop-left" className="main-btn btn-filled">View Details</Link>
                                    </div>
                                </div>
                                <div className="category-box-image">
                                    <img src={catimg3} alt="img" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="category-box-wrap">
                                <div className="category-box-content">
                                    <div className="content text-center">
                                        <h3 className="title"><Link to="/shop-left">Diamond Chain</Link></h3>
                                        <Link to="/shop-left" className="main-btn btn-filled">View Details</Link>
                                    </div>
                                </div>
                                <div className="category-box-image">
                                    <img src={catimg4} alt="img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Categorybox;