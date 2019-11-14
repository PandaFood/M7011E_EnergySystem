const fs = require('fs');
const House = require('./house');

Simulator = {
	price: 0,
	power: 0,
	houses: [],

	/**
	 * Sell power to a house
	 * @param {number} powerNeed
	 * @return {number}
	 */
	sellPower: function(powerNeed) {
		power -= powerNeed;

		// TODO: buy power from a power plant if needed
		return powerNeed;
	},

	/**
	 * Buy power from a house
	 * @param {number} power
	 */
	buyPower: function(power) {
		this.power += power;
	},

	initHouses: function(configPath) {
		const config = JSON.parse(fs.readFileSync('config/house.json', 'utf8'));

		config.forEach((initValues) => {
			this.houses.push(new House(initValues, this));
		});
	},

	runSimulation: function() {
		this.initHouses();

		this.houses.forEach((house) => {
			house.runSimulation();
		});
	},
};

module.exports = Simulator;
