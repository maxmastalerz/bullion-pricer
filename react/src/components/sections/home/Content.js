import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../layouts/Pagination';
import ProductFilterLeft from '../../layouts/ProductFilterLeft';
import ProductFilterTop from '../../layouts/ProductFilterTop';

import img1 from '../../../assets/img/shop/01.jpg';
import img2 from '../../../assets/img/shop/02.jpg';
import img3 from '../../../assets/img/shop/03.jpg';

/* All prices are stored and processed as USD by us. */
/* Only if a user selects a different currency do we calculate the exchange price. */
const shopgridpost = [
    { img: img1, title: '1 oz 2022 Canadian Maple Leaf Silver Coin | Royal Canadian Mint', price: 390, dealer: 'Silver Gold Bull', mint: 'Royal Canadian Mint' },
    { img: img2, title: '100 oz Pure Assorted Silver Bar', price: 290, dealer: 'Canadian PMX', mint: 'Various' },
    { img: img3, title: '1 gram Platinum Bar | Valcambi', price: 450, dealer: 'Canadian PMX', mint: 'Valcambi' },

    { img: img1, title: '1 oz Fortuna Platinum Bar | PAMP Suisse', price: 780, dealer: 'Silver Gold Bull', mint: 'PAMP Suisse' },
    { img: img2, title: 'PAMP SUISSE GOLD BAR, 10 GRAM .9999', price: 290, dealer: 'Canadian PMX', mint: 'PAMP Suisse' },
    { img: img3, title: '1 kg | kilo Johnson Matthey Silver Bar', price: 890, dealer: 'Silver Gold Bull', mint: 'Johnson Matthey' },

    { img: img1, title: '1 oz Random Year Canadian Maple Leaf Gold Coin | Royal Canadian Mint', price: 580, dealer: 'Silver Gold Bull', mint: 'Royal Canadian Mint' },
    { img: img2, title: '10 oz Silver Bar | Royal Canadian Mint', price: 290, dealer: 'Canadian PMX', mint: 'Royal Canadian Mint' },
    { img: img3, title: '1 kg | Kilo Heraeus Silver Bar', price: 800, dealer: 'Canadian PMX', mint: 'Heraeus' }
];

const productTypes = [
    { id: 'gold', text: 'Gold'},
    { id: 'silver', text: 'Silver' },
    { id: 'platinum', text: 'Platinum' }
];

const productSpecifics = [
    { id: '99999', text: '99999' },
    { id: '9999', text: '9999' },
    { id: '999', text: '999' },
    { id: '925', text: '925' },
    { id: 'less_than_or_equal_90', text: '≤ 90' },
    { id: 'government_issued', text: 'Government Issued' },
    { id: 'not_government_issued', text: 'Not Government Issued' }
];

const paymentPreferences = [
    { id: 'check', text: 'Check'},
    { id: 'wire', text: 'Wire'},
    { id: 'cash', text: 'Cash (In-person)'},
    { id: 'electronicbill', text: 'Electronic Bill'},
    { id: 'bankdraft', text: 'Bank Draft'},
    { id: 'crypto', text: 'Crypto'},
    { id: 'creditcard', text: 'Credit Card'},
    { id: 'paypal', text: 'PayPal'},
]

