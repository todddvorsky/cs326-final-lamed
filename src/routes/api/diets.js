const express = require('express');
const router = express();

/* GET diets homepage. */
module.exports = {
d: function(){
router.get('/api/diets', function(req, res, next) {
  res.send('respond with a list of diets');
});
}
}

router.get('/diets/recipes', function(req, res, next) {
  res.send('respond with a list of diets');
});

router.get('/diets/recipes/:id', function(req, res, next) {
  res.send('respond with a specific recipe with id');
});

router.get('/diets/recipes/:tags', function(req, res, next) {
  res.send('respond with a list of recipes with certain tags');
});

module.exports = router;