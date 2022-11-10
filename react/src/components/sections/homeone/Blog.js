import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import img1 from '../../../assets/img/blog/blog-1.png';
import img2 from '../../../assets/img/blog/blog-2.png';
import img3 from '../../../assets/img/blog/blog-3.png';
import img4 from '../../../assets/img/blog/blog-4.png';

const blogposts = [
    { img: img1, title: 'Ruby on Rose Accessories and Blue Gemstones.', postdate: '26 Jun, 2022', linktext: 'Read More' },
    { img: img2, title: 'Matching Jewellery Sets with your Outwear.', postdate: '26 Jun, 2022', linktext: 'Read More' },
    { img: img3, title: 'New Retro Collection of Pendants and Ring sets.', postdate: '26 Jun, 2022', linktext: 'Read More' },
    { img: img4, title: 'Special Wedding Rings Sets for Him and for Her.', postdate: '26 Jun, 2022', linktext: 'Read More' },
];
class Blog extends Component {
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
            <section className="pt-115 pb-115 blog-style-2">
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
                    {/* Blog post loop */}
                    <Slider className="row no-gutters latest-post-slider mt-80" ref={c => (this.slider = c)} {...settings}>
                        {blogposts.map((item, i) => (
                            <div key={i}>
                                <article className="blog-post" style={{ backgroundImage: "url(" + item.img + ")" }}>
                                    <div className="blog-data">
                                        <div className="post-date">
                                            {item.postdate}
                                        </div>
                                        <h3 className="post-title"><Link to="#">{item.title}</Link></h3>
                                        <Link to="/blog-detail" className="post-link"><span>{item.linktext}</span></Link>
                                    </div>
                                    <Link to="/blog-detail" />
                                </article>
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>
        );
    }
}

export default Blog;