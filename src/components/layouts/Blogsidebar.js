import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Author img 
import authorimg from '../../assets/img/author.png';
// Adv
import advbanner from '../../assets/img/banner-widget.jpg';

import feed1 from '../../assets/img/recent-post-wid/04.png';
import feed2 from '../../assets/img/recent-post-wid/05.png';
import feed3 from '../../assets/img/recent-post-wid/06.png';

import insta1 from '../../assets/img/instagram-wid/01.jpg';
import insta2 from '../../assets/img/instagram-wid/02.jpg';
import insta3 from '../../assets/img/instagram-wid/03.jpg';
import insta4 from '../../assets/img/instagram-wid/04.jpg';
import insta5 from '../../assets/img/instagram-wid/05.jpg';
import insta6 from '../../assets/img/instagram-wid/06.jpg';
import insta7 from '../../assets/img/instagram-wid/07.jpg';
import insta8 from '../../assets/img/instagram-wid/08.jpg';
import insta9 from '../../assets/img/instagram-wid/09.jpg';
// Popular feeds
const popularfeeds = [
    { img: feed1, title: 'How Are Colored Diamonds Formed?', postdate: '24th March 2022' },
    { img: feed2, title: 'How Are Colored Diamonds Formed?', postdate: '24th March 2022' },
    { img: feed3, title: 'How Are Colored Diamonds Formed?', postdate: '24th March 2022' },
];
// Categories
const categories = [
    { title: 'Bracelets', numberofpost: '26' },
    { title: 'Rings', numberofpost: '26' },
    { title: 'Silver Bracelet', numberofpost: '26' },
    { title: 'Necklace', numberofpost: '26' },
    { title: 'Earrings', numberofpost: '26' },
];
// Twitter Feeds
const twitterfeeds = [
    { tweet: 'Rescue - #Gutenberg ready @ wordpress Theme for Silver Bracelet Bloggers available on @ ThemeForest https://t.co/2r1POjOjgVC… https://t.co/rDAnPyClu1', tweetdate: 'September 12, 2022' },
    { tweet: 'Rescue - #Gutenberg ready @ wordpress Theme for Silver Bracelet Bloggers available on @ ThemeForest https://t.co/2r1POjOjgVC… https://t.co/rDAnPyClu1', tweetdate: 'September 12, 2022' },
    { tweet: 'Rescue - #Gutenberg ready @ wordpress Theme for Silver Bracelet Bloggers available on @ ThemeForest https://t.co/2r1POjOjgVC… https://t.co/rDAnPyClu1', tweetdate: 'September 12, 2022' },
];
// Instagram Feeds
const instafeeds = [
    { img: insta1 },
    { img: insta2 },
    { img: insta3 },
    { img: insta4 },
    { img: insta5 },
    { img: insta6 },
    { img: insta7 },
    { img: insta8 },
    { img: insta9 },
];
// Popular Tags
const tags = [
    { title: 'Rings' },
    { title: 'earrings' },
    { title: 'necklace' },
    { title: 'bracelets' },
    { title: 'wedding ring' },
    { title: 'bangles' },
    { title: 'hard ring' },
    { title: 'ankle bracelet' },
    { title: 'silver bracelet' },
    { title: 'earring' },
    { title: 'copper bracelet' },
    { title: 'tech' },
];
class Blogsidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                {/* About Author Widget */}
                <div className="widget about-author-widget mb-40">
                    <h5 className="widget-title">About Me</h5>
                    <div className="author-box">
                        <img src={authorimg} alt="author" />
                        <h6>Rosalina D. Willaimson</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                        <ul className="social-icon">
                            <li><Link to="#"><i className="fab fa-facebook-f" /></Link></li>
                            <li><Link to="#"><i className="fab fa-twitter" /></Link></li>
                            <li><Link to="#"><i className="fab fa-behance" /></Link></li>
                            <li><Link to="#"><i className="fab fa-linkedin" /></Link></li>
                            <li><Link to="#"><i className="fab fa-youtube" /></Link></li>
                        </ul>
                    </div>
                </div>
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
                                    <h6><Link to="/blog-detail">{item.title}</Link></h6>
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
                                <Link to="/blog-detail">{item.title}<span>{item.numberofpost}</span></Link>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Social Icon Widget */}
                <div className="widget socail-widget mb-40">
                    <h5 className="widget-title">Never Miss News</h5>
                    <ul>
                        <li><Link to="#"><i className="fab fa-facebook-f" /></Link></li>
                        <li><Link to="#"><i className="fab fa-twitter" /></Link></li>
                        <li><Link to="#"><i className="fab fa-behance" /></Link></li>
                        <li><Link to="#"><i className="fab fa-linkedin" /></Link></li>
                        <li><Link to="#"><i className="fab fa-pinterest" /></Link></li>
                    </ul>
                </div>
                {/* Twitter Feeds Widget */}
                <div className="widget twitter-feed-widget mb-40">
                    <h5 className="widget-title">Twitter Feeds</h5>
                    <div className="twitter-looop">
                        {twitterfeeds.map((item, i) => (
                            <div key={i} className="single-twitter">
                                <Link to="/blog-detail">
                                    {item.tweet}
                                </Link>
                                <span className="date">{item.tweetdate}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Instagram Feeds Widget */}
                <div className="widget instagram-feed-widget mb-40">
                    <h5 className="widget-title">Instagram Feeds</h5>
                    <ul>
                        {instafeeds.map((item, i) => (
                            <li key={i}><img src={item.img} alt="" /></li>
                        ))}
                    </ul>
                </div>
                {/* Popular Tags Widget */}
                <div className="widget popular-tag-widget mb-40">
                    <h5 className="widget-title">Popular Tags</h5>
                    <ul>
                        {tags.map((item, i) => (
                            <li key={i}><Link to="/blog-detail">{item.title}</Link></li>
                        ))}
                    </ul>
                </div>
                {/* Banner Ad Widget */}
                <div className="widget banner-ad-widget">
                    <img src={advbanner} alt="" />
                </div>
            </div>

        );
    }
}

export default Blogsidebar;