import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import errorimg from '../../../assets/img/404.png';

class Content extends Component {
    render() {
        return (
            <section className="error bg-center bg-cover bg-norepeat" style={{ backgroundImage: "url(" + errorimg + ")" }}>
                <div className="container">
                    <div className="error-texts text-center">
                        <h1>404</h1>
                        <h2>Ooops! That page doesn't exist!</h2>
                        <p></p>
                        <Link to="/" className="main-btn btn-filled">Back to Home</Link>
                    </div>
                </div>
            </section>

        );
    }
}

export default Content;