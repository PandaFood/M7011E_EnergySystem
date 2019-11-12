const {Client} = require('pg');
const mappingHelper = require('./object-map-helper')


const client = new Client();

module.exports.getHouse = async function(id) {
	const query = 'SELECT * FROM House WHERE ID = $1';
	const values = [id];

	await client.connect();
	client.query(query, values, (err, res) => {
		if (err) {
			console.log(err.stack);
		} else {
			console.log(res.rows[0]);
		}
		client.end();
	});
};
