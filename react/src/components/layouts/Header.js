import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import logo from '../../assets/img/logo-bullion-pricer.png';
import MobileOnlyMenu from './MobileOnlyMenu';
import Settings from './Settings';
import MainMenu from './MainMenu';
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

    const [containerType, setContainerType] = useState('');

    const currency = useSelector((state) => state.spotSettings.currencyCode);

    const onChangeCurrency = (e) => {
        dispatch(changeCurrency(e.target.value));
        window.localStorage.setItem('currencySelected', e.target.value);
    }

    const removeClass = () => {
        setClassmethod(false);
    }
    const removeToggleClass = () => {
        setTogglemethod(false);
    }
    const toggleClass = () => {
        setTogglemethod(!togglemethod);
    }
    const onScroll = () => {
        setIsTop(window.scrollY > (52.4+(90/2)) );
    }

    useEffect(() => {

        const handleResize = () => {
            if (window.innerWidth <= 991) {
                setContainerType('container');
            } else {
                setContainerType('container-fluid');
            }
        };

        // Initial check on mount
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', onScroll, false);

        return function() {
            window.removeEventListener('scroll', onScroll, false);
            window.removeEventListener('resize', handleResize);
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
                        <ul className="header-top-info spot-prices d-inline-block">
                            <span className="spot-price-grouper">
                            { (silverSpotPrice !== null) && <li className="spot-price"><span>Silver</span> {formatNumber(silverSpotPrice)} <span>{currency}</span></li> }
                            { (goldSpotPrice !== null) && <li className="spot-price"><span>Gold</span> {formatNumber(goldSpotPrice)} <span>{currency}</span></li> }
                            </span>
                            <span className="spot-price-grouper">
                            { (palladiumSpotPrice !== null) && <li className="spot-price"><span>Palladium</span> {formatNumber(palladiumSpotPrice)} <span>{currency}</span></li> }
                            { (platinumSpotPrice !== null) && <li className="spot-price"><span>Platinum</span> {formatNumber(platinumSpotPrice)} <span>{currency}</span></li> }
                            </span>
                        </ul>
                        <SelectCurrency onChange={onChangeCurrency} value={currency} />
                    </div>
                </div>
                <div className="main-menu-area sticky-header">
                    <div className={containerType + " container-custom-three"}>
                        <div className="nav-container d-flex align-items-center justify-content-between">
                            
                            <div className="site-logo site-logo-text">
                                <Link to="/">
                                    <img src={logo} alt="The logo of BullionPricer featuring a spider and gold" />
                                    <div className="site-logo-text">
                                        <h3>BullionPricer</h3>
                                        <h6>Gold, Silver, and More</h6>
                                    </div>
                                </Link>
                            </div>

                            <MainMenu setClassmethod={setClassmethod} toggleClass={toggleClass}/>


                        </div >
                    </div >
                </div >
            </header >
            <div className={classNames("offcanvas-wrapper", { "show-offcanvas": classmethod })}>
                <div className={classNames("offcanvas-overly", { "show-overly": classmethod })} onClick={removeClass} />
                <div className="offcanvas-widget">
                    <Link to="#" className="offcanvas-close" onClick={removeClass} ><i className="fal fa-times" /></Link>
                    <MobileOnlyMenu />
                </div >
            </div >
            <div className={classNames("offcanvas-wrapper", { "show-offcanvas": togglemethod })}>
                <div className={classNames("offcanvas-overly", { "show-overly": togglemethod })} onClick={removeToggleClass} />
                <div className="offcanvas-widget">
                    <Link to="#" className="offcanvas-close" onClick={removeToggleClass} ><i className="fal fa-times" /></Link>
                    <Settings/>
                </div >
            </div >
            <div className="header-offset" />
        </>

    );
}

export default Header;