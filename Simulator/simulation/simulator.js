const fs = require('fs');

const WindTurbine = require('./windturbine');
const House = require('./house');

Simulator = {

	// startSimulator: function() {
	// 	const windT = new WindTurbine(1);

	// 	setInterval(windT.runSimulator, windT.pollTime, windT);
	// },

	runSimulation: function() {

		let houses = [];

		var config = JSON.parse(fs.readFileSync('config/house.json', 'utf8'));

		config.forEach((initValues) => {
			houses.push(new House(initValues));
		});


		houses.forEach(house => {
			house.runSimulation();
		});
	},
};

module.exports = Simulator;
