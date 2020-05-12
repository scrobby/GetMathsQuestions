// Get the main things we need
import React, { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// TODO: make this actually generate a test using the API

export default class AllTests extends Component {
    render() {
        return (
            <>
                <h1>All Question Types</h1>
                <Row>
                    {
                        this.props.generatorTypes.map((type) => {
                            return (
                                <Col xl="3" lg="4" md="6" sm="6" xs="12" key={type.pathComponent}>
                                    <Card style={{ marginTop: "25px" }}>
                                        <Card.Header>
                                            <b>{type.name}</b>
                                        </Card.Header>
                                        {/* TODO: MAKE THIS AN IMAGE */}
                                        <Card.Img variant="top" height="150px" style={{ backgroundColor: "lightGray" }} />
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