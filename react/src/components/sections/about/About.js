import React from 'react';
import { Link } from 'react-router-dom';

import bullionimg from '../../../assets/img/text-block/bullion.png';

import goldimg from '../../../assets/img/bullion/gold.png';
import silverimg from '../../../assets/img/bullion/silver.png';
import platimg from '../../../assets/img/bullion/plat.png';

const featuresposts = [
    { icon: goldimg, title: 'Gold' },
    { icon: silverimg, title: 'Silver' },
    { icon: platimg, title: 'Platinum' },
];


function About() {
    return (
        <section className="about-section pt-115 pb-30">
            <div className="container">
                <div className="section-title about-title text-center">
                    <span className="title-tag">since <span>2022</span></span>
                    <h2>Precious Pricer is your #1 source for the best deals on all bullions.</h2>
                </div>
                <ul className="about-features">
                    {featuresposts.map((item,i) => (
                        <li key={i}>
                            <Link to="/">
                                <img src={item.icon} alt="images" />
                                <span className="title">{item.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <br/>
                <div className="section-title mb-80">
                    <span className="title-tag">About Us</span>
                    <h2>Created by bullion advocates, for bullion advocates.</h2>
                </div>
                <div className="about-text-box">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="about-text">
                                <h3>History and Future</h3>
                                <h5>
                                    PreciousPricer has been created by a group of students at the University of Western Ontario. We hope to develop this tool further in the future and have it deliver on the needs of bullion purchasers worldwide.
                                </h5>
                                <br/><hr/><br/>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-img">
                                <img src={bullionimg} alt="images" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-text">
                                <span>What Makes Us So Special?</span>
                                <h3>Advanced Price Filtering</h3>
                                <h5>
                                    With a catalog that updates daily, 
                                    we guarantee that you will find amazing prices for Gold, Platinum and Silver 
                                    wherever you are and whenever you need. 
                                </h5>
                            </div>
                        </div>
                        <div className="container">
                            <br/>
                            <div className = "text-center">
                                <h4>
                                    Our mission is to ensure that whoever wants bullions
                                    has access to finding the best price.
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default About;