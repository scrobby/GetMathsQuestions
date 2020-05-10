// Load environment variables
require('dotenv').config();

// Set up the main Express app
const app = require('express')();
const routes = require('./routes');
const bodyParser = require('body-parser');

// Handle cors
var cors = require('cors');

// Get the port from the environment
const port = process.env.API_PORT || 5050;

// Cors
const whitelist = ['*'];
app.use(cors({
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            // callback(new Error('Not allowed by CORS'));
            callback(null, true);
        }
    }
}));

// Set up routing
app.use(bodyParser.json());
app.use('/', routes);

// Make the server listen
app.listen(port, () => {
    console.log(`App runnng on port ${port}`);
})