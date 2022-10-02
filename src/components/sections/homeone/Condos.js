import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import cnimg1 from '../../../assets/img/condos/menu-gallery-1.jpg';
import cnimg2 from '../../../assets/img/condos/menu-gallery-2.jpg';
import cnimg3 from '../../../assets/img/condos/menu-gallery-3.jpg';
import cnimg4 from '../../../assets/img/condos/menu-gallery-4.jpg';

const condosposts = [
    { img: cnimg1, title: 'Handmade Earring', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do', price: '$299' },
    { img: cnimg2, title: 'Diamond Nosering', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do', price: '$499' },
    { img: cnimg3, title: 'Silver Bracelet', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do', price: '$299' },
    { img: cnimg4, title: 'Gold Pendents', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do', price: '$199' },
];

class Condos extends Component {
    render() {
        return (
            <section className="condos-overlay-sec">
                <div className="container-fluid p-0">
                    <div className="row no-gutters">
                        {condosposts.map((item, i) => (
                            <div key={i} className="col-lg-3 col-md-6">
                                <div className="condo-item" style={{ backgroundImage: "url("+ item.img +")" }}>
                                    <div className="title">
                                        <i className="fal fa-plus text-white" />
                                        <h4 className="text-white">{item.title}</h4>
                                    </div>
                                    <div className="title title-hidden">
                                        <h4 className="text-white mt-0">{item.title}</h4>
                                        <p className="text-white">{item.text}</p>
                                        <div className="book-btn">
                                            <Link to="/shop-detail"><i className="fal fa-long-arrow-right" />Buy now</Link>
                                        </div>
                                    </div>
                                    <Link to="/shop-detail" className="main-btn btn-border">Starting at {item.price}</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

        );
    }
}

export default Condos;