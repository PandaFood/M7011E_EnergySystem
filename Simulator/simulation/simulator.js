const WindTurbine = require('./windturbine');

Simulator = {
	startSimulator: function () {
		const windT = new WindTurbine(1);
		setInterval(windT.runSimulator, windT.pollTime, windT);
	},
};

module.exports = Simulator;