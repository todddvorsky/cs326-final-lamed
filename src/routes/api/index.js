var router = require('express').Router();

router.use('/users', require('./users'));
router.use('/workouts', require('./workouts'));
router.use('/diets', require('./diets'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
