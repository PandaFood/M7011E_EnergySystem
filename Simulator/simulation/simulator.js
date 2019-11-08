let WindTurbine = require("./windturbine");

Simulator = {
    
    startSimulator: function(){
        let windT = new WindTurbine(1);

        setInterval(windT.runSimulator, 1000, windT);
    }
};


module.exports = Simulator;