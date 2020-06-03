// importing modules
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
    appId: '1002402',
    key: '1043d15335fe067e14c8',
    secret: 'f4480625b18956711fdd',
    cluster: 'ap1',
    encrypted: true
});

const umlService = require('./services/uml-service');

// connect to mongodb
mongoose.connect('mongodb://192.168.0.17:27017/Thesis');

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
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// static files
app.use(express.static(path.join(__dirname, 'public')));

//uml service
app.use('/api', umlService);

// testing server
app.get('/test', (req, res) => {
    res.send('foobar');
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.post('/pusherevent', (req, res) => {
    pusher.trigger('UML', 'typing', req.body);
    res.json(req.body);
});

app.listen(port, () => {
    console.log('Server started at port:' + port);
});