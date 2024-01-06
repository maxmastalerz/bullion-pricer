import React from 'react';
import { Link } from 'react-router-dom';

// Cart loop
/*const cartposts = [
    { img: 'http://via.placeholder.com/80x80', title: 'Oak Wood Cutting Board', price: '2x 10,000$' },
    { img: 'http://via.placeholder.com/80x80', title: 'Oak Wood Cutting Board', price: '2x 10,000$' },
    { img: 'http://via.placeholder.com/80x80', title: 'Oak Wood Cutting Board', price: '2x 10,000$' },
    { img: 'http://via.placeholder.com/80x80', title: 'Oak Wood Cutting Board', price: '2x 10,000$' },
];*/

const MainMenu = ({setClassmethod, toggleClass}) => {
    //const [togglecart, setTogglecart] = useState(false);

    const addClass = () => {
        setClassmethod(true);
    }
    /*const toggleCartm = () => {
        setTogglecart(!togglecart);
    }*/

    return (
        <>
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
                                        <Link to="/dealer-reviews">
                                            Dealer Reviews
                                        </Link>
                                    </li>
                                    <li className="menu-item">
                                        <Link to="/charts">
                                            Charts
                                        </Link>
                                    </li>*/}
                                    <li className="menu-item menu-item-has-children">
                                        <Link to="#">Info<i className="fa fa-caret-down" /></Link>
                                        <ul className="sub-menu">
                                            <li className="menu-item">
                                                <Link to="/about">About</Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link to="/faq">FAQ</Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link to="/contact">Contact</Link>
                                            </li>
                                        </ul>
                                    </li>

                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="menu-right-buttons">
                
                {/*<div className="toggle dropdown-btn">
                    <span className="sigma-notification">0</span>
                    <Link to="#" onClick={toggleCartm}><i className="fal fa-shopping-bag" /></Link>
                    <div className={classNames("dropdown-menu cart-dropdown-menu", { "show": togglecart })}>
                        <ul className="cart-items-box">
                            {cartposts.map((item, i) => (
                                <li key={i} className="cart-item">
                                    <div className="img">
                                        <img src={item.img} alt="img" />
                                    </div>
                                    <div className="content">
                                        <h5><Link to="#">{item.title}</Link></h5>
                                        <p>{item.price}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="cart-items-box">
                            <div className="cart-item">
                                <span>Subtotal</span>
                                <span>20,0000</span>
                            </div>
                            <div className="cart-item actions">
                                <button type="button" className="main-btn btn-filled">Checkout</button>
                                <button type="button" className="main-btn btn-borderd">View Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="search">
                    <Link to="#" className="search-icon" id="searchBtn">
                        <i className="fal fa-search open-icon" />
                        <i className="fal fa-times close-icon" />
                    </Link>
                    <div className="search-form">
                        <form action="#">
                            <input type="text" placeholder="Search your keyword..." />
                            <button type="submit"><i className="far fa-search" /></button>
                        </form>
                    </div>
                </div>*/}

                <div className="">
                    <Link to="#" id="loginBtn" onClick={toggleClass}><i className="fal fa-cog" /></Link>
                </div>
                <div className="toggle d-lg-none">
                    <Link to="#" id="offCanvasBtn" onClick={addClass}> <i className="fal fa-bars" /></Link>
                </div>

            </div>

        </>
    );
};

export default MainMenu;