const jwt = require('jsonwebtoken');
const axios = require('axios');

module.exports = async function authenticated(req, res, next) {
	if (req.headers.authorization == null) {
		return res.sendStatus(403);
	}

	const regex = /(?!Bearer)( .+)/g;
	const bearer = req.headers.authorization;
	const token = bearer.match(regex)[0].replace(/ /g, '');

	if (process.env.authkey == null) {
		await axios.get('http://authenticator:3000/auth/identity')
			.then((response) => {
				process.env.authkey = response.data;
			})
			.catch((error) => {
				console.log('Cannot get identity of auth server.');
				console.log(error);
				res.status(500).send('Cannot get identity from auth server. Please contact website administrator.');
			});
	}


	const pkey = process.env.authkey;
	jwt.verify(token, pkey, {algorithms: ['RS256']}, (err, decoded) => {
		if ( err ) {
			console.log(err);
		}

		if (decoded.data.role == 'SERVER') {
			return next();
		}
		req.auth = {};
		req.auth.userID = decoded.userID;
		req.auth.role = decoded.data.role;

		return next();
	});
};
