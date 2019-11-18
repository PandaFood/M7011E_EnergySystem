const express = require('express');
const router = express.Router();

const Simulator = require('../simulation/simulator');
const CoalPlant = require('../simulation/coalplant');

/* GET users listing. */
router.get('/', function(req, res, next) {
	Simulator.runSimulation();

	res.send('respond with a resource');
});

router.post('/startCoalPlant', function(req, res, next) {
	// TODO: add authentication
	CoalPlant.startPlant();
	res.sendStatus(200);
});

router.post('/stopCoalPlant', function(req, res, next) {
	CoalPlant.stopPlant();
	res.sendStatus(200);
});

module.exports = router;
