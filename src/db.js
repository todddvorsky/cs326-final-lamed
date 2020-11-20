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

let currentUserId = 2; // temp

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
		db.any('SELECT * FROM users WHERE userid = $1;', [userid])
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
// Check to see if the friend has already sent one to you
async function handlePostCheckFriend(friendid) {
	return connectAndRun((db) =>
		db.any('SELECT * FROM friends WHERE friendId = $1 AND userId = $2;', [
			currentUserId,
			friendid,
		])
	);
}
// Check to see if you already sent a friend request
async function handlePostCheckOwnRequest(friendid) {
	return connectAndRun((db) =>
		db.any('SELECT * FROM friends WHERE friendId = $1 AND userId = $2;', [
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

module.exports = {
	connectAndRun,
	handleGetUsers,
	handleGetSpecUser,
	handleGetUserWorkouts,
	handleGetDietsRecipes,
	handleGetUserDiets,
	handlePostCheckFriend,
	handlePostCheckOwnRequest,
	friendFunctions,
};
