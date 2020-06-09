// Get the main things we need
import React, { Component } from 'react'
import { Jumbotron, Button, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Get the error messages
import messages from '../404Messages.json'

// Get stuff for rendering TeX
import TeX from '@matejmazur/react-katex'

export default class NotFound extends Component {


    render() {
        const randomProblem = messages[Math.floor(Math.random() * messages.length)]

        return (
            <>
                <h1>Page Not Found</h1>
                <Jumbotron style={{
                    backgroundColor: "#FFF",
                    fontFamily: "Times New Roman, Sans Serif",
                    paddingTop: "40px",
                    paddingRight: "1em",
                    paddingLeft: "1em",
                    paddingBottom: "60px",
                    fontSize: "20px"
                }}>
                    <Row>
                        <p><b>Here's a question instead:</b></p>
                    </Row>
                    <TeXProblem problem={randomProblem}/>
                    <Row>
                        <p className="float-left" style={{ marginTop: "20px", fontSize: "16px" }}><a target="_blank" rel="noopener noreferrer" href={randomProblem.link.url}>{randomProblem.link.title}</a></p>
                    </Row>
                </Jumbotron>
                <div style={{ width: "100%", marginTop: "40px", marginBottom: "20px" }} className="text-center">
                    <Button as={Link} to="/">I can't solve that - take me home</Button>
                </div>
            </>
        )
    }
}

function TeXProblem(props) {
    const questionNo = Math.floor(Math.random() * 99) + ")"

    const questionParts = props.problem.text.split("$")
    
    // if (!modified) {
    //     var willChange = true
    //     var nextIsOdd = true

    //     while (willChange) {
    //         let newString = props.problem.text.replace("$", nextIsOdd ? "<Tex>" : "</Tex>")

    //         if (newString !== props.problem.text) {
    //             props.problem.text = newString
    //             nextIsOdd = !nextIsOdd
    //         } else {
    //             willChange = false
    //         }
    //     }
    // }

    return (
        <Row>
            <Col sm={1} xs={2}>
                <p style={{ textAlign: "right" }}>{questionNo}</p>
            </Col>
            <Col sm={11} xs={10}>
                <p>{questionParts.map((part, i) => {
                    if (i === 0) {
                        return part
                    } else if (i%2 !== 0) {
                    return (<TeX key={"txq_" + i}>{part}</TeX>)
                    } else {
                        return part
                    }
                })}</p>
            </Col>
        </Row>
    )
}