import React, { Component } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import img1 from '../../../assets/img/shop/01.jpg';
import img2 from '../../../assets/img/shop/02.jpg';
import img3 from '../../../assets/img/shop/03.jpg';

const ringsposts = [
    { img: img3, tag2: '-10%', title: 'Diamond Ring.', price1: '$890', price2: '$900' },
    { img: img1, tag1: 'Sale', tag2: '-15%', title: 'Stud Earrings ', price1: '$580', price2: '$630' },
    { img: img2, tag1: 'Sale', tag2: '-40%', title: 'Ankle Bracelet', price1: '$290', price2: '$300' },
    { img: img3, tag2: '-10%', title: 'Diamond Ring.', price1: '$890', price2: '$920' },
];

const earingposts = [
    { img: img1, tag1: 'Sale', tag2: '-15%', title: 'Ankle Bracelet', price1: '$390', price2: '$480' },
    { img: img2, tag1: 'New', title: 'Stud Earrings', price1: '$290', price2: '$300' },
    { img: img3, tag1: 'New', tag2: '-10%', title: 'Crumpled Ring', price1: '$450', price2: '$510' },
    { img: img1, tag1: 'Sale', tag2: '-15%', title: 'Golden Pendant', price1: '$780', price2: '$800' },
];

const necklessposts = [
    { img: img1, tag1: 'Sale', tag2: '-15%', title: 'Ankle Bracelet', price1: '$390', price2: '$480' },
    { img: img2, tag1: 'New', title: 'Stud Earrings', price1: '$290', price2: '$300' },
    { img: img3, tag1: 'New', tag2: '-10%', title: 'Crumpled Ring', price1: '$450', price2: '$510' },
    { img: img1, tag1: 'Sale', tag2: '-15%', title: 'Golden Pendant', price1: '$780', price2: '$800' },
];

const braceletposts = [
    { img: img1, tag1: 'Sale', tag2: '-15%', title: 'Ankle Bracelet', price1: '$390', price2: '$480' },
    { img: img2, tag1: 'New', title: 'Stud Earrings', price1: '$290', price2: '$300' },
    { img: img3, tag1: 'New', tag2: '-10%', title: 'Crumpled Ring', price1: '$450', price2: '$510' },
    { img: img1, tag1: 'Sale', tag2: '-15%', title: 'Golden Pendant', price1: '$780', price2: '$800' },
]; 
const armletsposts = [
    { img: img1, tag1: 'Sale', tag2: '-15%', title: 'Ankle Bracelet', price1: '$390', price2: '$480' },
    { img: img2, tag1: 'New', title: 'Stud Earrings', price1: '$290', price2: '$300' },
    { img: img3, tag1: 'New', tag2: '-10%', title: 'Crumpled Ring', price1: '$450', price2: '$510' },
    { img: img1, tag1: 'Sale', tag2: '-15%', title: 'Golden Pendant', price1: '$780', price2: '$800' },
];
const ankletsposts = [
    { img: img1, tag1: 'Sale', tag2: '-15%', title: 'Ankle Bracelet', price1: '$390', price2: '$480' },
    { img: img2, tag1: 'New', title: 'Stud Earrings', price1: '$290', price2: '$300' },
    { img: img3, tag1: 'New', tag2: '-10%', title: 'Crumpled Ring', price1: '$450', price2: '$510' },
    { img: img1, tag1: 'Sale', tag2: '-15%', title: 'Golden Pendant', price1: '$780', price2: '$800' },
];

