const gaussian = require('gaussian');
const Noise = require('./noise');

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
		coords.forEach((coord) => {
			coord = parseInt(coord);
		});
		this.coords = coords;
		this.windSpeed = 0; // Noise.noiseMap[this.coords[1]][this.coords[0]],
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
	 * Get the windspeed by taking the noice on the coordinate and using it in a
	 * function w(n) = 7(n^5 + n^3/3 + 2n) + 1 giving a nice curve for modeling the windspeed
	 */
	generateWind() {
		const noiseValue = Noise.noiseMap[this.coords[1]][this.coords[0]];
		this.windSpeed = 7*(Math.pow(noiseValue, 5) + Math.pow(noiseValue, 3)/3 + 2*noiseValue) + 3.5;
	}

	/**
	 * Calculates a coefficent based on a Cumulative Distribution Function as seen in the example graph in
	 * http://www.wind-power-program.com/wind_statistics.htm
	 * @param {number} windSpeed
	 * @return {number} power coefficent
	 */
	calcPowerCoeff(windSpeed) {
		const mean = this.minOptimalSpeed / 2 + this.minSpeed / 2;
		const variance = this.minOptimalSpeed / 4 + this.minSpeed;

		const distribution = gaussian(mean, variance);
		const sigmoid = distribution.cdf(windSpeed);

		return sigmoid * this.linearPowerCoeff;
	}

	/**
	 * Calculates how much power has generated since last poll
	 * If wind speed is less then a low bound or higher then a high bound no energy is generated
	 * @param {number} deltaTime
	 */
	generatePower(deltaTime) {
		if (this.windSpeed > this.minSpeed && this.windSpeed < this.maxSpeed) {
			const powerCoeff = this.calcPowerCoeff(this.windSpeed);
			this.power = powerCoeff * (deltaTime);
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
		// The threshold where a turbines breaks, higher speeds gives a higher risk of breaking
		const threshold = 0.00025 * this.windSpeed;

		if (ran < threshold && this.status == 'up') {
			this.status = 'down';

			// values gathered by experimenting,trying to get results between 3000 and 5000 ms
			const distribution = gaussian(40000, 1000 * 10 ** 3);
			const timeoutLength = Math.floor(distribution.ppf(Math.random()));

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

		return pollData;
	}
}


module.exports = WindTurbine;
