const assert = require('assert');
const WindTurbine = require('../simulation/windturbine');
const Noise = require('../simulation/noise');


describe('Wind Turbine', function() {
	describe('#generateStartWind()', function() {
		it('should be equal to 3.00', function() {
			Noise.generateWindMap(1);
			windTurbine = new WindTurbine('test-10', ['10', '10'], 1000);
			windTurbine.generateWind();
			assert.equal(windTurbine.windSpeed.toFixed(2), 3.50);
		});
	});

	describe('#calcPowerCoeff(windSpeed)', function() {
		it('', function() {
			Noise.generateWindMap(1);

			windTurbine = new WindTurbine('test-10', ['10', '10'], 1000);
			windTurbine.linearPowerCoeff = 1;
			assert.equal(windTurbine.calcPowerCoeff(0).toFixed(2), 0);
			assert.equal(windTurbine.calcPowerCoeff(3.5).toFixed(2), 0.02);
			assert.equal(windTurbine.calcPowerCoeff(5).toFixed(2), 0.08);
			assert.equal(windTurbine.calcPowerCoeff(7.5).toFixed(2), 0.35);
			assert.equal(windTurbine.calcPowerCoeff(9).toFixed(2), 0.58);
			assert.equal(windTurbine.calcPowerCoeff(10).toFixed(2), 0.72);
			assert.equal(windTurbine.calcPowerCoeff(14).toFixed(2), 0.98);
			assert.equal(windTurbine.calcPowerCoeff(15).toFixed(2), 0.99);
			assert.equal(windTurbine.calcPowerCoeff(25).toFixed(2), 1);
		});
	});

	describe('#generatePower()', function() {
		it('generated power should be 7.22', function() {
			windTurbine = new WindTurbine('test-10', ['10', '10'], 1000);
			windTurbine.windSpeed = 10;
			windTurbine.generatePower(0.1);
			assert.equal(windTurbine.power.toFixed(2), 0.72);
		});

		it('speeds lower then minimum speed or higher then maximum should give 0', function() {
			windTurbine = new WindTurbine('test-10', ['10', '10'], 1000);
			windTurbine.windSpeed = windTurbine.minSpeed;
			windTurbine.timestamp = Date.now() - 100;
			windTurbine.generatePower();
			assert.equal(windTurbine.power.toFixed(2), 0);

			windTurbine = new WindTurbine('test-10', ['10', '10'], 1000);
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
