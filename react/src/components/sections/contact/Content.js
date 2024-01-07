import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

function Content() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('General Inquiry');
    const [message, setMessage] = useState('');
    const [loadedHCaptcha, setLoadedHCaptcha] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const onNameChange = (event) => { setName(event.target.value); };
    const onEmailChange = (event) => { setEmail(event.target.value); };
    const onSubjectChange = (event) => { setSubject(event.target.value); };
    const onMessageChange = (event) => { setMessage(event.target.value); };

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const showMessage = async(elementId) => {
        var element = document.getElementById(elementId);

        element.classList.add("d-block");
        setIsVisible(true);
        await delay(2000);
        setIsVisible(false);
        await delay(2000);
        element.classList.remove("d-block");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(loadedHCaptcha === false) {
            console.log("HCaptcha hasn't finished loading....");
            showMessage("hcaptcha_didnt_load");
        } else {
            window.hcaptcha.execute({ async: true })
            .then(({ response }) => {
                sendContactFormForProcessing(response);
                window.hcaptcha.reset();
            })
            .catch(err => {
                console.error(err);
            });
        }
    };

    const sendContactFormForProcessing = async (hCaptchaValue) => {
        const payload = { name, email, subject, message, hCaptchaValue };

        try {
            let response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            let responseData = await response.json();

            if(responseData.data) {
                resetForm();
                showMessage("server_response_success");
            } else if (responseData.error) {
                showMessage("server_response_danger");
            }
        } catch (error) {
            showMessage("server_response_danger");
        }
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setSubject('General Inquiry');
        setMessage('');
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://js.hcaptcha.com/1/api.js';
        script.onload = () => {
            setLoadedHCaptcha(true);
            window.hcaptcha.render('captcha');
        };
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <section className="contact-part pt-115 pb-45">
            <div className="container">
                {/* Contact Form */}
                <div className="contact-form">
                    <form onSubmit={handleSubmit}>
                        <div className = "row">
                            <div className ="col-md-6">
                                <div className="input-group mb-30">
                                    <span className="icon"><i className="far fa-user" /></span>
                                    <input type="text" placeholder="Full name" name="name" value={name} onChange={onNameChange} required />
                                </div>
                            </div>
                            <div className ="col-md-6">
                                <div className="input-group mb-30">
                                    <span className="icon"><i className="far fa-envelope" /></span>
                                    <input type="email" placeholder="Email address" name="email" value={email} onChange={onEmailChange} required />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group mb-30">
                                    <label htmlFor="subject">How can we help you?</label>
                                    <span className="icon"><i className="far fa-book" /></span>
                                    <select name="subject" id="subject" value={subject} onChange={onSubjectChange}>
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="I'm having some issues">I'm having some issues</option>
                                        <option value="I'd like to suggest a product or website to index">I'd like to suggest a product or website to index</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="input-group textarea mb-30">
                                    <span className="icon"><i className="far fa-pen"/></span>
                                    <textarea placeholder="Your message" name="message" value={message} onChange={onMessageChange} required />
                                </div>
                            </div>
                            <div className="col-12 text-center">
                                <div id="captcha" data-size="invisible" data-sitekey={process.env.REACT_APP_HCAPTCHA_SITE_KEY}></div>

                                <button type="submit" className="main-btn btn-filled">Send Message</button>

                                {/* Form Messages */}
                                <div className="alert-container">
                                    <Alert variant="success" className="d-none mt-3 mb-0" id="server_response_success" style={{ opacity: isVisible ? 1 : 0 }}>
                                        <strong>Success!</strong> Thank you for your message.
                                    </Alert>
                                    <Alert variant="danger" className="d-none mt-3 mb-0" id="server_response_danger" style={{ opacity: isVisible ? 1 : 0 }}>
                                        <strong>Sorry!</strong> Your message couldn't be delivered.
                                    </Alert>
                                    <Alert variant="danger" className="d-none mt-3 mb-0" id="hcaptcha_didnt_load" style={{ opacity: isVisible ? 1 : 0 }}>
                                        <strong>Sorry!</strong> Our captcha service hasn't loaded. Please refresh and try again.
                                    </Alert>
                                </div>
                                {/* Form Messages */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Content;