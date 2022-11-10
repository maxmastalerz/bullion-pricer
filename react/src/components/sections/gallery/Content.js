import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactWOW from 'react-wow';
import $ from 'jquery';
import 'magnific-popup';


import img1 from '../../../assets/img/gallery/01.jpg';
import img2 from '../../../assets/img/gallery/02.jpg';
import img3 from '../../../assets/img/gallery/03.jpg';
import img4 from '../../../assets/img/gallery/04.jpg';
import img5 from '../../../assets/img/gallery/05.jpg';
import img6 from '../../../assets/img/gallery/06.jpg';
import img7 from '../../../assets/img/gallery/07.jpg';
import img8 from '../../../assets/img/gallery/08.jpg';

const galleryposts = [
    { img: img1, animationtime: '.3s' },
    { img: img2, animationtime: '.4s' },
    { img: img3, animationtime: '.5s' },
    { img: img4, animationtime: '.6s' },
    { img: img5, animationtime: '.7s' },
    { img: img6, animationtime: '.8s' },
    { img: img7, animationtime: '.9s' },
    { img: img8, animationtime: '1.1s' },
];
class Content extends Component {
    componentDidMount(){
        function popup(){
            $('.gallery-loop .popup-image').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true,
                },
                mainClass: 'mfp-fade',
            });
        }
        popup();
    }
    render() {
        return (
            <div className="gallery-wrappper pt-120 pb-120">
                <div className="container">
                    <div className="gallery-loop">
                        {galleryposts.map((item, i) => (
                            <ReactWOW key={i} animation="fadeInUp" data-wow-delay={item.animationtime}>
                                <div className="single-gallery-image">
                                    <Link to={item.img} className="popup-image">
                                        <img src={item.img} alt="" />
                                    </Link>
                                </div>
                            </ReactWOW>
                        ))}
                    </div>
                </div>
            </div >

        );
    }
}

export default Content;