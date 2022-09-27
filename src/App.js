import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Preloader
import Preloader from './components/layouts/Preloader';
// Pages
import Home from './components/pages/Home';
import Hometwo from './components/pages/Hometwo';
import Homethree from './components/pages/Homethree';
import Homefour from './components/pages/Homefour';
import About from './components/pages/About';
import Account from './components/pages/Account';
import Blogdetail from './components/pages/Blogdetail';
import Bloggrid from './components/pages/Bloggrid';
import Bloggridsidebar from './components/pages/Bloggridsidebar';
import Bloglist from './components/pages/Bloglist';
import Cart from './components/pages/Cart';
import Checkout from './components/pages/Checkout';
import Classification from './components/pages/Classification';
import Comingsoon from './components/pages/Comingsoon';
import Contact from './components/pages/Contact';
import Error from './components/pages/Error';
import Faq from './components/pages/Faq';
import Gallery from './components/pages/Gallery';
import Gallerytwo from './components/pages/Gallerytwo';
import Legal from './components/pages/Legal';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Shopdetail from './components/pages/Shopdetail';
import Shopleft from './components/pages/Shopleft';
import Shoplefttwo from './components/pages/Shoplefttwo';
import Shopright from './components/pages/Shopright';
import Shoprighttwo from './components/pages/Shoprighttwo';
import Team from './components/pages/Team';
import Typography from './components/pages/Typography';
import Wishlist from './components/pages/Wishlist';


function App() {
  return (
    <Router basename={'/themes/themeforest/react/laramiss'}>
      <Preloader />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home-two" component={Hometwo} />
        <Route exact path="/home-three" component={Homethree} />
        <Route exact path="/home-four" component={Homefour} />
        <Route exact path="/about" component={About} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/blog-detail" component={Blogdetail} />
        <Route exact path="/blog-grid" component={Bloggrid} />
        <Route exact path="/blog-grid-sidebar" component={Bloggridsidebar} />
        <Route exact path="/blog-list" component={Bloglist} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/classification" component={Classification} />
        <Route exact path="/coming-soon" component={Comingsoon} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/faq" component={Faq} />
        <Route exact path="/gallery" component={Gallery} />
        <Route exact path="/gallery-two" component={Gallerytwo} />
        <Route exact path="/legal" component={Legal} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/shop-detail" component={Shopdetail} />
        <Route exact path="/shop-left" component={Shopleft} />
        <Route exact path="/shop-left-two" component={Shoplefttwo} />
        <Route exact path="/shop-right" component={Shopright} />
        <Route exact path="/shop-right-two" component={Shoprighttwo} />
        <Route exact path="/team" component={Team} />
        <Route exact path="/typography" component={Typography} />
        <Route exact path="/wishlist" component={Wishlist} />
        <Route exact path="/error" component={Error} />
        <Route exact component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