function Content() {
    const [productTypesSelected, setProductTypesSelected] = useState(['gold']);
    const [productSpecificsSelected, setProductSpecificsSelected] = useState(['99999','9999','government_issued','not_government_issued']);
    const [paymentPreferencesSelected, setPaymentPreferencesSelected] = useState(['check']);
    const [bulkPricingDiscounts, setBulkPricingDiscounts] = useState(false);
    const [bulkPricingCouldBuy, setBulkPricingCouldBuy] = useState(5);
    //const [shippingDiscounts, setShippingDiscounts] = useState(false);
    const [weightRange, setWeightRange] = useState([58.33, 75]);
    const [sortBy, setSortBy] = useState(1);

    const productTypesChanged = (e) => {
        let productTypeClicked = e.target.getAttribute("data-product-type");
        if(e.target.classList.contains('selected')) {
            setProductTypesSelected(productTypesSelected.filter(item => item !== productTypeClicked));
        } else {
            setProductTypesSelected([...productTypesSelected, productTypeClicked]);
        }
    };

    const updateProductSpecificsFilter = (e) => {
        if(e.target.checked) {
            setProductSpecificsSelected([...productSpecificsSelected, e.target.name]);
        } else {
            let purityOptions = ['99999','9999','999','925','less_than_or_equal_90'];
            let governmentNotGovernmentOptions = ['government_issued','not_government_issued'];
            
            let purityOptionsSelected = productSpecificsSelected.filter(item => purityOptions.includes(item));
            let governmentNotGovernmentOptionsSelected = productSpecificsSelected.filter(item => governmentNotGovernmentOptions.includes(item));

            // If a purity option is selected for unchecking
            if(purityOptions.includes(e.target.name)) {
                if(purityOptionsSelected.length > 1) { // and it's not the last purity option remaining, allowing unchecking
                    setProductSpecificsSelected(productSpecificsSelected.filter(item => item !== e.target.name));
                }
            } else if(governmentNotGovernmentOptions.includes(e.target.name)) { // If a government / non government option is selected for unchecking
                if(governmentNotGovernmentOptionsSelected.length === 1) { //if last government/not government checkbox clicked, toggle
                    let productSpecificsSel = productSpecificsSelected.slice(); // duplicate

                    if(e.target.name === "government_issued") {
                        productSpecificsSel[productSpecificsSelected.indexOf('government_issued')] = "not_government_issued";
                    } else {
                        productSpecificsSel[productSpecificsSelected.indexOf('not_government_issued')] = "government_issued";
                    }
                    
                    setProductSpecificsSelected(productSpecificsSel);
                    return;
                }
                setProductSpecificsSelected(productSpecificsSelected.filter(item => item !== e.target.name)); //uncheck
            }
        }
    };

    const updatePaymentPreferences = (e) => {
        if(e.target.checked) {
            setPaymentPreferencesSelected([e.target.name]);
        } else {
            setPaymentPreferencesSelected(paymentPreferencesSelected.filter(item => item !== e.target.name));
        }
    };

    const accountForBulkPricingChanged = (e) => {
        if(bulkPricingDiscounts) {
            setBulkPricingDiscounts(false);
            return;
        }
        setBulkPricingDiscounts(true);
    };

    const bulkPricingCouldBuyChanged = (e) => {
        setBulkPricingCouldBuy(e.target.value);
    };

    /*const accountForShippingChanged = (e) => {
        if (shippingDiscounts) {
            setShippingDiscounts(false);
            return;
        }
        setShippingDiscounts(true);
    };*/

    const weightRangeChanged = (e) => {
        setWeightRange([e.target.value[0], e.target.value[1]]); // Set min and max for bullion weight range
    };

    /*
    Let's map a slider position(percentage) to its actual weight in grams
    @arg pos Position in the slider is a percentage.
    */
    const weightRangePosToGrams = (pos) => {
        let rangeToGramMap = {"0":1,"8.33":2,"16.67":3.11,"25":5,"33.33":7.78,"41.67":10,"50":15.55,"58.33":31.1,"66.67":155.52,"75":311.04,"83.33":1000,"91.67":3110.35,"100":31103.5};
        return rangeToGramMap[pos];
    };

    const changeSortBy = (e) => {
        setSortBy(e.target.value);
    };

    /*
    The JSON response from our API has the qtyRange [someLow,Infinity] converted to [someLow,null] as JSON does not support Infinity.
    This function converts the null back to Infinity.
    */
    const convertQtyRangeNullToInfinity = (arr) => {
        return arr.map(obj => {
            for(let prop in obj.pricing) {
                if(obj.pricing[prop].qtyRange[1] === null) {
                    obj.pricing[prop].qtyRange[1] = Infinity;
                }
            }
            return obj;
        });
    };

    useEffect(() => {
        let weightStart = weightRangePosToGrams(weightRange[0]);
        let weightEnd = weightRangePosToGrams(weightRange[1]);
        let bulkPricingCouldBuyAdjusted = bulkPricingDiscounts ? bulkPricingCouldBuy : 1;

        const params = new URLSearchParams({
            productTypesSelected: productTypesSelected,
            productSpecificsSelected: productSpecificsSelected,
            paymentPreferencesSelected: paymentPreferencesSelected,
            bulkPricingCouldBuy: bulkPricingCouldBuyAdjusted,
            weightRange: [weightStart, weightEnd]
        });

        fetch(`/api/products?${params.toString()}`)
        .then((response) => response.json())
        .then((data) => {
            data = convertQtyRangeNullToInfinity(data); // JSON doesn't support Infinity, let's add it back.
            console.log(data);
        });

    }, [productTypesSelected, bulkPricingDiscounts, bulkPricingCouldBuy, productSpecificsSelected, paymentPreferencesSelected, weightRange, sortBy]);

    return (
        <section className="Shop-section pt-shop-section pb-120">
            <div className="container">
                <div className="row justify-content-center">
                    {/* Shop Sidebar */}
                    <div className="col-lg-4 col-md-10 col-sm-10">
                        <ProductFilterLeft
                            productTypesChanged={productTypesChanged}
                            productTypes={productTypes}
                            productTypesSelected={productTypesSelected}
                            updateProductSpecificsFilter={updateProductSpecificsFilter}
                            productSpecifics={productSpecifics}
                            productSpecificsSelected={productSpecificsSelected}
                            updatePaymentPreferences={updatePaymentPreferences}
                            paymentPreferences={paymentPreferences}
                            paymentPreferencesSelected={paymentPreferencesSelected}
                            accountForBulkPricingChanged={accountForBulkPricingChanged}
                            bulkPricingCouldBuyChanged={bulkPricingCouldBuyChanged}
                            bulkPricingDiscounts={bulkPricingDiscounts}
                            bulkPricingCouldBuy={bulkPricingCouldBuy}
                        />
                    </div>
                    <div className="col-lg-8 col-md-10">
                        <ProductFilterTop
                            weightRangeChanged={weightRangeChanged}
                            weightRange={weightRange}
                        />

                        <div className="shop-products-wrapper pt-shop-section">
                            <div className="shop-product-top">
                                <p>Showing 1 To 9 Of 60 results</p>
                                <div className="sorting-box">
                                    <select className="nice-select" onChange={changeSortBy}>
                                        <option value={1}>Sort By Price:Low to High</option>
                                        <option value={2}>Sort By Price:High to Low</option>
                                        <option value={3}>Sort By Dealer:Ascending</option>
                                        <option value={4}>Sort By Dealer:Descending</option>
                                        <option value={5}>Sort By Mint:Ascending</option>
                                        <option value={6}>Sort By Mint:Descending</option>
                                    </select>
                                </div>
                            </div>
                            <div className="product-wrapper restaurant-tab-area">
                                <div className="row">
                                    {shopgridpost.map((item, i) => (
                                        <div key={i} className="col-lg-4 col-md-6">
                                            <div className="food-box shop-box">
                                                <div className="thumb">
                                                    <img src={item.img} alt="" />
                                                    <div className="button-group">
                                                        <Link to="#"><i className="far fa-heart" /></Link>
                                                        <Link to="#"><i className="far fa-sync-alt" /></Link>
                                                        <Link to="#"><i className="far fa-eye" /></Link>
                                                    </div>
                                                </div>
                                                <div className="desc">
                                                    <h4>
                                                        <Link to="/shop-detail">{item.title}</Link>
                                                    </h4>
                                                    <span className="price">
                                                        ${item.price}
                                                    </span>
                                                    <span className="mint">
                                                        <span> {item.mint} </span>
                                                    </span><br/>
                                                    <span className="dealer">
                                                        <span> {item.dealer} </span>
                                                    </span>
                                                    <Link to="/shop-detail" className="link"><i className="fal fa-arrow-right" /></Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="pagination-wrap">
                            <Pagination />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Content;