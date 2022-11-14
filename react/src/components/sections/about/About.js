import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import aboutimg from '../../../assets/img/text-block/05.jpg';

const featuresposts = [
    { icon: 'flaticon-ring', title: 'Diamond Ring' },
    { icon: 'flaticon-bracelet', title: 'Bracelets' },
    { icon: 'flaticon-necklace', title: 'Necklaces' },
    { icon: 'flaticon-bracelet-2', title: 'Pendants' },
    { icon: 'flaticon-earrings', title: 'Earrings' },
];
class About extends Component {
    render() {
        return (
            <section className="about-section pt-115 pb-115">
                <div className="container">
                    <div className="section-title about-title text-center">
                        <span className="title-tag">since <span>1994</span></span>
                        <h2>Hello. Our store has been present for over 30 years . We give assurance to all customers.</h2>
                    </div>
                    <ul className="about-features">
                        {featuresposts.map((item,i) => (
                        <li key={i}>
                            <Link to="#">
                                <i className={item.icon} />
                                <i className={"hover-icon "+ item.icon +""} />
                                <span className="title">{item.title}</span>
                            </Link>
                        </li>
                        ))}
                    </ul>
                    <div className="about-text-box">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="about-img">
                                    <img src={aboutimg} alt="images" />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="about-text">
                                    <span>Get 50 % Off</span>
                                    <h3>Get All Gold Jewelry At 50 Percent, Grab It Now </h3>
                                    <p className="mb-4">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tem por incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. </p>
                                    <h3>Get All Gold Jewelry At 50 Percent, Grab It Now </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        );
    }
}

export default About;