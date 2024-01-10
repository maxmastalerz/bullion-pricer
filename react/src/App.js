import React, { Fragment } from 'react';
import Preloader from './components/layouts/Preloader';
import Router from './Router';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
      <Fragment>
        <Preloader />
        <Router />
        <Toaster />
      </Fragment>
  );
}

export default App;
