let gaussian = require('gaussian');


class WindTurbine {

    constructor(id) {
        this.id = id;
        this.windSpeed = this.generateStartWind();
        this.power = 0;


        this.powerKoeff = 10;
        this.maxSpeed = 25; // maximum wind speed the turbine can work in
        this.minSpeed = 2.5; // minimum wind peed the turbine works in
    }

    generateStartWind() {
        let distribution = gaussian(6.0, 4);

        return distribution.ppf(Math.random());
    }

    generateWind(currentWind) {
        let distribution = gaussian(0, 0.25);
        let wind = currentWind + distribution.ppf(Math.random());

        if (wind < 0) wind = 0;
        return wind;
    }
    generatePower() {
        this.windSpeed = this.generateWind(this.windSpeed);

        if (this.windSpeed > this.minSpeed && this.windSpeed < this.maxSpeed) {
            this.power = this.windSpeed * this.powerKoeff;
        } else {
            this.power = 0;
        }
    }
    logStatus() {
        console.log(this.id + ": " + this.power.toFixed(2) + "W -- " + this.windSpeed.toFixed(2) + "m/s");
    }

    runSimulator(self){
        self.generatePower();
        self.logStatus();
    }
}


module.exports = WindTurbine;