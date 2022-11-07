import React from 'react';
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

// Galklery
import gallimg1 from '../../../assets/img/gallery/09.jpg';
import gallimg2 from '../../../assets/img/gallery/10.jpg';

const counterposts = [
    { icon: 'flaticon-user-1', number: '8000', title: 'Happy Users' },
    { icon: 'flaticon-like', number: '10', prefix: 'M', title: 'Reviews & Appriciate' },
    { icon: 'flaticon-suitcase', number: '100', title: 'Country Coverage' },
];


export default function Counter() {
    const [focus, setFocus] = React.useState(false);
    return (
        <section className="counter-section pt-115">
            <div className="container">
                {/* Section Title */}
                <div className="section-title mb-80">
                    <span className="title-tag">COUNTER</span>
                    <h2>Feedback At Glance</h2>
                </div>
                {/* Counter */}
                <div className="row justify-content-center">
                    {counterposts.map((item, i) => (
                        <div key={i} className="col-lg-4 col-6">
                            <div className="counter-box counter-box-two">
                                <div className="icon">
                                    <i className={item.icon} />
                                </div>
                                <h4>
                                    <CountUp start={focus ? 0 : null} end={parseInt(item.number)} duration={5} redraw={true}>
                                        {({ countUpRef }) => (
                                            <div>
                                                <span className="counter" ref={countUpRef} />
                                                {item.prefix}
                                                <VisibilitySensor
                                                    onChange={isVisible => {
                                                        if (isVisible) {
                                                            setFocus(true);
                                                        }
                                                    }}
                                                >
                                                <span className="plus-icon">+</span>
                                                </VisibilitySensor>
                                            </div>
                                        )}
                                    </CountUp>
                                </h4>
                                <span className="title">{item.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Gallery */}
                <div className="row">
                    <div className="col-sm-6 wow fadeInUp" data-wow-delay=".3s">
                        <div className="image mt-30">
                            <img src={gallimg1} alt="" />
                        </div>
                    </div>
                    <div className="col-sm-6 wow fadeInUp" data-wow-delay=".5s">
                        <div className="image mt-30">
                            <img src={gallimg2} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}