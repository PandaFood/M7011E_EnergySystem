const express = require('express');
const router = express.Router();

const Simulator = require("../simulation/simulator");

/* GET users listing. */
router.get('/', function(req, res, next) {

    Simulator.runSimulation();

    res.send('respond with a resource');
});

module.exports = router;
