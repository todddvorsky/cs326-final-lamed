const router = require('express').Router();
const database = require('../db.js');

let currentUserId = 2;

/* set params */
router.param('user', function (req, res, next) {
	//TODO
	req.user = 'User.';

	next();
});

/* ENDPOINTS -- These are strictly suggestions, feel free to modify */
/* GET all users */
router.get('/', async function (req, res, next) {
	//send back all users & respectful info, but for now send back array of names to test
	const data = await database.handleGetUsers();
	console.log(data);
	res.send(data);
});

/* GET a specific user. */
router.get('/:user', async function (req, res) {
	//send back a user with that id and info
	const specUser = await database.handleGetSpecUser(req.params.user);
	res.send(specUser);
});

/*GET a specific users workouts*/
router.get('/workouts/:user', async function (req, res) {
	const userWorkouts = await database.handleGetUserWorkouts(req.params.user);
	res.send(userWorkouts);
});

/*GET a specific users diets*/
router.get('/diets/:user', async function (req, res) {
	const userDiets = await database.handleGetUserDiets(req.params.user);
	res.send(userDiets);
});

/*GET a specific diet's recipes
This really belongs in the diets route, not here
*/
router.get('/diets/recipes/:dietid', async function (req, res) {
	const recipes = await database.handleGetDietsRecipes(req.params.dietid);
	res.send(recipes);
});

/*POST to add a friend*/
router.post('/addfriend/:friendemail', async function (req, res) {
	const users = await database.getUserByEmail(req.params.friendemail);
	const friendId = users.userid;
	const friendStatus = await database.handlePostCheckFriend(friendId);
	const yourStatus = await database.handlePostCheckOwnRequest(friendId);
	console.log(friendStatus);
	console.log(yourStatus);
	if (!yourStatus[0]) {
		if (!friendStatus[0]) {
			await database.friendFunctions(currentUserId, friendId, 'add_pending');
			res.json({ msg: 'friend request sent!' });
		} else if (friendStatus[0].status === 'pending') {
			await database.friendFunctions(currentUserId, friendId, 'change');
			await database.friendFunctions(currentUserId, friendId, 'add_accepted');
			res.json({ msg: 'friend request accepted!' });
		} else if (friendStatus[0].status === 'accepted') {
			res.json({ msg: 'friend request already accepted!' });
		}
	} else if (yourStatus[0].status === 'pending') {
		res.json({ msg: 'friend request already sent!' });
	} else if (yourStatus[0].status === 'accepted') {
		res.json({ msg: 'This person is already your friend!' });
	}
});

/* Create a user */
router.post('/create', function (req, res) {
	//send back the name of the user created just to test the create

	res.json({ name: 'created' });
});

/* Update a user with this id */
router.post('/update/:user', async function (req, res) {
  console.log(req.body);
	const updated = await handlePostUpdateUserNames_Email(req.params.user, req.body);
	res.send(updated);
});

/* Create a user */
router.post('/create', function(req, res){
  //send back the name of the user created just to test the create
  res.json({name: "created"});
});

module.exports = router;
