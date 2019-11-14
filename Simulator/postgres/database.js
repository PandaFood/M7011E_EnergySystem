const {Client} = require('pg');

const client = new Client();

module.exports.getHouses = async function(callback) {
	const query = 'SELECT * FROM House';

	await client.connect();
	client.query(query, (err, res) => {
		if (err) {
			console.log(err.stack);
		} else {
			callback( res.rows );
		}
		client.end();
	});
};


module.exports.getHouse = async function(id) {
	const query = 'SELECT * FROM House WHERE ID = $1';
	const values = [id];

	await client.connect();
	client.query(query, values, (err, res) => {
		if (err) {
			console.log(err.stack);
		} else {
			return res.rows[0];
		}
		client.end();
	});
};

module.exports.addHouse = async function(name, adress) {
	const query = 'INSERT INTO house VALUES(uuid_generate_v4(), $2, $3)';
	const values = [name, adress];

	await client.connect();
	client.query(query, values, (err, res) => {
		if (err) {
			console.log(err.stack);
		} else {
			console.log(res.rows);
		}
		client.end();
	});
};


