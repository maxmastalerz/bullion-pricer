import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames'

import logo from '../../assets/img/logo-bullion-pricer.png';
import Canvas from './Canvas';
import Mobilemenu from './Mobilemenu';
import SelectCurrency from '../SelectCurrency';
import { formatNumber } from '../../helper/formatting';
import { changeCurrency } from '../../features/spotSettings/spotSettingsSlice';

function Header() {
    const dispatch = useDispatch();

    const [classmethod, setClassmethod] = useState(false);
    const [togglemethod, setTogglemethod] = useState(false);
    const [isTop, setIsTop] = useState(false);
    
    const [silverSpotPrice, setSilverSpotPrice] = useState(0);
    const [goldSpotPrice, setGoldSpotPrice] = useState(0);
    const [palladiumSpotPrice, setPalladiumSpotPrice] = useState(0);
    const [platinumSpotPrice, setPlatinumSpotPrice] = useState(0);

    const currency = useSelector((state) => state.spotSettings.currencyCode);

    const onChangeCurrency = (e) => {
        dispatch(changeCurrency(e.target.value));
        window.localStorage.setItem('currencySelected', e.target.value);
    }

    const removeClass = () => {
        setClassmethod(false);
    }
    const toggleClass = () => {
        setTogglemethod(!togglemethod);
    }
    const onScroll = () => {
        setIsTop(window.scrollY > (52.4+(90/2)) );
    }

    useEffect(() => {

        window.addEventListener('scroll', onScroll, false);

        return function() {
            window.removeEventListener('scroll', onScroll, false);
        }
    }, []);

    useEffect(() => {
        const params = new URLSearchParams({ currency: currency });

        fetch(`/api/spotPrices?${params.toString()}`)
        .then((response) => response.json())
        .then((results) => {
            if(results.error) {
                console.log(results.error);
            } else if(results.data) {
                //console.log(results.data);
                setSilverSpotPrice(Object.values(results.data.filter((el) => el.symbol==="AG")[0].price)[0]);
                setGoldSpotPrice(Object.values(results.data.filter((el) => el.symbol==="AU")[0].price)[0]);
                setPalladiumSpotPrice(Object.values(results.data.filter((el) => el.symbol==="PD")[0].price)[0]);
                setPlatinumSpotPrice(Object.values(results.data.filter((el) => el.symbol==="PT")[0].price)[0]);
            }            
        });
    }, [currency]);

    return (
        <>
            <header className={`header-three header-absolute sticky-header sigma-header ${isTop ? 'sticky-active' : ''}`} id="header">
                <div className="header-top">
                    <div className="container-fluid container-custom-three">
                        <ul className="header-top-info spot-prices">
                            { (silverSpotPrice !== null) && <li className="spot-price"><span>Silver</span> {formatNumber(silverSpotPrice)} <span>{currency}</span></li> }
                            { (goldSpotPrice !== null) && <li className="spot-price"><span>Gold</span> {formatNumber(goldSpotPrice)} <span>{currency}</span></li> }
                            { (palladiumSpotPrice !== null) && <li className="spot-price"><span>Palladium</span> {formatNumber(palladiumSpotPrice)} <span>{currency}</span></li> }
                            { (platinumSpotPrice !== null) && <li className="spot-price"><span>Platinum</span> {formatNumber(platinumSpotPrice)} <span>{currency}</span></li> }
                        </ul>
                        <SelectCurrency onChange={onChangeCurrency} value={currency} />
                    </div>
                </div>
                <div className="main-menu-area sticky-header">
                    <div className="container-fluid container-custom-three">
                        <div className="nav-container d-flex align-items-center justify-content-between">
                            {/* Site Logo */}
                            <div className="site-logo site-logo-text">
                                <Link to="/">
                                    <img src={logo} alt="The logo of BullionPricer featuring a spider and gold" style={{ height: '70px' }}/>
                                    <div className="site-logo-text">
                                        <h3>BullionPricer</h3>
                                        <h6>Gold, Silver, and More</h6>
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
                                                    {/*<li className="menu-item">
                                                        <Link to="/shop-left">
                                                            Dealer Reviews
                                                        </Link>
                                                    </li>
                                                    <li className="menu-item">
                                                        <Link to="/shop-left">
                                                            Charts
                                                        </Link>
                                                    </li>*/}
                                                    <li className="menu-item">
                                                        <Link to="/about">
                                                            About
                                                        </Link>
                                                    </li>
                                                    <li className="menu-item">
                                                        <Link to="/faq">
                                                            FAQ
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
                            <div className="sigma-hamburger-menu" onClick={toggleClass}>
                                <div className={classNames("sigma-menu-btn", { "active": togglemethod })}>
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
                <aside className={classNames("sigma-mobile-menu", { "active": togglemethod })}>
                    <Mobilemenu
                        onChangeCurrency={onChangeCurrency}
                        currency={currency}
                        spotPrices={{silverSpotPrice,goldSpotPrice,palladiumSpotPrice,platinumSpotPrice}}
                    />
                </aside >
                {/* Mobile Menu End */}
            </header >
            <div className={classNames("offcanvas-wrapper", { "show-offcanvas": classmethod })}>
                <div className={classNames("offcanvas-overly", { "show-overly": classmethod })} onClick={removeClass} />
                <div className="offcanvas-widget">
                    <Link to="#" className="offcanvas-close" onClick={removeClass} ><i className="fal fa-times" /></Link>
                    <Canvas />
                </div >
            </div >
            <div className="header-offset" />
        </>

    );
}

export default Header;