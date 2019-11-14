const assert = require('assert');
const WindTurbine = require('../simulation/windturbine');

describe('Wind Turbine', function() {
	describe('#generateStartWind()', function() {
		it('should be greater than 0', function() {
			windTurbine = new WindTurbine(0);
			assert.ok(windTurbine.windSpeed > 0);
		});
	});

	describe('#calcPowerCoeff(windSpeed)', function() {
		it('', function() {
			windTurbine = new WindTurbine(0);
			windTurbine.linearPowerCoeff = 1;
			assert.equal(windTurbine.calcPowerCoeff(0).toFixed(2), 0);
			assert.equal(windTurbine.calcPowerCoeff(3.5).toFixed(2), 0.01);
			assert.equal(windTurbine.calcPowerCoeff(5).toFixed(2), 0.05);
			assert.equal(windTurbine.calcPowerCoeff(7.5).toFixed(2), 0.29);
			assert.equal(windTurbine.calcPowerCoeff(9).toFixed(2), 0.54);
			assert.equal(windTurbine.calcPowerCoeff(10).toFixed(2), 0.71);
			assert.equal(windTurbine.calcPowerCoeff(14).toFixed(2), 0.99);
			assert.equal(windTurbine.calcPowerCoeff(15).toFixed(2), 1);
			assert.equal(windTurbine.calcPowerCoeff(25).toFixed(2), 1);
		});
	});

	describe('#generatePower()', function() {
		it('generated power should be 7.07', function() {
			windTurbine = new WindTurbine(0);
			windTurbine.windSpeed = 10;
			windTurbine.timestamp = Date.now() - 100;
			windTurbine.generatePower();
			assert.equal(windTurbine.power.toFixed(2), 7.07);
		});

		it('speeds lower then minimum speed or higher then maximum should give 0', function() {
			windTurbine = new WindTurbine(0);
			windTurbine.windSpeed = windTurbine.minSpeed;
			windTurbine.timestamp = Date.now() - 100;
			windTurbine.generatePower();
			assert.equal(windTurbine.power.toFixed(2), 0);

			windTurbine = new WindTurbine(0);
			windTurbine.windSpeed = windTurbine.minSpeed - 0.1;
			windTurbine.timestamp = Date.now() - 100;
			windTurbine.generatePower();
			assert.equal(windTurbine.power.toFixed(2), 0);

			windTurbine.windSpeed = windTurbine.maxSpeed+0.1;
			windTurbine.timestamp = Date.now() - 100;
			windTurbine.generatePower();
			assert.equal(windTurbine.power.toFixed(2), 0);

			windTurbine.windSpeed = windTurbine.maxSpeed;
			windTurbine.timestamp = Date.now() - 100;
			windTurbine.generatePower();
			assert.equal(windTurbine.power.toFixed(2), 0);
		});
	});
});
