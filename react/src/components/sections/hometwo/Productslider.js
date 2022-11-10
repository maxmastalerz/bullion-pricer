import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Slider from 'react-slick'

import img1 from '../../../assets/img/room-slider/01.jpg';
import img2 from '../../../assets/img/room-slider/02.jpg';
import img3 from '../../../assets/img/room-slider/03.jpg';
import img4 from '../../../assets/img/room-slider/04.jpg';
import img5 from '../../../assets/img/room-slider/05.jpg';

const roomslideroneposts = [
    { img: img1 },
    { img: img2 },
    { img: img3 },
    { img: img4 },
    { img: img5 },
];
const roomslidercontentposts = [
    { icon: 'flaticon-necklace', title: 'Gold Neckless', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.' },
    { icon: 'flaticon-ring', title: 'Diamond Ring', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.' },
    { icon: 'flaticon-bracelet-2', title: 'Silver Bracelet', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.' },
    { icon: 'flaticon-necklace', title: 'Diamond Necklace', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.' },
    { icon: 'flaticon-earrings', title: 'Gold Earrings', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.' },
];
class Productslider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null
        };
    }

    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
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
            centerMode: true,
            focusOnSelect: true,
            centerPadding: '6%',
            responsive: [{
                breakpoint: 1600,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '15%',
                },
            },
            ],
        };
        const settings2 = {
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 4000,
            arrows: false,
            dots: true,
            focusOnSelect: true,
        }
        return (

            <section className="room-slider">
                <div className="container-fluid p-0">
                    <Slider className="row rooms-slider-one" {...settings} asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)}>
                        {roomslideroneposts.map((item, i) => (
                            <div key={i} className="col">
                                <div className="slider-img" style={{ backgroundImage: "url(" + item.img + ")" }}>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className="rooms-content-wrap">
                    <div className="container">
                        <div className="row justify-content-center justify-content-md-start">
                            <div className="col-xl-4 col-lg-5 col-sm-8">
                                <div className="room-content-box">
                                    <div className="slider-count" />
                                    <div className="slider-count-big" />
                                    <Slider className="room-content-slider" {...settings2} asNavFor={this.state.nav1} ref={slider => (this.slider2 = slider)}>
                                        {roomslidercontentposts.map((item, i) => (
                                            <div key={i} className="single-content">
                                                <div className="icon">
                                                    <i className={item.icon} />
                                                </div>
                                                <h3><Link to="/shop-detail">{item.title}</Link></h3>
                                                <p>{item.text}</p>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Productslider;