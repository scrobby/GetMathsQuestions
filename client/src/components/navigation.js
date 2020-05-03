// Get the main things we need
import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown } from 'react-bootstrap';
import { Link, LinkContainer, NavLink } from "react-router-dom";

// TODO: Add a random equation in here, just for fun

export default class Navigation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar sticky="top" variant="dark" fluid="md" className="cg-navbar">
                <Navbar.Brand as={NavLink} to="/" className="d-none d-sm-block">AutoMQG</Navbar.Brand>
                <Nav className="mr-auto">
                    <NavItem>
                        <Nav.Link as={NavLink} exact to="/">Home</Nav.Link>
                    </NavItem>
                    <NavItem>
                        <NavDropdown title="Generate">
                            <NavDropdown.Item as={NavLink} to="/generate/type1">Type 1</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/generate/type2">Type 2</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/generate/type3">Type 3</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={NavLink} to="/generate/randomaction">What's This?</NavDropdown.Item>
                        </NavDropdown>
                    </NavItem>
                </Nav>
                <Nav pullright="true">
                    <Link to="/paypal">Donate</Link>
                </Nav>
            </Navbar>
        )
    }
}