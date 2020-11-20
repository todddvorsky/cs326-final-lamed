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

let secrets;
let password;
if (!process.env.PASSWORD) {
	secrets = require('secrets.json');
	password = secrets.password;
} else {
	password = process.env.PASSWORD;
}

const url = process.env.DATABASE_URL || secrets.url;

const database = pgp(url);
