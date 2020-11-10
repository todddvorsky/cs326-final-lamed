var router = require('express').Router();

/* set params */
router.param('diet', function (req, res, next) {
	//TODO
	req.diet = 'Diet.';

	next();
});
router.param('recipe', function (req, res, next) {
	//TODO
	req.recipe = 'Recipe.';

	next();
});

/* ENDPOINTS -- These are strictly suggestions, feel free to modify */

/* GET all diets. */
router.get('/allDiets', function (req, res, next) {
	res.send(["sandwich", "pizza", "ketchup", "salad", "pescatarian", "vegan", "burrito", "tofu", "soda", "chicken"]);
});
/* GET all recipes. */
router.get('/recipes', function (req, res) {
	res.send('get all recipes');
});
/* GET a specific diet. */
router.get('/:diet', function (req, res) {
	res.send("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
});
/* GET a specific recipe. */
router.get('/recipes/:recipe', function (req, res) {
	res.send('get recipe: ' + req.recipe);
});
/* Create a diet */
router.post('/create', function (req, res) {
	res.send('create diet');
});
/* Create a recipe */
router.post('/recipe/create', function (req, res) {
	res.send('create recipe');
});
/* Update a diet */
router.put('/update/:diet', function (req, res) {
	res.send('update diet: ' + req.diet);
});
/* Update a recipe */
router.put('/recipes/update/:recipe', function (req, res) {
	res.send('update recipe: ' + req.recipe);
});
/* Delete a diet */
router.delete('/delete/:diet', function (req, res) {
	res.send('delete diet: ' + req.diet);
});
/* Delete a recipe */
router.delete('/recipe/delete/:recipe', function (req, res) {
	res.send('delete recipe: ' + req.recipe);
});

module.exports = router;