class Category extends Component {
    render() {
        return (
            <section className="restaurant-tab-area pt-120">
                <div className="container">
                    <Tab.Container defaultActiveKey="earrings">
                        <Nav variant="pills" className="restaurant-rood-list row justify-content-center mb-30">
                            <Nav.Item className="col-lg-2 col-md-3 col-sm-4 col-6">
                                <Nav.Link eventKey="rings">
                                    <i className="flaticon-ring" />
                                    <span className="title">Rings</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="col-lg-2 col-md-3 col-sm-4 col-6">
                                <Nav.Link eventKey="earrings">
                                    <i className="flaticon-earrings" />
                                    <span className="title">Earrings</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="col-lg-2 col-md-3 col-sm-4 col-6">
                                <Nav.Link eventKey="necklaces">
                                    <i className="flaticon-necklace" />
                                    <span className="title">Necklaces</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="col-lg-2 col-md-3 col-sm-4 col-6">
                                <Nav.Link eventKey="bracelets">
                                    <i className="flaticon-bracelet-2" />
                                    <span className="title">Bracelets</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="col-lg-2 col-md-3 col-sm-4 col-6">
                                <Nav.Link eventKey="armlets">
                                    <i className="flaticon-bracelet" />
                                    <span className="title">Armlets</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="col-lg-2 col-md-3 col-sm-4 col-6">
                                <Nav.Link eventKey="anklets">
                                    <i className="flaticon-bracelet-1" />
                                    <span className="title">Anklets</span>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="rings">
                                <div className="row">
                                    {ringsposts.map((item, i) => (
                                        <div key={i} className="col-lg-3 col-md-6">
                                            <div className="food-box shop-box">
                                                <div className="thumb">
                                                    <img src={item.img} alt="images" />
                                                    <div className="badges">
                                                        <span className="price">{item.tag1}</span>
                                                        <span className="price discounted">{item.tag2}</span>
                                                    </div>
                                                    <div className="button-group">
                                                        <Link to="#"><i className="far fa-heart" /></Link>
                                                        <Link to="#"><i className="far fa-sync-alt" /></Link>
                                                        <Link to="#"><i className="far fa-eye" /></Link>
                                                    </div>
                                                </div>
                                                <div className="desc">
                                                    <h4>
                                                        <Link to="/shop-detail">{item.title}</Link>
                                                    </h4>
                                                    <span className="price">{item.price1} <span >{item.price2}</span></span>
                                                    <Link to="/shop-detail" className="link"><i className="fal fa-arrow-right" /></Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="earrings">
                                <div className="row">
                                    {earingposts.map((item, i) => (
                                        <div key={i} className="col-lg-3 col-md-6">
                                            <div className="food-box shop-box">
                                                <div className="thumb">
                                                    <img src={item.img} alt="images" />
                                                    <div className="badges">
                                                        <span className="price">{item.tag1}</span>
                                                        <span className="price discounted">{item.tag2}</span>
                                                    </div>
                                                    <div className="button-group">
                                                        <Link to="#"><i className="far fa-heart" /></Link>
                                                        <Link to="#"><i className="far fa-sync-alt" /></Link>
                                                        <Link to="#"><i className="far fa-eye" /></Link>
                                                    </div>
                                                </div>
                                                <div className="desc">
                                                    <h4>
                                                        <Link to="/shop-detail">{item.title}</Link>
                                                    </h4>
                                                    <span className="price">{item.price1} <span >{item.price2}</span></span>
                                                    <Link to="/shop-detail" className="link"><i className="fal fa-arrow-right" /></Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="necklaces">
                                <div className="row">
                                    {necklessposts.map((item, i) => (
                                        <div key={i} className="col-lg-3 col-md-6">
                                            <div className="food-box shop-box">
                                                <div className="thumb">
                                                    <img src={item.img} alt="images" />
                                                    <div className="badges">
                                                        <span className="price">{item.tag1}</span>
                                                        <span className="price discounted">{item.tag2}</span>
                                                    </div>
                                                    <div className="button-group">
                                                        <Link to="#"><i className="far fa-heart" /></Link>
                                                        <Link to="#"><i className="far fa-sync-alt" /></Link>
                                                        <Link to="#"><i className="far fa-eye" /></Link>
                                                    </div>
                                                </div>
                                                <div className="desc">
                                                    <h4>
                                                        <Link to="/shop-detail">{item.title}</Link>
                                                    </h4>
                                                    <span className="price">{item.price1} <span >{item.price2}</span></span>
                                                    <Link to="/shop-detail" className="link"><i className="fal fa-arrow-right" /></Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="bracelets">
                                <div className="row">
                                    {braceletposts.map((item, i) => (
                                        <div key={i} className="col-lg-3 col-md-6">
                                            <div className="food-box shop-box">
                                                <div className="thumb">
                                                    <img src={item.img} alt="images" />
                                                    <div className="badges">
                                                        <span className="price">{item.tag1}</span>
                                                        <span className="price discounted">{item.tag2}</span>
                                                    </div>
                                                    <div className="button-group">
                                                        <Link to="#"><i className="far fa-heart" /></Link>
                                                        <Link to="#"><i className="far fa-sync-alt" /></Link>
                                                        <Link to="#"><i className="far fa-eye" /></Link>
                                                    </div>
                                                </div>
                                                <div className="desc">
                                                    <h4>
                                                        <Link to="/shop-detail">{item.title}</Link>
                                                    </h4>
                                                    <span className="price">{item.price1} <span >{item.price2}</span></span>
                                                    <Link to="/shop-detail" className="link"><i className="fal fa-arrow-right" /></Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="armlets">
                                <div className="row">
                                    {armletsposts.map((item, i) => (
                                        <div key={i} className="col-lg-3 col-md-6">
                                            <div className="food-box shop-box">
                                                <div className="thumb">
                                                    <img src={item.img} alt="images" />
                                                    <div className="badges">
                                                        <span className="price">{item.tag1}</span>
                                                        <span className="price discounted">{item.tag2}</span>
                                                    </div>
                                                    <div className="button-group">
                                                        <Link to="#"><i className="far fa-heart" /></Link>
                                                        <Link to="#"><i className="far fa-sync-alt" /></Link>
                                                        <Link to="#"><i className="far fa-eye" /></Link>
                                                    </div>
                                                </div>
                                                <div className="desc">
                                                    <h4>
                                                        <Link to="/shop-detail">{item.title}</Link>
                                                    </h4>
                                                    <span className="price">{item.price1} <span >{item.price2}</span></span>
                                                    <Link to="/shop-detail" className="link"><i className="fal fa-arrow-right" /></Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="anklets">
                                <div className="row">
                                    {ankletsposts.map((item, i) => (
                                        <div key={i} className="col-lg-3 col-md-6">
                                            <div className="food-box shop-box">
                                                <div className="thumb">
                                                    <img src={item.img} alt="images" />
                                                    <div className="badges">
                                                        <span className="price">{item.tag1}</span>
                                                        <span className="price discounted">{item.tag2}</span>
                                                    </div>
                                                    <div className="button-group">
                                                        <Link to="#"><i className="far fa-heart" /></Link>
                                                        <Link to="#"><i className="far fa-sync-alt" /></Link>
                                                        <Link to="#"><i className="far fa-eye" /></Link>
                                                    </div>
                                                </div>
                                                <div className="desc">
                                                    <h4>
                                                        <Link to="/shop-detail">{item.title}</Link>
                                                    </h4>
                                                    <span className="price">{item.price1} <span >{item.price2}</span></span>
                                                    <Link to="/shop-detail" className="link"><i className="fal fa-arrow-right" /></Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </section>
        );
    }
}

export default Category;