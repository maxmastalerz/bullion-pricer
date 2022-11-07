import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'magnific-popup';

import videobg from '../../../assets/img/text-block/03.jpg';

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
            <div className="intro-video overlapped bg-white">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 col-sm-12">
                            <div className="video-wrap video-wrap-two mb-small" style={{ backgroundImage: "url("+ videobg +")" }}> <Link to="http://www.youtube.com/embed/watch?v=EEJFMdfraVY" className="popup-video"><i className="fas fa-play" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Video;