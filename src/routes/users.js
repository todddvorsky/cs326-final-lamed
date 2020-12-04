const router = require('express').Router();
const database = require('../db.js');

/* ENDPOINTS */

/* GET all users */
router.get('/', async function (req, res, next) {
	const data = await database.handleGetUsers();
	res.send(data);
});

/* GET a specific user. */
router.get('/:user', async function (req, res) {
	const specUser = await database.handleGetSpecUser(req.params.user);
	res.send(specUser);
});

/*GET the current users workouts*/
router.get('/workouts/currentUser', async function (req, res) {
	const userWorkouts = await database.handleGetUserWorkouts(req.user);
	res.send(userWorkouts);
});

/*GET the current users diets*/
router.get('/diets/currentUser', async function (req, res) {
	const userDiets = await database.handleGetUserDiets(req.user);
	res.send(userDiets);
});

/*GET a specific diet's recipes
This really belongs in the diets route, not here */
router.get('/diets/recipes/:dietid', async function (req, res) {
	const recipes = await database.handleGetDietsRecipes(req.params.dietid);
	res.send(recipes);
});

/*GET a specific workouts exercises
This really belongs in the workouts route, not here */
router.get('/workouts/exercises/:workoutid', async function (req, res) {
	const exercises = await database.handleGetWorkoutsExercises(
		req.params.workoutid
	);
	res.send(exercises);
});

/*POST to add a friend*/
router.post('/addfriend/:friendemail', async function (req, res) {
	const user = await database.getUserByEmail(req.params.friendemail);
	if (!user) {
		res.json({ msg: 'No user with that email was found' });
	} else {
		const friendId = user.userid;
		const friendStatus = await database.handlePostCheckFriend(friendId);
		const yourStatus = await database.handlePostCheckOwnRequest(friendId);
		if (!yourStatus[0]) {
			if (!friendStatus[0]) {
				await database.friendFunctions(req.user, friendId, 'add_pending');
				res.json({ msg: 'friend request sent!' });
			} else if (friendStatus[0].status === 'pending') {
				await database.friendFunctions(req.user, friendId, 'change');
				await database.friendFunctions(req.user, friendId, 'add_accepted');
				res.json({ msg: 'friend request accepted!' });
			} else if (friendStatus[0].status === 'accepted') {
				res.json({ msg: 'friend request already accepted!' });
			}
		} else if (yourStatus[0].status === 'pending') {
			res.json({ msg: 'friend request already sent!' });
		} else if (yourStatus[0].status === 'accepted') {
			res.json({ msg: 'This person is already your friend!' });
		}
	}
});

/*GET a specific users friends*/
router.get('/friends/myfriends', async function (req, res) {
	const myFriends = await database.handleGetMyFriends();
	res.send(myFriends);
});

/* DELETE the friend selected off the current users friends list */
router.delete('/friends/delete/:friendid', async function (req, res) {
	const updated = await database.handleDeleteFriend(req.params.friendid);
	res.json({ msg: 'User has been deleted off friends list' });
});

/* Update a user with this id */
router.post('/update/current', async function (req, res) {
	const updated = await database.handlePostUpdateUserNames_Email(
		req.user,
		req.body
	);
	res.send(updated);
});

/*GET the current users profile info*/
router.get('/profile/myinfo', async function (req, res) {
	const myInfo = await database.handleGetMyProfileInfo();
	res.send(myInfo);
});

/*POST to update the profile info*/
router.post('/profile/info/update', async function (req, res) {
	const updated = await database.handlePostUpdateProfileInfo(req.body);
	res.send(updated);
});

/*POST to Create the initial profile info*/
router.post('/profile/info/create', async function (req, res) {
	const updated = await database.handlePostCreateInitialProfile(req.body);
	res.send(updated);
});

/*POST to Create the the days plan*/
router.post('/profile/plan/create', async function (req, res) {
	const updated = await database.handlePostCreateDaysPlan(req.body);
	updated['userId'] = req.user;
	res.send(updated);
});

/*POST to update the profile days workout*/
router.post('/profile/workout/update', async function (req, res) {
	const updated = await database.handlePostUpdateDaysWorkout(req.body);
	res.send(updated);
});

/*POST to update the profile days diet*/
router.post('/profile/diet/update', async function (req, res) {
	const updated = await database.handlePostUpdateDaysDiet(req.body);
	res.send(updated);
});

/*GET to get the a day for the profile plan*/
router.get('/profile/plan/:day', async function (req, res) {
	const created = await database.handleGetaDaysPlan(req.params.day);
	res.send(created);
});

// GET a specific user's workouts with name
router.get('/workouts/:name', async function (req, res) {
	const userWorkouts = await database.handleGetUserWorkoutsWithName(
		req.params.user,
		req.params.name
	);
	res.send(userWorkouts);
});

// GET a specific user's diets with name
router.get('/diets/:name', async function (req, res) {
	const userDiets = await database.handleGetUserDietsWithName(
		req.params.user,
		req.params.name
	);
	res.send(userDiets);
});

module.exports = router;
