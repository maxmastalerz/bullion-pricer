import React, { Component } from 'react';
import { Modal } from "react-bootstrap";

import popupimg from '../../assets/img/popup.jpg';

class Newsletter extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: true,
        };
    }
    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }
    render() {
        return (
            <Modal show={this.state.show} className="on-load-modal" onHide={this.handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <div className="modal-content" style={{ backgroundImage: "url(" + popupimg + ")" }}>
                    <Modal.Header>
                        <button type="button" className="close" onClick={this.handleClose}><span aria-hidden="true">×</span></button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-inner">
                            <h3 className="title">Newsletter</h3>
                            <p>Subscribe to our newsletter to recieve exclusive offers</p>
                            <form>
                                <input type="email" placeholder="Email Address" name="email" />
                                <button type="submit" className="main-btn btn-filled" name="button">Subscribe</button>
                            </form>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
        );
    }
}

export default Newsletter;