import React, { Fragment } from 'react';
import Preloader from './components/layouts/Preloader';
import Router from './Router';

function App() {
  return (
      <Fragment>
        <Preloader />
        <Router />
      </Fragment>
  );
}

export default App;
