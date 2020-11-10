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
	res.send(["push-ups", "dead lift", "bench presses", "curls", "run a mile", "bike 10 miles", "sit-ups", "jumping jacks", "lounges", "squats"]);
});
/* GET all exercises. */
router.get('/exercises', function (req, res) {
	res.send('get all exercises');
});
/* GET a specific workout. */
router.get('/:workout', function (req, res) {
	res.send("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
});
/* GET a specific exercise. */
router.get('/exercises/:exercise', function (req, res) {
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
