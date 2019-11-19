const WindTurbine = require('./windturbine');

/**
 */
class House {
	/**
	 * @param {JSON} initValues
	 * @param {JSON} simulator
	 */
	constructor(initValues, simulator) {
		this.simulator = simulator;
		this.id = initValues.id;
		this.pollTime = initValues.pollTime;
		this.battery = initValues.battery;
		this.batteryCapacity = initValues.batteryCapacity;
		this.batteryFillPercentage = initValues.batteryFillPercentage;

		this.windTurbines = [];
		this.initWindTurbines(initValues.windTurbines);
		this.powerConsumption = initValues.powerConsumption;

		this.timestamp = Date.now();
		this.generatedPower = 0;
	}

	/**
	 * Fill the battery with the generated power
	 * If the battery gets full calculate how much can be sold
	 * If the battery gets empty calculate how much needs to be bought
	 * @param {number} power
	 * @return {number} - power difference, positive implies power to sell, negative power to buy
	 */
	calcEnergyDifference(power) {
		let powerDiff = 0;
		const batteryGoal = (this.batteryCapacity * this.batteryFillPercentage);

		// Calculate how much power is left to sell
		if (this.battery <= batteryGoal && this.battery + power >= batteryGoal) {
			const diff = batteryGoal - this.battery;
			powerDiff = power - diff;
			this.battery = batteryGoal;

			// Calculate how much power is needed to buy
		} else if (this.battery >= 0 && this.battery + power < 0) {
			powerDiff = this.battery + power; // power < 0
			this.battery = 0;

			// Fill the battery
		} else {
			this.battery += power;
		}

		return powerDiff;
	}

	/**
	 * @param {number} powerDiff
	 */
	buyPower(powerDiff) {
		this.battery += this.simulator.sellPower(-powerDiff);
	}

	/**
	 * @param {number} powerDiff
	 */
	sellPower(powerDiff) {
		this.simulator.buyPower(powerDiff);
	}

	/**
	 * initialize a list of wind turbines
	 * @param {JSON} windTurbines
	 */
	initWindTurbines(windTurbines) {
		windTurbines.forEach((turbine) => {
			this.windTurbines.push(new WindTurbine(turbine.id, turbine.coords, this.pollTime));
		});
	}

	/**
	 * Simulates the consumption of energy in a house and
	 * how much energy that the house can sell or needs to buy
	 * @param {number} deltaTime
	 */
	consumePower(deltaTime) {
		const consumption = this.powerConsumption * deltaTime;

		this.generatedPower -= consumption;
		const powerDiff = this.calcEnergyDifference(this.generatedPower);
		this.generatedPower = 0;

		if (powerDiff < 0) {
			this.buyPower(powerDiff);
		} else if (powerDiff > 0) {
			this.sellPower(powerDiff);
		}
	}

	/**
	 * Gathers power from the wind turbines
	 * @param {number} deltaTime
	 */
	fetchPower(deltaTime) {
		this.windTurbines.forEach((turbine) => {
			const polledData = turbine.runSimulation(deltaTime);
			this.generatedPower += polledData.power;
		});
	}

	/**
	 * Runs a step in the simulation, calculating the delta time from the last poll
	 * Fetching and consuming power
	 * @param {number} deltaTime
	 */
	runSimulation(deltaTime) {
		this.fetchPower(deltaTime);
		this.consumePower(deltaTime);
	}
};

module.exports = House;
