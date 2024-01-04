import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Counter from './Counter';

//import aboutimg from '../../../assets/img/text-block/05.jpg';
//import videobg from '../../../assets/img/text-block/04.jpg';
import logo from '../../../assets/img/logo-bullion-pricer-big.png';

function Content() {

    return (
        <Fragment>
            <section className="about-section pt-115">
                <div className="container">
                    {/*<div className="video-wrap video-wrap-two video-about mb-60" style={{ backgroundImage: "url(" + videobg + ")" }}>
                        <Link to="http://www.youtube.com/embed/watch?v=EEJFMdfraVY" className="popup-video"><i className="fas fa-play" /></Link>
                    </div>*/}
                    <div className="section-title about-title text-center">
                        <h2>BullionPricer is a Search Tool</h2>
                    </div>
                    <div className="about-text-box">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="about-text">
                                    <h3>How It Works</h3>
                                    <p className="mb-4">Approximately once every hour (on the hour), we collect prices of precious metal products from supported dealers. Once every day we check to see if these dealers have updated their product offerings. This data is made available to you in our advanced search tool. You can search for products by their:</p>
                                    <ul className="mb-4" style={{ listStyleType: "square" }}>
                                        <li>Weight ( By a range of common weights such as 1oz - 10oz )</li>
                                        <li>Product Type ( Gold, Silver, Platinum, Palladium )</li>
                                        <li>Purity ( 9999, 999, etc )</li>
                                        <li>Issuance ( Whether the mint that produced the bullion is a private company or a government entity )</li>
                                        <li>Payment Offering ( If you're specifically trying to pay with PayPal, you could filter for that. Note: This could hide products from dealers that don't take PayPal. )</li>
                                    </ul>
                                    <p className="mb-4">Outside of the basic filters, we will take into account your budget. If you're able to purchase 100 coins rather than 1, the price you pay per coin (or product) will be less. Use the "Account for Bulk Pricing Discounts" setting to take this into account. If you don't you will see prices for purchasing a single quantity of the product.</p>
                                    <p className="mb-4">With your filters set up, the products that match will show up from cheapest to most expensive. You can sort these products in a different manner through the sorting drop down. By default, the prices shown are in USD. To change this, update the currency selection in the header. If the currency is offered by the dealer you will see their actual price. If the currency isn't accepted by the dealer, a conversion will occur from USD to the whichever currency you selected.</p>
                                    
                                    <p className="mb-4"><b>Advanced Usage:</b> If you are looking for a combo product such as packaged product that comes with a 1 oz gold bar, 1 oz platinum, and 1 oz palladium, you can click the XOR operator by the product type and will turn into an AND operator that matches whichever product types you have highlighted. These operators are also available for other filters like purity, and issuance.</p>
                                    <p className="mb-4">If you have other questions, please view the <Link to="/faq">FAQ</Link> before <Link to="/contact">sending us a message</Link>.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="about-img">
                                    <img src={logo} alt="The BullionPricer logo featuring a spider with gold." />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="about-text">
                                    <h3>Origin Story</h3>
                                    <p className="mb-4">Hey it's Max! The idea of BullionPricer came about when I realised that no other bullion pricing sites let me search for the cheapest gold according to its credit card pricing. My goal at the time was to try and find a way to manufacture spending on my credit card and resell the gold / silver I purchased online in an effort to collect free flights. Unfortunately, this did not work out for me.</p>
                                    <p className="mb-4">Other features I found which were missing from other sites was the ability to account for bulk pricing discounts, as well as to filter by the purity of metal I wished to purchase. I'm happy to say that BullionPricer now does this and more!</p>
                                    <p className="mb-4">This project was started at the University of Western Ontario and is now being developed further as a hobby project. I am looking to make this everyone's go to search tool for precious metals.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Counter/>
        </Fragment>
    );
}

export default Content;