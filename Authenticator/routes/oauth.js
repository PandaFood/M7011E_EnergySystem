const express = require('express');
const router = express.Router();
const Database = require('../postgres/database');
const jwt = require('../auth/jwt');
const hash = require('../auth/hashing');

router
	.get('/token/new', function(req, res, next) {
		const input = req.body;
		Database.loginUser(input.email).then((v) => {
			const passwordHash = v.rows[0].password;
			const userID = v.rows[0].id;


			hash.verifyPassword(input.password, passwordHash)
				.then((verified) => {
					if (verified) {
						jwt.generateAccessToken(userID).then((v) => {
							res.json({
								accesstoken: v,
							});
						});
					} else {
						res.status(401).send('Login failed');
					}
				})
				.catch((err) => console.log(err));
		});
	});

module.exports = router;