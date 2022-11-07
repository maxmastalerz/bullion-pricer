import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Tags
const tags = [
    { title: 'Rings' },
    { title: 'earrings' },
    { title: 'necklace' },
    { title: 'bracelets' },
    { title: 'wedding ring' },
    { title: 'bangles' },
    { title: 'hard ring' },
    { title: 'ankle bracelet' },
    { title: 'silver bracelet' },
    { title: 'earring' },
    { title: 'copper bracelet' },
    { title: 'tech' },
];
class Shopsidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                {/* Popular Tags Widget */}
                <div className="widget tag-widget">
                    <h5 className="widget-title">Popular Tags</h5>
                    <ul>
                        {tags.map((item, i) => (
                            <li key={i}><Link to="#">{item.title}</Link></li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Shopsidebar;