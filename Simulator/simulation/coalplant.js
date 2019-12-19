
CoalPlant = {

	status: 'down',

	productionSpeed: 500, // Ws

	capacity: 0,
	maxCapacity: 0,
	fillPercentage: 0, // how much power should be sent to the battery instead of the system

	startPlant: function() {
		if (this.status == 'down') {
			this.status = 'startup';
			setTimeout(function(self) {
				self.status = 'up';
			}, 5000, this);
		}
	},
	stopPlant: function() {
		if (this.status == 'up') {
			this.status = 'shutdown';
			setTimeout(function(self) {
				self.status = 'down';
			}, 3000, this);
		}
	},
	getStatus: function() {
		return this.status;
	},
	sellPower: function(requestedPower) {
		if (this.producedPower < requestedPower) {
			const sellPower = this.capacity;
			this.capacity = 0;
			return sellPower;
		} else {
			this.capacity -= requestedPower;
			return requestedPower;
		}
	},

	runPlant: function(deltaTime) {
		if (this.status == 'up') {
			this.capacity += this.productionSpeed * deltaTime;

			if (this.capacity > this.maxCapacity) {
				this.capacity = this.maxCapacity;
			}
		}
	},

};

module.exports = CoalPlant;
