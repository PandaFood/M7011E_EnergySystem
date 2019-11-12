
/**
 */
class House {
	/**
	 * @param {String} id
	 */
	constructor(id) {
		this.id = id;
		this.battery = 0;

		this.windTurbines = [];
	}

	/**
	 * initialize a list of wind turbines
	 * @param {*} idList
	 */
	initWindTurbines(idList) {
		idList.forEach((id) => {
			this.windTurbines.push(new WindtTurbine(id));
		});
	}

	/**
	 */
	run() {
		console.log('House starting');
	}
};
