const express = require('express');
const router = express.Router();

const Database = require('../postgres/database');


router
	.get('/house', function(req, res, next) {
		Database.getHouses()
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	})
	.post('/house', function(req, res, next) {
		Database.getHouses()
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});


router
	.get('/house/:houseid', function(req, res, next) {
		Database.getHouse(req.params.houseid)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});


module.exports = router;
