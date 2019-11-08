let WindTurbine = require("./windturbine");

Simulator = {
    
    startSimulator: function(){
        let windT = new WindTurbine(1);

        setInterval(windT.runSimulator, windT.pollTime, windT);
    }
};


module.exports = Simulator;