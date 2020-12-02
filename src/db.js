const pgp = require('pg-promise')({
	connect(client) {
		console.log('Connected to database:', client.connectionParameters.database);
	},

	disconnect(client) {
		console.log(
			'Disconnected from database:',
			client.connectionParameters.database
		);
	},
});

let currentUserId = 1; // temp

let secrets;
let password;
if (!process.env.PASSWORD) {
	secrets = require('./secrets.json');
	password = secrets.password;
} else {
	password = process.env.PASSWORD;
}

const url = process.env.DATABASE_URL || secrets.url;

const database = pgp(url);

async function connectAndRun(task) {
	let connection = null;
	try {
		connection = await database.connect();
		return await task(connection);
	} catch (e) {
		throw e;
	} finally {
		try {
			connection.done();
		} catch (ignored) {}
	}
}

//
//
// USERS

async function handleGetUsers() {
	return connectAndRun((db) => db.any('SELECT * FROM users;'));
}
async function handleGetSpecUser(userid) {
	return connectAndRun((db) =>
		db.one('SELECT * FROM users WHERE userid = $1;', [userid])
	);
}
async function handleGetUserPwd(userid) {
	return connectAndRun((db) =>
		db.one('SELECT salt, hashedpwd FROM passwords WHERE userId = $1;', [userid])
	);
}
async function handleGetUserWorkouts(userid) {
	return connectAndRun((db) =>
		db.any('SELECT * FROM workouts WHERE userid = $1;', [userid])
	);
}
async function handleGetUserDiets(userid) {
	return connectAndRun((db) =>
		db.any('SELECT * FROM diets WHERE userid = $1;', [userid])
	);
}
async function handleGetDietsRecipes(dietid) {
	return connectAndRun((db) =>
		db.any('SELECT * FROM recipes WHERE dietid = $1;', [dietid])
	);
}
async function handleGetWorkoutsExercises(workoutid) {
	return connectAndRun((db) =>
		db.any('SELECT * FROM exercises WHERE workoutid = $1;', [workoutid])
	);
}
// Check to see if the friend has already sent one to you
async function handlePostCheckFriend(friendid) {
	return connectAndRun((db) =>
		db.any('SELECT * FROM friends WHERE friendid = $1 AND userid = $2;', [
			currentUserId,
			friendid,
		])
	);
}
// Check to see if you already sent a friend request
async function handlePostCheckOwnRequest(friendid) {
	return connectAndRun((db) =>
		db.any('SELECT * FROM friends WHERE friendid = $1 AND userid = $2;', [
			friendid,
			currentUserId,
		])
	);
}

async function friendFunctions(userid, friendid, action) {
	// if no status was found for these friends
	if (action === 'add_pending') {
		await connectAndRun((db) =>
			db.none(
				'INSERT INTO friends(userId, friendId, status) VALUES($1,$2,$3);',
				[userid, friendid, 'pending']
			)
		);
	}
	// If a friend request was already sent, affirm it from both sides in the db
	if (action === 'add_accepted') {
		await connectAndRun((db) =>
			db.none(
				'INSERT INTO friends(userId, friendId, status) VALUES($1,$2,$3);',
				[userid, friendid, 'accepted']
			)
		);
	}
	// if someone already sent a request to you, change that status from pending to accepted
	if (action === 'change') {
		await connectAndRun((db) =>
			db.none(
				'DELETE FROM friends WHERE userId = $1 AND friendId = $2 AND status = $3;',
				[friendid, userid, 'pending']
			)
		);
		await connectAndRun((db) =>
			db.none(
				'INSERT INTO friends(userId, friendId, status) VALUES($1,$2,$3);',
				[friendid, userid, 'accepted']
			)
		);
	}
}
async function getUserByEmail(email) {
	return connectAndRun((db) =>
		db.one('SELECT * FROM users WHERE email = $1;', [email])
	);
}

//Get the current users friends
async function handleGetMyFriends() {
	return connectAndRun((db) =>
		db.any('SELECT * FROM friends WHERE userid = $1 AND status = $2;', [
			currentUserId,
			'accepted',
		])
	);
}

