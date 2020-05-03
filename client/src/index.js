// Get the main things we need
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

// Get our top level views
import Home from './pages/home';
import About from './pages/about';
import AllTests from './pages/alltests';
import GenerateTest from './pages/generate'
import NotFound from './pages/notfound';

// Get the elements we need
import Navigation from './components/navigation';

// Get other assets for styling etc
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// TODO: Make this much more reliable
import generatorTypes from './GeneratorTypes.json'

function Routing() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/generate/" component={(props) => <AllTests {...props} generatorTypes={generatorTypes} />} />
      <Route path="/about" component={About} />
      {/* TODO: Make this a super smart way of rendering out the tests depending on type */}
      <Route path="/generate/:id" component={(props) => <GenerateTest {...props} generatorTypes={generatorTypes} />} />
      <Route component={NotFound} />
    </Switch>
  )
}

function Footer() {
  return (
    <>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
      <Row className="footer">
        <Col md="6" sm="12">
          <p>Created by Carl and Morgane</p>
          <p>Presumably we put something else here?</p>
        </Col>
        <Col md="6" sm="12" style={{ textAlign: "right" }}>
          <p>And content on the other side?</p>
        </Col>
      </Row>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navigation generatorTypes={generatorTypes} />
      <Container fluid="md">
            <Routing />
        <Footer />
      </Container>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
