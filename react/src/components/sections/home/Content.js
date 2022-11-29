import React, { useState, useEffect } from 'react';
import Pagination from '../../layouts/Pagination';
import ProductFilterLeft from '../../layouts/ProductFilterLeft';
import ProductFilterTop from '../../layouts/ProductFilterTop';

import goldCanadianPMX from '../../../assets/img/shop/gold-canadianPMX.png';
import silverCanadianPMX from '../../../assets/img/shop/silver-canadianPMX.png';
import platinumCanadianPMX from '../../../assets/img/shop/platinum-canadianPMX.png';
import goldBorderGold from '../../../assets/img/shop/gold-borderGold.png';
import silverBorderGold from '../../../assets/img/shop/silver-borderGold.png';
import platinumBorderGold from '../../../assets/img/shop/platinum-borderGold.png';

const imageMapping = {
    "goldCanadianPMX": goldCanadianPMX,
    "silverCanadianPMX": silverCanadianPMX,
    "platinumCanadianPMX": platinumCanadianPMX,
    "goldBorder Gold": goldBorderGold,
    "silverBorder Gold": silverBorderGold,
    "platinumBorder Gold": platinumBorderGold
}

const productTypes = [
    { id: 'gold', text: 'Gold'},
    { id: 'silver', text: 'Silver' },
    { id: 'platinum', text: 'Platinum' }
];

const productSpecifics = [
    { id: '99999', text: '99999' },
    { id: '9999', text: '9999' },
    { id: '9995', text: '9995' },
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
    const [productSpecificsSelected, setProductSpecificsSelected] = useState(['9999','9995','government_issued','not_government_issued']);
    const [paymentPreferencesSelected, setPaymentPreferencesSelected] = useState(['check']);
    const [bulkPricingDiscounts, setBulkPricingDiscounts] = useState(false);
    const [bulkPricingCouldBuy, setBulkPricingCouldBuy] = useState(5);
    //const [shippingDiscounts, setShippingDiscounts] = useState(false);
    const [weightRange, setWeightRange] = useState([58.33, 75]);
    const [sortBy, setSortBy] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const pageSize = 3;

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
            let purityOptions = ['99999','9999','9995','999','925','less_than_or_equal_90'];
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
            if(paymentPreferencesSelected.length > 1) {
                setPaymentPreferencesSelected(paymentPreferencesSelected.filter(item => item !== e.target.name));
            }
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
            let pricingDetails = obj.pricing[Object.keys(obj.pricing)[0]];
            if(pricingDetails.qtyRange[1] === null) {
                pricingDetails.qtyRange[1] = Infinity;
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
            weightRange: [weightStart, weightEnd],
            sortBy: sortBy,
            currentPage: currentPage
        });
        console.log(params.toString());

        fetch(`/api/products?${params.toString()}`)
        .then((response) => response.json())
        .then((results) => {
            console.log(results);

            let totalCountToSet = (results[0].totalCount.length === 1) ? results[0].totalCount[0].count : 0;
            setTotalCount(totalCountToSet);
            results = convertQtyRangeNullToInfinity(results[0].totalData); // JSON doesn't support Infinity, let's add it back.
            setSearchResults(results);

            // If someone was viewing their results on page 3, then changed their filter to something with less results
            // where two pages are available, we force set them to the last page of search results.
            let maxPage = Math.max(Math.ceil(totalCountToSet/pageSize),1);
            if(maxPage < currentPage) {
                setCurrentPage(maxPage);
            }
        });

    }, [
        productTypesSelected,
        bulkPricingDiscounts,
        bulkPricingCouldBuy,
        productSpecificsSelected,
        paymentPreferencesSelected,
        weightRange,
        sortBy,
        currentPage
    ]);

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
                                { (totalCount!==0) ? (
                                    <p>Showing page {currentPage} of {Math.ceil(totalCount/pageSize)}</p>
                                ) :
                                <p></p>
                                }

                                <div className="sorting-box">
                                    <select className="nice-select" onChange={changeSortBy}>
                                        <option value={0}>Sort By Price:Low to High</option>
                                        <option value={1}>Sort By Price:High to Low</option>
                                        <option value={2}>Sort By Dealer A-Z</option>
                                        <option value={3}>Sort By Dealer Z-A</option>
                                        <option value={4}>Sort By Mint A-Z</option>
                                        <option value={5}>Sort By Mint Z-A</option>
                                    </select>
                                </div>
                            </div>
                            <div className="product-wrapper restaurant-tab-area">
                                <div className="row">
                                    { searchResults.length === 0 ?
                                        (<div className="text-center w-100">
                                            <h2 className="pt-5">No results found.</h2>
                                            <h2 className="pt-5">Please widen your search.</h2>
                                        </div>)
                                    :
                                        searchResults.map((item, i) => (
                                            <div key={i} className="col-lg-4 col-md-6 mb-4">
                                                <div className="food-box shop-box">
                                                    <div className="thumb">
                                                        <a href={item.url}>
                                                            <img src={imageMapping[item.productType+item.dealer]} alt="" />
                                                        </a>
                                                    </div>
                                                    <div className="desc">
                                                        <h4>
                                                            <a href={item.url}>{item.title}</a>
                                                        </h4>
                                                        <span className="price">
                                                            <a href={item.url}>${item.pricing[Object.keys(item.pricing)[0]].price}</a>
                                                        </span>
                                                        <span className="mint">
                                                            <span>Mint: {item.mint}</span>
                                                        </span><br/>
                                                        <span className="dealer">
                                                            <span>Dealer: {item.dealer}</span>
                                                        </span>
                                                        <a href={item.url} className="link"><i className="fal fa-arrow-right" /></a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="pagination-wrap">
                            <Pagination
                                currentPage={currentPage}
                                totalCount={totalCount}
                                pageSize={pageSize}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Content;