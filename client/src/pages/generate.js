// Get the main things we need
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { TestForm } from '../components/testform';


// TODO: make this actually generate a test using the API

export default class GenerateTest extends Component {

    render() {
        const path = this.props.match.params.id;

        const test = this.props.generatorTypes.filter((test) => test.pathComponent.includes(path))[0];

        return (
            <>
                <Row style={{ marginTop: "25px" }}>
                    <Col xs="12">
                        <h1>{test.name}</h1>
                        <p className="test-description">{test.description}</p>
                    </Col>
                </Row>
                {/* TODO: Make this actually submit, probably having all the logic baked into the form itself */}
                <TestForm data={test.form} />
            </>
        )
    }
}

