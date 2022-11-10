import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../layouts/Blogsidebar';

import authorimg from "../../../assets/img/blog-details/author.jpg";

import commentuser1 from '../../../assets/img/blog-details/avatar-1.jpg';
import commentuser2 from '../../../assets/img/blog-details/avatar-2.jpg';
import commentuser3 from '../../../assets/img/blog-details/avatar-3.jpg';

import blogimg from '../../../assets/img/blog-details/01.jpg';
import blogauthor from '../../../assets/img/blog-details/02.jpg';
import blogicon from '../../../assets/img/blog-details/icon.png';


import img1 from '../../../assets/img/blog-details/03.jpg';
import img2 from '../../../assets/img/blog-details/04.jpg';


const relatedtags = [
    { tag: 'Rings' },
    { tag: 'desgin' },
    { tag: 'necklace' },
];
const blogsocials = [
    { icon: 'fa-facebook-f', url: '#' },
    { icon: 'fa-twitter', url: '#' },
    { icon: 'fa-medium', url: '#' },
    { icon: 'fa-google-plus-g', url: '#' },
    { icon: 'fa-tumblr', url: '#' },
];
const relatedposts = [
    { img: img1, title: 'Non-Diamond Gemstones for Engagement Rings', text: 'Lorem ipsum dolor sit amet, conse ctet ur adipisicing elit, sed doing.', postdate: '24th March 2022' },
    { img: img2, title: 'Non-Diamond Gemstones for Engagement Rings', text: 'Lorem ipsum dolor sit amet, conse ctet ur adipisicing elit, sed doing.', postdate: '24th March 2022' },
];

