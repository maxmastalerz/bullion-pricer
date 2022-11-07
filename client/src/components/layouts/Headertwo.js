import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames'
import $ from 'jquery';

import Canvas from './Canvas';
import Mobilemenu from './Mobilemenu';

class Headertwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classmethod: false,
            togglemethod: false,
        };
        this.addClass = this.addClass.bind(this);
        this.removeClass = this.removeClass.bind(this);
        this.toggleClass = this.toggleClass.bind(this);
    }
    addClass() {
        this.setState({
            classmethod: true
        });
    }

    removeClass() {
        this.setState({
            classmethod: false
        });
    }
    toggleClass() {
        this.setState({
            togglemethod: !this.state.togglemethod
        });
    }
    componentDidMount() {
        function megamenu() {
            $('.sigm-megamenu-nav>li').on('mouseover', function (e) {
                e.preventDefault();
                $('.sub-menu .sigm-megamenu-nav').find('.active').removeClass('active');
                $('.sub-menu .tab-content').find('.active').removeClass('active show');

                $(this).find('a').addClass('active');
                $('.sub-menu .tab-item').eq($(this).index()).addClass('active show');
            });
        }
        megamenu();
        window.addEventListener('scroll', () => {
            this.setState({
                isTop: window.scrollY > 110
            });
        }, false);
    }
    render() { 
        const stickyheader = this.state.isTop ? 'sticky-active' : '';
        return (
            <Fragment>
                <header className={`header-absolute header-two plus-three sticky-header sigma-header ${stickyheader}`} id="header">
                    <div className="lr-topbar">
                        <div className="container container-custom-one">
                            <div className="row align-items-center">
                                <div className="col-lg-4">
                                    <div className="lr-topbar-controls">
                                        <ul>
                                            <li>
                                                <Link to="#">
                                                    Need Help? Call 1234 567 890
                  </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="lr-topbar-controls style-2">
                                        <ul>
                                            <li>
                                                <Link to="/account">
                                                    My Account
                  </Link>
                                            </li>
                                            <li>
                                                <Link to="/blog-grid">
                                                    Blog
                  </Link>
                                            </li>
                                            <li>
                                                <Link to="/contact">
                                                    Support
                  </Link>
                                            </li>
                                            <li>
                                                <Link to="/register">
                                                    Signup
                  </Link>
                                            </li>
                                            <li>
                                                <Link to="/login">
                                                    Login
                  </Link>
                                            </li>
                                            <li>
                                                <select className="nice-select">
                                                    <option>English</option>
                                                    <option>Esponel</option>
                                                </select>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container container-custom-one">
                        <div className="nav-container d-flex align-items-center">
                            {/* Main Menu */}
                            <div className="nav-menu d-lg-flex align-items-center justify-content-center">
                                {/* Navbar Close Icon */}
                                <div className="navbar-close">
                                    <div className="cross-wrap"><span className="top" /><span className="bottom" /></div>
                                </div>
                                {/* Off canvas Menu  */}
                                <div className="toggle">
                                    <Link to="#" id="offCanvasBtn" onClick={this.addClass}> <i className="fal fa-bars" /></Link>
                                </div>
                                {/* Mneu Items */}
                                <div className="sigma-header-nav">
                                    <div className="sigma-header-nav-inner">
                                        <nav>
                                            <ul className="sigma-main-menu">
                                                <li className="menu-item menu-item-has-children">
                                                    <Link to="#">
                                                        Home
                    </Link>
                                                    <ul className="sub-menu">
                                                        <li className="menu-item">
                                                            <Link to="/">Home 1</Link>
                                                        </li>
                                                        <li className="menu-item">
                                                            <Link to="/home-two">Home 2</Link>
                                                        </li>
                                                        <li className="menu-item">
                                                            <Link to="/home-three">Home 3</Link>
                                                        </li>
                                                        <li className="menu-item">
                                                            <Link to="/home-four">Home 4</Link>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="menu-item menu-item-has-children menu-item-has-megamenu">
                                                    <Link to="#">
                                                        Categories
                    </Link>
                                                    <div className="sub-menu">
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-lg-3">
                                                                    <ul className="sigm-megamenu-nav nav nav-tabs">
                                                                        <li className="nav-item">
                                                                            <Link to="#tab1" className="nav-link active" data-toggle="tab"><i className="fal fa-female" /> Rings</Link>
                                                                        </li>
                                                                        <li className="nav-item">
                                                                            <Link to="#tab2" className="nav-link" data-toggle="tab"><i className="fal fa-user" /> Earrings</Link>
                                                                        </li>
                                                                        <li className="nav-item">
                                                                            <Link to="#tab3" className="nav-link" data-toggle="tab"><i className="fal fa-baby" /> Bracelets</Link>
                                                                        </li>
                                                                        <li className="nav-item">
                                                                            <Link to="#tab4" className="nav-link" data-toggle="tab"><i className="fal fa-suitcase-rolling" /> Pendants</Link>
                                                                        </li>
                                                                        <li className="nav-item">
                                                                            <Link to="#tab5" className="nav-link" data-toggle="tab"><i className="fal fa-badge-check" /> Necklaces</Link>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="col-lg-9">
                                                                    <div className="tab-content">
                                                                        <div className="tab-pane show active" id="tab1">
                                                                            <div className="row">
                                                                                <div className="col-lg-4">
                                                                                    <div className="sigma-megamenu-navbox menu-item-has-children">
                                                                                        <h5 className="sigma-title">Shop Pages</h5>
                                                                                        <ul className="sub-menu">
                                                                                            <li className="menu-item">
                                                                                                <Link to="/shop-left">Shop Left Sidebar</Link>
                                                                                            </li>
                                                                                            <li className="menu-item">
                                                                                                <Link to="/shop-left-two">Shop Left Sidebar v2</Link>
                                                                                            </li>
                                                                                            <li className="menu-item">
                                                                                                <Link to="/shop-right">Shop Right Sidebar</Link>
                                                                                            </li>
                                                                                            <li className="menu-item">
                                                                                                <Link to="/shop-right-two">Shop Right Sidebar v2</Link>
                                                                                            </li>
                                                                                            <li className="menu-item">
                                                                                                <Link to="/shop-detail">Product Details</Link>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-lg-4">
                                                                                    <div className="sigma-megamenu-navbox menu-item-has-children">
                                                                                        <h5 className="sigma-title">Other Shop Pages</h5>
                                                                                        <ul className="sub-menu">
                                                                                            <li className="menu-item">
                                                                                                <Link to="/account">My Account</Link>
                                                                                            </li>
                                                                                            <li className="menu-item">
                                                                                                <Link to="/checkout">Checkout</Link>
                                                                                            </li>
                                                                                            <li className="menu-item">
                                                                                                <Link to="/wishlist">Wishlist</Link>
                                                                                            </li>
                                                                                            <li className="menu-item">
                                                                                                <Link to="/cart">Cart</Link>
                                                                                            </li>
                                                                                            <li className="menu-item">
                                                                                                <Link to="/login">Login</Link>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-lg-4">
                                                                                    <div className="sigma-megamenu-img">
                                                                                        <Link to="#">
                                                                                            <img src="assets/img/others/01.png" alt="img" />
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="tab-item" id="tab2">
                                                                            <div className="row">
                                                                                <div className="col-lg-3">
                                                                                    <div className="sigma-megamenu-navbox menu-item-has-children">
                                                                                        <h5 className="sigma-title">Type Of Earrings</h5>
                                                                                        <ul className="sub-menu">
                                                                                            <li className="menu-item">
                                                                                                <Link to="/shop-left">Ruby Earrings</Link>
                                                                                            </li>
                                                                                            <li className="menu-item">
                                                                                                <Link to="/shop-left-two">Emareld Earrings</Link>
                                                                                            </li>
                                                                                            <li className="menu-item">
                                                                                                <Link to="/shop-left">Saphire Earrings</Link>
                                                                                            </li>
                                                                                            <li className="menu-item">
                                                                                                <Link to="/shop-left-two">Diamond Earrings</Link>
                                                                                            </li>
                                                                                            <li className="menu-item">
                                                                                                <Link to="/shop-left">Gold Earrings</Link>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-lg-5">
                                                                                    <div className="sigma-megamenu-navbox">
                                                                                        <h5 className="sigma-title">Size</h5>
                                                                                        <div className="row mb-3">
                                                                                            <div className="col-md-6 menu-item-has-children">
                                                                                                <ul className="sub-menu">
                                                                                                    <li className="menu-item">
                                                                                                        <Link to="/shop-left">Hoop Earrings</Link>
                                                                                                    </li>
                                                                                                    <li className="menu-item">
                                                                                                        <Link to="/shop-left-two">Dangle Earrings</Link>
                                                                                                    </li>
                                                                                                    <li className="menu-item">
                                                                                                        <Link to="/shop-left">Stud Earrings</Link>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                            <div className="col-md-6 menu-item-has-children">
                                                                                                <ul className="sub-menu">
                                                                                                    <li className="menu-item">
                                                                                                        <Link to="/shop-left-two">Barbell Earrings</Link>
                                                                                                    </li>
                                                                                                    <li className="menu-item">
                                                                                                        <Link to="/shop-left">Huggy Earrings</Link>
                                                                                                    </li>
                                                                                                    <li className="menu-item">
                                                                                                        <Link to="/shop-left-two">Ear Thread Earrings</Link>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <h5 className="sigma-title">Top Picks</h5>
                                                                                        <div className="row">
                                                                                            <div className="col-md-6 menu-item-has-children">
                                                                                                <ul className="sub-menu">
                                                                                                    <li className="menu-item">
                                                                                                        <Link to="/shop-detail">Jiara Blessing</Link>
                                                                                                    </li>
                                                                                                    <li className="menu-item">
                                                                                                        <Link to="/shop-detail">Hentry Firana</Link>
                                                                                                    </li>
                                                                                                    <li className="menu-item">
                                                                                                        <Link to="/shop-detail">Lucrative Li</Link>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                            <div className="col-md-6 menu-item-has-children">
                                                                                                <ul className="sub-menu">
                                                                                                    <li className="menu-item">
                                                                                                        <Link to="/shop-detail">Mirana Go</Link>
                                                                                                    </li>
                                                                                                    <li className="menu-item">
                                                                                                        <Link to="/shop-detail">Fira Diamond Ring</Link>
                                                                                                    </li>
                                                                                                    <li className="menu-item">
                                                                                                        <Link to="/shop-detail">Fanir Lo</Link>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-lg-4">
                                                                                    <div className="sigma-megamenu-img">
                                                                                        <Link to="#">
                                                                                            <img src="assets/img/others/02.png" alt="img" />
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="tab-item" id="tab3">
                                                                            <div className="row">
                                                                                <div className="col-lg-8">
                                                                                    <div className="sigma-megamenu-navbox">
                                                                                        <h5 className="sigma-title">Type Of Earrings</h5>
                                                                                        <div className="row">
                                                                                            <div className="col-md-3">
                                                                                                <div className="sigma-megamenu-image">
                                                                                                    <Link to="/shop-left">
                                                                                                        <img src="assets/img/others/b-1.png" alt="img" />
                                                                                                        <span>Ruby</span>
                                                                                                    </Link>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-md-3">
                                                                                                <div className="sigma-megamenu-image">
                                                                                                    <Link to="/shop-left">
                                                                                                        <img src="assets/img/others/b-2.png" alt="img" />
                                                                                                        <span>Emarald</span>
                                                                                                    </Link>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-md-3">
                                                                                                <div className="sigma-megamenu-image">
                                                                                                    <Link to="/shop-left-two">
                                                                                                        <img src="assets/img/others/b-3.png" alt="img" />
                                                                                                        <span>Saphire</span>
                                                                                                    </Link>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-md-3">
                                                                                                <div className="sigma-megamenu-image">
                                                                                                    <Link to="/shop-left">
                                                                                                        <img src="assets/img/others/b-4.png" alt="img" />
                                                                                                        <span>Diamond</span>
                                                                                                    </Link>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-md-3">
                                                                                                <div className="sigma-megamenu-image">
                                                                                                    <Link to="/shop-left-two">
                                                                                                        <img src="assets/img/others/b-5.png" alt="img" />
                                                                                                        <span>Topaz</span>
                                                                                                    </Link>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-md-3">
                                                                                                <div className="sigma-megamenu-image">
                                                                                                    <Link to="/shop-left">
                                                                                                        <img src="assets/img/others/b-6.png" alt="img" />
                                                                                                        <span>Amber</span>
                                                                                                    </Link>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-md-3">
                                                                                                <div className="sigma-megamenu-image">
                                                                                                    <Link to="/shop-left-two">
                                                                                                        <img src="assets/img/others/b-7.png" alt="img" />
                                                                                                        <span>Gold</span>
                                                                                                    </Link>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-md-3">
                                                                                                <div className="sigma-megamenu-image">
                                                                                                    <Link to="/shop-left">
                                                                                                        <img src="assets/img/others/b-8.png" alt="img" />
                                                                                                        <span>Silver</span>
                                                                                                    </Link>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-lg-4">
                                                                                    <div className="sigma-megamenu-navbox">
                                                                                        <h5 className="sigma-title">Top picks</h5>
                                                                                        <div className="row mb-4">
                                                                                            <div className="col-md-6 menu-item-has-children">
                                                                                                <ul className="sub-menu">
                                                                                                    <li className="menu-item">
                                                                                                        <Link to="/shop-detail">Jiara Blessing</Link>
                                                                                                    </li>
                                                                                                    <li className="menu-item">
                                                                                                        <Link to="/shop-detail">Hentry Firana</Link>
                                                                                                    </li>
                                                                                                    <li className="menu-item">
                                                                                                        <Link to="/shop-detail">Lucrative Li</Link>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                            <div className="col-md-6 menu-item-has-children">
                                                                                                <ul className="sub-menu">
                                                                                                    <li className="menu-item">
                                                                                                        <Link to="/shop-detail">Mirana Go</Link>
                                                                                                    </li>
                                                                                                    <li className="menu-item">
                                                                                                        <Link to="/shop-detail">Fira Diamond Ring</Link>
                                                                                                    </li>
                                                                                                    <li className="menu-item">
                                                                                                        <Link to="/shop-detail">Fanir Lo</Link>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <h5 className="sigma-title">Shape</h5>
                                                                                        <div className="row">
                                                                                            <div className="col-md-12 menu-item-has-children">
                                                                                                <ul className="sub-menu">
                                                                                                    <li className="menu-item">
                                                                                                        <Link to="/shop-detail">Lira Jo</Link>
                                                                                                    </li>
                                                                                                    <li className="menu-item">
                                                                                                        <Link to="/shop-detail">Fandi Hambi</Link>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="tab-item" id="tab4">
                                                                            <div className="row">
                                                                                <div className="col-lg-8">
                                                                                    <div className="sigma-megamenu-navbox">
                                                                                        <h5 className="sigma-title">Pendants Articles <Link to="/blog-grid">View All</Link></h5>
                                                                                        <div className="row">
                                                                                            <div className="col-md-3">
                                                                                                <div className="sigma-blog-block">
                                                                                                    <img src="assets/img/others/news-1.png" alt="img" />
                                                                                                    <p>Gold Pendants </p>
                                                                                                    <Link to="/blog-detail">View Post</Link>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-md-3">
                                                                                                <div className="sigma-blog-block">
                                                                                                    <img src="assets/img/others/news-2.png" alt="img" />
                                                                                                    <p>Gold Pendants </p>
                                                                                                    <Link to="/blog-detail">View Post</Link>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-md-3">
                                                                                                <div className="sigma-blog-block">
                                                                                                    <img src="assets/img/others/news-3.png" alt="img" />
                                                                                                    <p>Gold Pendants </p>
                                                                                                    <Link to="/blog-detail">View Post</Link>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-md-3">
                                                                                                <div className="sigma-blog-block">
                                                                                                    <img src="assets/img/others/news-4.png" alt="img" />
                                                                                                    <p>Gold Pendants </p>
                                                                                                    <Link to="/blog-detail">View Post</Link>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-lg-4">
                                                                                    <div className="sigma-megamenu-navbox menu-item-has-children">
                                                                                        <h5 className="sigma-title">Collections</h5>
                                                                                        <ul className="sub-menu">
                                                                                            <li className="menu-item">
                                                                                                <Link to="/blog-detail">Vivamus suscipit tortor eget</Link>
                                                                                            </li>
                                                                                            <li className="menu-item">
                                                                                                <Link to="/blog-detail">Vivamus suscipit tortor eget</Link>
                                                                                            </li>
                                                                                            <li className="menu-item">
                                                                                                <Link to="/blog-detail">Vivamus suscipit tortor eget</Link>
                                                                                            </li>
                                                                                            <li className="menu-item">
                                                                                                <Link to="/blog-detail">Vivamus suscipit tortor eget</Link>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="tab-item" id="tab5">
                                                                            <div className="row justify-content-center">
                                                                                <div className="col">
                                                                                    <div className="sigma-megamenu-img">
                                                                                        <Link to="#">
                                                                                            <img src="assets/img/others/a-1.png" alt="img" />
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col">
                                                                                    <div className="sigma-megamenu-img">
                                                                                        <Link to="#">
                                                                                            <img src="assets/img/others/a-2.png" alt="img" />
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col">
                                                                                    <div className="sigma-megamenu-img">
                                                                                        <Link to="#">
                                                                                            <img src="assets/img/others/a-3.png" alt="img" />
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col">
                                                                                    <div className="sigma-megamenu-img">
                                                                                        <Link to="#">
                                                                                            <img src="assets/img/others/a-4.png" alt="img" />
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col">
                                                                                    <div className="sigma-megamenu-img">
                                                                                        <Link to="#">
                                                                                            <img src="assets/img/others/a-5.png" alt="img" />
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="menu-item">
                                                    <Link to="/shop-left">
                                                        Diamond
                    </Link>
                                                </li>
                                                <li className="menu-item menu-item-has-children">
                                                    <Link to="#">
                                                        Blog
                    </Link>
                                                    <ul className="sub-menu">
                                                        <li className="menu-item"> <Link to="/blog-grid-sidebar">Blog Grid Sidebar</Link>
                                                        </li>
                                                        <li className="menu-item"> <Link to="/blog-detail">Blog Details</Link>
                                                        </li>
                                                        <li className="menu-item"> <Link to="/blog-grid">Blog Grid</Link>
                                                        </li>
                                                        <li className="menu-item"> <Link to="/blog-list">Blog List</Link>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="site-logo site-logo-text">
                                                    <Link to="/">
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" >
                                                            <path d="M369.853,250.251l-100-241C267.53,3.65,262.062,0,255.999,0s-11.531,3.65-13.854,9.251l-100,241    c-1.527,3.681-1.527,7.817,0,11.498l100,241c2.323,5.601,7.791,9.251,13.854,9.251s11.531-3.65,13.854-9.251l100-241    C371.381,258.068,371.381,253.932,369.853,250.251z M255.999,457.861L172.239,256l83.76-201.861L339.759,256L255.999,457.861z" fill="#ffffff" />
                                                            <path className="diamond-spark spark-1" d="M139.606,118.393l-63-63c-5.858-5.857-15.356-5.857-21.213,0c-5.858,5.858-5.858,15.356,0,21.213l63,63    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394C145.465,133.748,145.465,124.25,139.606,118.393z" fill="#ffffff" />
                                                            <path className="diamond-spark spark-2" d="M456.607,55.393c-5.858-5.857-15.356-5.857-21.213,0l-63,63c-5.858,5.858-5.858,15.356,0,21.213    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394l63-63C462.465,70.748,462.465,61.25,456.607,55.393z" fill="#ffffff" />
                                                            <path className="diamond-spark spark-3" d="M139.606,372.393c-5.858-5.857-15.356-5.857-21.213,0l-63,63c-5.858,5.858-5.858,15.356,0,21.213    C58.322,459.535,62.16,461,65.999,461s7.678-1.465,10.607-4.394l63-63C145.465,387.748,145.465,378.25,139.606,372.393z" fill="#ffffff" />
                                                            <path className="diamond-spark spark-4" d="M456.607,435.393l-63-63c-5.858-5.857-15.356-5.857-21.213,0c-5.858,5.858-5.858,15.356,0,21.213l63,63    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394C462.465,450.748,462.465,441.25,456.607,435.393z" fill="#ffffff" />
                                                        </svg>
                                                        <div className="site-logo-text">
                                                            <h3>Laramiss</h3>
                                                            <h6>Luxury Pieces</h6>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className="menu-item">
                                                    <Link to="/shop-left">
                                                        Accessories
                    </Link>
                                                </li>
                                                <li className="menu-item menu-item-has-children">
                                                    <Link to="#">
                                                        Pages
                    </Link>
                                                    <ul className="sub-menu">
                                                        <li className="menu-item">
                                                            <Link to="/about">About</Link>
                                                        </li>
                                                        <li className="menu-item">
                                                            <Link to="/classification">Classification</Link>
                                                        </li>
                                                        <li className="menu-item">
                                                            <Link to="/account">Account</Link>
                                                        </li>
                                                        <li className="menu-item menu-item-has-children">
                                                            <Link to="/gallery">Gallery</Link>
                                                            <ul className="sub-menu">
                                                                <li className="menu-item">
                                                                    <Link to="/gallery">Gallery 2 Columns</Link>
                                                                </li>
                                                                <li className="menu-item">
                                                                    <Link to="/gallery-two">Gallery 3 Columns</Link>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li className="menu-item">
                                                            <Link to="/team">Team</Link>
                                                        </li>
                                                        <li className="menu-item">
                                                            <Link to="/typography">Typography</Link>
                                                        </li>
                                                        <li className="menu-item">
                                                            <Link to="/error">Error 404</Link>
                                                        </li>
                                                        <li className="menu-item">
                                                            <Link to="/coming-soon">Coming Soon</Link>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="menu-item menu-item-has-children">
                                                    <Link to="/about">
                                                        Shop
                    </Link>
                                                    <ul className="sub-menu">
                                                        <li className="menu-item">
                                                            <Link to="/shop-left">Shop Left Sidebar</Link>
                                                        </li>
                                                        <li className="menu-item">
                                                            <Link to="/shop-left-two">Shop Left Sidebar v2</Link>
                                                        </li>
                                                        <li className="menu-item">
                                                            <Link to="/shop-right">Shop Right Sidebar</Link>
                                                        </li>
                                                        <li className="menu-item">
                                                            <Link to="/shop-right-two">Shop Right Sidebar v2</Link>
                                                        </li>
                                                        <li className="menu-item">
                                                            <Link to="/shop-detail">Product Details</Link>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="menu-item">
                                                    <Link to="/contact">
                                                        Contact
                    </Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                {/* from pushed-item */}
                                <div className="nav-pushed-item" />
                            </div>
                            {/* Site Logo */}
                            <div className="site-logo site-logo-text d-block d-lg-none">
                                <Link to="/">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve">
                                        <path d="M369.853,250.251l-100-241C267.53,3.65,262.062,0,255.999,0s-11.531,3.65-13.854,9.251l-100,241    c-1.527,3.681-1.527,7.817,0,11.498l100,241c2.323,5.601,7.791,9.251,13.854,9.251s11.531-3.65,13.854-9.251l100-241    C371.381,258.068,371.381,253.932,369.853,250.251z M255.999,457.861L172.239,256l83.76-201.861L339.759,256L255.999,457.861z" fill="#ffffff" />
                                        <path className="diamond-spark spark-1" d="M139.606,118.393l-63-63c-5.858-5.857-15.356-5.857-21.213,0c-5.858,5.858-5.858,15.356,0,21.213l63,63    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394C145.465,133.748,145.465,124.25,139.606,118.393z" fill="#ffffff" />
                                        <path className="diamond-spark spark-2" d="M456.607,55.393c-5.858-5.857-15.356-5.857-21.213,0l-63,63c-5.858,5.858-5.858,15.356,0,21.213    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394l63-63C462.465,70.748,462.465,61.25,456.607,55.393z" fill="#ffffff" />
                                        <path className="diamond-spark spark-3" d="M139.606,372.393c-5.858-5.857-15.356-5.857-21.213,0l-63,63c-5.858,5.858-5.858,15.356,0,21.213    C58.322,459.535,62.16,461,65.999,461s7.678-1.465,10.607-4.394l63-63C145.465,387.748,145.465,378.25,139.606,372.393z" fill="#ffffff" />
                                        <path className="diamond-spark spark-4" d="M456.607,435.393l-63-63c-5.858-5.857-15.356-5.857-21.213,0c-5.858,5.858-5.858,15.356,0,21.213l63,63    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394C462.465,450.748,462.465,441.25,456.607,435.393z" fill="#ffffff" />
                                    </svg>
                                    <div className="site-logo-text">
                                        <h3>Laramiss</h3>
                                        <h6>Luxury Pieces</h6>
                                    </div>
                                </Link>
                            </div>
                            {/* Navbar Toggler */}
                            <div className="sigma-mobile-header">
                                <div className="container">
                                    <div className="sigma-mobile-header-inner">
                                        <div className="sigma-hamburger-menu" onClick={this.toggleClass}>
                                            <div className={classNames("sigma-menu-btn", { "active": this.state.togglemethod })}>
                                                <span />
                                                <span />
                                                <span />
                                            </div>
                                        </div >
                                    </div>
                                </div>
                            </div >
                            {/* Mobile Menu Start */}
                            <aside className={classNames("sigma-mobile-menu", { "active": this.state.togglemethod })}>
                                <Mobilemenu />
                            </aside >
                            {/* Mobile Menu End */}
                        </div >
                    </div >
                </header >
                <div className={classNames("offcanvas-wrapper", { "show-offcanvas": this.state.classmethod })}>
                    <div className={classNames("offcanvas-overly", { "show-overly": this.state.classmethod })} onClick={this.removeClass} />
                    <div className="offcanvas-widget">
                        <Link to="#" className="offcanvas-close" onClick={this.removeClass} ><i className="fal fa-times" /></Link>
                        <Canvas />
                    </div >
                </div >
            </Fragment >
        );
    }
}

export default Headertwo;