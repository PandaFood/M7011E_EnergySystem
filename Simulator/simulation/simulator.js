const fs = require('fs');
const House = require('./house');
const CoalPlant = require('./coalplant');

Simulator = {
	price: 0,
	power: 1000,
	houses: [],
	powerGain: 0,
	powerLoss: 0,
	timestamp: Date.now(),
	/**
	 * Sell power to a house
	 * @param {number} powerNeed
	 * @return {number}
	 */
	sellPower: function(powerNeed) {
		this.power -= powerNeed;
		this.powerLoss += powerNeed;

		// prevent negative values until buying from a coal plant is possible
		if (this.power <= 0) {
			this.power += CoalPlant.sellPower(100);
		}
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

	simulationLoop: function(self) {
		const currentTime = Date.now();
		const deltaTime = (currentTime - self.timestamp) / 1000;
		self.timestamp = new Date(currentTime);

		self.houses.forEach((house) => {
			house.runSimulation(deltaTime);
		});

		CoalPlant.runPlant(deltaTime);

		self.calcPrice();
	},

	runSimulation: function() {
		this.initHouses('config/house.json');

		setInterval(this.simulationLoop, 1000, this);
	},
	calcPrice: function() {
		const cd = 10 ** 6; // Coeff for demand variable
		const cs = 1; // Coeff for supply variable
		this.price = cd / this.power + cs * this.powerLoss;

		// console.log('Power: ' + this.power.toFixed(2) + ' -- Price: ' +
		// 				this.price.toFixed(2)+' -- Loss: '+this.powerLoss.toFixed(2));

		this.powerLoss = 0;
	},
};

module.exports = Simulator;
