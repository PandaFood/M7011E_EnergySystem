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
		this.minSpeed = 3.0; // minimum wind peed the turbine works in
		this.minOptimalSpeed = 14.0; // minimum wind speed of which the turbines produces maximum power
		this.status = 'up';
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
	 * Calculates a random number, if it is below a threshold and the turbine is up
	 * then set the status to down and set a Timeout for when it should be up and running again
	 */
	simulateBreakdown() {
		const ran = Math.random();

		// values gathered by experimenting,trying to get results between 3000 and 5000 ms
		const distribution = gaussian(4000, 5 * 10 ** 5);
		const timeoutLength = distribution.ppf(Math.random());
		if (ran < 0.005 && this.status == 'up') {
			this.status = 'down';
			setTimeout(function(self) {
				self.status = 'up';
			}, timeoutLength, this);
		}
	};

	/**
	 *@param {number} deltaTime
	 *@return {number}
	 */
	runSimulation(deltaTime) {
		this.simulateBreakdown();

		const pollData = {
			id: this.id,
			power: this.power,
			windSpeed: this.windSpeed,
			status: this.status,
			coords: this.coords,
		};

		if (this.status == 'up') {
			this.generateWind(deltaTime);
			this.generatePower(deltaTime);
		} else {
			pollData.power = 0;
			pollData.windSpeed = 0;
		}

		// console.log(pollData);

		return pollData;
	}
}


module.exports = WindTurbine;
