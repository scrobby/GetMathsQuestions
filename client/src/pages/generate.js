// Get the main things we need
import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

// TODO: make this actually generate a test using the API

export default class GenerateTest extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // let { id } = useParams();

        // console.log("ID: " + id);
    }

    render() {
        const path = this.props.match.params.id

        const test = this.props.questionTypes.filter((test) => test.pathComponent.includes(path))[0];

        return (
            <Row style={{ marginTop: "25px" }}>
                <Col xs="12">
                    <h1>{ test.name }</h1>
                    <p className="test-description">{ test.description }</p>
                </Col>


            </Row>
        )
    }
}