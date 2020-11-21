'use strict';

const router = require('express').Router();
const auth = require('./auth');

/* use next middleware functions */
router.use('/users', require('./users'));
router.use('/workouts', require('./workouts'));
router.use('/diets', require('./diets'));

module.exports = router;
