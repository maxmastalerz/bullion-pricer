import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import img1 from '../../../assets/img/recent-post-wid/04.png';
import img2 from '../../../assets/img/recent-post-wid/05.png';
import img3 from '../../../assets/img/recent-post-wid/06.png';

// Popular feeds
const popularfeeds = [
    { img: img1, title: 'How Are Colored Diamonds Formed?', postdate: '24th March 2022' },
    { img: img2, title: 'How Are Colored Diamonds Formed?', postdate: '24th March 2022' },
    { img: img3, title: 'How Are Colored Diamonds Formed?', postdate: '24th March 2022' },
];
// Categories
const categories = [
    { title: 'Bracelets', numberofpost: '26' },
    { title: 'Rings', numberofpost: '26' },
    { title: 'Silver Bracelet', numberofpost: '26' },
    { title: 'Necklace', numberofpost: '26' },
    { title: 'Earrings', numberofpost: '26' },
];

class Content extends Component {
    render() {
        return (
            <section className="legal-section pt-115 pb-115">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="legal-wrapper">
                                <div className="legal-content">
                                    <h3>Who Are We</h3>
                                    <p>Our website is: https://themeforest.net/user/metropolitantheme</p>
                                </div>
                                <div className="legal-content">
                                    <h3>Privacy Policy</h3>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries</p>
                                </div>
                                <div className="legal-content">
                                    <h3>Cookie Policy</h3>
                                    <p className="mb-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries</p>
                                    <p>but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum</p>
                                </div>
                                <div className="legal-content">
                                    <h3>Order Policy</h3>
                                    <p className="mb-3">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use
              a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text</p>
                                    <p className="mb-3">All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model
              sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use
              a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text</p>
                                </div>
                                <div className="legal-content">
                                    <h3>Analytics</h3>
                                    <p className="mb-3">All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model
              sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use
              a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text</p>
                                </div>
                                <div className="legal-content">
                                    <h3>How Do We Store Your Data</h3>
                                    <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model
              sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="sidebar mb-0">
                                {/* Search Widget */}
                                <div className="widget search-widget mb-40">
                                    <h5 className="widget-title">Search Objects</h5>
                                    <form action="#">
                                        <input type="text" placeholder="Search your keyword..." />
                                        <button type="submit"><i className="far fa-search" /></button>
                                    </form>
                                </div>
                                {/* Popular Post Widget */}
                                <div className="widget popular-feeds mb-40">
                                    <h5 className="widget-title">Popular Feeds</h5>
                                    <div className="popular-feed-loop">
                                        {popularfeeds.map((item, i) => (
                                            <div key={i} className="single-popular-feed">
                                                <div className="feed-img">
                                                    <img src={item.img} alt="" />
                                                </div>
                                                <div className="feed-desc">
                                                    <h6><Link to="#">{item.title}</Link></h6>
                                                    <span className="time"><i className="far fa-calendar-alt" /> {item.postdate}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Categories Widget */}
                                <div className="widget categories-widget mb-40">
                                    <h5 className="widget-title">Categories</h5>
                                    <ul>
                                        {categories.map((item, i) => (
                                            <li key={i}>
                                                <Link to="#">{item.title}<span>{item.numberofpost}</span></Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* Social Icon Widget */}
                                <div className="widget socail-widget">
                                    <h5 className="widget-title">Never Miss News</h5>
                                    <ul>
                                        <li><Link to="#"><i className="fab fa-facebook-f" /></Link></li>
                                        <li><Link to="#"><i className="fab fa-twitter" /></Link></li>
                                        <li><Link to="#"><i className="fab fa-behance" /></Link></li>
                                        <li><Link to="#"><i className="fab fa-linkedin" /></Link></li>
                                        <li><Link to="#"><i className="fab fa-pinterest" /></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

export default Content;