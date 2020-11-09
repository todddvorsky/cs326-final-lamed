var router = require('express').Router();

/* set params */
router.param('diet', function (req, res, next){
  //TODO
  req.diet = "Diet.";

  next();
});
router.param('recipe', function (req, res, next){
  //TODO
  req.recipe = "Recipe.";

  next();
});

/* ENDPOINTS -- These are strictly suggestions, feel free to modify */

/* GET all diets. */
router.get('/', function(req, res, next) {
  res.send('get all diets');
});
/* GET all recipes. */
router.get('/recipes', function(req, res){
  res.send('get all recipes');
});
/* GET a specific diet. */
router.get('/:diet', function(req, res){
  res.send('get diet: ' + req.diet);
});
/* GET a specific recipe. */
router.get('/recipes/:recipe', function(req, res){
  res.send('get recipe: ' + req.recipe);
});
/* Create a diet */
router.post('/create', function(req, res){
  res.send('create diet');
});
/* Create a recipe */
router.post('/recipe/create', function(req, res){
  res.send('create recipe');
});
/* Update a diet */
router.put('/update/:diet', function(req, res){
  res.send('update diet: ' + req.diet);
});
/* Update a recipe */
router.put('/recipes/update/:recipe', function(req, res){
  res.send('update recipe: ' + req.recipe);
});
/* Delete a diet */
router.delete('/delete/:diet', function(req, res){
  res.send('delete diet: ' + req.diet);
});
/* Delete a recipe */
router.delete('/recipe/delete/:recipe', function(req, res){
  res.send('delete recipe: ' + req.recipe);
});

module.exports = router;