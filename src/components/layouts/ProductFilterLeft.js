import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ppimg1 from '../../assets/img/recent-post-wid/04.png';
import ppimg2 from '../../assets/img/recent-post-wid/05.png';
import ppimg3 from '../../assets/img/recent-post-wid/06.png';

import insta1 from '../../assets/img/instagram-wid/01.jpg';
import insta2 from '../../assets/img/instagram-wid/02.jpg';
import insta3 from '../../assets/img/instagram-wid/03.jpg';
import insta4 from '../../assets/img/instagram-wid/04.jpg';
import insta5 from '../../assets/img/instagram-wid/05.jpg';
import insta6 from '../../assets/img/instagram-wid/06.jpg';
import insta7 from '../../assets/img/instagram-wid/07.jpg';
import insta8 from '../../assets/img/instagram-wid/08.jpg';
import insta9 from '../../assets/img/instagram-wid/09.jpg';

const productTypes = [
    { name: 'Gold', type: 'gold' },
    { name: 'Silver', type: 'silver' },
    { name: 'Platinum', type: 'platinum' }
];

const productSpecifics = [
    { name: '99999' },
    { name: '9999' },
    { name: '999' },
    { name: '925' },
    { name: '≤ 90' },
    { name: 'Government Issued Tender' }
];





function ProductFilterLeft() {
    const [productTypesSelected, setProductTypesSelected] = useState(['gold']);

    function clicked(e) {
        let productTypeClicked = e.target.getAttribute("data-product-type");
        if(e.target.classList.contains('selected')) {
            setProductTypesSelected(productTypesSelected.filter(item => item !== productTypeClicked));
        } else {
            setProductTypesSelected([...productTypesSelected, productTypeClicked]);
        }
    }

    return (
        <div className="product-filter-left">
            <div className="widget tag-widget">
                <h5 className="widget-title">Product Type</h5>
                <ul>
                    {productTypes.map((el, i) => (
                        <li key={i} onClick={(e) => clicked(e)}>
                            <Link className={productTypesSelected.includes(el.type) ? 'selected' : ''} data-product-type={el.type} to="#">{el.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="widget socail-widget mb-40">
                <h5 className="widget-title">Product Specifics</h5>
                <div className="filter-color">
                    <form>
                        {productSpecifics.map((el, i) => (
                            <label key={i} className="checkbox">
                                <input type="checkbox" name="#" />
                                <span className="custom-box" />
                                {el.name}
                            </label>
                        ))}
                    </form>
                </div>
            </div>

        </div>
    );
}

export default ProductFilterLeft;