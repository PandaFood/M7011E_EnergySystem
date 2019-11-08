var express = require('express');
var router = express.Router();

var Simulator = require("../simulator");

/* GET users listing. */
router.get('/', function(req, res, next) {

    Simulator.startSimulator();

    res.send('respond with a resource');
});

module.exports = router;
