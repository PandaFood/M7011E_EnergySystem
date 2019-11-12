const WindTurbine = require('./windturbine');

/**
 */
class House {
	/**
	 * @param {json} initValues
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
	 * Calculate the difference in energy, store or sell excess energy and buy if the battery is empty
	 * @param {number} power 
	 */
	calcEnergyDifference(power){
		let powerDiff = 0;
		let batteryGoal = (this.batteryCapacity * this.batteryFillPercentage);

		if(this.battery <= batteryGoal && this.battery + power >= batteryGoal){
			let diff = batteryGoal - this.battery;
			powerDiff = power - diff;
			this.battery = batteryGoal;
		}else if (this.battery >= 0 && this.battery + power < 0){
			let diff = this.battery;
			this.battery = 0;
			powerDiff = power - diff;
		}else{
			this.battery += power;
		}

		if(powerDiff < 0){
			// if the power difference is less then 0 then we need to buy power
			console.log("Buy: " + powerDiff * -1);
			this.battery += this.buyPower();
		}else{
			// else we can sell the excess power we have
			console.log("Sell: " + powerDiff);
		}
	}

	buyPower(){
		return 50;
	}

	/**
	 * Handle an event given from a turbine
	 * @param {json} event 
	 */
	handleSimulationEvent(event){
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
	consumePower(self){
		const currentTime = Date.now();
		const deltaTime = (currentTime - self.timestamp) / 1000; // time since last poll in s

		let consumption = self.powerConsumption * deltaTime;
		
		// console.log(self.battery + " -- " + self.generatedPower + " -- " + consumption);
		self.generatedPower -= consumption; 
		self.calcEnergyDifference(self.generatedPower);
		self.generatedPower = 0;

		self.timestamp = new Date(currentTime);
	}

	/**
	 * Start the simulation for each of the wind turbines the house owns
	 */
	runSimulation() {
		console.log('House starting');
		this.windTurbines.forEach(turbine => {
			setInterval(turbine.runSimulation, turbine.pollTime, turbine, this);
		});

		setInterval(this.consumePower, 1000, this);

	}
};

module.exports = House;
