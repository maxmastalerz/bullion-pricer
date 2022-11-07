import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';


function ProductFilterLeft(props) {
    return (
        <div className="product-filter-left">
            <div className="widget tag-widget">
                <h5 className="widget-title">Product Type</h5>
                <ul>
                    {props.productTypes.map((el, i) => (
                        <li key={i} onClick={(e) => props.productTypesChanged(e)}>
                            <Link className={props.productTypesSelected.includes(el.id) ? 'selected' : ''} data-product-type={el.id} to="#">{el.text}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="widget socail-widget mb-40">
                <h5 className="widget-title">Product Specifics</h5>
                <div className="filter-color">
                    {props.productSpecifics.map((el, i) => (
                        <label key={i} className="checkbox">
                            <input type="checkbox" name={el.id} onChange={props.updateProductSpecificsFilter} checked={props.productSpecificsSelected.includes(el.id) ? 'checked' : ''}/>
                            <span className="custom-box" />
                            {el.text}
                        </label>
                    ))}
                </div>
                
                <br/>

                <h5 className="widget-title">Other Settings</h5>

                <div className="filter-color">
                    <label className="checkbox">
                        <input type="checkbox" onChange={props.accountForBulkPricingChanged} />
                        <span className="custom-box"  />
                        Account for Bulk Pricing Discounts
                    </label>
                </div>
                <Collapse in={props.bulkPricingDiscounts}>
                    <div>
                        How many items could you buy?
                        <div className="filter-highlight">
                            <div className="dropdown-filter-left-sidebar">
                                <select className="nice-select" defaultValue={props.bulkPricingCouldBuy} onChange={props.bulkPricingCouldBuyChanged}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </Collapse>
                
                {/*
                <div className="filter-color">
                    <label className="checkbox">
                        <input type="checkbox" onChange={accountForShippingChanged} />
                        <span className="custom-box" />
                        Account for Shipping Discounts
                    </label>
                </div>
                <Collapse in={shippingDiscounts}>
                    <div className="filter-highlight">
                        TODO: NOT YET IMPLEMENTED...
                    </div>
                </Collapse>
                */}

            </div>
        </div>
    );
}

export default ProductFilterLeft;