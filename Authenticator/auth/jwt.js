const jwt = require('jsonwebtoken');

const TokenHandler = {
	verify: async function() {


	},

	generateRefreshToken: async function(username) {
		const refreshToken = jwt.sign({
			data: {

			},
			issued: timestamp(),
			username: username,
		}, process.env.PrivateKey, {algorithm: 'RS256', expiresIn: '5d'});
		return refreshToken;
	},

	generateAccessToken: async function(userID, userRole, time) {
		if (time == null) {
			time = timestamp();
		}

		const accessToken = jwt.sign({
			data: {
				role: userRole,
			},
			issued: time,
			userID: userID,
		}, process.env.PrivateKey, {algorithm: 'RS256', expiresIn: '1d'});
		return accessToken;
	},

};

module.exports = TokenHandler;


// eslint-disable-next-line require-jsdoc
function timestamp() {
	return Date.now();
}
