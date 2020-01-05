const express = require('express');
const router = express.Router();

const Database = require('../postgres/database');
const Simulation = require('../simulation/simulator');

router
	.get('/house', function(req, res, next) {
		Database.getHouses()
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	})
	.post('/house', function(req, res, next) {
		const consumption = req.query.consumption;
		const batteryPercentage = req.query.batteryPercentage;
		Database.addHouse(consumption, batteryPercentage)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});

router
	.get('/house/:houseId', function(req, res, next) {
		Database.getHouse(req.params.houseId)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});

router
	.post('/storage', function(req, res, next) {
		const owner = req.body.data.houseId;
		const maxCapacity = req.body.data.maxCapacity;
		const currentCapacity = req.body.data.currentCapacity;
		Database.addStorage(owner, maxCapacity, currentCapacity)
			.then((v) => {
				Simulation.refreshBatteries(owner);
				res.json(v.rows);
			})
			.catch((err) => console.log(err));
	})
	.get('/storage', function(req, res, next) {
		const owner = req.query.houseId;
		Database.getStorages(owner)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});

router
	.get('/storage/:storageId', function(req, res, next) {
		Database.getStorage(req.params.storageId)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});
router
	.post('/storageEvent', function(req, res, next) {
		const storageId = req.query.storageId;
		const currentCapacity = req.query.currentCapacity;
		const timestamp = (new Date()).toISOString();
		Database.addStorageEvent(storageId, currentCapacity, timestamp)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	})
	.get('/storageEvent', function(req, res, next) {
		const storageId = req.query.storageId;
		Database.getStorageEvents(storageId)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});

router
	.get('/storageEvent/latest', function(req, res, next) {
		const storageId = req.query.storageId;
		Database.getLatestStorageEvents(storageId)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});

router
	.post('/producer', function(req, res, next) {
		const houseId = req.body.data.houseId;
		const type = req.body.data.type;
		const coords = req.body.data.coords[0] + ',' + req.body.data.coords[1];
		Database.addProducer(houseId, coords, type)
			.then((v) => {
				Simulation.refreshWindTurbines(houseId);
				res.sendStatus(200).send('Turbine Created');
			})
			.catch((err) => res.sendStatus(500).send('Turbine could not be created'));
	})
	.get('/producer', function(req, res, next) {
		const houseId = req.query.houseId;
		Database.getProducers(houseId)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});

router
	.get('/allLatestProducerEvent', function(req, res, next) {
		const houseId = req.query.houseId;
		Database.getLatestHouseProducerEvents(houseId)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});

router
	.get('/latestProducerEvent', function(req, res, next) {
		const producerId = req.query.producerId;
		Database.getLatestProducerEvents(producerId)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});

router
	.get('/allLatestProducerEvent', function(req, res, next) {
		const houseId = req.query.houseId;
		Database.getLatestHouseProducerEvents(houseId)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});

router
	.get('/currentPrice', function(req, res, next) {
		res.send({
			price: Simulation.currentPrice,
		});
	})
	// only manager should be able to set price
	.post('/currentPrice', function(req, res, next) {
		// useCalculatedPrice comes in as a string, thus the awkward check if it equals true
		Simulation.useCalculatedPrice = 'true' == req.query.useCalculatedPrice;

		if (Simulation.useCalculatedPrice) {
			Simulation.currentPrice = Simulation.calculatedPrice;
		} else {
			Simulation.currentPrice = req.query.price;
		}

		res.send(200);
	});

router
	.get('/startSimulation', function(req, res, next) {
		Simulation.runSimulation();
	});
module.exports = router;
