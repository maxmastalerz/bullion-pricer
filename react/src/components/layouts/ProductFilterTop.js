import React, { useState, useEffect } from 'react';
import ReactBootstrapSlider from "react-bootstrap-slider";

const ticks = [0, 8.33, 16.67, 25, 33.33, 41.67, 50, 58.33, 66.67, 75, 83.33, 91.67, 100];
const ticks_labels = ["1 g", "2 g", "1/10 oz", "5 g", "1/4 oz", "10 g", "1/2 oz", "1 oz", "5 oz", "10 oz", "1 kg", "100 oz", "1 koz"];

function ProductFilterTop(props) {
    
    const [startWeight, setStartWeight] = useState(ticks_labels[ticks.indexOf(props.weightRange[0])]);
    const [endWeight, setEndWeight] = useState(ticks_labels[ticks.indexOf(props.weightRange[1])]);

    useEffect(() => {
        setStartWeight(ticks_labels[ticks.indexOf(props.weightRange[0])]);
        setEndWeight(ticks_labels[ticks.indexOf(props.weightRange[1])]);
    }, [props.weightRange]);

    return (
        <div className="product-filter-top">
            <div className="widget tag-widget">
                <h5 className="widget-title">
                    Weight
                    { props.weightRange[0]===props.weightRange[1]
                    ? <span className="less-than-equal-575">: {startWeight}</span>
                    : <span className="less-than-equal-575">: {startWeight}  &#8212; {endWeight}</span>
                    }
                </h5>
                <div id="testing"></div>
                <ReactBootstrapSlider
                value={props.weightRange}
                change={props.weightRangeChanged}

                ticks = {ticks}
                ticks_labels = {ticks_labels}
                lock_to_ticks = {true}
                tooltip = {"hide"}
                />
            </div>
        </div>
    );
}

export default ProductFilterTop;