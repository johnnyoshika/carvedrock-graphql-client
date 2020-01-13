import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Products from './Products';
import Product from './Product';
import ReviewAdd from './ReviewAdd';

const App = () => (
  <div className="container">
      <header className="row">
          <div className="col-md-5 mb-4">
              <img height="150" src="/images/carved-rock-logo.png" alt="logo"/>
          </div>
          <div className="col-md-7 mt-5">
              For outdoorsy types
          </div>
      </header>
      <Router>
        <Route exact path="/" component={Products} />
        <Route path="/products/:id" component={Product} />
        <Route path="/products/:id/review" component={ReviewAdd} />
      </Router>
  </div>
);

export default App;