const router = require('express').Router();

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
			workoutName: 'Jasons workout',
			exercises: ['77', '167', '135'],
		},
		{
			workoutId: '235',
			workoutName: 'Patricks workout',
			exercises: ['557', '77'],
		},
		{
			workoutId: '765',
			workoutName: 'Todds workout',
			exercises: ['77', '167', '135'],
		},
		{
			workoutId: '945',
			workoutName: 'The Arnold',
			exercises: ['557', '77'],
		},
		{
			workoutId: '022',
			workoutName: 'The Brady',
			exercises: ['77', '167', '135'],
		},
		{
			workoutId: '589',
			workoutName: 'Run Every Day No Matter What',
			exercises: ['557', '77'],
		},
		{
			workoutId: '111',
			workoutName: 'The Couch Potato',
			exercises: ['77', '167', '135'],
		},
		{
			workoutId: '578',
			workoutName: 'Ab Ripper X',
			exercises: ['557', '77'],
		},
		{
			workoutId: '764',
			workoutName: 'P90X',
			exercises: ['77', '167', '135'],
		},
		{
			workoutId: '036',
			workoutName: 'Athlete Training',
			exercises: ['557', '77'],
		},
	]);
	res.status(200);
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
	res.json({
		workoutId: '235',
		workoutName: 'my favs',
		exercises: ['557', '77'],
	});
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
