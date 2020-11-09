'use strict';
const express = require('express');
const app = express();

/* GET users listing. */
app.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = app;
