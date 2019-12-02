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
		const name = req.query.name;
		const adress = req.query.adress;
		const consumption = req.query.consumption;
		Database.addHouse(name, adress, consumption)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});

router
	.get('/house/:houseid', function(req, res, next) {
		Database.getHouse(req.params.houseId)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});

router
	.post('/storage', function(req, res, next) {
		const owner = req.query.houseId;
		const maxCapacity = req.query.maxCapacity;
		const currentCapacity = req.query.currentCapacity;
		const fillPercentage = req.query.fillPercentage;
		Database.addStorage(owner, maxCapacity, currentCapacity, fillPercentage)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	})
	.get('/storage', function(req, res, next) {
		const owner = req.query.houseId;
		Database.getStorages(owner)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});
router
	.post('/storage/update', function(req, res, next) {
		const owner = req.query.storageId;
		const currentCapacity = req.query.currentCapacity;

		Database.updateStorage(owner, currentCapacity)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});

router
	.post('/storage/storageEvent', function(req, res, next) {
		const storageId = req.query.storageId;
		const currentCapacity = req.query.currentCapacity;
		const timestamp = (new Date()).toISOString();
		Database.addStorageEvent(storageId, currentCapacity, timestamp)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	})
	.get('/storage/storageEvent', function(req, res, next) {
		const storageId = req.query.storageId;
		Database.getStorageEvents(storageId)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});

router
	.post('/producer', function(req, res, next) {
		const houseId = req.query.houseId;
		const type = req.query.type;
		const coords = req.query.coords;

		Database.addProducer(houseId, coords, type)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	})
	.get('/producer', function(req, res, next) {
		const houseId = req.query.houseId;
		Database.getProducers(houseId)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});

router
	.get('/producerEvent', function(req, res, next) {
		const producerId = req.query.producerId;
		Database.getProducerEvents(producerId)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});

router
	.get('/producerEvent', function(req, res, next) {
		const producerId = req.query.producerId;
		Database.getProducerEvents(producerId)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});

router
	.get('/startSimulation', function(req, res, next) {
		Simulation.runSimulation();
	});
module.exports = router;
