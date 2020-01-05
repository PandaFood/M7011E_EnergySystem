const express = require('express');
const router = express.Router();

const Database = require('../postgres/database');
const Simulation = require('../simulation/simulator');

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

		res.status(200).send('Price set');
	});

router
	.get('/startSimulation', function(req, res, next) {
		Simulation.runSimulation();
	});
module.exports = router;
