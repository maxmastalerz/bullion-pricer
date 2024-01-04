import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Pagination from '../../layouts/Pagination';
import ProductFilterLeft from '../../layouts/ProductFilterLeft';
import ProductFilterTop from '../../layouts/ProductFilterTop';

const productTypes = [
    { id: 'gold', text: 'Gold'},
    { id: 'silver', text: 'Silver' },
    { id: 'platinum', text: 'Platinum' },
    { id: 'palladium', text: 'Palladium' }
];

const purities = [
    { id: '99999', text: '99999' },
    { id: '999', text: '999' },
    { id: '9999', text: '9999' },
    { id: '925', text: '925' },
    { id: '9995', text: '9995' },
    { id: 'less_than_or_equal_90', text: '≤ 90' },
]

const issuance = [
    { id: 'government_issued', text: 'Government' },
    { id: 'not_government_issued', text: 'Private' }
];

const paymentPreferences = [
    { id: 'check', text: 'Check'},
    { id: 'wire', text: 'Wire'},
    { id: 'cash', text: 'Physical Cash'},
    { id: 'billpayment', text: 'Bill Payment'},
    { id: 'bankdraft', text: 'Bank Draft'},
    { id: 'creditcard', text: 'Credit Card'},
    { id: 'paypal', text: 'PayPal'},
]

