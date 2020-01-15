const House = require('./house');
const CoalPlant = require('./coalplant');
const Database = require('../postgres/database');
const Noise = require('./noise');

Simulator = {
	currentPrice: 0,
	calculatedPrice: 0,
	useCalculatedPrice: true,
	power: 500,
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
		if (powerNeed > this.power) {
			powerNeed = this.power;
			this.power = 0;
		} else {
			this.power -= powerNeed;
			this.powerLoss += powerNeed;
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
	storeWindData: function(polledData) {
		polledData.timestamp = this.timestamp;
		Database.addProducerEvent(polledData);
	},
	storeBatteryData: function(batteryData) {
		batteryData.timestamp = this.timestamp;
		Database.addStorageEvent(batteryData);
		Database.updateStorage(batteryData.id, batteryData.currentCapacity);
	},
	refreshWindTurbines: async function(houseId) {
		const windTurbines = await Database.getProducers(houseId);
		const house = this.houses.find((house) => house.id === houseId);

		if (house) {
			house.refreshWindTurbines(windTurbines.rows);
		}
	},
	refreshBatteries: async function(houseId) {
		const batteries = await Database.getStorages(houseId);
		const house = this.houses.find((house) => house.id === houseId);

		if (house) {
			house.refreshBatteries(batteries.rows);
		}
	},
	initHouses: async function() {
		const houses = await Database.getHouses();
		houses.rows.forEach(async (house) => {
			const batteries = await Database.getStorages(house.id);
			const windTurbines = await Database.getProducers(house.id);

			this.houses.push(new House(house, windTurbines.rows, batteries.rows, this));
		});
	},
	banHouse: function(houseId, banTime) {
		const house = this.houses.find((house) => house.id === houseId);
		return house.banHouse(banTime);
	},
	simulationLoop: function(self) {
		Noise.updateWindMap(Math.random());

		const currentTime = Date.now();
		const deltaTime = (currentTime - self.timestamp) / 1000;
		self.timestamp = new Date(currentTime);

		CoalPlant.runPlant(self, deltaTime);

		self.houses.forEach((house) => {
			if (!house.banned) {
				house.runSimulation(deltaTime);
			}
		});


		self.calcPrice();
	},

	runSimulation: async function() {
		Noise.generateWindMap(Math.random());
		await this.initHouses();
		this.timestamp = Date.now();
		setInterval(this.simulationLoop, this.pollTime, this);
	},
	calcPrice: function() {
		const cd = 10 ** 4; // Coeff for demand variable
		const cs = 1; // Coeff for supply variable
		this.calculatedPrice = cd / this.power + cs * this.powerLoss;

		if (this.useCalculatedPrice) {
			this.currentPrice = this.calculatedPrice;
		}

		// have a max price to prevent rise to infinity
		if (this.currentPrice > 999999) {
			this.currentPrice = 999999;
		}

		this.powerLoss = 0;
	},
};

module.exports = Simulator;
