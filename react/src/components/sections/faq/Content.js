import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Card, Button  } from 'react-bootstrap';

class Content extends Component {
    render() {
        return (
            <section className="faq-section pt-115 pb-45">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="faq-wrapper">
                                <Accordion className="mb-60">
                                    <Card>
                                        <Accordion.Collapse eventKey="0" className="collapseparent">
                                            <Card.Body>
                                                At the moment we are only supporting <a href="https://canadianpmx.com/">CanadianPMX</a> and <a href="https://bordergold.com/">BorderGold</a>. This website is a currently a minimum viable product. We have many more important updates to bring before we expand out to other dealers. If this website receives a bit of interest, I will expand out to more dealers. If you would like a certain site to be prioritized, <Link to="/contact">contact me</Link> with your suggestion. 
                                            </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                Why do you only support 2 Dealers?
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                    <Card>
                                        <Accordion.Collapse eventKey="1" className="collapseparent">
                                            <Card.Body>
                                                This will not be the case in the future. We currently don't classify combo products, yet the search functionality has been implemented. Even when we start classifying these products, there are simply not that many combo products to display.
                                            </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                Using the "AND" operator does not yield results!
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                    <Card>
                                        <Accordion.Collapse eventKey="2" className="collapseparent">
                                            <Card.Body>
                                                Honestly, just think of this as an "OR" if you are unsure of its meaning. We specifically use <a href="https://en.wikipedia.org/wiki/Exclusive_or">XOR</a> as we do not want combo products appearing in your single product search. Showing combo products for the primary search functionality would make for complicated results that don't provide much useful info when sorting by price. XOR allows to show products that are classified as gold or silver, but not both like a gold/silver combo product.
                                            </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                                What is XOR?
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                    <Card>
                                        <Accordion.Collapse eventKey="3" className="collapseparent">
                                            <Card.Body>
                                                We only collect price data once an hour, on the hour. If you are using a currency that is not shown on the dealer's website, there will be even more price discrepancy as we will convert their USD price to the currency you've selected. With all the moving parts of the foreign exchange market and the LBMA/Comex, our prices will only be accurate around the hour mark for a split second.
                                            </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="3">
                                                Why are your prices different than the dealer's?
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                    <Card>
                                        <Accordion.Collapse eventKey="4" className="collapseparent">
                                            <Card.Body>
                                                Please send me your suggestions via the <Link to="/contact">contact form</Link>.
                                            </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="4">
                                                I've got suggestions!
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                    <Card>
                                        <Accordion.Collapse eventKey="5" className="collapseparent">
                                            <Card.Body>
                                                Currently, our site is running a distributed cluster of web scrapers. Jobs are distributed to the scrapers and the results are relayed back to the cluster leader. The project itself is closed-source.
                                            </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="5">
                                                Can I get the technical details?
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

export default Content;