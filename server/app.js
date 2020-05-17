// importing modules
require('dotenv').config();
const Pusher = require('pusher');
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

// port number
const port = 3000;

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
  });

const umlService = require('./services/uml-service');

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/Thesis');

// on connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database mongodb @ 27017');
});

mongoose.connection.on('error', () => {
    if (err) {
        console.log('Error in Database connection: ' + err);
    }
});

mongoose.set('useFindAndModify', false);
mongoose.set('debug', true)

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

app.post('/typing', (req, res) => {
    pusher.trigger('updating', 'typing', req.body);
    res.json(req.body);
});

app.listen(port, () => {
    console.log('Server started at port:' + port);
});