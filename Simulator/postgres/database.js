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
	addStorage: async function(owner, maxCapacity, currentCapacity) {
		const query = 'INSERT INTO Storage VALUES(uuid_generate_v4(), $1, $2, $3)';
		const values = [owner, maxCapacity, currentCapacity];

		const response = await client.query(query, values);
		return response;
	},
	getStorages: async function(houseId) {
		const query = 'SELECT * FROM storage WHERE "Owner" = $1';
		const values = [houseId];

		const response = await client.query(query, values);
		return response;
	},
	updateStorage: async function(storageId, capacity) {
		const query = 'UPDATE Storage SET "CurrentCapacity" = $1 WHERE "ID" = $2';
		const values = [capacity, storageId];

		const response = await client.query(query, values);
		return response;
	},

};

module.exports = Database;

