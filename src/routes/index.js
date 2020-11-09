'use strict';
const express = require('express');
const app = express();
app.use(express.json()); // lets you handle JSON input
const port = 8080;
const dietFuncs = require('./api/diets.js');
const workoutFuncs = require('./api/workouts.js');
const userFuncs = require('./api/users.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* use next middleware functions */
router.use('/users', require('./users'));
router.use('/workouts', require('./workouts'));
router.use('/diets', require('./diets'));

module.exports = router;
