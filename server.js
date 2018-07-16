const express = require('express');
// const secure = require('express-force-https');
const path = require('path');
const serveStatic = require('serve-static');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./config');
var User = require('./models/User');

const app = express();
// app.use(secure)
app.use("/api", function(req, res) {
  res.send("Hello API!!")
});
app.use("/", serveStatic(path.join(__dirname + '/' )));
app.get('/api', function(req, res) {
  res.send({content: "Hello World"});
})
app.use("*", function(req, res) {
  res.sendFile(__dirname + '/index.html')
})
mongoose.Promise = require('bluebird');
mongoose.connect(config.database, {
  promiseLibrary: require('bluebird')
}).then(() => console.log('connection succesful')).catch((err) => console.log(err));
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

const port = process.env.PORT || 8081;
app.listen(port);

console.log('server started http://localhost:' + port);
