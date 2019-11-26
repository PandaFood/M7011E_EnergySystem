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
		const query = 'SELECT * FROM House WHERE id = $1';
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
	addStorage: async function(owner, maxCapacity, currentCapacity, fillPercentage) {
		const query = 'INSERT INTO Storage VALUES(uuid_generate_v4(), $1, $2, $3, $4)';
		const values = [owner, maxCapacity, currentCapacity, fillPercentage];

		const response = await client.query(query, values);
		return response;
	},
	getStorages: async function(houseId) {
		const query = 'SELECT * FROM storage WHERE "owner" = $1';
		const values = [houseId];

		const response = await client.query(query, values);
		return response;
	},
	updateStorage: async function(storageId, capacity) {
		const query = 'UPDATE Storage SET "currentCapacity" = $1 WHERE "id" = $2';
		const values = [capacity, storageId];

		const response = await client.query(query, values);
		return response;
	},
	addStorageEvent: async function(storageData) {
		const query = 'INSERT INTO StorageEvent VALUES(uuid_generate_v4(), $1, $2, $3)';
		const values = [storageData.id, storageData.currentCapacity, storageData.timestamp];

		const response = await client.query(query, values);
		return response;
	},
	getStorageEvents: async function(storageId) {
		const query = 'SELECT * FROM StorageEvent WHERE "storageId" = $1';
		const values = [storageId];

		const response = await client.query(query, values);
		return response;
	},
	addProducer: async function(houseId, coord, type) {
		const query = 'INSERT INTO Producer VALUES(uuid_generate_v4(), $1, $2, $3)';
		const values = [houseId, type, coord];

		const response = await client.query(query, values);
		return response;
	},
	getProducers: async function(houseId) {
		const query = 'SELECT * FROM producer WHERE "owner" = $1';
		const values = [houseId];

		const response = await client.query(query, values);
		return response;
	},
	addProducerEvent: async function(polledData) {
		const query = 'INSERT INTO producerevent VALUES(uuid_generate_v4(), $1, $2, $3, $4, $5)';
		const values = [polledData.id, polledData.timestamp, polledData.status, polledData.power, polledData.windSpeed];

		const response = await client.query(query, values);
		return response;
	},
	getProducerEvents: async function(producerId) {
		const query = 'SELECT * FROM producerevent WHERE "producerId" = $1';
		const values = [producerId];

		const response = await client.query(query, values);
		return response;
	},
};

module.exports = Database;

