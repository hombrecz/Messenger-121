require('babel-core/register');
'use strict';

let express = require('express');
let mongoose = require('mongoose');
let User = require('./models/user');
let Thread = require('./models/thread');
let bodyParser = require('body-parser');

let path = require('path');
let React = require('react');
let cors = require('cors');



const settings = require('../../settings.js');

mongoose.connect(settings.mongo.address || 'mongodb://localhost/messenger-121-db');
process.on('uncaughtException', function (err) {
    console.log(err);
});

let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//routing
const threadsRouter = express.Router();
const usersRouter = express.Router();
require('./routes/thread_routes')(threadsRouter);
require('./routes/user_routes')(usersRouter);
app.use('/api', threadsRouter);
app.use('/api', usersRouter);

app.use('/', express.static(path.join(__dirname, '../..', 'static')));

app.get('/*', function (req, res) {
    res.status(200).end(renderFullPage());
});

initDb();

//server start
let server = app.listen(settings.server.port || 3000, function () {
    console.log('Listening on ' + server.address().port)
});

let SocketIo = require('socket.io')(server);
const socketEvents = require('./socketEvents')(SocketIo);

function initDb() {
    let newThread = new Thread({name: 'general', messages: []});
    newThread.save();

    let newUser = new User({name: 'user'});
    newUser.save();
}

function renderFullPage() {
    return `
    <!doctype html>
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />
        <meta charset="utf-8">
        <title>Messenger 121</title>
      </head>
      <body>
        <container id="react"></container>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `
}