// Require what we need
const latex = require('node-latexmk')
const fs = require('fs')
const mkdirp = require('mkdirp')
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

    if (!options.texparams) {
        let error = new Error("No tex parameters provided. Cannot generate LaTeX file")
        callback(error, null)
    } else {
        var texOptions = options.texparams

        // Make sure the numbers are actually stringified as numbers
        for (const [key, value] of Object.entries(texOptions)) {
            let valAsNum = Number(value)

            if (!Number.isNaN(valAsNum)) {
                texOptions[key] = valAsNum
            }
        }

        //TODO: Maybe in future do something better here with fs.access() or fs.stat()
        //make sure our temp directory exists - I'm okay with this being synchronous as the creation of the directory should only ever happen once
        if (!fs.existsSync(tmpConfigFolder)){
            mkdirp.sync(tmpConfigFolder);
        }

        if (!fs.existsSync(pdfFilesFolder)){
            mkdirp.sync(pdfFilesFolder);
        }

        // check for any miswritten booleans
        for (const [key, value] of Object.entries(texOptions)) {
            if (value === "true") {
                texOptions[key] = true
            } else if (value === "false") {
                texOptions[key] = false
            }
        }

        // write the options to a file ready to be passed through
        fs.writeFile(tmpConfigPath, JSON.stringify(texOptions), 'utf8', (err) => {
            if (err) {
                console.log("Error " + err)
                callback(err)
            } else {
                let latexGenOptions = {
                    passes: 2,
                    args: ['bibtex', 'synctex=1'],
                    dependencies: [tmpConfigPath],
                    dependencyRenames: { [tmpConfigPath.toString()]: "config.json" }
                }

                latex(texPath, pdfPath, latexGenOptions, (err, pdf) => {
                    if (err) {
                        callback(err, null)
                        console.log(err)
                    } else {
                        callback(null, pdf)
                    }

                    //once we're done, clean up the config folder
                    fs.unlink(tmpConfigPath, ()=>{})
                })
            }
        })
    }
}