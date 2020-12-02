const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cookieSession = require('cookie-session'); // for managing session state
const passport = require('passport'); // handles authentication
const LocalStrategy = require('passport-local').Strategy; // username/password strategy

const minicrypt = require('./public/js/miniCrypt');
const mc = new minicrypt();

const database = require('./db');
const { join } = require('path');

const app = (module.exports = express());

// Session configuration

// const session = {
// 	secret: process.env.SECRET || 'SECRET', // set this encryption key in Heroku config (never in GitHub)!
// 	resave: false,
// 	saveUninitialized: false,
// };
app.use(cookieSession({
	name: 'session',
	secret: process.env.SECRET || 'SECRET',
  
	// Cookie Options
	maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
// app.use(
// 	expressSession({
// 		cookie: { maxAge: 86400000 },
// 		store: new MemoryStore({
// 			checkPeriod: 86400000, // prune expired entries every 24h
// 		}),
// 		resave: false,
// 		secret: process.env.SECRET || 'SECRET',
// 		saveUninitialized: true,
// 	})
// );
// Passport configuration

const strategy = new LocalStrategy(async (email, password, done) => {
	const [found, id] = await findUser(email);
	if (!found) {
		// no such user
		console.log('User: ' + email + ' not found');
		return done(null, false, { message: 'Invalid Email' });
	}
	console.log('running validate password');
	const valPass = await validatePassword(email, password);
	console.log('Validate password Response: ' + valPass);
	if (!valPass) {
		console.log('bad valpass');
		// invalid password
		// delay return to rate-limit brute-force attacks
		//await new Promise((r) => setTimeout(r, 2000)); // two second delay
		return done(null, false, { message: 'Invalid password' });
	}
	// success!
	// should create a user object here, associated with a unique identifier
	return done(null, id);
});

// App configuration

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
	console.log('serializing');
	done(null, user);
	console.log('done serializing');
});

// Convert a unique identifier to a user object.
passport.deserializeUser(async (email, done) => {
	console.log('deserializing');
	done(null, email);
	console.log('done deserializing');
});

// Database functions

// Returns true iff the user exists.
async function findUser(email) {
	const user = await database.getUserByEmail(email);
	if (!user) {
		console.log('user not found');
		return [false, null];
	} else {
		console.log('user found:');
		console.log(user);
		return [true, user.userid];
	}
}

// Returns true iff the password is the one we have stored.
async function validatePassword(email, pwd) {
	const [found, id] = await findUser(email);
	if (!found) {
		return false;
	}
	const data = await database.handleGetUserPwd(id);
	// TODO test this
	console.log(data);
	console.log(id);
	if (!mc.check(pwd, data.salt, data.hashedpwd)) {
		return false;
	}
	return true;
}

// Add a user to the database.
async function addUser(email, fname, lname, pwd) {
	const [found, id] = await findUser(email);
	if (found) {
		return false;
	}
	const [salt, hash] = mc.hash(pwd);
	// TODO test this
	await database.handlePostNewUser(email, fname, lname, salt, hash);
	return true;
}

// Routes

function checkLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		// If we are authenticated, run the next route.
		next();
	} else {
		// Otherwise, redirect to the login page.
		res.redirect('../login');
	}
}

app.get('/', checkLoggedIn, async (req, res) => {
	res.redirect('../home');
});

// Like login, but add a new user and password IFF one doesn't exist already.
// If we successfully add a new user, go to /login, else, back to /register.
// Use req.body to access data (as in, req.body['username']).
// Use res.redirect to change URLs.
// TODO
app.post(
	'/register',
	async function (req, res, next) {
		const email = req.body['username'];
		const password = req.body['password'];
		const fname = req.body['fname'];
		const lname = req.body['lname'];
		if (await addUser(email, fname, lname, password)) {
			console.log('added user!');
			next();
		} else {
			console.log('failed to add user ', email);
			res.end();
		}
	},
	passport.authenticate('local', {
		// use email/password authentication
		successRedirect: '/home', // if we login, go to /home
	})
);

// Handle post data from the index.html form.
app.post(
	'/login',
	passport.authenticate('local', {
		// use email/password authentication
		successRedirect: '/home', // if we login, go to /home
	})
);

// Handle the URL /login.
app.get('/login', async (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Go to home page
app.get('/home', checkLoggedIn, async (req, res) => {
	// Go to the home page.
	res.sendFile(path.join(__dirname, 'public/home.html'));
});

// Handle logging out (takes us back to the login page).
app.get('/logout', async (req, res) => {
	req.logout(); // Logs us out!
	res.redirect('../login'); // back to login
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./routes'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({error: err});
});
