let gaussian = require('gaussian');


WindTurbine = {
    windSpeed: 0,

    generateStartWind: function(){
        let distribution = gaussian(6.8, 4);
        
        return distribution.ppf(Math.random());
    },
    generateWind: function(currentWind){
        let distribution = gaussian(1, 0.5);
        let windSpeed = currentWind + distribution.ppf(Math.random());

        if(windSpeed<0) windSpeed=0;

        return windSpeed;
    },
    generatePower: function(){
        this.windSpeed = this.generateWind(this.windSpeed);
        let powerKoeff = 10;

        if(this.windSpeed > 2.5 && this.windSpeed < 25){
            return this.windSpeed* powerKoeff;    
        }else{
            return 0;
        }
    }
};


module.exports = WindTurbine;