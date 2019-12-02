const express = require('express');
const router = express.Router();


/* GET users listing. */
router.get('/get/:id', function(req, res, next) {
	Simulator.runSimulation();

	res.send('respond with a resource');
});

router.get('/get/', function(req, res, next) {
	Simulator.runSimulation();

	res.send('respond with a resource');
});

router.post('/add', function(req, res, next) {
	res.sendStatus(200);
});


module.exports = router;
