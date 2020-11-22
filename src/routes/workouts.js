const router = require('express').Router();
const database = require('../db.js');

/* set params */
router.param('workout', async function (req, res, next, id) {
	const q = await database.handleGetSpecWorkout(id);
	req.workout = q[0];

	next();
});
router.param('exercise', function (req, res, next) {
	//TODO
	req.exercise = 'Exercise.';

	next();
});

/* ENDPOINTS -- These are strictly suggestions, feel free to modify */

/* GET all workouts. */
router.get('/allWorkouts', async function (req, res) {
	const workouts = await database.getAllWorkouts();
	res.status(200);
	res.send(workouts);
});
/* GET all exercises. */
router.get('/exercises', function (req, res) {
	res.json([
		{
			exerciseId: '557',
			name: 'run',
			desc: 'qfnweisjkdhgfbaawilkjdfoq',
			sets: '0',
			reps: '0',
			time: '0',
			tags: ['cardio', 'intense'],
		},
		{
			exerciseId: '77',
			name: 'push up',
			desc: 'up down up down',
			sets: '5',
			reps: '100',
			tags: ['easy', 'muscle building'],
		},
		{
			exerciseId: '557',
			name: 'deadlift',
			desc: 'qfnweisjkdhgfbaawilkjdfoq',
			sets: '0',
			reps: '0',
			time: '0',
			tags: ['cardio', 'intense'],
		},
		{
			exerciseId: '77',
			name: 'jumping jacks',
			desc: 'up down up down',
			sets: '5',
			reps: '100',
			tags: ['easy', 'muscle building'],
		},
		{
			exerciseId: '557',
			name: 'sit up',
			desc: 'qfnweisjkdhgfbaawilkjdfoq',
			sets: '0',
			reps: '0',
			time: '0',
			tags: ['cardio', 'intense'],
		},
		{
			exerciseId: '77',
			name: 'bench press',
			desc: 'up down up down',
			sets: '5',
			reps: '100',
			tags: ['easy', 'muscle building'],
		},
		{
			exerciseId: '557',
			name: 'squat',
			desc: 'qfnweisjkdhgfbaawilkjdfoq',
			sets: '0',
			reps: '0',
			time: '0',
			tags: ['cardio', 'intense'],
		},
		{
			exerciseId: '77',
			name: 'mason twist',
			desc: 'up down up down',
			sets: '5',
			reps: '100',
			tags: ['easy', 'muscle building'],
		},
		{
			exerciseId: '557',
			name: 'lounge',
			desc: 'qfnweisjkdhgfbaawilkjdfoq',
			sets: '0',
			reps: '0',
			time: '0',
			tags: ['cardio', 'intense'],
		},
		{
			exerciseId: '77',
			name: 'curls',
			desc: 'up down up down',
			sets: '5',
			reps: '100',
			tags: ['easy', 'muscle building'],
		},
	]);
	res.status(200);
});
/* GET a specific workout. */
router.get('/:workout', function (req, res) {
	res.json(req.workout);
	res.status(200);
});
/* GET a specific exercise. */
router.get('/exercises/:exercise', function (req, res) {
	res.json({
		exerciseId: '77',
		name: 'push up',
		desc: 'up down up down',
		sets: '5',
		reps: '100',
		tags: ['easy', 'muscle building'],
	});
	res.status(200);
});
/* Create a workout */
router.post('/create', async function (req, res) {
	// name, userId, return workout Id
	const workout = await database.createWorkout(
		req.body.workoutName,
		req.body.userId
	);
	console.log('jjjjj', workout);
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
/* Update a workout */
router.put('/update/:workout', function (req, res) {
	res.send('update workout: ' + req.workout);
});
/* Update a exercise */
router.put('/exercises/update/:exercise', function (req, res) {
	res.send('update exercise: ' + req.exercise);
});
/* Delete a workout */
router.delete('/delete/:workout', function (req, res) {
	res.send('delete workout: ' + req.workout);
});
/* Delete a exercise */
router.delete('/exercise/delete/:exercise', function (req, res) {
	res.send('delete exercise: ' + req.exercise);
});

module.exports = router;
