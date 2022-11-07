import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import img1 from '../../../assets/img/menu/01.jpg';
import img2 from '../../../assets/img/menu/02.jpg';
import img3 from '../../../assets/img/menu/03.jpg';
import img4 from '../../../assets/img/menu/04.jpg';
import img5 from '../../../assets/img/menu/05.jpg';
import img6 from '../../../assets/img/menu/06.jpg';
import img7 from '../../../assets/img/menu/07.jpg';
import img8 from '../../../assets/img/menu/08.jpg';
import img9 from '../../../assets/img/menu/09.jpg';
import img10 from '../../../assets/img/menu/10.jpg';

const trendingleftposts = [
    { img: img1, title: 'Diamond Pendants', text: 'Lorem ipsum dolor sit amet, consectetur adip isicing elit, sed do eiusmod tempor.', animationtime: '.3s' },
    { img: img2, title: 'Ankle Bracelet', text: 'Lorem ipsum dolor sit amet, consectetur adip isicing elit, sed do eiusmod tempor.', animationtime: '.4s' },
    { img: img3, title: 'Stud Earrings', text: 'Lorem ipsum dolor sit amet, consectetur adip isicing elit, sed do eiusmod tempor.', animationtime: '.5s' },
    { img: img4, title: 'Moon Necklace', text: 'Lorem ipsum dolor sit amet, consectetur adip isicing elit, sed do eiusmod tempor.', animationtime: '.6s' },
    { img: img5, title: 'Stud Earrings', text: 'Lorem ipsum dolor sit amet, consectetur adip isicing elit, sed do eiusmod tempor.', animationtime: '.7s' },
];
const trendingrightposts = [
    { img: img6, title: 'Diamond Ring', text: 'Lorem ipsum dolor sit amet, consectetur adip isicing elit, sed do eiusmod tempor.', animationtime: '.3s' },
    { img: img7, title: 'Artifical Earings', text: 'Lorem ipsum dolor sit amet, consectetur adip isicing elit, sed do eiusmod tempor.', animationtime: '.4s' },
    { img: img8, title: 'Bracelet Curb', text: 'Lorem ipsum dolor sit amet, consectetur adip isicing elit, sed do eiusmod tempor.', animationtime: '.5s' },
    { img: img9, title: 'Azrouel Variable', text: 'Lorem ipsum dolor sit amet, consectetur adip isicing elit, sed do eiusmod tempor.', animationtime: '.6s' },
    { img: img10, title: 'Azrouel Variable', text: 'Lorem ipsum dolor sit amet, consectetur adip isicing elit, sed do eiusmod tempor.', animationtime: '.7s' },
];
class Trending extends Component {
    render() {
        return (
            <section className="menu-area gradient-white pt-115 pb-115">
                <div className="container">
                    {/* Section Title */}
                    <div className="section-title text-center mb-80">
                        <div className="section-title-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width={45} height={45} x={0} y={0} viewBox="0 0 512 512" xmlSpace="preserve">
                                <path d="M369.853,250.251l-100-241C267.53,3.65,262.062,0,255.999,0s-11.531,3.65-13.854,9.251l-100,241    c-1.527,3.681-1.527,7.817,0,11.498l100,241c2.323,5.601,7.791,9.251,13.854,9.251s11.531-3.65,13.854-9.251l100-241    C371.381,258.068,371.381,253.932,369.853,250.251z M255.999,457.861L172.239,256l83.76-201.861L339.759,256L255.999,457.861z" fill="#ffffff" />
                                <path className="diamond-spark spark-1" d="M139.606,118.393l-63-63c-5.858-5.857-15.356-5.857-21.213,0c-5.858,5.858-5.858,15.356,0,21.213l63,63    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394C145.465,133.748,145.465,124.25,139.606,118.393z" fill="#ffffff" />
                                <path className="diamond-spark spark-2" d="M456.607,55.393c-5.858-5.857-15.356-5.857-21.213,0l-63,63c-5.858,5.858-5.858,15.356,0,21.213    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394l63-63C462.465,70.748,462.465,61.25,456.607,55.393z" fill="#ffffff" />
                                <path className="diamond-spark spark-3" d="M139.606,372.393c-5.858-5.857-15.356-5.857-21.213,0l-63,63c-5.858,5.858-5.858,15.356,0,21.213    C58.322,459.535,62.16,461,65.999,461s7.678-1.465,10.607-4.394l63-63C145.465,387.748,145.465,378.25,139.606,372.393z" fill="#ffffff" />
                                <path className="diamond-spark spark-4" d="M456.607,435.393l-63-63c-5.858-5.857-15.356-5.857-21.213,0c-5.858,5.858-5.858,15.356,0,21.213l63,63    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394C462.465,450.748,462.465,441.25,456.607,435.393z" fill="#ffffff" />
                            </svg>
                        </div>
                        <span className="title-tag">trending jewelry</span>
                        <h2>Trending Products</h2>
                    </div>
                    {/* Menu Looop */}
                    <div className="menu-loop">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 col-md-10">
                                {trendingleftposts.map((item, i) => (
                                    <div key={i} className="single-menu-box wow fadeInUp" data-wow-delay={item.animationtime}>
                                        <div className="menu-img" style={{ backgroundImage: "url(" + item.img + ")" }}>
                                        </div>
                                        <div className="menu-desc">
                                            <h4><Link to="/shop-detail">{item.title}</Link></h4>
                                            <p>{item.text}</p>
                                            <Link to="/shop-detail" className="menu-link"><i className="fal fa-long-arrow-right" /></Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="col-lg-6 col-md-10">
                                {trendingrightposts.map((item, i) => (
                                    <div className="single-menu-box wow fadeInUp" data-wow-delay={item.animationtime}>
                                        <div className="menu-img" style={{ backgroundImage: "url(" + item.img + ")" }}>
                                        </div>
                                        <div className="menu-desc">
                                            <h4><Link to="/shop-detail">{item.title}</Link></h4>
                                            <p>{item.text}</p>
                                            <Link to="/shop-detail" className="menu-link"><i className="fal fa-long-arrow-right" /></Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Trending;