function Content() {
    const [productTypesOperator, setProductTypesOperator] = useState('XOR');
    const [productTypesSelected, setProductTypesSelected] = useState(['gold','silver','platinum','palladium']);
    const [puritiesOperator, setPuritiesOperator] = useState('XOR');
    const [puritiesSelected, setPuritiesSelected] = useState(['99999','9999','9995','999','925','less_than_or_equal_90']);
    const [issuanceOperator, setIssuanceOperator] = useState('XOR');
    const [issuanceSelected, setIssuanceSelected] = useState(['government_issued','not_government_issued']);
    const [paymentPreferencesSelected, setPaymentPreferencesSelected] = useState(['check']);
    const [bulkPricingDiscounts, setBulkPricingDiscounts] = useState(false);
    const [bulkPricingCouldBuy, setBulkPricingCouldBuy] = useState(5);
    //const [shippingDiscounts, setShippingDiscounts] = useState(false);
    const [weightRange, setWeightRange] = useState([58.33, 75]);
    const [sortBy, setSortBy] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const currency = useSelector((state) => state.spotSettings.currencyCode);
    const pageSize = 6;

    const toggleLogicalOperator = (e) => {
        let logicalOperatorOn = e.target.getAttribute("data-operating-on");
        let toggleTo;

        if(e.target.innerText === "XOR") {
            toggleTo = "AND";
        } else {
            toggleTo = "XOR";
        }
        e.target.innerText = toggleTo;

        if(logicalOperatorOn === "product-type") {
            setProductTypesOperator(toggleTo);
        } else if(logicalOperatorOn === "purities") {
            setPuritiesOperator(toggleTo);
        } else if(logicalOperatorOn === "issuance") {
            setIssuanceOperator(toggleTo);
        }
    };

    const productTypesChanged = (e) => {
        let productTypeClicked = e.target.getAttribute("data-product-type");
        if(e.target.classList.contains('selected')) { //if selected for unchecking
            if(productTypesSelected.length > 1) { // and it's not the last metal type remaining, allow unchecking
                setProductTypesSelected(productTypesSelected.filter(item => item !== productTypeClicked));
            }
        } else {
            setProductTypesSelected([...productTypesSelected, productTypeClicked]);
        }
    };

    const puritiesChanged = (e) => {
        if(e.target.checked) {
            setPuritiesSelected([...puritiesSelected, e.target.name]);
        } else {
            if(puritiesSelected.length > 1) { // if it's not the last purity option remaining, allowing unchecking
                setPuritiesSelected(puritiesSelected.filter(item => item !== e.target.name));
            }
        }
    };

    const issuanceChanged = (e) => {
        if(e.target.checked) {
            setIssuanceSelected([...issuanceSelected, e.target.name]);
        } else { // If selected for unchecking
            if(issuanceSelected.length === 1) { //if last government/not government checkbox clicked, toggle
                if(e.target.name === "government_issued") {//['999','government_issued']
                    setIssuanceSelected(['not_government_issued']);
                } else {
                    setIssuanceSelected(['government_issued']);
                }

                return;
            }
            setIssuanceSelected(issuanceSelected.filter(item => item !== e.target.name)); //uncheck
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
            productTypesOperator: productTypesOperator,
            productTypesSelected: productTypesSelected,
            puritiesOperator: puritiesOperator,
            puritiesSelected: puritiesSelected,
            issuanceOperator: issuanceOperator,
            issuanceSelected: issuanceSelected,
            paymentPreferencesSelected: paymentPreferencesSelected,
            bulkPricingCouldBuy: bulkPricingCouldBuyAdjusted,
            weightRange: [weightStart, weightEnd],
            sortBy: sortBy,
            currentPage: currentPage,
            currency: currency
        });
        console.log(params.toString());

        fetch(`/api/products?${params.toString()}`)
        .then((response) => response.json())
        .then((results) => {
            if(results.data) {
                let products = results.data;
                console.log(products);

                let totalCountToSet = (products[0].totalCount.length === 1) ? products[0].totalCount[0].count : 0;
                setTotalCount(totalCountToSet);
                products = convertQtyRangeNullToInfinity(products[0].totalData); // JSON doesn't support Infinity, let's add it back.
                setSearchResults(products);

                // If someone was viewing their results on page 3, then changed their filter to something with less results
                // where two pages are available, we force set them to the last page of search results.
                let maxPage = Math.max(Math.ceil(totalCountToSet/pageSize),1);
                if(maxPage < currentPage) {
                    setCurrentPage(maxPage);
                }
            }
        });

    }, [
        productTypesOperator,
        productTypesSelected,
        puritiesOperator,
        puritiesSelected,
        issuanceOperator,
        issuanceSelected,
        paymentPreferencesSelected,
        bulkPricingDiscounts,
        bulkPricingCouldBuy,
        weightRange,
        sortBy,
        currentPage,
        currency
    ]);

    return (
        <section className="Shop-section pt-shop-section pb-45">
            <div className="container">
                <div className="row justify-content-center">
                    {/* Shop Sidebar */}
                    <div className="col-lg-4 col-md-10">
                        <ProductFilterLeft
                            toggleLogicalOperator={toggleLogicalOperator}
                            productTypesChanged={productTypesChanged}
                            productTypes={productTypes}
                            productTypesSelected={productTypesSelected}
                            puritiesChanged={puritiesChanged}
                            purities={purities}
                            puritiesSelected={puritiesSelected}
                            issuanceChanged={issuanceChanged}
                            issuance={issuance}
                            issuanceSelected={issuanceSelected}
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
                                    <p><span className="less-than-equal-575">Pg.</span><span className="more-than-575">Showing page</span> {currentPage} of {Math.ceil(totalCount/pageSize)}</p>
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
                                            <div key={i} className="col-lg-4 col-sm-6 mb-4">
                                                <div className="food-box shop-box ">
                                                    <div className="desc">
                                                        <h4>
                                                            <a href={item.url}>{item.title}</a>
                                                        </h4>
                                                        <span className="price">
                                                            <a href={item.url}>${item.pricing[Object.keys(item.pricing)[0]].price}</a>
                                                        </span>
                                                        <span className="mint">
                                                            Mint: {item.mint}
                                                        </span><br/>
                                                        <span className="dealer">
                                                            Dealer: {item.dealer}
                                                        </span>
                                                        <a href={item.url} className="link"><i className="fal fa-arrow-right" /></a>
                                                    </div>
                                                    <fieldset className={item.productType}>
                                                        <legend>{(item.productType+"").toUpperCase()}</legend>
                                                    </fieldset>
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