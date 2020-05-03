// Get the main things we need
import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, LinkContainer } from "react-router-dom";

// TODO: Add a random equation in here, just for fun

export default class Navigation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar sticky="top" variant="dark" bg="dark">
                <Navbar.Brand as={Link} to="/">AutoMQG</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/" activeClassName="activeLink">Home</Nav.Link>
                    <Nav.Link as={Link} to="/generate-test" activeClassName="activeLink">Generate</Nav.Link>
                </Nav>
                <Nav pullRight>
                    <Link to="/paypal">Donate</Link>
                </Nav>
            </Navbar>
        )
    }
}