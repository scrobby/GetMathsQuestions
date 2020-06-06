// Get the main things we need
import React, { Component } from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Get the error messages
import messages from '../404Messages.json'

// TODO: Add a random equation in here, just for fun

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
                    paddingRight: "5px",
                    paddingLeft: "5px",
                    paddingBottom: "60px"
                }}>
                    <h4><b>Here's a question instead:</b></h4>
                    <h4>{Math.floor(Math.random() * 99)}) {randomProblem.text}</h4>
                    <p className="float-left" style={{ marginTop: "20px" }}><a target="_blank" rel="noopener noreferrer" href={randomProblem.link.url}>{randomProblem.link.title}</a></p>
                </Jumbotron>
                <div style={{ width: "100%", marginTop: "40px", marginBottom: "20px" }} className="text-center">
                    <Button as={Link} to="/">I can't solve that - take me home</Button>
                </div>
            </>
        )
    }
}