const router = require('express').Router();

/* use next middleware functions */
router.use('/users', require('./users'));
router.use('/workouts', require('./workouts'));
router.use('/diets', require('./diets'));

module.exports = router;
