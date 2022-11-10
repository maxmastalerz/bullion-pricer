import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../layouts/Blogsidebar';
import Pagination from '../../layouts/Pagination';

import img1 from '../../../assets/img/blog/01.jpg';
import img2 from '../../../assets/img/blog/02.jpg';
import img3 from '../../../assets/img/blog/03.jpg';
import img4 from '../../../assets/img/blog/06.jpg';
import author from '../../../assets/img/author-small.png';

class Content extends Component {
    render() {
        return (
            <section className="blog-section pt-120 pb-120">
                <div className="container">
                    <div className="row justify-content-center column-reverse">
                        <div className="col-lg-8 col-md-10">
                            <div className="blog-loop">
                                <div className="post-box mb-40">
                                    <div className="post-media">
                                        <img src={img1} alt="" />
                                    </div>
                                    <div className="post-desc">
                                        <Link to="/blog-detail" className="cat">Businese</Link>
                                        <h2>
                                            <Link to="/blog-detail">How to Shop For Jewelry When You Have a Metal Allergy.</Link>
                                        </h2>
                                        <ul className="post-meta">
                                            <li><Link to="/blog-detail"><i className="far fa-eye" />232 Views</Link>
                                            </li>
                                            <li><Link to="/blog-detail"><i className="far fa-comments" />35 Comments</Link>
                                            </li>
                                            <li><Link to="/blog-detail"><i className="far fa-calendar-alt" />24th March 2022</Link>
                                            </li>
                                        </ul>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
                                        <div className="post-footer">
                                            <div className="author">
                                                <Link to="/blog-detail">
                                                    <img src={author} alt="" />by Hetmayar</Link>
                                            </div>
                                            <div className="read-more"> <Link to="/blog-detail"><i className="far fa-arrow-right" />Read More</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-box with-video mb-40">
                                    <div className="post-media">
                                        <img src={img2} alt="" /> <Link to="/blog-detail" className="play-icon"><i className="fas fa-play" /></Link>
                                    </div>
                                    <div className="post-desc">
                                        <Link to="/blog-detail" className="cat">Businese</Link>
                                        <h2>
                                            <Link to="/blog-detail">Jewelry Time Periods: A Timeline of Jewelry Styles and Trends.</Link>
                                        </h2>
                                        <ul className="post-meta">
                                            <li><Link to="/blog-detail"><i className="far fa-eye" />232 Views</Link>
                                            </li>
                                            <li><Link to="/blog-detail"><i className="far fa-comments" />35 Comments</Link>
                                            </li>
                                            <li><Link to="/blog-detail"><i className="far fa-calendar-alt" />24th March 2022</Link>
                                            </li>
                                        </ul>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
                                        <div className="post-footer">
                                            <div className="author">
                                                <Link to="/blog-detail">
                                                    <img src={author} alt="" />by Hetmayar</Link>
                                            </div>
                                            <div className="read-more"> <Link to="/blog-detail"><i className="far fa-arrow-right" />Read More</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-box mb-40">
                                    <div className="post-media">
                                        <img src={img3} alt="" />
                                    </div>
                                    <div className="post-desc">
                                        <Link to="/blog-detail" className="cat">Businese</Link>
                                        <h2>
                                            <Link to="/blog-detail">Non-Diamond Gemstones for Engagement Rings. </Link>
                                        </h2>
                                        <ul className="post-meta">
                                            <li><Link to="/blog-detail"><i className="far fa-eye" />232 Views</Link>
                                            </li>
                                            <li><Link to="/blog-detail"><i className="far fa-comments" />35 Comments</Link>
                                            </li>
                                            <li><Link to="/blog-detail"><i className="far fa-calendar-alt" />24th March 2022</Link>
                                            </li>
                                        </ul>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
                                        <div className="post-footer">
                                            <div className="author">
                                                <Link to="/blog-detail">
                                                    <img src={author} alt="" />by Hetmayar</Link>
                                            </div>
                                            <div className="read-more"> <Link to="/blog-detail"><i className="far fa-arrow-right" />Read More</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-box sound-cloud-post mb-40">
                                    <div className="post-media">
                                        <img src={img4} alt="" />
                                    </div>
                                    <div className="post-desc">
                                        <Link to="/blog-detail" className="cat">Businese</Link>
                                        <h2>
                                            <Link to="/blog-detail">Non-Diamond Gemstones for Engagement Rings.</Link>
                                        </h2>
                                        <ul className="post-meta">
                                            <li><Link to="/blog-detail"><i className="far fa-eye" />232 Views</Link>
                                            </li>
                                            <li><Link to="/blog-detail"><i className="far fa-comments" />35 Comments</Link>
                                            </li>
                                            <li><Link to="/blog-detail"><i className="far fa-calendar-alt" />24th March 2022</Link>
                                            </li>
                                        </ul>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
                                        <div className="post-footer">
                                            <div className="author">
                                                <Link to="/blog-detail">
                                                    <img src={author} alt="" />by Hetmayar</Link>
                                            </div>
                                            <div className="read-more"> <Link to="/blog-detail"><i className="far fa-arrow-right" />Read More</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-box no-thumb mb-40">
                                    <div className="post-desc">
                                        <Link to="/blog-detail" className="cat">Businese</Link>
                                        <h2>
                                            <Link to="/blog-detail">Jewelry Time Periods: A Timeline of Jewelry Styles and Trends.</Link>
                                        </h2>
                                        <ul className="post-meta">
                                            <li><Link to="/blog-detail"><i className="far fa-eye" />232 Views</Link>
                                            </li>
                                            <li><Link to="/blog-detail"><i className="far fa-comments" />35 Comments</Link>
                                            </li>
                                            <li><Link to="/blog-detail"><i className="far fa-calendar-alt" />24th March 2022</Link>
                                            </li>
                                        </ul>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
                                        <div className="post-footer">
                                            <div className="author">
                                                <Link to="/blog-detail">
                                                    <img src={author} alt="" />by Hetmayar</Link>
                                            </div>
                                            <div className="read-more"> <Link to="/blog-detail"><i className="far fa-arrow-right" />Read More</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-box quote-post mb-40">
                                    <div className="post-desc">
                                        <h2>
                                            <Link to="/blog-detail">Non-Diamond Gemstones for Engagement Rings.</Link>
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
                                <div className="post-box title-with-thumb mb-40">
                                    <div className="post-desc">
                                        <Link to="/blog-detail" className="cat">Businese</Link>
                                        <h2>
                                            <Link to="/blog-detail">Culpa qui officia deserunt mollit animid est laborum. Sed ut perspiciatis</Link>
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
                            <div className="pagination-wrap mt-50">
                                <Pagination />
                            </div>
                        </div>
                        {/* Blog Sidebar */}
                        <div className="col-lg-4 col-md-8 col-sm-10">
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

export default Content;