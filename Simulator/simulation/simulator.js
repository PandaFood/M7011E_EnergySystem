const fs = require('fs');
const House = require('./house');

Simulator = {
	runSimulation: function() {
		const houses = [];
		const config = JSON.parse(fs.readFileSync('config/house.json', 'utf8'));

		config.forEach((initValues) => {
			houses.push(new House(initValues));
		});

		houses.forEach((house) => {
			house.runSimulation();
		});
	},
};

module.exports = Simulator;
