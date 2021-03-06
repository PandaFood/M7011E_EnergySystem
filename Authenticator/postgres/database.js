const {Pool} = require('pg');

const client = new Pool();
client.connect();

const Database = {
	getUser: async function(userID) {
		// eslint-disable-next-line max-len
		const query = 'SELECT id, name, adress, city, country, co, email, password, role, "houseId" FROM users WHERE ID = $1';
		const values = [userID];

		const response = await client.query(query, values);
		return response;
	},

	getUsers: async function() {
		const query = 'SELECT id, name, adress, city, country, co, email, role, "houseId" FROM users';

		const response = await client.query(query);
		return response;
	},

	loginUser: async function(email) {
		const query = 'SELECT * FROM users WHERE email = $1';
		//const query = 'SELECT password, id, role, "houseId" FROM users WHERE email = $1';
		const values = [email];

		const response = await client.query(query, values);
		return response;
	},

	addUser: async function(name, adress, city, country, co, email, password) {
		// eslint-disable-next-line max-len
		const query = 'INSERT INTO users VALUES (uuid_generate_v4(),$1, $2, $3, $4, $5, $6, $7, $8, uuid_generate_v4())';
		const values = [name, adress, city, country, co, email, password, 'USER'];

		this.checkUser(email).then((rows) => {
			if (rows.rowCount > 0) {
				return 0;
			}
			const response = client.query(query, values);
			return response;
		}).catch((err) => console.log(err));
	},

	checkUser: async function(email) {
		const query = 'SELECT email FROM users WHERE email = $1';
		const values = [email];

		const response = await client.query(query, values);
		return response;
	},

	removeUser: async function(id) {
		const query = 'DELETE FROM users WHERE ID = $1';
		const values = [id];

		const response = await client.query(query, values);
		return response;
	},
	getUserHouseId: async function(email) {
		const query = 'SELECT "houseId" FROM users WHERE email = $1';
		const values = [email];

		const response = await client.query(query, values);

		return response;
	},


};

module.exports = Database;

