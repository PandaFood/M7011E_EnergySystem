const {Pool} = require('pg');

const client = new Pool();
client.connect();

const Database = {
	getHouses: async function() {
		const query = 'SELECT * FROM House';

		const response = await client.query(query);
		return response;
	},

	getHouse: async function(id) {
		const query = 'SELECT * FROM House WHERE ID = $1';
		const values = [id];

		const response = await client.query(query, values);
		return response;
	},

	addHouse: async function(name, adress, consumption) {
		const query = 'INSERT INTO House VALUES(uuid_generate_v4(), $1, $2, $3)';
		const values = [name, adress, consumption];

		const response = await client.query(query, values);
		return response;
	},

		const response = await client.query(query, values);
		return response;
	},

};

module.exports = Database;

