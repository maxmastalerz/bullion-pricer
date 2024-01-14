import React from 'react';
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

const counterposts = [
    { icon: 'flaticon-menu-1', number: '99', title: 'Non-combo Products' },
    { icon: 'flaticon-globe', number: '2', title: 'Supported Dealer Sites' },
    { icon: 'flaticon-search', number: '6', title: 'Unique Filters' },
];

export default function Counter() {
    const [focus, setFocus] = React.useState(false);
    return (
        <section className="counter-section pt-45">
            <div className="container">
                <div className="row justify-content-center">
                    {counterposts.map((item, i) => (
                        <div key={i} className="col-lg-4 col-12">
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
            </div>
        </section >
    );
}