class Content extends Component {
    render() {
        return (
            <section className="blog-section pt-120 pb-120">
                <div className="container">
                    <div className="row justify-content-center column-reverse">
                        <div className="col-lg-8">
                            <div className="news-details-box">
                                <div className="entry-content">
                                    <Link to="/blog-detail" className="cat">Businese</Link>
                                    <h2 className="title">How to Shop For Jewelry When You Have a Metal Allergy. </h2>
                                    <ul className="post-meta">
                                        <li><Link to="/blog-detail"><i className="fal fa-user" />by Piklo D. Sindom</Link></li>
                                        <li><Link to="/blog-detail"><i className="fal fa-calendar-alt" />24th March 2022</Link></li>
                                        <li><Link to="/blog-detail"><i className="fal fa-comments" />35 Comments</Link></li>
                                    </ul>
                                    <p className="mb-30">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis
                                        iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                                        sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
                                        eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
            </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.
            </p>
                                    <figure className="mt-45 mb-45">
                                        <img src={blogimg} alt="" />
                                    </figure>
                                    <h3 className="subtitle"> How Are Colored Diamonds Formed?</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.
            </p>
                                    <div className="gap" />
                                    <h3 className="subtitle">Setting the mood with incense</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.
            </p>
                                    <div className="gap" />
                                    <h3 className="subtitle">Setting the mood with incense</h3>
                                    <ul className="list-icon">
                                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.</li>
                                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.</li>
                                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.</li>
                                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.</li>
                                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.</li>
                                    </ul>
                                    <blockquote className="mt-40 mb-40">
                                        <span className="quote-by">by Hetmayar</span> Viral dreamcatcher keytar typewriter, aest hetic offal umami. Aesthetic polaroid pug pitchfork post-ironic.
            </blockquote>
                                    <p className="mb-30">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis
                                        iste natus error sit voluptatem accusantium.
            </p>
                                    <div className="row align-items-center">
                                        <div className="col-md-5 mb-30">
                                            <img src={blogauthor} alt="" />
                                        </div>
                                        <div className="col-md-7 mb-30">
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                </p>
                                        </div>
                                    </div>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis
                                        iste natus error sit voluptatem.
            </p>
                                </div>
                                <div className="entry-footer">
                                    <div className="tag-and-share mt-50 mb-50 d-md-flex align-items-center justify-content-between">
                                        <div className="tag">
                                            <h5>Related Tags</h5>
                                            <ul>
                                                {relatedtags.map((item, i) => (
                                                    <li key={i}><Link to="/blog-detail">{item.tag}</Link></li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="share text-md-right">
                                            <h5>Social Share</h5>
                                            <ul>
                                                {blogsocials.map((item, i) => (
                                                    <li key={i}><Link to={item.url}><i className={"fab " + item.icon + ""} /></Link></li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="post-nav d-md-flex align-items-center justify-content-between">
                                        <div className="prev-post">
                                            <span>Prev Post</span>
                                            <Link to="/blog-detail">Diamond Is Investment </Link>
                                        </div>
                                        <span className="icon">
                                            <img src={blogicon} alt="icon" />
                                        </span>
                                        <div className="next-post text-right">
                                            <span>Next Post</span>
                                            <Link to="/blog-detail">Less Is More</Link>
                                        </div>
                                    </div>
                                    <div className="related-post mt-50">
                                        <h3 className="mb-30">Releted Post</h3>
                                        <div className="row">
                                            {relatedposts.map((item, i) => (
                                                <div key={i} className="col-md-6">
                                                    <div className="related-post-box mb-50">
                                                        <div className="thumb" style={{ backgroundImage: "url(" + item.img + ")" }}>
                                                        </div>
                                                        <div className="desc">
                                                            <Link to="/blog-detail" className="date"><i className="far fa-calendar-alt" />{item.postdate}</Link>
                                                            <h4><Link to="/blog-detail">{item.title}</Link></h4>
                                                            <p>{item.text}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="author-info-box mb-45">
                                        <div className="author-img">
                                            <img src={authorimg} alt="" />
                                        </div>
                                        <div className="info-text">
                                            <span>Written by</span>
                                            <h3>Rosalina D. William</h3>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation is enougn for today.
                </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-template">
                                    <h3 className="box-title">03 Comments</h3>
                                    <ul className="comments-list mb-100">
                                        <li>
                                            <div className="comment-img">
                                                <img src={commentuser1} alt="img" />
                                            </div>
                                            <div className="comment-desc">
                                                <div className="desc-top">
                                                    <h6>Rosalina Kelian</h6>
                                                    <span className="date">19th May 2022</span>
                                                    <Link to="/blog-detail" className="reply-link"><i className="far fa-reply" />Reply</Link>
                                                </div>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                                            </div>
                                            <ul className="children">
                                                <li>
                                                    <div className="comment-img">
                                                        <img src={commentuser2} alt="img" />
                                                    </div>
                                                    <div className="comment-desc">
                                                        <div className="desc-top">
                                                            <h6>Rosalina Kelian</h6>
                                                            <span className="date">19th May 2022</span>
                                                            <Link to="/blog-detail" className="reply-link"><i className="far fa-reply" />Reply</Link>
                                                        </div>
                                                        <p>
                                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <div className="comment-img">
                                                <img src={commentuser3} alt="img" />
                                            </div>
                                            <div className="comment-desc">
                                                <div className="desc-top">
                                                    <h6>Rosalina Kelian</h6>
                                                    <span className="date">19th May 2022</span>
                                                    <Link to="/blog-detail" className="reply-link"><i className="far fa-reply" />Reply</Link>
                                                </div>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                                            </div>
                                        </li>
                                    </ul>
                                    <h3 className="box-title">Post Comment</h3>
                                    <div className="comment-form">
                                        <form action="#">
                                            <div className="input-group input-group-two textarea mb-20">
                                                <textarea placeholder="Type your comments...." />
                                                <div className="icon"><i className="fas fa-pen" /></div>
                                            </div>
                                            <div className="input-group input-group-two mb-20">
                                                <input type="text" placeholder="Type your Name...." />
                                                <div className="icon"><i className="fas fa-user" /></div>
                                            </div>
                                            <div className="input-group input-group-two mb-20">
                                                <input type="email" placeholder="Type your email...." />
                                                <div className="icon"><i className="fas fa-envelope" /></div>
                                            </div>
                                            <div className="input-group input-group-two mb-20">
                                                <input type="url" placeholder="Type your Website...." />
                                                <div className="icon"><i className="fas fa-globe" /></div>
                                            </div>
                                            <div className="input-group  mt-30">
                                                <button type="submit" className="main-btn btn-filled"><i className="far fa-comments" /> Post
                    Comment</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
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