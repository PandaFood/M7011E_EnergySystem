const assert = require('assert');
const fs = require('fs');

const House = require('../simulation/house');

describe('House', function() {
	describe('#buyPower()', function() {
		it('should be equal to 20', function() {
			const config = JSON.parse(fs.readFileSync('config/test_house.json', 'utf8'))[0];
			let house = new House(config);

			house.buyPower(-10);

			assert.equal(20, house.battery);
		});
	});

	describe('#initWindTurbines()', function() {
		it('all should be defined', function() {
			const config = JSON.parse(fs.readFileSync('config/test_house.json', 'utf8'))[0];
			let house = new House(config);

			house.windTurbines.forEach(turbine => {
				assert.ok(turbine);
			});
		});
	});

	describe('#calcEnergyDifference()', function(){
		it('should fill the battery with no power difference', function(){
			const config = JSON.parse(fs.readFileSync('config/test_house.json', 'utf8'))[0];
			let house = new House(config);

			assert.equal(0, house.calcEnergyDifference(10));
			assert.equal(10, house.battery);
		})

		it('should fill the battery to max and give back a power diff', function(){
			const config = JSON.parse(fs.readFileSync('config/test_house.json', 'utf8'))[0];
			let house = new House(config);
			house.battery = house.batteryCapacity - 5;

			assert.equal(5, house.calcEnergyDifference(10));
			assert.equal(house.batteryCapacity*house.batteryFillPercentage, house.battery);
		})

		it('should deplete the battery and give back a power diff', function(){
			const config = JSON.parse(fs.readFileSync('config/test_house.json', 'utf8'))[0];
			let house = new House(config);
			house.battery =  5;

			assert.equal(-5, house.calcEnergyDifference(-10));
			assert.equal(0, house.battery);
		})
	});
});
