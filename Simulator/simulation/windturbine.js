let gaussian = require('gaussian');


class WindTurbine {

    constructor(id) {
        this.id = id;
        this.windSpeed = this.generateStartWind();
        this.power = 0; // power in Ws

        this.timestamp = Date.now();
        this.pollTime = 100;

        this.powerKoeff = 10;
        this.maxSpeed = 25; // maximum wind speed the turbine can work in
        this.minSpeed = 2.5; // minimum wind peed the turbine works in
    }

    generateStartWind() {
        let distribution = gaussian(6.0, 4);

        return distribution.ppf(Math.random());
    }

    generateWind(currentWind) {
        let distribution = gaussian(0, this.pollTime/1000);
        let wind = currentWind + distribution.ppf(Math.random());

        if (wind < 0) wind = 0;
        return wind;
    }
    generatePower() {
        this.windSpeed = this.generateWind(this.windSpeed);

        let currentTime = Date.now();
        let deltaTime = (currentTime - this.timestamp)/1000; // time since last poll in s

        if (this.windSpeed > this.minSpeed && this.windSpeed < this.maxSpeed) {

            this.power = this.windSpeed * this.powerKoeff * (deltaTime);
        } else {
            this.power = 0;
        }

        this.timestamp = currentTime;
    }

    logStatus() {
        let date = (new Date(this.timestamp)).toISOString();
        console.log(date + " - " + this.id + ": " + (this.power).toFixed(2) + "Ws -- " + this.windSpeed.toFixed(2) + "m/s");
    }

    runSimulator(self){
        self.generatePower();
        self.logStatus();
    }
}


module.exports = WindTurbine;