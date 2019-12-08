const {Pool} = require('pg');
const hash = require('../auth/hashing');

const client = new Pool();
client.connect();

const Database = {
	getHouses: async function() {
		const query = 'SELECT (id, name, adress, city, country, co, email) FROM user';

		const response = await client.query(query);
		return response;
	},

	loginUser: async function(userID) {
		const query = 'SELECT (id, name, adress, city, country, co, email) FROM user WHERE ID = $1';
		const values = [id];

		const response = await client.query(query, values);
		return response;
	},

	addUser: async function(name, adress, city, country, co, email, password) {
		password = hash.hashPassword(password);

		const query = 'INSERT INTO user VALUES(uuid_generate_v4(),$1, $2, $3, $4, $5, $6, $7)';
		const values = [name, adress, city, country, co, email, password];

		const response = await client.query(query, values);
		return response;
	},


};

module.exports = Database;


async function getPassword(userID){
	const query = 'SELECT (password) FROM user WHERE ID = $1';
	const values = [userID];
	const response = await client.query(query, values);
	return response;

}

