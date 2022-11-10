import React, { Component } from 'react';
import Countdown from "react-countdown";

import comingsoonbg from '../../../assets/img/404.png';

// Random component
const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return <ul className="sigma_countdown-timer"><li><div class="calender-input-box"><div class="calender-input-inner"> <span>Days</span><h3>{days}</h3></div></div></li><li><div class="calender-input-box"><div class="calender-input-inner"> <span>Hours</span><h3>{hours}</h3></div></div></li><li><div class="calender-input-box"><div class="calender-input-inner"> <span>Minutes</span><h3>{minutes}</h3></div></div></li><li><div class="calender-input-box"><div class="calender-input-inner"> <span>Seconds</span><h3>{seconds}</h3></div></div></li></ul>
    ;
  }
};
class Content extends Component {
    render() {
        return (
            <section className="error bg-center bg-cover bg-norepeat" style={{ backgroundImage: "url("+ comingsoonbg +")" }}>
                <div className="container">
                    <div className="error-texts text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={45} height={45} x={0} y={0} viewBox="0 0 512 512" xmlSpace="preserve">
                            <path d="M369.853,250.251l-100-241C267.53,3.65,262.062,0,255.999,0s-11.531,3.65-13.854,9.251l-100,241    c-1.527,3.681-1.527,7.817,0,11.498l100,241c2.323,5.601,7.791,9.251,13.854,9.251s11.531-3.65,13.854-9.251l100-241    C371.381,258.068,371.381,253.932,369.853,250.251z M255.999,457.861L172.239,256l83.76-201.861L339.759,256L255.999,457.861z" fill="#ffffff" />
                            <path className="diamond-spark spark-1" d="M139.606,118.393l-63-63c-5.858-5.857-15.356-5.857-21.213,0c-5.858,5.858-5.858,15.356,0,21.213l63,63    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394C145.465,133.748,145.465,124.25,139.606,118.393z" fill="#ffffff" />
                            <path className="diamond-spark spark-2" d="M456.607,55.393c-5.858-5.857-15.356-5.857-21.213,0l-63,63c-5.858,5.858-5.858,15.356,0,21.213    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394l63-63C462.465,70.748,462.465,61.25,456.607,55.393z" fill="#ffffff" />
                            <path className="diamond-spark spark-3" d="M139.606,372.393c-5.858-5.857-15.356-5.857-21.213,0l-63,63c-5.858,5.858-5.858,15.356,0,21.213    C58.322,459.535,62.16,461,65.999,461s7.678-1.465,10.607-4.394l63-63C145.465,387.748,145.465,378.25,139.606,372.393z" fill="#ffffff" />
                            <path className="diamond-spark spark-4" d="M456.607,435.393l-63-63c-5.858-5.857-15.356-5.857-21.213,0c-5.858,5.858-5.858,15.356,0,21.213l63,63    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394C462.465,450.748,462.465,441.25,456.607,435.393z" fill="#ffffff" />
                        </svg>
                        <h2>Something exciting is melding</h2>
                        <p>Nulla quis lorem ut libero malesuada feugiat. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.</p>
                    </div>
                    <Countdown date={Date.now() + 31536000000} renderer={renderer} />
                    <form action="/" className="subscribe-form">
                        <div className="row">
                            <div className="col-md-9">
                                <input type="email" placeholder="Your email" />
                            </div>
                            <div className="col-md-3">
                                <button type="submit" className="main-btn btn-filled btn-block">subscribe</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section >
        );
    }
}

export default Content;