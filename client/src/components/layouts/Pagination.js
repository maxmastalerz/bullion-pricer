import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Pagination extends Component {
    render() {
        return (
            <ul>
                <li><Link to="#"><i className="far fa-angle-double-left" /></Link></li>
                <li className="active"><Link to="#">1</Link></li>
                <li><Link to="#">2</Link></li>
                <li><Link to="#">3</Link></li>
                <li><Link to="#">...</Link></li>
                <li><Link to="#">10</Link></li>
                <li><Link to="#"><i className="far fa-angle-double-right" /></Link></li>
            </ul>
        );
    }
}

export default Pagination;