const House = require('./house');
const CoalPlant = require('./coalplant');
const Database = require('../postgres/database');
const Noise = require('./noise');

Simulator = {
	price: 0,
	power: 10000,
	houses: [],
	powerGain: 0,
	powerLoss: 0,
	timestamp: 0,
	pollTime: 1000,
	/**
	 * Sell power to a house
	 * @param {number} powerNeed
	 * @return {number}
	 */
	sellPower: function(powerNeed) {
		this.power -= powerNeed;
		this.powerLoss += powerNeed;

		if (this.power <= 0 && CoalPlant.getStatus() == 'up') {
			this.power += CoalPlant.sellPower(100);
		} else if (this.power <= 0) {
			this.power = 0;
			return 0;
		}
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
	storeWindData(polledData) {
		polledData.timestamp = this.timestamp;
		// console.log(polledData);
		Database.addProducerEvent(polledData);
	},
	storeBatteryData(batteryData) {
		batteryData.timestamp = this.timestamp;
		Database.addStorageEvent(batteryData);
		Database.updateStorage(batteryData.id, batteryData.currentCapacity);
	},
	initHouses: async function() {
		const houses = await Database.getHouses();
		houses.rows.forEach(async (house) => {
			const batteries = await Database.getStorages(house.id);
			const windTurbines = await Database.getProducers(house.id);

			this.houses.push(new House(house, windTurbines.rows, batteries.rows, this));
		});
	},

	simulationLoop: function(self) {
		Noise.updateWindMap(Math.random());

		const currentTime = Date.now();
		const deltaTime = (currentTime - self.timestamp) / 1000;
		self.timestamp = new Date(currentTime);

		self.houses.forEach((house) => {
			house.runSimulation(deltaTime);
		});

		CoalPlant.runPlant(deltaTime);

		self.calcPrice();
	},

	runSimulation: async function() {
		await this.initHouses();
		this.timestamp = Date.now();
		Noise.generateWindMap(Math.random());
		setInterval(this.simulationLoop, this.pollTime, this);
	},
	calcPrice: function() {
		const cd = 10 ** 6; // Coeff for demand variable
		const cs = 1; // Coeff for supply variable
		this.price = cd / this.power + cs * this.powerLoss;

		// console.log('Power: ' + this.power.toFixed(2) + ' -- Price: ' +
		// this.price.toFixed(2)+' -- Loss: '+this.powerLoss.toFixed(2));

		this.powerLoss = 0;
	},
};

module.exports = Simulator;
