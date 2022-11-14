import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames'
import $ from 'jquery'

import Canvas from './Canvas';
import Mobilemenu from './Mobilemenu';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classmethod: false,
            togglemethod: false,
            togglecart: false,
        };
        this.addClass = this.addClass.bind(this);
        this.removeClass = this.removeClass.bind(this);
        this.toggleClass = this.toggleClass.bind(this);
        this.toggleCartm = this.toggleCartm.bind(this);
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
    toggleCartm() {
        this.setState({
            togglecart: !this.state.togglecart
        });
    }
    onScroll = () => {
        this.setState({
            isTop: window.scrollY > 110
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
        window.addEventListener('scroll', this.onScroll, false);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }
    
    render() {
        const stickyheader = this.state.isTop ? 'sticky-active' : '';
        return (
            <>
                <header className={`header-three header-absolute sticky-header sigma-header ${stickyheader}`} id="header">
                    <div className="header-top">
                        <div className="container-fluid container-custom-three">
                            <div className="d-md-flex align-items-center justify-content-between">
                                <p className="welcome-text">Free Shipping On All Domestic Orders</p>
                                <ul className="header-top-info">
                                    <li>
                                        <i className="fal fa-Clock"> </i> Mon - Sat 9.00 - 18.00
                                    </li>
                                    <li>
                                        <i className="fal fa-Clock"> </i> Mon - Sat 9.00 - 18.00
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="main-menu-area sticky-header">
                        <div className="container-fluid container-custom-three">
                            <div className="nav-container d-flex align-items-center justify-content-between">
                                {/* Site Logo */}
                                <div className="site-logo site-logo-text">
                                    <Link to="/">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve">
                                            <path d="M369.853,250.251l-100-241C267.53,3.65,262.062,0,255.999,0s-11.531,3.65-13.854,9.251l-100,241    c-1.527,3.681-1.527,7.817,0,11.498l100,241c2.323,5.601,7.791,9.251,13.854,9.251s11.531-3.65,13.854-9.251l100-241    C371.381,258.068,371.381,253.932,369.853,250.251z M255.999,457.861L172.239,256l83.76-201.861L339.759,256L255.999,457.861z" fill="#ffffff" />
                                            <path className="diamond-spark spark-1" d="M139.606,118.393l-63-63c-5.858-5.857-15.356-5.857-21.213,0c-5.858,5.858-5.858,15.356,0,21.213l63,63    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394C145.465,133.748,145.465,124.25,139.606,118.393z" fill="#ffffff" />
                                            <path className="diamond-spark spark-2" d="M456.607,55.393c-5.858-5.857-15.356-5.857-21.213,0l-63,63c-5.858,5.858-5.858,15.356,0,21.213    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394l63-63C462.465,70.748,462.465,61.25,456.607,55.393z" fill="#ffffff" />
                                            <path className="diamond-spark spark-3" d="M139.606,372.393c-5.858-5.857-15.356-5.857-21.213,0l-63,63c-5.858,5.858-5.858,15.356,0,21.213    C58.322,459.535,62.16,461,65.999,461s7.678-1.465,10.607-4.394l63-63C145.465,387.748,145.465,378.25,139.606,372.393z" fill="#ffffff" />
                                            <path className="diamond-spark spark-4" d="M456.607,435.393l-63-63c-5.858-5.857-15.356-5.857-21.213,0c-5.858,5.858-5.858,15.356,0,21.213l63,63    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394C462.465,450.748,462.465,441.25,456.607,435.393z" fill="#ffffff" />
                                        </svg>
                                        <div className="site-logo-text">
                                            <h3>PreciousPricer</h3>
                                            <h6>Bullion Aggregator</h6>
                                        </div>
                                    </Link>
                                </div>
                                {/* Main Menu */}
                                <div className="nav-menu d-lg-flex align-items-center justify-content-between">
                                    {/* Navbar Close Icon */}
                                    <div className="navbar-close">
                                        <div className="cross-wrap"><span className="top" /><span className="bottom" /></div>
                                    </div>
                                    {/* Mneu Items */}
                                    <div className="sigma-header-nav">
                                        <div className="container">
                                            <div className="sigma-header-nav-inner">
                                                <nav>
                                                    <ul className="sigma-main-menu">
                                                        <li className="menu-item menu-item-has-children">
                                                            <Link to="/">
                                                                Home
                                                            </Link>
                                                        </li>
                                                        <li className="menu-item">
                                                            <Link to="/shop-left">
                                                                Dealer Reviews
                                                            </Link>
                                                        </li>
                                                        <li className="menu-item">
                                                            <Link to="/shop-left">
                                                                Charts
                                                            </Link>
                                                        </li>
                                                        <li className="menu-item">
                                                            <Link to="/about">
                                                                About Us
                                                            </Link>
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
                                    </div>
                                </div>
                                
                            </div >
                        </div >
                    </div >
                    {/* Mobile Header Start */}
                    <div className="sigma-mobile-header" >
                        <div className="container">
                            <div className="sigma-mobile-header-inner">
                                {/* Site Logo */}
                                <div className="site-logo site-logo-text">
                                    <Link to="/">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve">
                                            <path d="M369.853,250.251l-100-241C267.53,3.65,262.062,0,255.999,0s-11.531,3.65-13.854,9.251l-100,241    c-1.527,3.681-1.527,7.817,0,11.498l100,241c2.323,5.601,7.791,9.251,13.854,9.251s11.531-3.65,13.854-9.251l100-241    C371.381,258.068,371.381,253.932,369.853,250.251z M255.999,457.861L172.239,256l83.76-201.861L339.759,256L255.999,457.861z" fill="#ffffff" />
                                            <path className="diamond-spark spark-1" d="M139.606,118.393l-63-63c-5.858-5.857-15.356-5.857-21.213,0c-5.858,5.858-5.858,15.356,0,21.213l63,63    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394C145.465,133.748,145.465,124.25,139.606,118.393z" fill="#ffffff" />
                                            <path className="diamond-spark spark-2" d="M456.607,55.393c-5.858-5.857-15.356-5.857-21.213,0l-63,63c-5.858,5.858-5.858,15.356,0,21.213    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394l63-63C462.465,70.748,462.465,61.25,456.607,55.393z" fill="#ffffff" />
                                            <path className="diamond-spark spark-3" d="M139.606,372.393c-5.858-5.857-15.356-5.857-21.213,0l-63,63c-5.858,5.858-5.858,15.356,0,21.213    C58.322,459.535,62.16,461,65.999,461s7.678-1.465,10.607-4.394l63-63C145.465,387.748,145.465,378.25,139.606,372.393z" fill="#ffffff" />
                                            <path className="diamond-spark spark-4" d="M456.607,435.393l-63-63c-5.858-5.857-15.356-5.857-21.213,0c-5.858,5.858-5.858,15.356,0,21.213l63,63    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394C462.465,450.748,462.465,441.25,456.607,435.393z" fill="#ffffff" />
                                        </svg>
                                        <div className="site-logo-text">
                                            <h3>PreciousPricer</h3>
                                            <h6>Bullion Aggregator</h6>
                                        </div>
                                    </Link>
                                </div>
                                <div className="sigma-hamburger-menu" onClick={this.toggleClass}>
                                    <div className={classNames("sigma-menu-btn", { "active": this.state.togglemethod })}>
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                </div >
                            </div >
                        </div >
                    </div >
                    {/* Mobile Header End */}
                    {/* Mobile Menu Start */}
                    <aside className={classNames("sigma-mobile-menu", { "active": this.state.togglemethod })}>
                        <Mobilemenu />
                    </aside >
                    {/* Mobile Menu End */}
                </header >
                <div className={classNames("offcanvas-wrapper", { "show-offcanvas": this.state.classmethod })}>
                    <div className={classNames("offcanvas-overly", { "show-overly": this.state.classmethod })} onClick={this.removeClass} />
                    <div className="offcanvas-widget">
                        <Link to="#" className="offcanvas-close" onClick={this.removeClass} ><i className="fal fa-times" /></Link>
                        <Canvas />
                    </div >
                </div >
                <div className="header-offset" />
            </>

        );
    }
}

export default Header;