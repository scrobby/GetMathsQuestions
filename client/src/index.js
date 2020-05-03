// Get the main things we need
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';

// Get our top level views
import Home from './components/home';
import GenerateTest from './components/generate-test';
import NotFound from './components/notfound';

// Get other assets for styling etc
import './index.css';

function Routing() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/generate-test" component={GenerateTest} />
        {/* TODO: Make this a super smart way of rendering out the tests depending on type */}
        <Route path="/generate-test/:id" component={GenerateTest} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);
