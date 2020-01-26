const express = require('express');
const router = express.Router();
const Database = require('../postgres/database');
const fs = require('fs');
const jwt = require('../auth/jwt');
const hash = require('../auth/hashing');
const axios = require('axios');
const auth = require('../auth/authenticated');
const multer = require('multer');
const storage = multer.diskStorage({
	destination: 'uploads/',
	filename: function( req, file, cb ) {
	//

		cb( null, req.auth.userID);
	}});
const avatar = multer({storage: storage}).single('file');


/* GET users listing. */
router
	.get('/', auth, function(req, res, next) {
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
	.delete('/:userID', auth, function(req, res, next) {
		if ( req.auth.userID != req.params.userID) {
			if ( req.auth.role != 'ADMIN') {
				return res.sendStatus(403);
			}
		}

		const input = req.params.userID;

		Database.removeUser(input)
			.then((v) => {
				res.json(v.rows);
			})
			.catch((err) => console.log(err));
	})
	.post('/avatar', auth, avatar, function(req, res, next) {
		res.send(200);
	})
	.get('/avatar/:id', function(req, res, next) {
		const path = 'uploads/' + req.params.id;
		console.log(path);
		try {
			if (fs.existsSync(path)) {
				return res.sendfile(path);
			} else {
				return res.sendfile('static/user.png');
			}
		} catch (err) {
			console.error(err);
		}
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
 * @param {string} token
 * @param {Object} res
 */
function createHouse(email, token, res) {
	setTimeout(() => {
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
	}, 700);
}

module.exports = router;
