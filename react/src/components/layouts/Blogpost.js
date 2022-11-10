import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import img1 from '../../assets/img/latest-post/01.jpg';
import img2 from '../../assets/img/latest-post/02.jpg';
import img3 from '../../assets/img/latest-post/03.jpg';

const blogposts = [
    { img: img1, title: 'New Retro Collection of Pendants and Ring sets.', postdate: '28th Aug 2022', authorname: 'Admin', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.' },
    { img: img2, title: 'Special Wedding Rings Sets for Him and for Her.', postdate: '28th Aug 2022', authorname: 'Admin', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.' },
    { img: img3, title: 'Matching Jewellery Sets with your Outwear.', postdate: '28th Aug 2022', authorname: 'Admin', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.' },
    { img: img1, title: 'New Retro Collection of Pendants and Ring sets.', postdate: '28th Aug 2022', authorname: 'Admin', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.' },
    { img: img2, title: 'Special Wedding Rings Sets for Him and for Her.', postdate: '28th Aug 2022', authorname: 'Admin', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.' },
    { img: img3, title: 'Matching Jewellery Sets with your Outwear.', postdate: '28th Aug 2022', authorname: 'Admin', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.' },
];
class Blogpost extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }
    render() {
        const settings = {
            slidesToShow: 3,
            slidesToScroll: 1,
            fade: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 4000,
            arrows: false,
            dots: false,
            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                },
            },
            ],
        }
        return (
            <section className="latest-news pt-115 pb-115">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-8 col-sm-7">
                            <div className="section-title">
                                <span className="title-tag">Blog</span>
                                <h2>News Feeds</h2>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-4 col-sm-5 d-none d-sm-block">
                            <div className="latest-post-arrow arrow-style text-right">
                                <div className="slick-arrow prev-arrow" onClick={this.previous}><i className="fal fa-arrow-left" /></div>
                                <div className="slick-arrow next-arrow" onClick={this.next}><i className="fal fa-arrow-right" /></div>
                            </div>
                        </div>
                    </div>
                    {/* Latest post loop */}
                    <Slider className="row latest-post-slider mt-80" ref={c => (this.slider = c)} {...settings}>
                        {blogposts.map((item, i) => (
                            <div key={i} className="col-lg-12">
                                <div className="latest-post-box">
                                    <div className="post-img" style={{ backgroundImage: "url(" + item.img + ")" }} />
                                    <div className="post-desc">
                                        <ul className="post-meta">
                                            <li>
                                                <Link to="#"><i className="fal fa-calendar-alt" />{item.postdate}</Link>
                                            </li>
                                            <li>
                                                <Link to="#"><i className="fal fa-user" />By {item.authorname}</Link>
                                            </li>
                                        </ul>
                                        <h4><Link to="/blog-detail">{item.title}</Link></h4>
                                        <p>
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>

        );
    }
}

export default Blogpost;