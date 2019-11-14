const WindTurbine = require('./windturbine');

/**
 */
class House {
	/**
	 * @param {JSON} initValues
	 */
	constructor(initValues) {
		this.id = initValues.id;
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
		this.battery += -powerDiff + 10;
		console.log('Bought ' + (-powerDiff + 10).toFixed(2) + 'Ws');
	}

	/**
	 * @param {number} powerDiff
	 */
	sellPower(powerDiff) {
		console.log('Sold: ' + powerDiff.toFixed(2) + 'Ws');
	}

	/**
	 * Handle an event given from a turbine
	 * @param {JSON} event
	 */
	handleSimulationEvent(event) {
		// console.log(event);
		this.generatedPower += event.power;
	}

	/**
	 * initialize a list of wind turbines
	 * @param {*} idList
	 */
	initWindTurbines(idList) {
		idList.forEach((id) => {
			this.windTurbines.push(new WindTurbine(id));
		});
	}

	/**
	 * Simulates the consumption of energy in a house and
	 * how much energy that the house can sell or needs to buy
	 * @param {House} self
	 */
	consumePower(self) {
		const currentTime = Date.now();
		const deltaTime = (currentTime - self.timestamp) / 1000; // time since last poll in s

		const consumption = self.powerConsumption * deltaTime;

		// console.log(self.battery + ' -- ' + self.generatedPower + ' -- ' + consumption);
		self.generatedPower -= consumption;
		const powerDiff = self.calcEnergyDifference(self.generatedPower);
		self.generatedPower = 0;

		if (powerDiff < 0) {
			self.buyPower(powerDiff);
		} else if (powerDiff > 0) {
			self.sellPower(powerDiff);
		}

		self.timestamp = new Date(currentTime);
	}

	/**
	 * Start the simulation for each of the wind turbines the house owns
	 */
	runSimulation() {
		console.log('House starting');
		this.windTurbines.forEach((turbine) => {
			setInterval(turbine.runSimulation, turbine.pollTime, turbine, this);
		});

		setInterval(this.consumePower, 1000, this);
	}
};

module.exports = House;
