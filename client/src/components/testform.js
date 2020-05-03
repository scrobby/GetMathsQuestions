import React, { Component } from 'react';
import { Form, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';

export class TestForm extends Component {
    constructor(props) {
        super(props);

        var newState = {};

        for (const [key, value] of Object.entries(props.data)) {
            switch (value.type) {
                case "checkbox":
                    newState[key] = value.default ? value.default : false;
                    break;
                case "integer":
                    newState[key] = value.default ? value.default : 0;
                    break;
                case "range":
                    newState[key] = {
                        low: value.low.default ? value.low.default : 0,
                        high: value.high.default ? value.high.default : 0
                    } // make sure to update this as a whole, not just individually
                    break;
            }
        }
        this.state = newState;

        this.handleChange = this.handleChange.bind(this);
        this.renderForm = this.renderForm.bind(this);
    }

    handleChange(e) {
        switch (e.target.type) {
            case "checkbox":
                this.setState({
                    [e.target.name]: e.target.checked
                });
                break;
            case "integer":
                break;
            case "range":
                break;
        }

        console.log("State: " + JSON.stringify(this.state));
    }

    render() {
        return (
            <Form>
                {this.renderForm()}
            </Form>
        )
    }

    renderForm() {
        var returnValues = [];

        for (const [key, value] of Object.entries(this.props.data)) {
            returnValues.push(
                <TestFormItem
                    key={key}
                    name={key}
                    testData={value}
                    type={value.type}
                    onChange={this.handleChange}
                    stateData={this.state[key]} />
            )

        }

        return returnValues;
    }
}

function renderTooltip(props) {
    return (
        <Tooltip id={props.id} {...props}>
            {props.helpMessage}
        </Tooltip>
    );
}

function TestFormItem(props) {
    var item = null

    switch (props.type) {
        case "checkbox":
            item = TestFormCheckbox(props);
            break;
        case "integer":
            break;
        case "range":
            break;
    }

    return (
        <Form.Group as={Row}>
            {item}
        </Form.Group>
    )
}

function TestFormCheckbox(props) {
    const overlayProps = {
        id: props.name + "-tooltip",
        helpMessage: props.testData.help
    }

    return (
        <>
            <Col>
                <Form.Label className="float-left">{props.testData.label}</Form.Label>
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 400, hide: 200 }}
                    overlay={renderTooltip(overlayProps)} 
                >
                    <Form.Check className="float-left" style={{ marginLeft: "1em" }}
                        onChange={props.onChange}
                        name={props.name}
                        checked={props.stateData}
                    />
                </OverlayTrigger>
            </Col>
        </>
    )
}