import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';


function ProductFilterLeft(props) {
    return (
        <div className="product-filter-left">
            <div className="widget tag-widget mb-40">
                <h5 className="widget-title">Product Type</h5>
                <button className="toggleLogicOperator" data-operating-on="product-type" onClick={(e) => props.toggleLogicalOperator(e)}>XOR</button>
                <ul>
                    {props.productTypes.map((el, i) => (
                        <React.Fragment key={i}>
                            <li onClick={(e) => props.productTypesChanged(e)}>
                                <Link className={props.productTypesSelected.includes(el.id) ? 'selected' : ''} data-product-type={el.id} to="#">{el.text}</Link>
                            </li>
                            { i%2===1 && i!==props.productTypes.length-1 && <br /> }
                        </React.Fragment>
                    ))}
                </ul>

                <br/>
                <h5 className="widget-title">Purity</h5>
                <button className="toggleLogicOperator" data-operating-on="purities" onClick={(e) => props.toggleLogicalOperator(e)}>XOR</button>
                <div className="filter-color purities">
                    {props.purities.map((el, i) => (
                        <label key={i} className="checkbox">
                            <input type="checkbox" name={el.id} onChange={props.puritiesChanged} checked={props.puritiesSelected.includes(el.id) ? 'checked' : ''}/>
                            <span className="custom-box" />
                            {el.text}
                        </label>
                    ))}
                </div>

                <br/>
                <h5 className="widget-title">Issuance</h5>
                <button className="toggleLogicOperator" data-operating-on="issuance" onClick={(e) => props.toggleLogicalOperator(e)}>XOR</button>
                <div className="filter-color">
                    {props.issuance.map((el, i) => (
                        <label key={i} className="checkbox">
                            <input type="checkbox" name={el.id} onChange={props.issuanceChanged} checked={props.issuanceSelected.includes(el.id) ? 'checked' : ''}/>
                            <span className="custom-box" />
                            {el.text}
                        </label>
                    ))}
                </div>

                <br/>

                <h5 className="widget-title">Payment Preferences</h5>
                <div className="filter-color">
                    {props.paymentPreferences.map((el, i) => (
                        <label key={i} className="checkbox">
                            <input type="checkbox" name={el.id} onChange={props.updatePaymentPreferences} checked={props.paymentPreferencesSelected.includes(el.id) ? 'checked' : ''}/>
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
                                    <option value={3}>3</option>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
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