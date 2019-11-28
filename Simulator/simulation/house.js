const WindTurbine = require('./windturbine');

/**
 */
class House {
	/**
	 * @param {JSON} houseValues
	 * @param {JSON} windTurbines
	 * @param {JSON} batteries
	 * @param {JSON} simulator
	 */
	constructor(houseValues, windTurbines, batteries, simulator) {
		this.simulator = simulator;
		this.id = houseValues.id;
		this.powerConsumption = houseValues.consumption;
		this.name = houseValues.name;
		this.adress = houseValues.adress;
		this.pollTime = simulator.pollTime;
		this.haveBattery = false;
		this.batteries = [];
		batteries.forEach((battery) => {
			this.haveBattery = true;
			battery.currentCapacity = parseInt(battery.currentCapacity);
			battery.fillCapacity = parseFloat(battery.fillCapacity);
			battery.maxCapacity = parseInt(battery.maxCapacity);

			this.batteries.push(battery);
		});
		this.windTurbines = [];

		windTurbines.forEach((turbine) => {
			this.windTurbines.push(new WindTurbine(turbine.id, turbine.coords.split(','), this.pollTime));
		});


		this.timestamp = Date.now();
		this.generatedPower = 0;
	}

	/**
	 * Fill the battery with the generated power
	 * If the battery gets full calculate how much can be sold
	 * If the battery gets empty calculate how much needs to be bought
	 * @param {number} battery
	 * @param {number} power
	 * @return {number} - power difference, positive implies power to sell, negative power to buy
	 */
	calcEnergyDifference(battery, power) {
		let powerDiff = 0;
		const batteryGoal = (battery.maxCapacity * battery.fillCapacity);

		// Calculate how much power is left to sell
		if (battery.currentCapacity <= batteryGoal && battery.currentCapacity + power >= batteryGoal) {
			const diff = batteryGoal - battery.currentCapacity;
			powerDiff = power - diff;
			battery.currentCapacity = batteryGoal;

			// Calculate how much power is needed to buy
		} else if (battery.currentCapacity + power < 0) {
			powerDiff = battery.currentCapacity + power; // power < 0
			battery.currentCapacity = 0;

			// Fill the battery
		} else {
			battery.currentCapacity += power;
		}

		return powerDiff;
	}

	/**
	 * If a list of batteries exists add power to the last battery in that list
	 * Else just buy the precise amount that the house needs
	 * @param {number} powerDiff
	 */
	buyPower(powerDiff) {
		if (this.haveBattery) {
			const battery = this.batteries[this.batteries.length-1];
			battery.currentCapacity += this.simulator.sellPower(-powerDiff);
			this.storeBatteryData(battery);
		} else {
			this.simulator.sellPower(-powerDiff);
		}
	}

	/**
	 * @param {number} powerDiff
	 */
	sellPower(powerDiff) {
		this.simulator.buyPower(powerDiff);
	}

	/**
	 * Simulates the consumption of energy in a house and
	 * how much energy that the house can sell or needs to buy
	 * @param {number} deltaTime
	 */
	consumePower(deltaTime) {
		const consumption = this.powerConsumption * deltaTime;

		this.generatedPower -= consumption;

		let powerDiff = 0;
		if (this.haveBattery) {
			powerDiff = this.generatedPower;
			this.batteries.forEach((battery) => {
				powerDiff = this.calcEnergyDifference(battery, powerDiff);

				this.storeBatteryData(battery);
			});
		} else {
			powerDiff = this.generatedPower;
		}

		this.generatedPower = 0;
		if (powerDiff < 0) {
			this.buyPower(powerDiff);
		} else if (powerDiff > 0) {
			this.sellPower(powerDiff);
		}
	}

	/**
	 *
	 * @param {JSON} battery
	 */
	storeBatteryData(battery) {
		const batteryData = {
			id: battery.id,
			currentCapacity: battery.currentCapacity,
		};
		this.simulator.storeBatteryData(batteryData);
	}

	/**
	 * Gathers power from the wind turbines
	 * @param {number} deltaTime
	 */
	fetchPower(deltaTime) {
		this.windTurbines.forEach((turbine) => {
			const polledData = turbine.runSimulation(deltaTime);
			this.generatedPower += polledData.power;
			this.simulator.storeWindData(polledData);
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
