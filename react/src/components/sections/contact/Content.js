import React from "react";


function Content() {
    return (
        <section className="contact-part pt-115 pb-115">
            <div className="container">
                {/* Contact Form */}
                <div className="contact-form">
                    <form action = "https://formsubmit.co/ec551042a0e5cced810d1642ceafc85f" method="POST">
                        <div className ="input-group mb-30">
                            <label >Your contact information:</label>
                        </div>
                        <div className = "row">
                            <div className ="col-md-6">
                                <div className="input-group mb-30">
                                    <span className="icon"><i className="far fa-user" /></span>
                                    <input type="text" id="customerName" name = "name" placeholder="Your full name" required />
                                </div>
                            </div>
                            <div className ="col-md-6">
                                <div className="input-group mb-30">
                                    <span className="icon"><i className="far fa-envelope" /></span>
                                    <input type="text" id="customerEmail" name = "email" placeholder="Your email address" required />
                                </div>
                            </div>
                            <div className ="col-md-12">
                                <div className="input-group mb-30">
                                    <span className="icon"><i className="far fa-book" /></span>
                                    <label htmlFor="subject">How can we help you?</label>
                                    <select name="subject" id="subject">
                                        <option value="generalinquiry">General Inquiry</option>
                                        <option value="helpme">I'm having some issues</option>
                                        <option value="suggestion">I'd like to suggest a product or website to index</option>
                                    </select>                                       
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group textarea mb-30">
                                    <span className="icon"><i className="far fa-pen"/></span>
                                    <input type="text" id="customerConcern" name="concern" placeholder="Your concern"/>
                                </div>
                            </div>
                            <div className="col-md-12 text-center">
                                <button  type="submit" className = "main-btn btn-filled" >Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}


export default Content;