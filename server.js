const express = require('express');
// const secure = require('express-force-https');
const path = require('path');
const serveStatic = require('serve-static');

const app = express();
// app.use(secure)
app.use("/", serveStatic ( path.join (__dirname + '/' ) ) );
app.use("*", function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

const port = process.env.PORT || 5000;
app.listen(port);

console.log('server started ' + port);
