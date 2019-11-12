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
		this.windTurbines = [];
		this.initWindTurbines(initValues.windTurbines);
	}

	/**
	 * Store the given energy in the battery if bellow the max capacity 
	 * @param {number} energy 
	 */
	storeEnergy(energy){
		if(this.battery + energy < this.batteryCapacity){
			this.battery += energy;
		}else{
			this.battery = this.batteryCapacity;
		}
	}

	/**
	 * Handle an event given from a turbine
	 * @param {json} event 
	 */
	handleSimulationEvent(event){
		console.log(event);
		this.storeEnergy(event.power);
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
	 * Start the simulation for each of the wind turbines the house owns
	 */
	runSimulation() {
		console.log('House starting');
		this.windTurbines.forEach(turbine => {
			setInterval(turbine.runSimulation, turbine.pollTime, turbine, this);
		});

	}
};

module.exports = House;
