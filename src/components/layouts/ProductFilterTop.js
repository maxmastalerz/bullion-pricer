import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactBootstrapSlider from "react-bootstrap-slider";

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
function ProductFilterTop() {

    /*
                ticks = {[1, 2, 3.11, 5]}
                ticks_positions = {[0, 40, 62.2, 100]}
                ticks_labels = {["1g", "2g", "1/10 tr. oz", "5g"]}
    */

    return (
        <div className="product-filter-top">
            <div className="widget tag-widget">
                <h5 className="widget-title">Weight</h5>
                <div id="testing"></div>
                <ReactBootstrapSlider
                value={[54.55,54.55]}
                change={(e) => { console.log(e); }}
                slideStop={(e) => { console.log(e); }}

                ticks = {[0, 8.33, 16.67, 25, 33.33, 41.67, 50, 58.33, 66.67, 75, 83.33, 91.67, 100]}
                ticks_labels = {["1 g", "2 g", "1/10 oz", "5 g", "1/4 oz", "10 g", "1/2 oz", "1 oz", "5 oz", "10 oz", "1 kg", "100 oz", "1 koz"]}
                lock_to_ticks = {true}
                tooltip = {"hide"}
                />
            </div>
        </div>
    );
}

export default ProductFilterTop;