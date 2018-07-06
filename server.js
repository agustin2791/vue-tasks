const express = require('express');
// const secure = require('express-force-https');
const path = require('path');
const serveStatic = require('serve-static');
// const mongoose = require('mongoose');

const app = express();
// app.use(secure)
app.use("/", serveStatic ( path.join (__dirname + '/' ) ) );
app.use("*", function(req, res) {
  res.sendFile(__dirname + '/index.html')
})
// mongoose.Promise = require('bluebird');
// mongoose.connect('mongodb://localhost/my-tasks', {
//   useMongoClient: true,
//   promiseLibrary: require('bluebird')
// }).then(() => console.log('connection succesful')).catch((err) => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port);

console.log('server started http://localhost:' + port);
