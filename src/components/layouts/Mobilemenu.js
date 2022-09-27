import React, { Component } from 'react';
import { Link } from 'react-router-dom'

const navigationmenu = [
    {
        id: 1,
        linkText: 'Home',
        child: true,
        submenu: [
            {
                id: 11,
                link: '/',
                linkText: 'Home 1'
            },
            {
                id: 12,
                link: '/home-two',
                linkText: 'Home 2'
            },
            {
                id: 13,
                link: '/home-three',
                linkText: 'Home 3'
            },
            {
                id: 14,
                link: '/home-four',
                linkText: 'Home 4'
            },
        ]
    },
    {
        id: 2,
        linkText: 'Shop',
        child: true,
        submenu: [
            {
                id: 21,
                link: '/shop-left',
                linkText: 'Shop Left Sidebar'
            },
            {
                id: 22,
                link: '/shop-left-two',
                linkText: 'Shop Left Sidebar v2'
            },
            {
                id: 23,
                link: '/shop-right',
                linkText: 'Shop Right Sidebar'
            },
            {
                id: 24,
                link: '/shop-right-two',
                linkText: 'Shop Right Sidebar v2'
            },
            {
                id: 25,
                link: '/shop-detail',
                linkText: 'Product Details'
            },
            {
                id: 26,
                link: '/account',
                linkText: 'My Account'
            },
            {
                id: 27,
                link: '/checkout',
                linkText: 'Checkout'
            },
            {
                id: 28,
                link: '/wishlist',
                linkText: 'Wishlist'
            },
            {
                id: 29,
                link: '/cart',
                linkText: 'Cart'
            },
            {
                id: 210,
                link: '/login',
                linkText: 'Login'
            },
        ]
    },
    {
        id: 3,
        linkText: 'Blog',
        child: true,
        submenu: [
            {
                id: 31,
                link: '/blog-grid-sidebar',
                linkText: 'Blog Grid Sidebar'
            },
            {
                id: 32,
                link: '/blog-detail',
                linkText: 'Blog Details'
            },
            {
                id: 33,
                link: '/blog-grid',
                linkText: 'Blog Grid'
            },
            {
                id: 34,
                link: '/blog-list',
                linkText: 'Blog List'
            },
        ]
    },
    {
        id: 4,
        linkText: 'Pages',
        child: true,
        submenu: [
            {
                id: 41,
                link: '/classification',
                linkText: 'Classification'
            },
            {
                id: 42,
                link: '/account',
                linkText: 'Account'
            },
            {
                id: 43,
                link: '/gallery',
                linkText: 'Gallery'
            },
            {
                id: 44,
                link: '/team',
                linkText: 'Team'
            },
            {
                id: 45,
                link: '/error',
                linkText: 'Error 404'
            },
            {
                id: 46,
                link: '/coming-soon',
                linkText: 'Coming Soon'
            },
            {
                id: 47,
                link: '/typography',
                linkText: 'Typography'
            },
        ]
    },
    {
        id: 5,
        linkText: 'About',
        link: '/about'
    },
    {
        id: 6,
        linkText: 'Contact',
        link: '/contact'
    },
    {
        id: 7,
        linkText: 'Diamond',
        link: '/shop-left'
    },
    {
        id: 8,
        linkText: 'Accessories',
        link: '/shop-left'
    },

]
class Mobilemenu extends Component {
    getNextSibling = function (elem, selector) {
        // Get the next sibling element
        var sibling = elem.nextElementSibling;
        // If there's no selector, return the first sibling
        if (!selector) return sibling;
        // If the sibling matches our selector, use it
        // If not, jump to the next sibling and continue the loop
        while (sibling) {
            if (sibling.matches(selector)) return sibling;
            sibling = sibling.nextElementSibling
        }
    }
    triggerChild = (e) => {
        let subMenu = '';
        subMenu = (this.getNextSibling(e.target, '.sub-menu') !== undefined) ? this.getNextSibling(e.target, '.sub-menu') : null;
        if (subMenu !== null && subMenu !== undefined && subMenu !== '') {
            subMenu.classList = subMenu.classList.contains('d-block') ? 'sub-menu' : 'sub-menu d-block';
        }
    }
    render() {
        return (
            <ul className="sigma-main-menu">
                {navigationmenu.length > 0 ? navigationmenu.map((item, i) => (
                    <li key={i} className={`menu-item ${item.child ? 'menu-item-has-children' : ''} `} onClick={this.triggerChild}>
                        {item.child ? <Link onClick={e => e.preventDefault()} to="/"> {item.linkText} </Link> : <Link to={item.link}> {item.linkText} </Link>}
                        {item.child ?
                            <ul className="sub-menu" role="menu">
                                {item.submenu.map((sub_item, i) => (
                                    <li key={i} className={`menu-item ${sub_item.child ? 'menu-item-has-children' : ''} `}>
                                        {sub_item.child ? <Link onClick={e => e.preventDefault()} to="/"> {sub_item.linkText} </Link> : <Link to={sub_item.link}> {sub_item.linkText} </Link>}
                                        {sub_item.submenu ?
                                            <ul className="sub-menu">
                                                {sub_item.submenu.map((third_item, i) => (
                                                    <li className="menu-item" key={i}><Link
                                                        to={third_item.link}>{third_item.linkText}</Link>
                                                    </li>
                                                ))}
                                            </ul> : null}
                                    </li>
                                ))}
                            </ul>
                            : null
                        }
                    </li>
                )) : null}
            </ul >
        );
    }
}

export default Mobilemenu;