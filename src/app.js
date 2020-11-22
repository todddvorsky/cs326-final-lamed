const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const expressSession = require('express-session'); // for managing session state
const passport = require('passport'); // handles authentication
const LocalStrategy = require('passport-local').Strategy; // username/password strategy

const minicrypt = require('./public/js/miniCrypt');
const mc = new minicrypt();

const database = require('./db');
const { join } = require('path');

const app = (module.exports = express());

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
		console.log("Name: " + name + " not found");
		return done(null, false, { message: 'Invalid Username or Email' });
	}
	console.log("running validate password");
	const valPass = await validatePassword(id, password);
	console.log("Validate password Response: " + valPass)
	if (!valPass) {
		console.log("bad valpass");
		// invalid password
		// delay return to rate-limit brute-force attacks
		//await new Promise((r) => setTimeout(r, 2000)); // two second delay
		return done(null, false, { message: 'Invalid password' });
	}
	// success!
	// should create a user object here, associated with a unique identifier
	return done(null, username);
});

// App configuration

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), { index: 'home.html' }));

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
	console.log(data);
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
		res.redirect('/login');
	}
}

app.get('/', checkLoggedIn, (req, res) => {
	res.redirect('/home');
});

// Handle the URL /login.
app.get('/login', (req, res) =>
	res.sendFile(path.join(__dirname, 'public/index.html'))
	//res.render(path.join(__dirname, 'public/index'))
);

// Go to home page
app.get('/home', checkLoggedIn, (req, res) => {
	// Go to the user's page.
	res.sendFile(path.join(__dirname, 'public/home.html'));
	//res.render('home');
}
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
app.post('/register', async function (req, res, next) {
	const username = req.body['username'];
	const password = req.body['password'];
	const email = req.body['email'];
	const fname = req.body['fname'];
	const lname = req.body['lname'];
	if (await addUser(username, password)) {
		console.log("added user!");
		next();
	} else {
		console.log("failed to add user ", username);
		res.end();
	}
	}, passport.authenticate(strategy, { // use username/password authentication
		successRedirect: '/home', // when we login, go to /home
		failureRedirect: '/login', // otherwise, back to login
	})
);

// Handle post data from the login.html form.
app.post('/login',
	passport.authenticate(strategy, { // use username/password authentication
		successRedirect: '/home', // when we login, go to /home
		failureRedirect: '/login', // otherwise, back to login
	})
);

// // A dummy page for the user.
// app.get(
// 	'/private/:userID/',
// 	checkLoggedIn, // We also protect this route: authenticated...
// 	(req, res) => {
// 		// Verify this is the right user.
// 		if (req.params.userID === req.user) {
// 			res.writeHead(200, { 'Content-Type': 'text/html' });
// 			res.write('<H1>HELLO ' + req.params.userID + '</H1>');
// 			res.write('<br/><a href="/logout">click here to logout</a>');
// 			res.end();
// 		} else {
// 			res.redirect('/private/');
// 		}
// 	}
// );

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
	res.render('error');
});

const port = 8080;
app.listen(port);
