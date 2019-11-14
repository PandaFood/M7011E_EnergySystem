const fs = require('fs');
const House = require('./house');

Simulator = {
	price: 0,
	power: 1000,
	houses: [],
	powerGain: 0,
	powerLoss: 0,

	/**
	 * Sell power to a house
	 * @param {number} powerNeed
	 * @return {number}
	 */
	sellPower: function(powerNeed) {
		this.power -= powerNeed;
		this.powerLoss += powerNeed;

		// prevent negative values until buying from a coal plant is possible
		if (this.power <0) this.power = 0;

		// TODO: buy power from a power plant if needed
		return powerNeed;
	},

	/**
	 * Buy power from a house
	 * @param {number} power
	 */
	buyPower: function(power) {
		this.power += power;
		this.powerGain += power;
	},

	initHouses: function(configPath) {
		const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

		config.forEach((initValues) => {
			this.houses.push(new House(initValues, this));
		});
	},

	runSimulation: function() {
		this.initHouses('config/house.json');

		this.houses.forEach((house) => {
			setInterval(house.runSimulation, house.pollTime, house);
		});
		setInterval(this.calcPrice, 1000, this);
	},
	calcPrice: function(self) {
		const cd = 10 ** 6;	// Coeff for demand variable
		const cs = 1;		// Coeff for supply variable
		self.price = cd/self.power + cs*self.powerLoss;

		// console.log('Power: ' + self.power.toFixed(2) + ' -- Price: ' + \
		// 				self.price.toFixed(2)+' -- Loss: '+self.powerLoss.toFixed(2));

		self.powerLoss = 0;
		self.powerGain = 0;
	},
};

module.exports = Simulator;