//DELETE to delete the selected friend from the current users friends list
async function handleDeleteFriend(friendsid) {
	await connectAndRun((db) =>
		db.none(
			'DELETE FROM friends WHERE userId = $1 AND friendId = $2 AND status = $3;',
			[currentUserId, friendsid, 'accepted']
		)
	);
	return connectAndRun((db) =>
		db.none(
			'DELETE FROM friends WHERE userId = $1 AND friendId = $2 AND status = $3;',
			[friendsid, currentUserId, 'accepted']
		)
	);
}

//UPDATE the specified fields for a user, Body must contain firstname,lastname,email
async function handlePostUpdateUserNames_Email(userid, body) {
	await connectAndRun((db) =>
		db.any(
			'UPDATE users SET firstname = $1, lastname = $2, email=$3 WHERE userid = $4;',
			[body.firstname, body.lastname, body.email, userid]
		)
	);
	return connectAndRun((db) =>
		db.any('SELECT * from users WHERE userid =$1;', [userid])
	);
}

//Get the profile info for the current user
async function handleGetMyProfileInfo() {
	return connectAndRun((db) =>
		db.any('SELECT * FROM profileinfo WHERE userId = $1;', [currentUserId])
	);
}

//Get the profile plan for the current user
async function handleGetMyProfilePlan() {
	return connectAndRun((db) =>
		db.any('SELECT * FROM profileplan WHERE userId = $1;', [currentUserId])
	);
}

//CREATE the profile info with initial values in DB
async function handlePostCreateInitialProfile(info) {
	console.log(info);
	return connectAndRun((db) =>
		db.any(
			'INSERT INTO profileinfo(userId,username,age,goalweight,country,about,favgym,favworkout,favrecipe) VALUES($1,$2, $3, $4,$5, $6, $7, $8, $9);',
			[
				currentUserId,
				info.username,
				info.age,
				info.goalweight,
				info.country,
				info.about,
				info.favgym,
				info.favworkout,
				info.favrecipe,
			]
		)
	);
}

//CREATE the profile plan with initial values in DB
async function handlePostCreateInitialProfilePlan(info) {
	console.log(info);
	return connectAndRun((db) =>
		db.any(
			'INSERT INTO profileplan(userId,username,age,goalweight,country,about,favgym,favworkout,favrecipe) VALUES($1,$2, $3, $4,$5, $6, $7, $8, $9);',
			[
				currentUserId,
				info.username,
				info.age,
				info.goalweight,
				info.country,
				info.about,
				info.favgym,
				info.favworkout,
				info.favrecipe,
			]
		)
	);
}

//CREATE the profile plan with initial values in DB
async function handlePostCreateDaysPlan(info) {
	console.log(info);
	return connectAndRun((db) =>
		db.any(
			'INSERT INTO profileplan(userId, day, dietId, workoutId) VALUES($1,$2,$3,$4);',
			[info.userId, info.day, info.dietId, info.workoutId]
		)
	);
}

//GET a specific day's diet and workout for the profile page
async function handleGetaDaysPlan(day) {
	return connectAndRun((db) =>
		db.any('SELECT * FROM profileplan WHERE userId = $1 AND day= $2;', [
			currentUserId,
			day,
		])
	);
}

//UPDATE the profile info with whatever is inputed into the html
async function handlePostUpdateProfileInfo(info) {
	return connectAndRun((db) =>
		db.any(
			'UPDATE profileinfo SET username = $1, age=$2, goalweight = $3, country = $4, about = $5, favgym = $6, favworkout = $7, favrecipe = $8 WHERE userId = $9;',
			[
				info.username,
				info.age,
				info.goalweight,
				info.country,
				info.about,
				info.favgym,
				info.favworkout,
				info.favrecipe,
				currentUserId,
			]
		)
	);
}

//UPDATE the profile workout for the day given in info
async function handlePostUpdateDaysWorkout(info) {
	return connectAndRun((db) =>
		db.any(
			'UPDATE profileplan SET workoutId = $1 WHERE userId = $2 AND day = $3;',
			[info.workoutid, currentUserId, info.day]
		)
	);
}

//UPDATE the profile diet for the day given in info
async function handlePostUpdateDaysDiet(info) {
	return connectAndRun((db) =>
		db.any(
			'UPDATE profileplan SET dietId = $1 WHERE userId = $2 AND day = $3;',
			[info.dietid, currentUserId, info.day]
		)
	);
}

