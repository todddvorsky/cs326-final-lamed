'use strict';
const router = require('express').Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* use next middleware functions */
router.use('/users', require('./users'));
router.use('/workouts', require('./workouts'));
router.use('/diets', require('./diets'));

module.exports = router;
