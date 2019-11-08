let gaussian = require('gaussian');


class WindTurbine {

    constructor(id) {
        this.id = id;
        this.windSpeed = this.generateStartWind();
        this.power = 0; // power in Ws

        this.timestamp = Date.now();
        this.pollTime = 100; // how often the collection of data should be done

        this.powerCoeff = 10;
        this.maxSpeed = 25.0; // maximum wind speed the turbine can work in
        this.minSpeed = 3.5; // minimum wind peed the turbine works in
        this.minOptimalSpeed = 14.0; // minimum wind speed of which the turbines produces maximum power
    }

    /**
     * Generates a starting wind speed based on a Gaussian distribution
     */
    generateStartWind() {
        let distribution = gaussian(6.0, 4);

        return distribution.ppf(Math.random());
    }

    /**
     *  Generate the wind for the next poll in the simulation.
     * The generation is based on a Gaussian distribution with the poll time as variance
     * This ensures that higher times betweem polls gives a higher chanse of bigger differences in wind speed
     * @param {number} currentWind 
     */
    generateWind(currentWind) {
        let distribution = gaussian(0, this.pollTime / 1000);
        let wind = currentWind + distribution.ppf(Math.random());

        if (wind < 0) wind = 0;
        return wind;
    }

    /**
     * Calculates a coefficent based on a Cumulative Distribution Function as seen in the example graph in
     * http://www.wind-power-program.com/wind_statistics.htm
     * @param {number} windSpeed 
     */
    calcPower(windSpeed) {
        let distribution = gaussian(this.minOptimalSpeed / 2 + this.minSpeed/2, this.minOptimalSpeed / 4 + this.minSpeed/2);
        let sigmoid = distribution.cdf(windSpeed);

        return sigmoid * this.powerCoeff;
    }

    /**
     * Calculates how much power has generated since last poll
     * If wind speed is less then a low bound or higher then a high bound no energy is generated
     */
    generatePower() {
        this.windSpeed = this.generateWind(this.windSpeed);

        let currentTime = Date.now();
        let deltaTime = (currentTime - this.timestamp) / 1000; // time since last poll in s

        if (this.windSpeed > this.minSpeed && this.windSpeed < this.maxSpeed) {
            this.power = this.windSpeed * this.calcPower(this.windSpeed) * (deltaTime);
        } else {
            this.power = 0;
        }

        this.timestamp = currentTime;
    }

    logStatus() {
        let date = (new Date(this.timestamp)).toISOString();
        console.log(date + " - " + this.id + ": " + (this.power).toFixed(2) + "Ws -- " + this.windSpeed.toFixed(2) + "m/s");
    }

    runSimulator(self) {
        self.generatePower();
        self.logStatus();
    }
}


module.exports = WindTurbine;