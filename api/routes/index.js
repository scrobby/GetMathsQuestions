// Get the key bits
const express = require('express')
const routes = express.Router()

// Now the custom routes
const generate = require('./generate')

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' })
})

routes.use('/generate/', generate);

module.exports = routes