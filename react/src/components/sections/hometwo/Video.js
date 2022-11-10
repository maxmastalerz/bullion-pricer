 import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import $ from 'jquery';
import 'magnific-popup';

import videobg from '../../../assets/img/bg/05.jpg';
import videoicon from '../../../assets/img/icon/07.png';

class Video extends Component {
    componentDidMount(){
        function popup(){
            $('.popup-video').magnificPopup({
                type: 'iframe',
            });
        }
        popup();
    }
    render() {
        return (
            <div className="video-wrap full-section" style={{ backgroundImage: "url("+ videobg +")" }}>
                <Link to="http://www.youtube.com/embed/watch?v=EEJFMdfraVY" className="popup-video wow fadeInDown" data-wow-delay=".3s">
                    <img src={videoicon} alt="Icon" />
                </Link>
            </div>

        );
    }
}

export default Video;