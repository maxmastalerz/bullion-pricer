import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Canvas extends Component {
    render() {
        return (
            <Fragment>
                {/* Search Widget */}
                <div className="widget search-widget">
                    <h5 className="widget-title">Search room</h5>
                    <form action="#">
                        <input type="text" placeholder="Search your keyword..." />
                        <button type="submit"><i className="far fa-search" />
                        </button>
                    </form>
                </div>
                {/* About Widget */}
                <div className="widget about-widget">
                    <h5 className="widget-title">About us</h5>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia reiciendis illo ipsa asperiores, perspiciatis corrupti veritatis assumenda architecto commodi provident quas necessitatibus consequatur praesentium magnam optio deserunt fugiat repellat
      culpa.</p>
                </div>
                {/* Nav Widget */}
                <div className="widget nav-widget">
                    <h5 className="widget-title">Our pages</h5>
                    <ul>
                        <li><Link to="/about">About Us</Link>
                        </li>
                        <li><Link to="/classification">Classification</Link>
                        </li>
                        <li>
                            <Link to="/shop-left">Shop</Link>
                            <ul className="submenu">
                                <li><Link to="/shop-left">Shop Left Sidebar</Link>
                                </li>
                                <li><Link to="/shop-left-two">Shop Left Sidebar v2</Link>
                                </li>
                                <li><Link to="/shop-right">Shop Right Sidebar</Link>
                                </li>
                                <li><Link to="/shop-right-two">Shop Right Sidebar v2</Link>
                                </li>
                                <li><Link to="/shop-detail">Shop Detail</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/blog-grid">Blog</Link>
                            <ul className="submenu">
                                <li><Link to="/blog-grid-sidebar">Blog Grid Sidebar</Link>
                                </li>
                                <li><Link to="/blog-detail">Blog Details</Link>
                                </li>
                                <li><Link to="/blog-grid">Blog Grid</Link>
                                </li>
                                <li><Link to="/blog-list">Blog List</Link>
                                </li>
                            </ul>
                        </li>
                        <li><Link to="/gallery">Our Gallery</Link>
                        </li>
                        <li><Link to="/team">Team</Link>
                        </li>
                        <li><Link to="/contact">Contact Us</Link>
                        </li>
                    </ul>
                </div>
                {/* Social Link */}
                <div className="widget social-link">
                    <h5 className="widget-title">Contact with us</h5>
                    <ul>
                        <li><Link to="#"><i className="fab fa-facebook-f" /></Link>
                        </li>
                        <li><Link to="#"><i className="fab fa-twitter" /></Link>
                        </li>
                        <li><Link to="#"><i className="fab fa-behance" /></Link>
                        </li>
                        <li><Link to="#"><i className="fab fa-linkedin" /></Link>
                        </li>
                        <li><Link to="#"><i className="fab fa-google" /></Link>
                        </li>
                    </ul>
                </div>
            </Fragment>
        );
    }
}

export default Canvas;