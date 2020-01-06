const express = require('express');
const router = express.Router();
const Database = require('../postgres/database');
const jwt = require('../auth/jwt');
const hash = require('../auth/hashing');

router
	.post('/token/new', function(req, res, next) {
		const input = req.body;
		Database.loginUser(input.email.toLowerCase()).then((v) => {
			if (v.rows < 1) {
				return res.status(401).send('Login failed');
			}

			const passwordHash = v.rows[0].password;
			const userID = v.rows[0].id;
			const userRole = v.rows[0].role;

			hash.verifyPassword(input.password, passwordHash)
				.then((verified) => {
					if (verified) {
						jwt.generateAccessToken(userID, userRole).then((v) => {
							res.json({
								accesstoken: v,
								role: userRole,
								userID: userID,
							});
						});
					} else {
						res.status(401).send('Login failed');
					}
				})
				.catch((err) => console.log(err));
		}).catch((err) => console.log(err));
	});

module.exports = router;
