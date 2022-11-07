import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactWOW from 'react-wow';
import $ from 'jquery';
import 'magnific-popup';

import img1 from '../../../assets/img/gallery/01.jpg';
import img2 from '../../../assets/img/gallery/02.jpg';
import img3 from '../../../assets/img/gallery/12.jpg';
import img4 from '../../../assets/img/gallery/04.jpg';
import img5 from '../../../assets/img/gallery/05.jpg';
import img6 from '../../../assets/img/gallery/13.jpg';
import img7 from '../../../assets/img/gallery/07.jpg';
import img8 from '../../../assets/img/gallery/08.jpg';
import img9 from '../../../assets/img/gallery/11.jpg';

const galleryposts = [
    { img: img1 },
    { img: img2 },
    { img: img3 },
    { img: img4 },
    { img: img5 },
    { img: img6 },
    { img: img7 },
    { img: img8 },
    { img: img9 },
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
                    <div className="gallery-loop columns-3">
                        {galleryposts.map((item, i) => (
                            <ReactWOW key={i} animation="fadeInUp" data-wow-delay=".3s">
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