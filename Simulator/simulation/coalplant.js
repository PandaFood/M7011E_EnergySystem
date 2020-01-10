
CoalPlant = {

	status: 'up',

	productionSpeed: 200, // Ws

	capacity: 200,
	maxCapacity: 1000,
	batteryPercentage: 0.5, // how much power should be sent to the battery instead of the system

	startPlant: function() {
		if (this.status == 'down') {
			this.status = 'startup';
			setTimeout(function(self) {
				self.status = 'up';
			}, 30000, this);
		}
	},
	stopPlant: function() {
		if (this.status == 'up') {
			this.status = 'shutdown';
			setTimeout(function(self) {
				self.status = 'down';
			}, 20000, this);
		}
	},
	getStatus: function() {
		return this.status;
	},
	setBatteryPercentage: function(newPercentage) {
		this.batteryPercentage = newPercentage;
	},
	getBatteryPercentage: function() {
		return this.batteryPercentage;
	},
	runPlant: function(simulator, deltaTime) {
		if (this.status == 'up' || this.status == 'shutdown' ) {
			this.generatedPower = this.productionSpeed * deltaTime;


			this.capacity += this.generatedPower * this.batteryPercentage;

			let overProduction = 0;

			if (this.capacity > this.maxCapacity) {
				overProduction = this.capacity % this.maxCapacity;
				this.capacity = this.maxCapacity;
			}

			simulator.buyPower(this.generatedPower * (1 - this.batteryPercentage) + overProduction);
		}

		if (simulator.power <= 0 && this.capacity > 0) {
			this.capacity += simulator.power;
			simulator.buyPower(-simulator.power);
		}

		if (this.capacity < 0) this.capacity = 0;
	},
};

module.exports = CoalPlant;
