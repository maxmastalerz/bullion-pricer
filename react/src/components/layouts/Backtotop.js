import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Backtotop extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // Back to top
    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }
    onScroll = () => {
        this.setState({
            isTop: window.scrollY > 300
        });
    }
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    render() {
        const backtotop = this.state.isTop ? 'active' : '';
        return (
            <Link to="#" className={`back-to-top ${backtotop}`} id="backToTop" onClick={() => this.scrollToTop()}>
                <i className="fal fa-angle-double-up" />
            </Link>
        );
    }
}

export default Backtotop;