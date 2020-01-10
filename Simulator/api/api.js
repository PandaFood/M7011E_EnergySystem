const express = require('express');
const router = express.Router();

const Database = require('../postgres/database');
const Simulation = require('../simulation/simulator');
const CoalPlant = require('../simulation/coalplant');

router
	.get('/house', function(req, res, next) {
		Database.getHouses()
			.then((v) => res.json(v.rows))
			.catch((err) => res.sendStatus(500).send('ERROR: Could not fetch Houses'));
	})
	.post('/house', function(req, res, next) {
		const consumption = req.query.consumption;
		const batteryPercentage = req.query.batteryPercentage;
		Database.addHouse(consumption, batteryPercentage)
			.then((v) => res.status(200).send('House Created'))
			.catch((err) => res.status(500).send('ERROR: Could not create House'));
	});

router
	.get('/house/:houseId', function(req, res, next) {
		Database.getHouse(req.params.houseId)
			.then((v) => res.json(v.rows))
			.catch((err) => res.sendStatus(500).send('ERROR: Could not fetch House with given ID'));
	});

router
	.post('/storage', function(req, res, next) {
		const owner = req.body.data.houseId;
		const maxCapacity = req.body.data.maxCapacity;
		const currentCapacity = req.body.data.currentCapacity;
		Database.addStorage(owner, maxCapacity, currentCapacity)
			.then((v) => {
				Simulation.refreshBatteries(owner);
				res.status(200).send('Storage Created');
			})
			.catch((err) => res.status(500).send('ERROR: Could not create Storage'));
	})
	.get('/storage', function(req, res, next) {
		const owner = req.query.houseId;
		Database.getStorages(owner)
			.then((v) => res.json(v.rows))
			.catch((err) => res.sendStatus(500).send('ERROR: Could not fetch Storages for this House'));
	});

router
	.get('/storage/:storageId', function(req, res, next) {
		Database.getStorage(req.params.storageId)
			.then((v) => res.json(v.rows))
			.catch((err) => res.sendStatus(500).send('ERROR: Could not fetch Storage'));
	});
router
	.post('/storageEvent', function(req, res, next) {
		const storageId = req.query.storageId;
		const currentCapacity = req.query.currentCapacity;
		const timestamp = (new Date()).toISOString();
		Database.addStorageEvent(storageId, currentCapacity, timestamp)
			.then((v) => res.status(200).send('Storage Event Created'))
			.catch((err) => res.status(500).send('ERROR: Could not create Storage Event'));
	})
	.get('/storageEvent', function(req, res, next) {
		const storageId = req.query.storageId;
		Database.getStorageEvents(storageId)
			.then((v) => res.json(v.rows))
			.catch((err) => res.sendStatus(500).send('ERROR: Could not fetch Storage Events for this Storage'));
	});

router
	.get('/storageEvent/latest', function(req, res, next) {
		const storageId = req.query.storageId;
		Database.getLatestStorageEvents(storageId)
			.then((v) => res.json(v.rows))
			.catch((err) => res.sendStatus(500).send('ERROR: Could not fetch latest Storage Events for this Storage'));
	});

router
	.post('/producer', function(req, res, next) {
		const houseId = req.body.data.houseId;
		const type = req.body.data.type;
		const coords = req.body.data.coords[0] + ',' + req.body.data.coords[1];
		Database.addProducer(houseId, coords, type)
			.then((v) => {
				Simulation.refreshWindTurbines(houseId);
				res.status(200).send('Turbine Created');
			})
			.catch((err) => res.sendStatus(500).send('ERROR: Could not create Producer'));
	})
	.get('/producer', function(req, res, next) {
		const houseId = req.query.houseId;
		Database.getProducers(houseId)
			.then((v) => res.json(v.rows))
			.catch((err) => res.sendStatus(500).send('ERROR: Could not fetch Producer'));
	});

router
	.get('/allLatestProducerEvent', function(req, res, next) {
		const houseId = req.query.houseId;
		Database.getLatestHouseProducerEvents(houseId)
			.then((v) => res.json(v.rows))
			.catch((err) => res.sendStatus(500).send('ERROR: Could not fetch latest Producer Events for this House'));
	});

router
	.get('/latestProducerEvent', function(req, res, next) {
		const producerId = req.query.producerId;
		Database.getLatestProducerEvents(producerId)
			.then((v) => res.json(v.rows))
			.catch((err) => res.sendStatus(500).send('ERROR: Could not fetch latest Producer Events for this Produce'));
	});

router
	.get('/allLatestProducerEvent', function(req, res, next) {
		const houseId = req.query.houseId;
		Database.getLatestHouseProducerEvents(houseId)
			.then((v) => res.json(v.rows))
			.catch((err) => res.sendStatus(500).send('ERROR: Could not fetch Producer Events for this Producer'));
	});

router
	.get('/currentPrice', function(req, res, next) {
		res.send({
			price: Simulation.currentPrice,
			calculatedPrice: Simulation.calculatedPrice,
		});
	})
	// only manager should be able to set price
	.post('/currentPrice', function(req, res, next) {
		Simulation.useCalculatedPrice = req.body.data.useCalculatedPrice;

		if (Simulation.useCalculatedPrice) {
			Simulation.currentPrice = Simulation.calculatedPrice;
			res.status(200).send('Price set');
		} else if (req.body.data.price > 0) {
			Simulation.currentPrice = req.body.data.price;
			res.status(200).send('Price set');
		} else {
			res.status(500).send('ERROR: Price cannot be set');
		}
	});

router.get('/systemPower', function(req, res, next) {
	res.status(200).send({
		power: Simulation.power,
	});
});

router.post('/coal/battery', function(req, res, next) {
	const newPercentage = req.body.data.newPercentage;
	if (newPercentage >= 0 && newPercentage <= 1) {
		CoalPlant.batteryPercentage = newPercentage;
		res.status(200).send('Battery Percentage updated');
	} else {
		res.status(500).send('ERROR: Battery Percentage not updated, bad value');
	}
});

router.get('/coal/status', function(req, res, next) {
	res.status(200).send({
		status: CoalPlant.status,
		capacity: CoalPlant.capacity,
		maxCapacity: CoalPlant.maxCapacity,
		batteryPercentage: CoalPlant.batteryPercentage,
	});
});

router.post('/coal/start', function(req, res, next) {
	if (CoalPlant.status === 'down') {
		CoalPlant.startPlant();
		res.status(200).send('Starting Coal Plant');
	} else {
		res.status(500).send('ERROR: Coal Plant is not turned off');
	}
});

router.post('/coal/stop', function(req, res, next) {
	if (CoalPlant.status === 'up') {
		CoalPlant.stopPlant();
		res.status(200).send('Stopping Coal Plant');
	} else {
		res.status(500).send('ERROR: Coal Plant is not running');
	}
});


router
	.get('/startSimulation', function(req, res, next) {
		Simulation.runSimulation();
	});
module.exports = router;
