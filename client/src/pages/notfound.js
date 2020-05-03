// Get the main things we need
import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// TODO: Add a random equation in here, just for fun

export default class NotFound extends Component {


    render () {
        const errString = "{ Witty 404 Message Goes Here }"

        return (
            <div style={{ marginTop: "20px"}}>
                <Jumbotron>
                    <h1>{ errString }</h1>
                    <Jumbotron style={{ backgroundColor: "#AAA", marginTop: "40px"}}>
                    <h4>This is where a maths question will go. Hilarious.</h4>
                    </Jumbotron>
                    <Button as={Link} to="/" className="float-right">Take Me Home</Button>
                </Jumbotron>
            </div>
        )
    }
}