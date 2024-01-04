import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Preloader
import Preloader from './components/layouts/Preloader';
// Pages
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Error from './components/pages/Error';
import Faq from './components/pages/Faq';


function App() {
  return (
      <>
        <Preloader />
        <Switch>
          <Route exact path="/" component={Home} /> {/* New home adapted from /shop-left */}
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/faq" component={Faq} />
          <Route exact component={Error} />
        </Switch>
      </>
  );
}

export default App;
