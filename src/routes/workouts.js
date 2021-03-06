const router = require('express').Router();
const database = require('../db.js');

/* set params */
router.param('workout', async function (req, res, next, wo) {
	req.workout = await database.handleGetSpecWorkout(wo);

	next();
});

/* ENDPOINTS -- These are strictly suggestions, feel free to modify */

/* GET all workouts. */
router.get('/allWorkouts', async function (req, res) {
	const workouts = await database.getAllWorkouts();
	res.status(200);
	res.send(workouts);
});
/* GET a user's workouts. */
router.get('/userWorkouts', async function (req, res) {
	const workouts = await database.handleGetUserWorkouts(req.user);
	res.send(workouts);
	res.status(200);
});
/* GET a specific workout. */
router.get('/:workout', async function (req, res) {
	res.json(req.workout);
	res.status(200);
});
/* GET a specific workout's exercises. */
router.get('/:workout/exercises', async function (req, res) {
	const exers = await database.handleGetWorkoutsExercises(
		req.workout.workoutid
	);
	res.json(exers);
	res.status(200);
});
/* Create a workout */
router.post('/create', async function (req, res) {
	const workout = await database.createWorkout(req.body.workoutName, req.user);
	res.status(200);
	res.send(workout);
});
/* Create an exercise */
router.post('/exercise/create', async function (req, res) {
	const exercise = await database.createExercise(
		req.body.workoutId,
		req.body.name,
		req.body.desc,
		req.body.reps,
		req.body.sets,
		req.body.tags
	);
	res.status(200);
	res.send(exercise);
});
/* Delete a workout */
router.delete('/delete/:workoutid', async function (req, res) {
	const workout = await database.handleDeleteWorkout(
		req.params.workoutid,
		req.user
	);
	res.json(workout);
});
/* add a workout to usersworkouts */
router.post('/add', async function (req, res) {
	const workout = await database.handleAddWorkout(
		req.body.workoutId,
		req.user,
		req.body.workoutName
	);
	res.send(workout);
});

module.exports = router;
