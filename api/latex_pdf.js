// Require what we need
const latex = require('../../node-latexmk')
const fs = require('fs')
var uniqid = require('uniqid')

// Base folders
const texFilesFolder = __dirname + '/tex_files'
const pdfFilesFolder = __dirname + '/tmp/pdf'
const tmpConfigFolder = __dirname + '/tmp/config'

/** @description Generates a PDF document using the specified tex file and options
 * @param {string} texfile The name of the texfile to use
 * @param {object} options
 * @param {string} options.prefix A prefix to be put before the filename
 * @param {string} options.suffix A suffix to be put after the filename
 * @param {string} options.fixdelimiter The string that will be put between the prefix/suffix and the filename. Defaults to '-'
 * @param {string} options.customName A completely custom filename to be used instead of a random string. Will still use any prefixes or suffixes
 * @param {object} options.texparams Parameters to be passed on to the tex file
 * @param {function} callback A callback which will contain an error, if it exists, and a path to the pdf, if succesful
 */
module.exports = (texfile, options, callback) => {
    var filename = options.prefix ? options.prefix : ""
    filename = filename + (options.fixdelimiter ? options.fixdelimiter : "-")
    filename = filename + (options.customName ? options.customName : uniqid())
    filename = filename + (options.suffix ? options.fixdelimiter ? options.fixdelimiter : "-" : "")
    filename = filename + (options.suffix ? options.suffix : "") + ".pdf"

    const texPath = texFilesFolder + '/' + texfile
    const pdfPath = pdfFilesFolder + '/' + filename

    const tmpConfigPath = tmpConfigFolder + '/' + uniqid() + '.json'

    //TODO: MAKE THIS THE REAL OPTIONS
    let testOptions = { numberOfQuestions: 20 }

    // write the options to a file ready to be passed through
    fs.writeFile(tmpConfigPath, JSON.stringify(testOptions), 'utf8', (err) => {
        if (err) {
            console.log("This is where we fucked it")
            callback(err)
        } else {
            console.log("Moving on")
            let latexGenOptions = {
                passes: 2,
                dependencies: [tmpConfigPath],
                dependencyRenames: { [tmpConfigPath.toString()] : "config.json" }
            }

            latex(texPath, pdfPath, latexGenOptions, (err, pdf) => {
                if (err) {
                    callback(err, null)
                    console.log(err)
                } else {
                    console.log(JSON.stringify(pdf))
                    callback(null, pdf)
                }
            })
        }
    })
}

