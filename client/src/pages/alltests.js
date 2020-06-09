// Get the main things we need
import React, { Component } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'katex/dist/katex.min.css'
import TeX from '@matejmazur/react-katex'
import FitText from '@kennethormandy/react-fittext'

// TODO: make this actually generate a test using the API

export default class AllTests extends Component {

    render() {

        return (
            <>
                <h1>All Question Types</h1>
                <Row>
                    {
                        this.props.generatorTypes.map((type) => {
                            let exampleScript = type.exampleScripts[Math.floor(Math.random() * type.exampleScripts.length)]

                            return (
                                <Col xl="3" lg="4" md="6" sm="6" xs="12" key={type.pathComponent}>

                                    <Card style={{ marginTop: "25px" }}>
                                        <Card.Header>
                                            <span style={{ color: "#FFF", fontWeight: "400" }}>{type.name}</span>
                                        </Card.Header>
                                        <div variant="top" className="texContainer">
                                            <FitText compressor={2}>
                                                <TeX>{exampleScript}</TeX>
                                            </FitText>
                                        </div>
                                        <Card.Body>
                                            {type.description}
                                        </Card.Body>
                                        <Card.Footer as={Link} to={"/generate/" + type.pathComponent} variant="light">
                                            Let's Go!
                                    </Card.Footer>
                                    </Card>
                                </Col>
                            )
                        })
                    }

                </Row>
            </>
        )
    }
}