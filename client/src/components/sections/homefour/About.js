import React, { Component } from 'react';
import $ from 'jquery';

import aboutimg1 from '../../../assets/img/bg/about-1.png';
import aboutimg2 from '../../../assets/img/bg/about-2.png';

class About extends Component {
    componentDidMount() {
        function parallaxscroll() {
            $(document).ready(function () {
                //parallax scroll
                $(window).on("scroll", function () {
                    var parallaxElement = $(".parallax_scroll_up"),
                        parallaxQuantity = parallaxElement.length;
                    window.requestAnimationFrame(function () {
                        for (var i = 0; i < parallaxQuantity; i++) {
                            var currentElement = parallaxElement.eq(i),
                                windowTop = $(window).scrollTop(),
                                elementTop = currentElement.offset().top,
                                elementHeight = currentElement.height(),
                                viewPortHeight = window.innerHeight * 0.5 - elementHeight * 0.5,
                                scrolled = windowTop - elementTop + viewPortHeight;
                            currentElement.css({
                                transform: "translate3d(0," + scrolled * -0.25 + "px, 0)"
                            });
                        }
                    });
                    var parallaxElement2 = $(".parallax_scroll_down"),
                        parallaxQuantity2 = parallaxElement2.length;
                    window.requestAnimationFrame(function () {
                        for (var i = 0; i < parallaxQuantity2; i++) {
                            var currentElement2 = parallaxElement2.eq(i),
                                windowTop = $(window).scrollTop(),
                                elementTop = currentElement2.offset().top,
                                elementHeight = currentElement2.height(),
                                viewPortHeight = window.innerHeight * 0.5 - elementHeight * 0.5,
                                scrolled = windowTop - elementTop + viewPortHeight;
                            currentElement2.css({
                                transform: "translate3d(0," + scrolled * 0.05 + "px, 0)"
                            });
                        }
                    });
                });
            });
        }
        parallaxscroll();
    }
    render() {
        return (
            <section className="about-section style-2 pt-115 pb-115">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 wow fadeInLeft parallax_scroll_down" data-wow-delay=".3s">
                            <img src={aboutimg1} className="img-fluid" alt="img" />
                            <p className="mt-20">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                        <div className="col-lg-6 wow fadeInRight parallax_scroll_up" data-wow-delay=".3s">
                            <div className="abour-text mt-100">
                                <div className="section-title mb-30">
                                    <span className="title-tag">about us</span>
                                    <h2>Generations In Jewels</h2>
                                </div>
                                <p className="mb-20">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <img src={aboutimg2} alt="img" />
                                <p className="mt-20">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
                                electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

export default About;