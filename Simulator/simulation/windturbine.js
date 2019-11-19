const gaussian = require('gaussian');

/**
 *
 */
class WindTurbine {
	/**
	 *
	 * @param {String} id
	 * @param {[String,String]} coords
	 * @param {number} pollTime
	 */
	constructor(id, coords, pollTime) {
		this.id = id;
		this.coords = coords;
		this.windSpeed = this.generateStartWind();
		this.power = 0; // power in Ws

		this.timestamp = Date.now();
		this.pollTime = pollTime; // how often the collection of data should be done

		this.linearPowerCoeff = 10;
		this.maxSpeed = 25.0; // maximum wind speed the turbine can work in
		this.minSpeed = 3.5; // minimum wind peed the turbine works in
		this.minOptimalSpeed = 14.0; // minimum wind speed of which the turbines produces maximum power
	}

	/**
	 * Generates a starting wind speed based on a Gaussian distribution
	 * @return {number} random gaussian distributed number
	 */
	generateStartWind() {
		const distribution = gaussian(8.0, 2);

		return distribution.ppf(Math.random());
	}

	/**
	 *  Generate the wind for the next poll in the simulation.
	 * The generation is based on a Gaussian distribution with the poll time as variance
	 * This ensures that higher times betweem polls gives a higher chanse of bigger differences in wind speed
	 */
	generateWind() {
		const distribution = gaussian(this.calcOffset(), this.pollTime / 1000);
		let wind = this.windSpeed + distribution.ppf(Math.random());

		if (wind < 0) wind = 0;
		this.windSpeed = wind;
	}

	/**
	 * Calculates a coefficent based on a Cumulative Distribution Function as seen in the example graph in
	 * http://www.wind-power-program.com/wind_statistics.htm
	 * @param {number} windSpeed
	 * @return {number} power coefficent
	 */
	calcPowerCoeff(windSpeed) {
		const mean = this.minOptimalSpeed / 2 + this.minSpeed / 2;
		const variance = this.minOptimalSpeed / 4 + this.minSpeed / 2;

		const distribution = gaussian(mean, variance);
		const sigmoid = distribution.cdf(windSpeed);

		return sigmoid * this.linearPowerCoeff;
	}

	/**
	 * Calculate and offset for the Gaussian distribution used to generate wind.
	 * Low wind values should give a slight higher chance of moving to higher speeds
	 * and high wind values should have a higher chance of slowing down
	 * @return {number}
	 */
	calcOffset() {
		let offset = 0;

		if (this.windSpeed < 5) {
			offset = 0.075;
		} else if (this.windSpeed > 15) {
			if (this.windSpeed > 25) {
				offset = -0.075;
			} else {
				offset = -0.05;
			}
		} else {
			offset = 0;
		}

		return offset;
	}

	/**
	 * Calculates how much power has generated since last poll
	 * If wind speed is less then a low bound or higher then a high bound no energy is generated
	 * @param {number} deltaTime
	 */
	generatePower(deltaTime) {
		if (this.windSpeed > this.minSpeed && this.windSpeed < this.maxSpeed) {
			this.power = this.windSpeed * this.calcPowerCoeff(this.windSpeed) * (deltaTime);
		} else {
			this.power = 0;
		}
	}

	/**
	 * Log the current wind and power data
	 */
	logStatus() {
		const date = (new Date(this.timestamp)).toISOString();
		console.log(date + ' - ' + this.id + ': ' + (this.power).toFixed(2) +
			'Ws -- ' + this.windSpeed.toFixed(2) + 'm/s');
	}

	/**
	 *@param {number} deltaTime
	 *@return {number}
	 */
	runSimulation(deltaTime) {
		this.generateWind(deltaTime);
		this.generatePower(deltaTime);

		const pollData = {
			id: this.id,
			power: this.power,
			windSpeed: this.windSpeed,
			status: 'up',
			coords: this.coords,
		};

		return pollData;
	}
}


module.exports = WindTurbine;
