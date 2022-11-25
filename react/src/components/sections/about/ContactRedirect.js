import React from 'react';
import { Link } from 'react-router-dom';

export default function ContactRedirect() {
    return (
        <section className="counter-section pt-30 pb-30">
            <div className="container">
                {/* Contact Us Clickable */}
                <div className="container">
                    <div className = "section-title about-title text-center">
                        <Link to="/contact" >
                            <span className ="title-tag">Have Questions?</span>
                        
                            <h2>Contact Us Today!</h2>
                        </Link>
                    </div>
                </div>
            </div>
        </section >
    );
}