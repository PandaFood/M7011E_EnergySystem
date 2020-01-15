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
		this.pollTime = simulator.pollTime;
		this.batteryPercentage = houseValues.batteryPercentage;
		this.haveBattery = false;
		this.batteries = [];
		this.blackout = false;
		this.banned = false;
		batteries.forEach((battery) => {
			this.haveBattery = true;
			battery.currentCapacity = parseFloat(battery.currentCapacity);
			battery.maxCapacity = parseFloat(battery.maxCapacity);

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

		// Calculate how much power is left to sell
		if (battery.currentCapacity <= battery.maxCapacity && battery.currentCapacity + power >= battery.maxCapacity) {
			const diff = battery.maxCapacity - battery.currentCapacity;
			powerDiff = power - diff;
			battery.currentCapacity = battery.maxCapacity;

			// Fill the battery
		} else {
			battery.currentCapacity += power;
		}

		return powerDiff;
	}

	/**
	 * Buy the amount of power the house needs to not get a blackout
	 * @param {number} powerDiff
	 */
	buyPower(powerDiff) {
		const gainedPower = this.simulator.sellPower(-powerDiff);

		if (gainedPower >= -powerDiff) {
			this.blackout = false;
		} else {
			this.blackout = true;
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

		// if not enough power is generated, take from the batteries
		// if there is not enough in the batteries then buy from the power grid
		if (this.generatedPower < 0) {
			this.batteries.forEach((battery) => {
				if (battery.currentCapacity > -this.generatedPower &&
				battery.currentCapacity + this.generatedPower > 0) {
					battery.currentCapacity += this.generatedPower;
					this.generatedPower = 0;
					this.storeBatteryData(battery);
					return;
				} else {
					this.generatedPower += battery.currentCapacity;
					battery.currentCapacity = 0;
					this.storeBatteryData(battery);
				}
			});

			this.buyPower(this.generatedPower);
			this.generatedPower = 0;
			return;
		}

		let storePower = this.generatedPower * this.batteryPercentage;
		const sellPower = this.generatedPower * (1-this.batteryPercentage);

		if (this.haveBattery) {
			this.batteries.forEach((battery) => {
				storePower = this.calcEnergyDifference(battery, storePower);

				this.storeBatteryData(battery);
			});
		}
		this.generatedPower = 0;
		this.sellPower(storePower + sellPower);
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
	 * Reload the list of batteries so that new ones are added during runtime
	 * @param {JSON} batteries
	 */
	refreshBatteries(batteries) {
		this.batteries = [];
		this.haveBattery = false;
		batteries.forEach((battery) => {
			this.haveBattery = true;
			battery.currentCapacity = parseInt(battery.currentCapacity);
			battery.fillCapacity = parseFloat(battery.fillCapacity);
			battery.maxCapacity = parseInt(battery.maxCapacity);

			this.batteries.push(battery);
		});
	}

	/**
	 * Reload the list of wind turbines so that new ones are added during runtime
	 * @param {JSON} windTurbines
	 */
	refreshWindTurbines(windTurbines) {
		this.windTurbines = [];
		windTurbines.forEach((turbine) => {
			this.windTurbines.push(new WindTurbine(turbine.id, turbine.coords.split(','), this.pollTime));
		});
	}

	/**
	 * Bans a house from selling to market for some seconds
	 * @param {number} banTime - How many seconds the house should be banned from selling to the market
	 * @return {boolean}
	 */
	banHouse(banTime) {
		if (!this.banned) {
			this.banned = true;

			setTimeout(() => {
				this.banned = false;
			}, banTime * 1000);

			return true;
		} else {
			return false;
		}
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
