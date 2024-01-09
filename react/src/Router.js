import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Pages
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Error from './components/pages/Error';
import Faq from './components/pages/Faq';

export const routes = (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route exact path="/about" component={About} />
		<Route exact path="/contact" component={Contact} />
		<Route exact path="/faq" component={Faq} />
		<Route exact component={Error} />
	</Switch>
);

function Router() {
	return routes;
}

export default Router;
