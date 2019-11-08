let WindTurbine = require("./windturbine");

Simulator = {
    
    test: function(wind, startWind){
        console.log(wind.generatePower());
    },
    startSimulator: function(){
        // let windSpeed = this.generateStartWind();

        let windT = WindTurbine;
        windT.windSpeed = windT.generateStartWind();
        let windT2  = WindTurbine;
        windT2.windSpeed = windT.generateStartWind();
        


        setInterval(Simulator.test, 1000, windT);
        setInterval(Simulator.test, 1000, windT2);

    }
};


module.exports = Simulator;