// Get the main things we need
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Button, Container, Row, Col, Navbar } from 'react-bootstrap';

// Get our top level views
import Home from './pages/home';
import About from './pages/about';
import GenerateTest from './pages/generate-test';
import NotFound from './pages/notfound';

// Get the elements we need
import Navigation from './components/navigation';

// Get other assets for styling etc
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Routing() {
  return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/generate-test" component={GenerateTest} />
        <Route path="/about" component={About} />
        {/* TODO: Make this a super smart way of rendering out the tests depending on type */}
        <Route path="/generate-test/:id" component={GenerateTest} />
        <Route component={NotFound} />
      </Switch>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Container>
      <Navigation/>
      <Row>
        <Col>
          <Routing />
        </Col>
      </Row>
    </Container>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
