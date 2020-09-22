/**
 * Main server.js file.
 * Module dependencies
 */
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = 3000;
const data = require('./data.js');


/**
 * App configuration
 *
 */

// Set the public files location
app.use(express.static(__dirname + '/public'));

// Log every request to the console
app.use(morgan('dev'));

// Parse application config
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));


// Main route that serves index.html
app.get('/', (req, res) => {
    res.sendfile('./public/index.html');
});

// Start application on port 8080
app.listen(PORT);
console.log('App listening on port 3000');

app.get('/api/get-data', (req, res) => {
    res.send(data);
});

