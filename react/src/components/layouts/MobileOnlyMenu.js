import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const MobileOnlyMenu = () => {
    return (
        <Fragment>
            {/* Nav Widget */}
            <div className="widget nav-widget">
                <h5 className="widget-title">Menu</h5>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li>
                        <Link to="#">Info</Link>
                        <ul className="submenu">
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>

        </Fragment>
    );
}

export default MobileOnlyMenu;