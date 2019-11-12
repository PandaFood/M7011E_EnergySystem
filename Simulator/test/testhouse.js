const assert = require('assert');
const fs = require('fs');

const House = require('../simulation/house');

describe('House', function() {
	describe('#buyPower()', function() {
		it('should be equal to 20', function() {
			const config = JSON.parse(fs.readFileSync('config/house.json', 'utf8'))[0];
			let house = new House(config);

			house.buyPower(-10);

			assert.equal(20, house.battery);
		});
	});

	describe('#initWindTurbines()', function() {
		it('all should be defined', function() {
			const config = JSON.parse(fs.readFileSync('config/house.json', 'utf8'))[0];
			let house = new House(config);

			house.windTurbines.forEach(turbine => {
				assert.ok(turbine);
			});
		});
	});
});
