const {Pool} = require('pg');

const client = new Pool();
client.connect();

const Database = {
	getUser: async function(userID) {
		const query = 'SELECT id, name, adress, city, country, co, email, password FROM users WHERE ID = $1';
		const values = [userID];

		const response = await client.query(query, values);
		return response;
	},

	getUsers: async function() {
		const query = 'SELECT id, name, adress, city, country, co, email, password FROM users';

		const response = await client.query(query);
		return response;
	},

	loginUser: async function(email) {
		const query = 'SELECT password FROM users WHERE email = $1';
		const values = [email];

		const response = await client.query(query, values);
		return response;
	},

	addUser: async function(name, adress, city, country, co, email, password) {
		const query = 'INSERT INTO users VALUES (uuid_generate_v4(),$1, $2, $3, $4, $5, $6, $7)';
		const values = [name, adress, city, country, co, email, password];

		const response = await client.query(query, values);
		return response;
	},

	removeUser: async function(id) {
		const query = 'DELETE FROM users WHERE ID = $1';
		const values = [id];

		const response = await client.query(query, values);
		return response;
	},


};

module.exports = Database;

