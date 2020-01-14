const express = require('express');
const router = express.Router();
const Database = require('../postgres/database');
const jwt = require('../auth/jwt');
const hash = require('../auth/hashing');
const axios = require('axios');
const auth = require('../auth/authenticated');


/* GET users listing. */
router
	.get('/', function(req, res, next) {
		if ( req.auth.role != 'ADMIN') {
			return res.sendStatus(403);
		}

		Database.getUsers()
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	})
	.post('/', function(req, res, next) {
		const input = req.body;
		hash.hashPassword(input.password).then((password) => {
			Database.addUser(input.name.toLowerCase(), input.adress.toLowerCase(), input.city.toLowerCase(),
				input.country.toLowerCase(), input.co, input.email.toLowerCase(), password)
				.then((v) => {
					jwt.generateAccessToken('AUTH', 'SERVER', '', '60s')
						.then((token) => {
							createHouse(input.email.toLowerCase(), token, res);
						}).catch((err) => console.log(err));
				})
				.catch((err) => console.log(err));
		});
	})
	.delete('/', auth, function(req, res, next) {
		const input = req.auth.userID;

		console.log(input);
		Database.removeUser(input.id)
			.then((v) => {
				console.log(v.rows);
				res.json(v.rows);
			})
			.catch((err) => console.log(err));
	});

router
	.get('/:userID', auth, function(req, res, next) {
		if ( req.auth.userID != req.params.userID) {
			if ( req.auth.role != 'ADMIN') {
				return res.sendStatus(403);
			}
		}

		Database.getUser(req.params.userID)
			.then((v) => res.json(v.rows))
			.catch((err) => console.log(err));
	});


/**
 *
 * @param {string} email
 * @param {string} tempToken
 * @param {Object} res
 */
function createHouse(email, token, res) {
	Database.getUserHouseId(email).then((response) => {
		axios.post('http://simulator:3000/api/house', {
			houseId: response.rows[0].houseId,
		}, {headers: {Authorization: 'Bearer ' + token}})
			.then((response) => {
				res.status(200).send('House created');
			})
			.catch((error) => {
				res.status(500).send('ERROR: Could not create house');
			});
	}).catch((err) => res.status(500).send('ERROR: Could not fetch house id'));
}

module.exports = router;
