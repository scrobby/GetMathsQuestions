import React, { Component } from 'react';
import { Form, Row, Col, Button} from 'react-bootstrap';

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
                default:
                    break;
            }
        }
        this.state = newState;

        this.handleChange = this.handleChange.bind(this);
        this.renderForm = this.renderForm.bind(this);
    }

    handleChange(e) {
        const type = this.props.data[e.target.name].type;

        switch (type) {
            case "checkbox":
                this.setState({
                    [e.target.name]: e.target.checked
                });
                break;
            case "integer":
                this.setState({
                    [e.target.name]: e.target.value
                });
                break;
            case "range":
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <Form>
                {this.renderForm()}
                <hr/>
                <Button type="submit" className="float-right">Generate Questions</Button>
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

function TestFormItem(props) {
    var item = null

    switch (props.type) {
        case "checkbox":
            item = TestFormCheckbox(props);
            break;
        case "integer":
            item = TestFormInteger(props);
            break;
        case "range":
            item = TestFormRange(props);
            break;
        default:
            break;
    }

    return (
        <Form.Group as={Row}>
            {item}
        </Form.Group>
    )
}

// function renderTooltip(props) {
//     return (
//         <Tooltip id={props.id} {...props}>
//             {props.helpMessage}
//         </Tooltip>
//     );
// }

function TestFormCheckbox(props) {
    return (
        <>
            <Form.Label as={Col} sm="4" xs="8">{props.testData.label}</Form.Label>
            <Col sm="8" xs="4">
                <Form.Check
                    style={{ marginLeft: "1em" }}
                    onChange={props.onChange}
                    name={props.name}
                    checked={props.stateData}
                />
            </Col>
        </>
    )
}

function TestFormInteger(props) {
    return (
        <>
            <Form.Label as={Col} md="4">{props.testData.label}</Form.Label>
            <Col md="8">
                <Form.Control
                    type="number"
                    onChange={props.onChange}
                    name={props.name}
                    value={props.stateData}
                />
            </Col>
        </>
    )
}

function TestFormRange(props) {
    return (
        <>
            <Form.Label as={Col} xs="12" md="4">{props.testData.label}</Form.Label>
            <Col xs="6" md="4">
                <Form.Control
                    type="number"
                    onChange={props.onChange}
                    name={props.name}
                />
            </Col>
            <Col xs="6" md="4">
                <Form.Control
                    type="number"
                    onChange={props.onChange}
                    name={props.name}
                />
            </Col>
        </>
    )
}