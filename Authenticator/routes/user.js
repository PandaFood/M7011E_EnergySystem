const express = require('express');
const router = express.Router();
const Database = require('../postgres/database');
const jwt = require('../auth/jwt');
const hash = require('../auth/hashing');


/* GET users listing. */
router
	.get('/user', function (req, res, next) {
		Database.getUsers()
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	})
	.post('/user', function (req, res, next) {
		const input = req.body
		const password = hash.hashPassword(input.password).then((password) => {
			Database.addUser(input.name, input.adress, input.city, input.country, input.co, input.email, password)
				.then((v) => res.json(v.rows))
				.catch((err) => console.log(err));
		})
	})
	.delete('/user', function (req, res, next) {
		const input = req.body;
		Database.removeUser(input.id)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});

router
	.get('/user/:userID', function (req, res, next) {
		Database.getUser(req.params.userID)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});





module.exports = router;