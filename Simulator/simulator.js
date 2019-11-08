let WindTurbine = require("./windturbine");

Simulator = {
    
    test: function(wind){
        wind.generatePower();
        wind.logStatus();
    },
    startSimulator: function(){
        // let windSpeed = this.generateStartWind();

        let windT = new WindTurbine(1);

        setInterval(Simulator.test, 1000, windT);
    }
};


module.exports = Simulator;