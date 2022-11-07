import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import img1 from '../../../assets/img/shop/01.jpg';
import img2 from '../../../assets/img/shop/02.jpg';
import img3 from '../../../assets/img/shop/03.jpg';
import img4 from '../../../assets/img/shop/04.jpg';

const latestposts = [
  { img: img1, title: 'Ankle Bracelet', price: '$390' },
  { img: img2, title: 'Stud Earrings', price: '$480' },
  { img: img3, title: 'Crumpled Ring', price: '$290' },
  { img: img4, title: 'Moon Necklace', price: '$390' },
];
class Saleproducts extends Component {
    render() {
        return (
            <section className="restaurant-tab-area bg-white pt-115 pb-85">
                <div className="container">
                    <div className="section-title text-center mb-50">
                        <div className="section-title-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width={45} height={45} x={0} y={0} viewBox="0 0 512 512" xmlSpace="preserve">
                                <path d="M369.853,250.251l-100-241C267.53,3.65,262.062,0,255.999,0s-11.531,3.65-13.854,9.251l-100,241    c-1.527,3.681-1.527,7.817,0,11.498l100,241c2.323,5.601,7.791,9.251,13.854,9.251s11.531-3.65,13.854-9.251l100-241    C371.381,258.068,371.381,253.932,369.853,250.251z M255.999,457.861L172.239,256l83.76-201.861L339.759,256L255.999,457.861z" fill="#ffffff" />
                                <path className="diamond-spark spark-1" d="M139.606,118.393l-63-63c-5.858-5.857-15.356-5.857-21.213,0c-5.858,5.858-5.858,15.356,0,21.213l63,63    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394C145.465,133.748,145.465,124.25,139.606,118.393z" fill="#ffffff" />
                                <path className="diamond-spark spark-2" d="M456.607,55.393c-5.858-5.857-15.356-5.857-21.213,0l-63,63c-5.858,5.858-5.858,15.356,0,21.213    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394l63-63C462.465,70.748,462.465,61.25,456.607,55.393z" fill="#ffffff" />
                                <path className="diamond-spark spark-3" d="M139.606,372.393c-5.858-5.857-15.356-5.857-21.213,0l-63,63c-5.858,5.858-5.858,15.356,0,21.213    C58.322,459.535,62.16,461,65.999,461s7.678-1.465,10.607-4.394l63-63C145.465,387.748,145.465,378.25,139.606,372.393z" fill="#ffffff" />
                                <path className="diamond-spark spark-4" d="M456.607,435.393l-63-63c-5.858-5.857-15.356-5.857-21.213,0c-5.858,5.858-5.858,15.356,0,21.213l63,63    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394C462.465,450.748,462.465,441.25,456.607,435.393z" fill="#ffffff" />
                            </svg>
                        </div>
                        <span className="title-tag"> Latest </span>
                        <h2>On Sale Products</h2>
                    </div>
                    <div className="row">
                        {latestposts.map((item, i) => (
                        <div key={i} className="col-lg-3 col-6">
                            <div className="food-box shop-box shop-box-2">
                                <div className="thumb">
                                    <img src={item.img} alt="images" />
                                    <div className="button-group">
                                        <Link to="#"><i className="far fa-heart" /></Link>
                                        <Link to="#"><i className="far fa-sync-alt" /></Link>
                                        <Link to="#"><i className="far fa-eye" /></Link>
                                    </div>
                                    <div className="cart-block">
                                        <Link to="#">Add to Cart</Link>
                                    </div>
                                </div>
                                <div className="desc">
                                    <h4 className="mb-0">
                                        <Link to="/shop-detail">{item.title}</Link>
                                    </h4>
                                    <span className="price">{item.price}</span>
                                    <Link to="/shop-detail" className="link"><i className="fal fa-arrow-right" /></Link>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </section>

        );
    }
}

export default Saleproducts;