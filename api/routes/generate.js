// Set up router
const generator = require('express').Router()

// Get the pdf generator
const pdflatex = require('../latex_pdf')

// TODO: Make this better and more reliable than just chucking it into an object
const typesAndTexFiles = [
    {
        path: "linear-simultaneous-equations",
        texFile: "simultaneous_equations_linear.tex"
    },
    {
        path: "factorising-quadratic-equations",
        texFile: "quadratic_equations_factorising.tex"
    }
]

generator.get('/', (req, res) => {
    res.status(403).json({ message: "Please specify a test type." })
});

generator.get('/:type?', (req, res) => {
    const type = req.params.type
    const texOptions = req.body

    console.log("Type: " + type)
    console.log("Options: " + JSON.stringify(texOptions))

    let matchedTypes = typesAndTexFiles.filter((a) => a.path.includes(type));

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
                res.status(200).json({ message: "A PDF was generated!", pdfLocation: pdf })
            }
        })
    } else {
        res.status(400).json({ message: "Unknown generator type", requestedType: type });
    }
});

module.exports = generator