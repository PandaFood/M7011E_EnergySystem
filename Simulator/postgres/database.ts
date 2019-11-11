const {Client} = require('pg');


const client = new Client();

module.exports.getHouse = async function() {
	await client.connect();
	client.query('SELECT NOW() as now', (err, res) => {
		if (err) {
			console.log(err.stack);
		} else {
			console.log(res.rows[0]);
		}
		client.end();
	});
};
