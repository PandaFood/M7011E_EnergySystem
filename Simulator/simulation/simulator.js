// const WindTurbine = require('./windturbine');
const House = require('./house');

Simulator = {

	// startSimulator: function() {
	// 	const windT = new WindTurbine(1);

	// 	setInterval(windT.runSimulator, windT.pollTime, windT);
	// },

	run: function() {
		const house = new House();

		house.run();
	},
};

module.exports = Simulator;
