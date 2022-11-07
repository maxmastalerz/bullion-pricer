import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Card, Button  } from 'react-bootstrap';


import img1 from '../../../assets/img/recent-post-wid/04.png';
import img2 from '../../../assets/img/recent-post-wid/05.png';
import img3 from '../../../assets/img/recent-post-wid/06.png';

const popularfeeds = [
    { img: img1, title: 'How Are Colored Diamonds Formed?', postdate: '24th March 2022' },
    { img: img2, title: 'How Are Colored Diamonds Formed?', postdate: '24th March 2022' },
    { img: img3, title: 'How Are Colored Diamonds Formed?', postdate: '24th March 2022' },
];
class Content extends Component {
    render() {
        return (
            <section className="faq-section pt-115 pb-115">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="faq-wrapper">
                                <div className="faq-title mb-30">
                                    <h3>Before Purchase</h3>
                                </div>
                                <Accordion defaultActiveKey="0" className="mb-60">
                                    <Card>
                                        <Accordion.Collapse eventKey="0" className="collapseparent">
                                            <Card.Body>
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                                                on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                                beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                            </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                Collapsible Group Item #1
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                    <Card>
                                        <Accordion.Collapse eventKey="1" className="collapseparent">
                                            <Card.Body>
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                                                on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                                beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                            </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                Collapsible Group Item #2
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                    <Card>
                                        <Accordion.Collapse eventKey="2" className="collapseparent">
                                            <Card.Body>
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                                                on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                                beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                            </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                                Collapsible Group Item #3
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                </Accordion>
                                <div className="faq-title mb-30 mt-5">
                                    <h3>After Purchase</h3>
                                </div>
                                <Accordion defaultActiveKey="0" className="mb-60">
                                    <Card>
                                        <Accordion.Collapse eventKey="0" className="collapseparent">
                                            <Card.Body>
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                                                on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                                beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                            </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                Collapsible Group Item #1
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                    <Card>
                                        <Accordion.Collapse eventKey="1" className="collapseparent">
                                            <Card.Body>
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                                                on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                                beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                            </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                Collapsible Group Item #2
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                    <Card>
                                        <Accordion.Collapse eventKey="2" className="collapseparent">
                                            <Card.Body>
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                                                on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                                beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                            </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                                Collapsible Group Item #3
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                </Accordion>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="sidebar mb-0">
                                {/* Search Widget */}
                                <div className="widget search-widget mb-40">
                                    <h5 className="widget-title">Search Objects</h5>
                                    <form action="#">
                                        <input type="text" placeholder="Search your keyword..." />
                                        <button type="submit"><i className="far fa-search" /></button>
                                    </form>
                                </div>
                                {/* Popular Post Widget */}
                                <div className="widget popular-feeds mb-40">
                                    <h5 className="widget-title">Popular Feeds</h5>
                                    <div className="popular-feed-loop">
                                        {popularfeeds.map((item, i) => (
                                            <div key={i} className="single-popular-feed">
                                                <div className="feed-img">
                                                    <img src={item.img} alt="" />
                                                </div>
                                                <div className="feed-desc">
                                                    <h6><Link to="#">{item.title}</Link></h6>
                                                    <span className="time"><i className="far fa-calendar-alt" /> {item.postdate}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

export default Content;