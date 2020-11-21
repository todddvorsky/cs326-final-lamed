// For loading environment variables.
require('dotenv').config();

const express = require('express'); // express routing
const expressSession = require('express-session'); // for managing session state
const passport = require('passport'); // handles authentication
const LocalStrategy = require('passport-local').Strategy; // username/password strategy

const app = require('../app');

const minicrypt = require('./miniCrypt');
const mc = new minicrypt();

const database = require('../db');

// Session configuration

const session = {
	secret: process.env.SECRET || 'SECRET', // set this encryption key in Heroku config (never in GitHub)!
	resave: false,
	saveUninitialized: false,
};

// Passport configuration

const strategy = new LocalStrategy(async (name, password, done) => {
	const [found, id] = await findUser(name);
	if (!found) {
		// no such user
		return done(null, false, { message: 'Invalid Username or Email' });
	}
	if (!await validatePassword(id, password)) {
		// invalid password
		// delay return to rate-limit brute-force attacks
		await new Promise((r) => setTimeout(r, 2000)); // two second delay
		return done(null, false, { message: 'Invalid password' });
	}
	// success!
	// should create a user object here, associated with a unique identifier
	return done(null, username);
});

// App configuration

app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
	done(null, user);
});
// Convert a unique identifier to a user object.
passport.deserializeUser((uid, done) => {
	done(null, uid);
});

// Database functions

// Returns true iff the user exists.
async function findUser(input) {
	const user = await database.handleGetSpecUser(input);
	// TODO test this
	console.log("Find User: " + JSON.stringify(user));
	if (!user) {
		return [false, null];
	} else {
		return [true, user.userId];
	}
}

// Returns true iff the password is the one we have stored.
async function validatePassword(name, pwd) {
	const [found, id] = await findUser(name);
	if (!found) {
		return false;
	}
	const data = await database.handleGetUserPwd(id);
	// TODO test this
	console.log(JSON.stringify(data));
	if (!mc.check(pwd, data.salt, data.hashedpwd)) {
		return false;
	}
	return true;
}

// Add a user to the "database".
async function addUser(name, pwd) {
	const [found, id] = await findUser(name);
	if (!found) {
		return false;
	}
	const [salt, hash] = mc.hash(pwd);
	// TODO test this
	await database.handlePostNewUser(id, salt, pwd);
	return true;
}

// Routes

function checkLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		// If we are authenticated, run the next route.
		next();
	} else {
		// Otherwise, redirect to the login page.
		res.redirect('/');
	}
}

app.get('/', checkLoggedIn, (req, res) => {
	res.render('index', { title: 'Express' });
});

// Handle post data from the login.html form.
app.post(
	'/login',
	passport.authenticate('local', {
		// use username/password authentication
		successRedirect: '/private', // when we login, go to /private
		failureRedirect: '/login', // otherwise, back to login
	})
);

// Handle the URL /login (just output the login.html file).
app.get('/login', (req, res) =>
	res.sendFile('html/login.html', { root: __dirname })
);

// Handle logging out (takes us back to the login page).
app.get('/logout', (req, res) => {
	req.logout(); // Logs us out!
	res.redirect('/login'); // back to login
});

// Like login, but add a new user and password IFF one doesn't exist already.
// If we successfully add a new user, go to /login, else, back to /register.
// Use req.body to access data (as in, req.body['username']).
// Use res.redirect to change URLs.
// TODO
app.post('/register', async function (req, res) {
	const username = req.body['username'];
	const password = req.body['password'];
	if (await addUser(username, password)) {
		res.redirect('/login');
	} else {
		res.redirect('/register');
	}
});

// Register URL
app.get('/register', (req, res) =>
	res.sendFile('html/register.html', { root: __dirname })
);

// Private data
app.get(
	'/private',
	checkLoggedIn, // If we are logged in (notice the comma!)...
	(req, res) => {
		// Go to the user's page.
		res.redirect('/private/' + req.user);
	}
);

// A dummy page for the user.
app.get(
	'/private/:userID/',
	checkLoggedIn, // We also protect this route: authenticated...
	(req, res) => {
		// Verify this is the right user.
		if (req.params.userID === req.user) {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write('<H1>HELLO ' + req.params.userID + '</H1>');
			res.write('<br/><a href="/logout">click here to logout</a>');
			res.end();
		} else {
			res.redirect('/private/');
		}
	}
);

app.use(express.static('html'));

app.get('*', (req, res) => {
	res.send('Error');
});

module.exports = {
	checkLoggedIn
}