//POST a new user in both the user table and password table
//TODO update to also post to user table
async function handlePostNewUser(email, fname, lname, salt, hpwd) {
	await connectAndRun((db) =>
		db.none(
			'INSERT INTO users(email, firstName, lastName) VALUES($1,$2,$3);',
			[email, fname, lname]
		)
	);
	const r = await connectAndRun((db) =>
		db.one(
			'SELECT userId FROM users WHERE email = $1;',
			[email]
		)
	);
	const id = r.userid;
	console.log("Created user with id " + id);
	return connectAndRun((db) =>
		db.none(
			'INSERT INTO passwords(userId, salt, hashedpwd) VALUES($1,$2,$3);',
			[id, salt, hpwd]
		)
	);
}

// Get user's workouts with name
async function handleGetUserWorkoutsWithName(userid, name) {
	return connectAndRun((db) =>
		db.any(
			'SELECT workoutId FROM workouts WHERE userid = $1 AND UPPER(workoutName) = $2;',
			[userid, name.toUpperCase()]
		)
	);
}

// POST - create exercise
async function createExercise(workoutId, name, description, sets, reps, tag) {
	return connectAndRun((db) =>
		db.none(
			'INSERT INTO exercises(workoutId, name, description, sets, reps, tag) VALUES($1,$2,$3,$4,$5,$6);',
			[workoutId, name, description, sets, reps, tag]
		)
	);
}

// POST - create workout
async function createWorkout(name, userId) {
	return connectAndRun((db) =>
		db.any(
			'INSERT INTO workouts(workoutName, userId) VALUES($1,$2) RETURNING workoutId;',
			[name, userId]
		)
	);
}

// Get user's diets with name
async function handleGetUserDietsWithName(userid, name) {
	return connectAndRun((db) =>
		db.any(
			'SELECT dietId FROM diets WHERE userid = $1 AND UPPER(dietName) = $2;',
			[userid, name.toUpperCase()]
		)
	);
}

// POST - create recipe
async function createRecipe(dietId, name, description, ingredients, tag) {
	return connectAndRun((db) =>
		db.none(
			'INSERT INTO recipes(dietId, recipeName, description, ingredients, tag) VALUES($1,$2,$3,$4,$5);',
			[dietId, name, description, ingredients, tag]
		)
	);
}

// POST - create diet
async function createDiet(name, userId) {
	return connectAndRun((db) =>
		db.any(
			'INSERT INTO diets(dietName, userId) VALUES($1,$2) RETURNING dietId;',
			[name, userId]
		)
	);
}

// GET - all workouts
async function getAllWorkouts() {
	return connectAndRun((db) => db.any('SELECT * FROM workouts;'));
}

// GET - all diets
async function getAllDiets() {
	return connectAndRun((db) => db.any('SELECT * FROM diets;'));
}

// GET - specific workout by id
async function handleGetSpecWorkout(id) {
	return connectAndRun((db) => db.one( 'SELECT * FROM workouts WHERE workoutId = $1;', [id]));
}

// GET - specific diet by id
async function handleGetSpecDiet(id) {
	return connectAndRun((db) => db.one( 'SELECT * FROM diets WHERE dietId = $1;', [id]));
}

module.exports = {
	connectAndRun,
	handleGetUsers,
	handleGetSpecUser,
	handleGetUserPwd,
	handleGetUserWorkouts,
	handleGetDietsRecipes,
	handleGetWorkoutsExercises,
	handleGetUserDiets,
	handleGetMyFriends,
	handlePostCheckFriend,
	handlePostNewUser,
	handlePostCheckOwnRequest,
	handlePostUpdateDaysDiet,
	handlePostUpdateDaysWorkout,
	handleDeleteFriend,
	handlePostUpdateUserNames_Email,
	handleGetMyProfileInfo,
	handleGetaDaysPlan,
	handlePostCreateInitialProfilePlan,
	handleGetMyProfilePlan,
	handlePostUpdateProfileInfo,
	handlePostCreateDaysPlan,
	handlePostCreateInitialProfile,
	friendFunctions,
	getUserByEmail,
	handleGetUserWorkoutsWithName,
	createExercise,
	createWorkout,
	handleGetUserDietsWithName,
	createRecipe,
	createDiet,
	getAllWorkouts,
	getAllDiets,
	handleGetSpecWorkout,
	handleGetSpecDiet
};
