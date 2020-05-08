// importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const umlService = require('./services/uml-service');

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/uml');

// on connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database mongodb @ 27017');
});

mongoose.connection.on('error', () => {
    if (err) {
        console.log('Error in Database connection: ' + err);
    }
});

// port number
const port = 3000;

// adding middleware - cors
app.use(cors());

// body-parser
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// static files
app.use(express.static(path.join(__dirname, 'public')));

//uml service
app.use('/api', umlService);

// testing server
app.get('/', (req, res) => {
    res.send('foobar');
});

app.put('/api/:filename', (req, res, next) => {
    res.send(req.params.filename);
})

app.listen(port, () => {
    console.log('Server started at port:' + port);
});