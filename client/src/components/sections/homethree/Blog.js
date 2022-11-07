import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import postimg from '../../../assets/img/latest-post/03.jpg';

class Blog extends Component {
    render() {
        return (
            <div className="section latest-news pb-90">
                <div className="spacer dark-bg" />
                <div className="container">
                    {/* Latest post loop */}
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="post-box quote-post mt-30">
                                <div className="post-desc">
                                    <h2>
                                        <Link to="/blog-detail">Excepteur sint occaecat cupida
                tat non proident, sunt in.</Link>
                                    </h2>
                                    <ul className="post-meta">
                                        <li><Link to="/blog-detail"><i className="far fa-eye" />232 Views</Link>
                                        </li>
                                        <li><Link to="/blog-detail"><i className="far fa-comments" />35 Comments</Link>
                                        </li>
                                        <li><Link to="/blog-detail"><i className="far fa-calendar-alt" />24th March 2022</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="post-box title-with-thumb mt-30">
                                <div className="post-desc">
                                    <Link to="/blog-detail" className="cat">Businese</Link>
                                    <h2>
                                        <Link to="/blog-detail">Culpa qui officia deserunt mollit anim
                id est laborum. Sed ut perspiciatis</Link>
                                    </h2>
                                    <ul className="post-meta">
                                        <li><Link to="/blog-detail"><i className="far fa-eye" />232 Views</Link>
                                        </li>
                                        <li><Link to="/blog-detail"><i className="far fa-comments" />35 Comments</Link>
                                        </li>
                                        <li><Link to="/blog-detail"><i className="far fa-calendar-alt" />24th March 2022</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="latest-post-box mt-30">
                                <div className="post-img" style={{ backgroundImage: "url("+ postimg +")" }} />
                                <div className="post-desc">
                                    <ul className="post-meta">
                                        <li> <Link to="/blog-detail"><i className="fal fa-calendar-alt" />28th Aug 2022</Link>
                                        </li>
                                        <li> <Link to="/blog-detail"><i className="fal fa-user" />By Admin</Link>
                                        </li>
                                    </ul>
                                    <h4><Link to="/blog-detail">We provide you with top notch Jewelry Products</Link></h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Blog;