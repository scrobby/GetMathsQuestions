// Get the main things we need
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

// Get our top level views
import Home from './pages/home';
import AllTests from './pages/alltests';
import GenerateTest from './pages/generate'
import NotFound from './pages/notfound';

// Get the elements we need
import Navigation from './components/navigation';

// Get other assets for styling etc
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// TODO: Make this much more reliable
import generatorTypes from './GeneratorTypes.json'

function Routing() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/generate/" component={(props) => <AllTests {...props} generatorTypes={generatorTypes} />} />
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
        <Col sm="6" xs="12">
          <p>Created by <a href="https://twitter.com/morganemoss" target="_blank" rel="noopener noreferrer">@morganemoss</a> and <a href="https://twitter.com/scrobby" target="_blank" rel="noopener noreferrer">@scrobby</a></p>
        </Col>
        <Col sm="6" xs="12" className="cg-footer">
          <p><a href="/feedback">Request a new question type</a></p>
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
        <div style={{ marginTop: "20px" }}>
          <Routing />
        </div>
>>>>>>> master
        <Footer />
      </Container>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
