// Get the main things we need
import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, Container } from 'react-bootstrap';
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { withRouter } from "react-router";

// TODO: Add a random equation in here, just for fun

class Navigation extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    render() {
        return (
            <Navbar sticky="top" variant="dark" fluid="md" className="cg-navbar shadow-sm">
                <Container fluid="lg" className="nav-bar-container" >
                    <Navbar.Brand as={NavLink} to="/" className="d-none d-sm-block" > GetMQ </Navbar.Brand>
                    <Nav className="mr-auto" >
                        <NavItem>
                            <Nav.Link as={NavLink} exact to="/" > Home </Nav.Link>
                        </NavItem>
                        <NavItem>
                            <NavDropdown title="Questions" active={this.props.location.pathname.includes("/generate/")} >
                                <NavDropdown.Item as={NavLink} exact to="/generate/" > Show All </NavDropdown.Item>
                                <NavDropdown.Divider />
                                {this.props.generatorTypes.map((type) => {
                                    return <NavDropdown.Item
                                        key={type.pathComponent}
                                        as={NavLink}
                                        className="cg-navbutton"
                                        to={"/generate/" + type.pathComponent} >
                                        {type.name}
                                    </NavDropdown.Item>
                                })}
                            </NavDropdown>
                        </NavItem>
                    </Nav>
                    <Nav pullright="true" >
                        <Link to="/paypal" > Donate </Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}

export default withRouter(Navigation);