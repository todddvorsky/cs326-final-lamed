const router = require('express').Router();
const database = require('../db.js');

/* set params */
router.param('diet', async function (req, res, next) {
	const q = await database.handleGetSpecDiet(id);
	req.diet = q[0];

	next();
});
router.param('recipe', function (req, res, next) {
	//TODO
	req.recipe = 'Recipe.';

	next();
});

/* ENDPOINTS -- These are strictly suggestions, feel free to modify */

/* GET all diets. */
router.get('/allDiets', async function (req, res) {
	const diets = await database.getAllDiets();
	res.status(200);
	res.send(diets);
	res.status(200);
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
});
/* GET a specific diet. */
router.get('/:diet', function (req, res) {
	res.json(req.diet);
	res.status(200);
});
/* GET a specific recipe. */
router.get('/recipes/:recipe', function (req, res) {
	res.send('get recipe: ' + req.recipe);
});

/* Create a diet */
router.post('/create', async function (req, res) {
	const diet = await database.createDiet(req.body.dietName, req.body.userId);
	console.log('jjjjj', diet);
	res.status(200);
	res.send(diet);
});
/* Create a recipe */
router.post('/recipe/create', async function (req, res) {
	const recipe = await database.createRecipe(
		req.body.dietId,
		req.body.name,
		req.body.desc,
		req.body.ingredients,
		req.body.tags
	);
	res.status(200);
	res.send(recipe);
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
