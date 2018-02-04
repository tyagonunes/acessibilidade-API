var express = require('express');

var app = module.exports = express();

var bodyParser = require('body-parser');

app.listen(5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type, Authorization");
  next();
});