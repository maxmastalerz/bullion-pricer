import React, { Component } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import bg from '../../../assets/img/bg/01.jpg'
import tbimg1 from '../../../assets/img/room-type/01.jpg';
import tbimg2 from '../../../assets/img/room-type/02.jpg';
import tbimg3 from '../../../assets/img/room-type/03.jpg';
import tbimg4 from '../../../assets/img/room-type/04.jpg';

class Jwelsale extends Component {
    render() {
        return (
            <section className="room-type-section pt-115 pb-115" style={{ backgroundImage: "url(" + bg + ")" }}>
                <Tab.Container defaultActiveKey="pendant">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="section-title text-lg-left text-center">
                                    <span className="title-tag">50 % Discount </span>
                                    <h2>Jewel On Sale </h2>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <Nav variant="pills" className="room-filter justify-content-center justify-content-lg-end">
                                    <Nav.Item>
                                        <Nav.Link eventKey="bracelet">
                                            Bracelet
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="ring">
                                            Ring
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="silverbracelet">
                                            Silver Bracelet
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="pendant">
                                            Pendant
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                        </div>
                        <Tab.Content className="mt-65">
                            <Tab.Pane eventKey="bracelet">
                                <div className="room-items">
                                    <div className="row">
                                        <div className="col-lg-8">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="room-box extra-wide">
                                                        <div className="room-bg" style={{ backgroundImage: "url("+ tbimg4 +")" }} />
                                                        <div className="room-content">
                                                            <span className="room-count"><i className="fal fa-th" />03 Products</span>
                                                            <h3><Link to="/shop-detail">Gold Bracelet Hall Of Fame</Link></h3>
                                                        </div>
                                                        <Link to="/shop-detail" className="room-link"><i className="fal fa-arrow-right" /></Link>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-sm-6">
                                                    <div className="room-box">
                                                        <div className="room-bg" style={{ backgroundImage: "url("+ tbimg1 +")" }}>
                                                        </div>
                                                        <div className="room-content">
                                                            <span className="room-count"><i className="fal fa-th" />05 Products</span>
                                                            <h3><Link to="/shop-detail">Agonfly Jewelry</Link></h3>
                                                        </div>
                                                        <Link to="/shop-detail" className="room-link"><i className="fal fa-arrow-right" /></Link>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-sm-6">
                                                    <div className="room-box">
                                                        <div className="room-bg" style={{ backgroundImage: "url("+ tbimg2 +")" }}>
                                                        </div>
                                                        <div className="room-content">
                                                            <span className="room-count"><i className="fal fa-th" />10 Products</span>
                                                            <h3><Link to="/shop-detail">Coin Gold Necklace</Link></h3>
                                                        </div>
                                                        <Link to="/shop-detail" className="room-link"><i className="fal fa-arrow-right" /></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="room-box extra-height">
                                                <div className="room-bg" style={{ backgroundImage: "url("+ tbimg3 +")" }}>
                                                </div>
                                                <div className="room-content">
                                                    <span className="room-count"><i className="fal fa-th" />12 Products</span>
                                                    <h3><Link to="/shop-detail">Ariel Ring</Link></h3>
                                                </div>
                                                <Link to="/shop-detail" className="room-link"><i className="fal fa-arrow-right" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Tab.Pane>
                            <Tab.Pane eventKey="ring">
                                <div className="room-items">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="room-box extra-height">
                                                <div className="room-bg" style={{ backgroundImage: "url("+ tbimg3 +")" }}>
                                                </div>
                                                <div className="room-content">
                                                    <span className="room-count"><i className="fal fa-th" />12 Products</span>
                                                    <h3><Link to="/shop-detail">Ariel Ring</Link></h3>
                                                </div>
                                                <Link to="/shop-detail" className="room-link"><i className="fal fa-arrow-right" /></Link>
                                            </div>
                                        </div>
                                        <div className="col-lg-8">
                                            <div className="row">
                                                <div className="col-lg-6 col-sm-6">
                                                    <div className="room-box">
                                                        <div className="room-bg" style={{ backgroundImage: "url("+ tbimg2 +")" }}>
                                                        </div>
                                                        <div className="room-content">
                                                            <span className="room-count"><i className="fal fa-th" />10 Products</span>
                                                            <h3><Link to="/shop-detail">Coin Gold Necklace</Link></h3>
                                                        </div>
                                                        <Link to="/shop-detail" className="room-link"><i className="fal fa-arrow-right" /></Link>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-sm-6">
                                                    <div className="room-box">
                                                        <div className="room-bg" style={{ backgroundImage: "url("+ tbimg1 +")" }}>
                                                        </div>
                                                        <div className="room-content">
                                                            <span className="room-count"><i className="fal fa-th" />05 Products</span>
                                                            <h3><Link to="/shop-detail">Agonfly Jewelry</Link></h3>
                                                        </div>
                                                        <Link to="/shop-detail" className="room-link"><i className="fal fa-arrow-right" /></Link>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="room-box extra-wide">
                                                        <div className="room-bg" style={{ backgroundImage: "url("+ tbimg4 +")" }} />
                                                        <div className="room-content">
                                                            <span className="room-count"><i className="fal fa-th" />03 Products</span>
                                                            <h3><Link to="/shop-detail">Gold Bracelet Hall Of Fame</Link></h3>
                                                        </div>
                                                        <Link to="/shop-detail" className="room-link"><i className="fal fa-arrow-right" /></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Tab.Pane>
                            <Tab.Pane eventKey="silverbracelet">
                                <div className="room-items">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="room-box extra-height">
                                                <div className="room-bg" style={{ backgroundImage: "url("+ tbimg3 +")" }}>
                                                </div>
                                                <div className="room-content">
                                                    <span className="room-count"><i className="fal fa-th" />12 Products</span>
                                                    <h3><Link to="/shop-detail">Ariel Ring</Link></h3>
                                                </div>
                                                <Link to="/shop-detail" className="room-link"><i className="fal fa-arrow-right" /></Link>
                                            </div>
                                        </div>
                                        <div className="col-lg-8">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="room-box extra-wide">
                                                        <div className="room-bg" style={{ backgroundImage: "url("+ tbimg4 +")" }} />
                                                        <div className="room-content">
                                                            <span className="room-count"><i className="fal fa-th" />03 Products</span>
                                                            <h3><Link to="/shop-detail">Gold Bracelet Hall Of Fame</Link></h3>
                                                        </div>
                                                        <Link to="/shop-detail" className="room-link"><i className="fal fa-arrow-right" /></Link>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-sm-6">
                                                    <div className="room-box">
                                                        <div className="room-bg" style={{ backgroundImage: "url("+ tbimg1 +")" }}>
                                                        </div>
                                                        <div className="room-content">
                                                            <span className="room-count"><i className="fal fa-th" />05 Products</span>
                                                            <h3><Link to="/shop-detail">Agonfly Jewelry</Link></h3>
                                                        </div>
                                                        <Link to="/shop-detail" className="room-link"><i className="fal fa-arrow-right" /></Link>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-sm-6">
                                                    <div className="room-box">
                                                        <div className="room-bg" style={{ backgroundImage: "url("+ tbimg2 +")" }}>
                                                        </div>
                                                        <div className="room-content">
                                                            <span className="room-count"><i className="fal fa-th" />10 Products</span>
                                                            <h3><Link to="/shop-detail">Coin Gold Necklace</Link></h3>
                                                        </div>
                                                        <Link to="/shop-detail" className="room-link"><i className="fal fa-arrow-right" /></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Tab.Pane>
                            <Tab.Pane eventKey="pendant">
                                <div className="room-items">
                                    <div className="row">
                                        <div className="col-lg-8">
                                            <div className="row">
                                                <div className="col-lg-6 col-sm-6">
                                                    <div className="room-box">
                                                        <div className="room-bg" style={{ backgroundImage: "url("+ tbimg1 +")" }}>
                                                        </div>
                                                        <div className="room-content">
                                                            <span className="room-count"><i className="fal fa-th" />05 Products</span>
                                                            <h3><Link to="/shop-detail">Agonfly Jewelry</Link></h3>
                                                        </div>
                                                        <Link to="/shop-detail" className="room-link"><i className="fal fa-arrow-right" /></Link>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-sm-6">
                                                    <div className="room-box">
                                                        <div className="room-bg" style={{ backgroundImage: "url("+ tbimg2 +")" }}>
                                                        </div>
                                                        <div className="room-content">
                                                            <span className="room-count"><i className="fal fa-th" />10 Products</span>
                                                            <h3><Link to="/shop-detail">Coin Gold Necklace</Link></h3>
                                                        </div>
                                                        <Link to="/shop-detail" className="room-link"><i className="fal fa-arrow-right" /></Link>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="room-box extra-wide">
                                                        <div className="room-bg" style={{ backgroundImage: "url("+ tbimg4 +")" }} />
                                                        <div className="room-content">
                                                            <span className="room-count"><i className="fal fa-th" />03 Products</span>
                                                            <h3><Link to="/shop-detail">Gold Bracelet Hall Of Fame</Link></h3>
                                                        </div>
                                                        <Link to="/shop-detail" className="room-link"><i className="fal fa-arrow-right" /></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="room-box extra-height">
                                                <div className="room-bg" style={{ backgroundImage: "url("+ tbimg3 +")" }}>
                                                </div>
                                                <div className="room-content">
                                                    <span className="room-count"><i className="fal fa-th" />12 Products</span>
                                                    <h3><Link to="/shop-detail">Ariel Ring</Link></h3>
                                                </div>
                                                <Link to="/shop-detail" className="room-link"><i className="fal fa-arrow-right" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Tab.Pane>
                        </Tab.Content>
                    </div>
                </Tab.Container>
            </section>
        );
    }
}

export default Jwelsale;