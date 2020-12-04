const router = require('express').Router();
const database = require('../db.js');

/* set params */
router.param('diet', async function (req, res, next, diet) {
	req.diet = await database.handleGetSpecDiet(diet);

	next();
});

/* ENDPOINTS -- These are strictly suggestions, feel free to modify */

/* GET all diets. */
router.get('/allDiets', async function (req, res) {
	const diets = await database.getAllDiets();
	res.send(diets);
	res.status(200);
});
/* GET a user's diets. */
router.get('/userDiets', async function (req, res) {
	const diets = await database.handleGetUserDiets(req.user);
	res.send(diets);
	res.status(200);
});
/* GET a specific diet. */
router.get('/:diet', async function (req, res) {
	res.json(req.diet);
	res.status(200);
});
/* GET a specific diet's recipes. */
router.get('/:diet/recipes', async function (req, res) {
	const recipes = await database.handleGetDietsRecipes(req.diet.dietid);
	res.json(recipes);
	res.status(200);
});

/* Create a diet */
router.post('/create', async function (req, res) {
	const diet = await database.createDiet(req.body.dietName, req.user);
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

/* Delete a diet */
router.delete('/delete/:dietid', async function (req, res) {
	const diet = await database.handleDeleteDiet(req.params.dietid, req.user);
	res.send(diet);
});
/* add a diet */
router.post('/add', async function (req, res) {
	const diet = await database.handleAddDiet(
		req.body.dietid,
		req.user,
		req.body.dietName
	);
	res.send(diet);
});

module.exports = router;
