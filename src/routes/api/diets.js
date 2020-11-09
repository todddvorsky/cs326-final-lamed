'use strict';
const express = require('express');
const app = express();

/* GET diets homepage. */
app.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = app;