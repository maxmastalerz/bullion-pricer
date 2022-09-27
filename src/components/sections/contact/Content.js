import React from 'react';
import Contacthelper from '../../../helper/Contacthelper';
import ReCAPTCHA from "react-google-recaptcha";
import { Alert } from 'react-bootstrap';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

class Content extends Contacthelper {
    render() {
        const Map = ReactMapboxGl({
            accessToken:
                'pk.eyJ1IjoiYWJlZHNoIiwiYSI6ImNrNnRyZ3d4aDAyMzkzZXBoc3RsYnM0aGwifQ.yhr3W_OOI6xXElmSY8cyPg'
        });
        return (
            <section className="contact-part pt-115 pb-115">
                <div className="container">
                    {/* Contact Info */}
                    <div className="contact-info">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-sm-6 col-10">
                                <div className="info-box">
                                    <div className="icon">
                                        <i className="flaticon-home" />
                                    </div>
                                    <div className="desc">
                                        <h4>Office Address</h4>
                                        <p>19/A, Cirikon City hall Tower New York, NYC</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 col-10">
                                <div className="info-box">
                                    <div className="icon">
                                        <i className="flaticon-phone" />
                                    </div>
                                    <div className="desc">
                                        <h4>Phone Number</h4>
                                        <p>+ 97656 8675 7864 7 <br /> + 876 766 8675 765 6</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 col-10">
                                <div className="info-box">
                                    <div className="icon">
                                        <i className="flaticon-message" />
                                    </div>
                                    <div className="desc">
                                        <h4>Email Address</h4>
                                        <p>info@webmail.com <br /> jobs.webmail@mail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Contact Mapts */}
                    <Map
                        // eslint-disable-next-line react/style-prop-object
                        style="mapbox://styles/mapbox/light-v10"
                        className="contact-maps mb-30"
                    >
                        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                            <Feature coordinates={[-77.04, 38.907]} zoom={11.5} />
                        </Layer>
                    </Map>
                    {/* Contact Form */}
                    <div className="contact-form">
                        <form onSubmit={this.handleSubmit} method="GET">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-30">
                                        <span className="icon"><i className="far fa-user" /></span>
                                        <input type="text" placeholder="Your full name" name="name" value={this.state.name} onChange={this.onNameChange} required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-30">
                                        <span className="icon"><i className="far fa-envelope" /></span>
                                        <input type="email" placeholder="Enter email address" name="email" value={this.state.email} onChange={this.onEmailChange} required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-30">
                                        <span className="icon"><i className="far fa-phone" /></span>
                                        <input type="text" placeholder="Add phone number" name="phone" value={this.state.phone} onChange={this.onPhoneChange} required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-30">
                                        <span className="icon"><i className="far fa-book" /></span>
                                        <input type="text" placeholder="Select Subject" name="subject" value={this.state.subject} onChange={this.onSubjectChange} required />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="input-group textarea mb-30">
                                        <span className="icon"><i className="far fa-pen" /></span>
                                        <textarea placeholder="Enter messages" name="message" value={this.state.message} onChange={this.onMessageChange} required />
                                    </div>
                                </div>
                                <div className="col-12 text-center">
                                    <ReCAPTCHA
                                        sitekey="6LdxUhMaAAAAAIrQt-_6Gz7F_58S4FlPWaxOh5ib"
                                        onChange={this.reCaptchaLoaded.bind(this)}
                                        size="invisible"
                                    />
                                    <button type="submit" className="main-btn btn-filled">Get Free Quote</button>
                                    {/* Form Messages */}
                                    <Alert variant="success" className="d-none mt-3 mb-0" id="server_response_success">
                                        <strong>Success!</strong> Contact form has been successfully submitted.
                                    </Alert>
                                    <Alert variant="danger" className="d-none mt-3 mb-0" id="server_response_danger">
                                        <strong>Oops!</strong> Something bad happened. Please try again later.
                                    </Alert>
                                    {/* Form Messages */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}

export default Content;