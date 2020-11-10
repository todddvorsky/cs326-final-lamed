var router = require('express').Router();

/* set params */
router.param('workout', function (req, res, next) {
	//TODO
	req.workout = 'Workout.';

	next();
});
router.param('exercise', function (req, res, next) {
	//TODO
	req.exercise = 'Exercise.';

	next();
});

/* ENDPOINTS -- These are strictly suggestions, feel free to modify */

/* GET all workouts. */
router.get('/allWorkouts', function (req, res, next) {
	res.json([
		{
			workoutId: '421',
			workoutName: 'my workouts',
			exercises: ['77', '167', '135'],
		},
		{
			workoutId: '235',
			workoutName: 'my favs',
			exercises: ['557', '77'],
		},
	]);
	res.status(200);
	res.send('get all workouts');
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
	]);
	res.status(200);
	res.send('get all exercises');
});
/* GET a specific workout. */
router.get('/:workout', function (req, res) {
	res.json({
		workoutId: '235',
		workoutName: 'my favs',
		exercises: ['557', '77'],
	});
	res.status(200);
	res.send('get workout: ' + req.workout);
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
	res.send('get exercise: ' + req.exercise);
});
/* Create a workout */
router.post('/create', function (req, res) {
	res.send('create workout');
});
/* Create a exercise */
router.post('/exercise/create', function (req, res) {
	res.send('create exercise');
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
