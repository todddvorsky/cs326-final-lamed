const router = require('express').Router();
let currentUserId = 2;

/* set params */
router.param('user', function (req, res, next) {
	//TODO
	req.user = 'User.';

	next();
});

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

const username = "postgres";
const password = "bankmastaB12";

const url = process.env.DATABASE_URL || `postgres://${username}:${password}@localhost/proj`;
console.log(url);
const db = pgp(url);

async function connectAndRun(task) {
    let connection = null;

    try {
        connection = await db.connect();
        return await task(connection);
    } catch (e) {
        throw e;
    } finally {
        try {
            connection.done();
        } catch(ignored) {

        }
    }
}

async function handleGetUsers() {
  return await connectAndRun(db => db.any('SELECT * FROM users;'));
};
async function handleGetSpecUser(userid) {
  return await connectAndRun(db => db.any('SELECT * FROM users WHERE userid = $1;', [userid]));
};
async function handleGetUserWorkouts(userid) {
  return await connectAndRun(db => db.any('SELECT * FROM workouts WHERE userid = $1;', [userid]));
};
async function handleGetUserDiets(userid) {
  return await connectAndRun(db => db.any('SELECT * FROM diets WHERE userid = $1;', [userid]));
};
async function handleGetDietsRecipes(dietid) {
  return await connectAndRun(db => db.any('SELECT * FROM recipes WHERE dietid = $1;', [dietid]));
};
//Check to see if the friend has already sent one to you
async function handleGETCheckFriend(friendid) {
  return await connectAndRun(db => db.any('SELECT * FROM friends WHERE friendId = $1 AND userId = $2;', [currentUserId, friendid]));
};
//Check to see if you already sent a friend request
async function handleGETCheckOwnRequest(friendid) {
  return await connectAndRun(db => db.any('SELECT * FROM friends WHERE friendId = $1 AND userId = $2;', [friendid, currentUserId]));
};

async function friendFunctions(userid, friendid, action){
  //if no status was found for these friends
  if(action === 'add_pending'){
    await connectAndRun(db => db.none('INSERT INTO friends(userId, friendId, status) VALUES($1,$2,$3);', [userid, friendid, 'pending']));
  }
  //If a friend request was already sent, affirm it from both sides in the db
  if(action === 'add_accepted'){
    await connectAndRun(db => db.none('INSERT INTO friends(userId, friendId, status) VALUES($1,$2,$3);', [userid, friendid, 'accepted']));
  }
  //if someone already sent a request to you, change that status from pending to accepted
  if(action === 'change'){
    await connectAndRun(db => db.none('DELETE FROM friends WHERE userId = $1 AND friendId = $2 AND status = $3;', [friendid, userid, 'pending']));
    await connectAndRun(db => db.none('INSERT INTO friends(userId, friendId, status) VALUES($1,$2,$3);', [friendid, userid, 'accepted']));
  }
};


/* ENDPOINTS -- These are strictly suggestions, feel free to modify */
/* GET all users */
router.get('/', async function(req, res, next) {
  //send back all users & respectful info, but for now send back array of names to test
  const data = await handleGetUsers();
  console.log(data);
  res.send(data);
});

/* GET a specific user. */
router.get('/:user', async function(req, res){
  //send back a user with that id and info
  const specUser = await handleGetSpecUser(req.params.user);
  res.send(specUser);
});

/*GET a specific users workouts*/
router.get('/workouts/:user', async function(req, res){
  const userWorkouts = await handleGetUserWorkouts(req.params.user);
  res.send(userWorkouts);
});

/*GET a specific users diets*/
router.get('/diets/:user', async function(req, res){
  const userDiets = await handleGetUserDiets(req.params.user);
  res.send(userDiets);
});

/*GET a specific diet's recipes
This really belongs in the diets route, not here
*/
router.get('/diets/recipes/:dietid', async function(req, res){
  const recipes = await handleGetDietsRecipes(req.params.dietid);
  res.send(recipes);
});

/*GET to add a friend*/
router.post('/addfriend/:friendemail', async function(req, res){
  let friendId = 0;
  const allUsers = await handleGetUsers();
  for(let users of allUsers){
    if(users.email === req.params.friendemail){
      friendId = users.userid;
      const friendStatus = await handleGETCheckFriend(friendId);
      const yourStatus = await handleGETCheckOwnRequest(friendId);
      console.log(friendStatus);
      console.log(yourStatus);
      if(!yourStatus[0]){
        if(!friendStatus[0]){
          await friendFunctions(currentUserId, friendId, 'add_pending');
          res.json({msg: 'friend request sent!'});
        }
        else if(friendStatus[0].status === 'pending'){
          await friendFunctions(currentUserId, friendId, 'change');
          await friendFunctions(currentUserId, friendId, 'add_accepted');
          res.json({msg:'friend request accepted!'});
        }
        else if(friendStatus[0].status === 'accepted'){
          res.json({msg: 'friend request already accepted!'});
        }
      }
      else if(yourStatus[0].status === 'pending'){
        res.json({msg:'friend request already sent!'});
      }
      else if(yourStatus[0].status === 'accepted'){
        res.json({msg:'This person is already your friend!'});
      }
    }
  }
});

/* Create a user */
router.post('/create', function(req, res){
  //send back the name of the user created just to test the create

  res.json({name: "created"});
});

/* Update a user with this id */
router.post('/update/:user', function (req, res) {
	/* update the user info and put it in the db
      but for now send back the name of the user being updated to test.
      Should be able to update any part of the user specified
      by the ID with the body info given*/
	res.json({ userid: 65, name: 'Pat' });
});

/* Delete a user */
router.delete('/delete/:user', function (req, res) {
	//delete the user from the db, for now send back id of user being deleted
	res.json({ userid: req.params.user });
});

module.exports = router;
