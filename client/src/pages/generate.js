// Get the main things we need
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { TestForm } from '../components/testform';

const API_BASE = process.env.REACT_APP_API_BASE;

// TODO: make this actually generate a test using the API

export default class GenerateTest extends Component {
    constructor(props) {
        super(props)

        this.formRequestedTest = this.formRequestedTest.bind(this)
        this.formReceivedResponse = this.formReceivedResponse.bind(this)

        this.state = {
            isLoading: false
        }
    }

    formRequestedTest() {
        this.setState({
            isLoading: false
        })
    }

    formReceivedResponse(res) {

    }

    render() {
        const path = this.props.match.params.id;
        const test = this.props.generatorTypes.filter((test) => test.pathComponent.includes(path))[0];

        console.log("Base(ic bitch): " + API_BASE)

        return (
            <>
                <Row>
                    <Col xs="12">
                        <h1>{test.name}</h1>
                        <p className="test-description">{test.description}</p>
                    </Col>
                </Row>
                {/* TODO: Make this actually submit, probably having all the logic baked into the form itself */}
                <Row>
                    <Col xs="12">
                        <TestForm data={test.form} key={path} />
                    </Col>
                </Row>
            </>
        )
    }
}

