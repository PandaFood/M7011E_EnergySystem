const assert = require('assert');

const House = require('../simulation/house');


describe('House', function() {
	describe('#buyPower()', function() {
		it('should be equal to 20', function() {
			const houseValues = {
				id: 'f2e8d4fe-e78e-4b6f-bc21-301e6293e848',
				consumption: 10,
				adress: '',
				name: '',
			};

			const battery = [{
				currentCapacity: 10,
				fillCapacity: 1.0,
				maxCapacity: 100,
			}];

			const Simulator = require('../simulation/simulator');
			const house = new House(houseValues, [], battery, Simulator);

			house.buyPower(-10);
			assert.equal(house.batteries[0].currentCapacity, 20);
		});
	});

	describe('#initWindTurbines()', function() {
		it('all should be defined', function() {
			const houseValues = {
				id: 'f2e8d4fe-e78e-4b6f-bc21-301e6293e848',
				consumption: 10,
				adress: '',
				name: '',
			};
			const Simulator = require('../simulation/simulator');
			const house = new House(houseValues, [], [], Simulator);

			house.windTurbines.forEach((turbine) => {
				assert.ok(turbine);
			});
		});
	});

	describe('#calcEnergyDifference()', function() {
		it('should fill the battery with no power difference', function() {
			const houseValues = {
				id: 'f2e8d4fe-e78e-4b6f-bc21-301e6293e848',
				consumption: 10,
				adress: '',
				name: '',
			};


			const battery = [{
				currentCapacity: 10,
				fillCapacity: 1.0,
				maxCapacity: 100,
			}];

			const Simulator = require('../simulation/simulator');
			const house = new House(houseValues, [], battery, Simulator);

			assert.equal(house.calcEnergyDifference(house.batteries[0], 10), 0);
			assert.equal(house.batteries[0].currentCapacity, 20);
		});

		it('should fill the battery to max and give back a power diff', function() {
			const houseValues = {
				id: 'f2e8d4fe-e78e-4b6f-bc21-301e6293e848',
				consumption: 10,
				adress: '',
				name: '',
			};

			const battery = [{
				currentCapacity: 10,
				fillCapacity: 1.0,
				maxCapacity: 100,
			}];

			const Simulator = require('../simulation/simulator');
			const house = new House(houseValues, [], battery, Simulator);

			house.batteries[0].currentCapacity = house.batteries[0].maxCapacity - 5;

			assert.equal(house.calcEnergyDifference(house.batteries[0], 10), 5);
			const fillAmount = house.batteries[0].maxCapacity*house.batteries[0].fillCapacity;
			assert.equal(house.batteries[0].currentCapacity, fillAmount);
		});

		it('should deplete the battery and give back a power diff', function() {
			const houseValues = {
				id: 'f2e8d4fe-e78e-4b6f-bc21-301e6293e848',
				consumption: 10,
				adress: '',
				name: '',
			};
			const battery = [{
				currentCapacity: 10,
				fillCapacity: 1.0,
				maxCapacity: 100,
			}];

			const Simulator = require('../simulation/simulator');
			const house = new House(houseValues, [], battery, Simulator);

			house.batteries[0].currentCapacity = 5;

			assert.equal(house.calcEnergyDifference(house.batteries[0], -10), -5);
			assert.equal(house.batteries[0].currentCapacity, 0);
		});
	});
});
