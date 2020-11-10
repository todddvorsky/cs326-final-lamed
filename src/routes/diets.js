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
	res.json([
		{
			dietId: '551',
			dietName: 'my diet',
			recipes: ['123', '1414', '4', '15'],
		},
		{
			dietId: '639',
			dietName: 'my diet 2',
			recipes: ['435', '123'],
		},
	]);
	res.status(200);
	res.send('get all diets');
});
/* GET all recipes. */
router.get('/recipes', function (req, res) {
	res.json([
		{
			recipeId: '435',
			name: 'sandwich',
			desc: 'dswrgjawinrjq',
			ingredients: 'bread, cheese, meat, lettuce, tomato',
			tags: ['protein', 'easy'],
		},
		{
			recipeId: '123',
			name: 'pizza',
			desc: 'pepperoni :)',
			ingredients: 'dough, cheese, sauce',
			tags: ['vegetarian', 'vegan'],
		},
	]);
	res.status(200);
	res.send('get all recipes');
});
/* GET a specific diet. */
router.get('/:diet', function (req, res) {
	res.send("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
});
/* GET a specific recipe. */
router.get('/recipes/:recipe', function (req, res) {
	res.json({
		dietId: '639',
		dietName: 'my diet 2',
		recipes: ['435', '123'],
	});
	res.status(200);
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
