import React from 'react';
import ReactBootstrapSlider from "react-bootstrap-slider";

function ProductFilterTop(props) {
    return (
        <div className="product-filter-top">
            <div className="widget tag-widget">
                <h5 className="widget-title">Weight</h5>
                <div id="testing"></div>
                <ReactBootstrapSlider
                value={props.weightRange}
                change={props.weightRangeChanged}

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