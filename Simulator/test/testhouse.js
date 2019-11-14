const assert = require('assert');
const fs = require('fs');

const House = require('../simulation/house');

describe('House', function() {
	describe('#buyPower()', function() {
		it('should be equal to 20', function() {
			const config = JSON.parse(fs.readFileSync('config/test_house.json', 'utf8'))[0];
			const house = new House(config);

			house.buyPower(-10);

			assert.equal(house.battery, 20);
		});
	});

	describe('#initWindTurbines()', function() {
		it('all should be defined', function() {
			const config = JSON.parse(fs.readFileSync('config/test_house.json', 'utf8'))[0];
			const house = new House(config);

			house.windTurbines.forEach((turbine) => {
				assert.ok(turbine);
			});
		});
	});

	describe('#calcEnergyDifference()', function() {
		it('should fill the battery with no power difference', function() {
			const config = JSON.parse(fs.readFileSync('config/test_house.json', 'utf8'))[0];
			const house = new House(config);

			assert.equal(house.calcEnergyDifference(10), 0);
			assert.equal(house.battery, 10);
		});

		it('should fill the battery to max and give back a power diff', function() {
			const config = JSON.parse(fs.readFileSync('config/test_house.json', 'utf8'))[0];
			const house = new House(config);
			house.battery = house.batteryCapacity - 5;

			assert.equal(house.calcEnergyDifference(10), 5);
			assert.equal(house.battery, house.batteryCapacity*house.batteryFillPercentage);
		});

		it('should deplete the battery and give back a power diff', function() {
			const config = JSON.parse(fs.readFileSync('config/test_house.json', 'utf8'))[0];
			const house = new House(config);
			house.battery = 5;

			assert.equal(house.calcEnergyDifference(-10), -5);
			assert.equal(house.battery, 0);
		});
	});
});
