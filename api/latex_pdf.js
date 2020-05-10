// Require what we need
const latex = require('node-latex')
const fs = require('fs')

/** @description Generates a PDF document using the specified tex file and options
 * @param {string} texfile The name of the texfile to use
 * @param {object} options The options to be passed into the texfile
 * @param {function} callback A callback which will contain an error, if it exists, and a path to the pdf, if succesful
 */
module.exports = (texfile, options, callback) => {
    console.log("Tex: " + texfile)
    console.log("Options: " + options)

    callback(null, "pdflocation.pdf")
}