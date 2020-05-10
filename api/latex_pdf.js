// Require what we need
const latex = require('node-latex')
const fs = require('fs')
var uniqid = require('uniqid')

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

    console.log("Name: " + filename)

    callback(null, filename)
}