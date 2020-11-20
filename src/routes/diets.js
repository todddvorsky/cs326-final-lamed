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
		{
			dietId: '593',
			dietName: 'Todds diet',
			recipes: ['123', '1414', '4', '15'],
		},
		{
			dietId: '234',
			dietName: 'Patricks diet',
			recipes: ['435', '123'],
		},
		{
			dietId: '071',
			dietName: 'Jasons diet',
			recipes: ['123', '1414', '4', '15'],
		},
		{
			dietId: '790',
			dietName: 'Emerys diet',
			recipes: ['435', '123'],
		},
		{
			dietId: '105',
			dietName: 'Nicolas diet',
			recipes: ['123', '1414', '4', '15'],
		},
		{
			dietId: '900',
			dietName: 'Joesephs diet',
			recipes: ['435', '123'],
		},
		{
			dietId: '114',
			dietName: 'Moms diet',
			recipes: ['123', '1414', '4', '15'],
		},
		{
			dietId: '444',
			dietName: 'Dads diet',
			recipes: ['435', '123'],
		},
	]);
	res.status(200);
	//res.send('get all diets');
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
	res.json({
		dietId: '639',
		dietName: 'my diet 2',
		recipes: ['435', '123'],
	});
	res.status(200);
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
