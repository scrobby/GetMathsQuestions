// Get the main things we need
import React, { Component } from 'react';
import { Jumbotron, Row, Col } from 'react-bootstrap';

// TODO: make this actually explain what the app does and be useful to someone

export default class Home extends Component {

    render() {
        return (
            <div style={{ marginTop: "20px"}}>
                <Jumbotron>
                    <h1>Automatic Maths Question Generator</h1>
                    <p>First up, please help me fix the colour scheme and design of this. I started playing about with colours and layout, then realised I was getting too distracted and forced myself to stop, but I stopped on a baaaaad looking page.</p>
                    <p>Also, what else do we put on this page?</p>
                    <ul>
                        <li>Ways to share it to social media?</li>
                        <li>A donate button?</li>
                        <li>An "About the Author" section? Could have fun with that…</li>
                    </ul>
                </Jumbotron>
            </div>
        )
    }
}