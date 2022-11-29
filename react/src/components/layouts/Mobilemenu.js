import React, { Component } from 'react';
import { Link } from 'react-router-dom'

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
        id: 4,
        linkText: 'About Us',
        link: '/about'
    },
    {
        id: 5,
        linkText: 'Contact',
        link: '/contact'
    }
]
class Mobilemenu extends Component {
    render() {
        return (
            <ul className="sigma-main-menu">
                {navigationmenu.length > 0 ? navigationmenu.map((item, i) => (
                    <li key={i} className={"menu-item"}>
                        <Link to={item.link}> {item.linkText} </Link>
                    </li>
                )) : null}
            </ul >
        );
    }
}

export default Mobilemenu;