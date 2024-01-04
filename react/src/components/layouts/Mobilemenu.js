import React from 'react';
import { Link } from 'react-router-dom';
import SelectCurrency from '../SelectCurrency';
import { formatNumber } from '../../helper/formatting';

const navigationmenu = [
    {
        id: 1,
        linkText: 'Home',
        link: '/'
    },
    /*{
        id: 2,
        linkText: 'Dealer Reviews',
        link: '/dealer-reviews'
    },
    {
        id: 3,
        linkText: 'Charts',
        link: '/charts',
    },*/
    {
        id: 2,
        linkText: 'About',
        link: '/about'
    },
    {
        id: 3,
        linkText: 'FAQ',
        link: '/faq'
    },
    {
        id: 4,
        linkText: 'Contact',
        link: '/contact'
    }
]
const Mobilemenu = ({ onChangeCurrency, currency, spotPrices }) => {

    return (
        <>
            <div className="spot-prices-mobile-menu-widget">
                <ul className="spot-prices">
                    { (spotPrices.silverSpotPrice !== null) && <li className="spot-price"><span>Silver</span> {formatNumber(spotPrices.silverSpotPrice)} <span>{currency}</span></li> }
                    { (spotPrices.goldSpotPrice !== null) && <li className="spot-price"><span>Gold</span> {formatNumber(spotPrices.goldSpotPrice)} <span>{currency}</span></li> }
                    { (spotPrices.palladiumSpotPrice !== null) && <li className="spot-price"><span>Palladium</span> {formatNumber(spotPrices.palladiumSpotPrice)} <span>{currency}</span></li> }
                    { (spotPrices.platinumSpotPrice !== null) && <li className="spot-price"><span>Platinum</span> {formatNumber(spotPrices.platinumSpotPrice)} <span>{currency}</span></li> }
                </ul>
                <SelectCurrency onChange={onChangeCurrency} value={currency} />
            </div>

            <ul className="sigma-main-menu">
                {navigationmenu.length > 0 ? navigationmenu.map((item, i) => (
                    <li key={i} className={"menu-item"}>
                        <Link to={item.link}> {item.linkText} </Link>
                    </li>
                )) : null}
            </ul >
        </>
    );
};

export default Mobilemenu;