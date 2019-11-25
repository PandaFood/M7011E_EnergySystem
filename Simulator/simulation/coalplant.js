
CoalPlant = {

	status: 'down',

	producedPower: 0,
	productionSpeed: 500, // Ws

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
			const sellPower = this.producedPower;
			this.producedPower = 0;
			return sellPower;
		} else {
			this.producedPower -= requestedPower;
			return requestedPower;
		}
	},

	runPlant: function(deltaTime) {
		if (this.status == 'up') {
			this.producedPower += this.productionSpeed * deltaTime;
		}
		// console.log(this.producedPower);
	},

};

module.exports = CoalPlant;
