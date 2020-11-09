'use strict';
const express = require('express');
const app = express();

app.use('/users', require('./users'));
app.use('/workouts', require('./workouts'));
app.use('/diets', require('./diets'));

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = app;
