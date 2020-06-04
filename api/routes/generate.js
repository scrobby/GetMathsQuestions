// Set up router
const generator = require('express').Router()

// Get the pdf generator
const pdflatex = require('../latex_pdf')

// Set up AWS and files
const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')
const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})
const awsBucket = 'getmathsquestions.com'
const awsFolder = 'pdfs'

// TODO: Make this better and more reliable than just chucking it into an object
const typesAndTexFiles = [
    {
        path: "linear-simultaneous-equations",
        texFile: "simultaneous_equations.tex"
    },
    {
        path: "factorising-quadratic-equations",
        texFile: "factorising_quadratics.tex"
    }
]

generator.get('/', (req, res) => {
    res.status(403).json({ message: "Please specify a test type." })
});

generator.get('/:type?', (req, res) => {
    const type = req.params.type
    const texOptions = req.query

    let matchedTypes = typesAndTexFiles.filter((a) => a.path.includes(type))

    if (matchedTypes.length > 0) {
        let genType = matchedTypes[0]

        let pdfOptions = {
            prefix: genType.path,
            texparams: texOptions
        }

        pdflatex(genType.texFile, pdfOptions, (err, pdf) => {
            if (err) {
                res.status(500).json({ message: "A server error occurred", error: JSON.stringify(err) })
            } else {
                fs.readFile(pdf, (err, data) => {
                    if (err) {
                        res.status(500).json({ message: "A server error occurred", error: err})
                    } else {
                        const params = {
                            Bucket: awsBucket,
                            Key: 'pdfs/' + path.basename(pdf),
                            Body: data,
                            ContentType: 'application/pdf'
                        };

                        s3.upload(params, function (s3err, data) {
                            if (s3err) {
                                res.status(500).json({ message: "A server error occurred", error: s3err})
                            } else {
                                let finalURL = 'https://' + awsBucket + data.Location.split(awsBucket)[1] 
                                res.status(200).json({ message: "Worksheet generated!", pdfLocation: finalURL })
                            }

                            //Either way, clean up the PDF once it's been/tried to be uploaded
                            fs.unlink(pdf, () => {})
                        });
                    }
                })
            }
        })
    } else {
        if (type.includes('debugg')) {
            res.status(200).json(req.hostname)
        } else {
            res.status(400).json({ message: "Unknown generator type", requestedType: type });
        }   
    }

});

module.exports = generator