// Get the main things we need
import React, { Component } from 'react';
import { Button } from 'react-bootstrap'

// TODO: make this actually explain what the app does and be useful to someone

export default class Home extends Component {

    render() {
        return (
            <>
                <h1>Get Maths Questions</h1>
                <p>A free website for generating PDF worksheets of various different maths questions.</p>
                <p>This is very much a work in progress, so <a href="mailto:feedback@getmathsquestions.com">let us know</a> if there are any specific kinds of questions that would be particularly helpful, or any other suggestions.</p>
                <Button href="/generate/" variant="primary">
                    Get Questions!
                </Button>
            </>
        )
    }
}