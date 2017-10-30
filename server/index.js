//Main starting point of application.

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

//Db setup
mongoose.connect('mongodb://localhost:cacheproxy/cacheproxy');

//App setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

//Server setup

const port = process.env.port || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on port', port);
