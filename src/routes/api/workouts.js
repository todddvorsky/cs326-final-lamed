var router = require('express').Router();

/* GET workouts homepage. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;