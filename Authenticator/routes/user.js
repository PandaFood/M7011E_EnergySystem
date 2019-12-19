const express = require('express');
const router = express.Router();
const Database = require('../postgres/database');
const jwt = require('../auth/jwt');
const hash = require('../auth/hashing');


/* GET users listing. */
router
	.get('/', function(req, res, next) {
		Database.getUsers()
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	})
	.post('/', function(req, res, next) {
		const input = req.body;
		hash.hashPassword(input.password).then((password) => {
			Database.addUser(input.name.toLowerCase(), input.adress.toLowerCase(), input.city.toLowerCase(),
				input.country.toLowerCase(), input.co, input.email.toLowerCase(), password)
				.then((v) => res.json(v.rows))
				.catch((err) => console.log(err));
		});
	})
	.delete('/', function(req, res, next) {
		const input = req.body;
		Database.removeUser(input.id)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});

router
	.get('/:userID', function(req, res, next) {
		Database.getUser(req.params.userID)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});


module.exports = router;
