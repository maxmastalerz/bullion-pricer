import React from 'react';
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

const counterposts = [
    { icon: 'flaticon-bracelet-1', number: '84', prefix: 'k', title: 'Jewelriess in Album' },
    { icon: 'flaticon-like', number: '10', prefix: 'M', title: 'Happy Feedbacks' },
    { icon: 'flaticon-earrings', number: '02', prefix: 'k', title: 'Categories Served' },
    { icon: 'flaticon-user-1', number: '100', prefix: 'M', title: 'Happy Clients' },
];
export default function Counter() {
    const [focus, setFocus] = React.useState(false);
        return (
            <section className="counter-section pt-100 pb-100">
                <div className="container">
                    <div className="row">
                        {counterposts.map((item, i) => (
                            <div key={i} className="col-lg-3 col-md-6 col-6">
                                <div className="counter-box">
                                    <div className="icon"> <i className={item.icon} />
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
                </div>
            </section>
        );
    }
