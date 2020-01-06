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
		}, process.env.PrivateKey, {expiresIn: '5d'});
		return refreshToken;
	},

	generateAccessToken: async function(userID, userRole) {
		const accessToken = jwt.sign({
			data: {
				role: userRole,
			},
			issued: timestamp(),
			userID: userID,
		}, process.env.PrivateKey, {expiresIn: '1d'});
		return accessToken;
	},

};

module.exports = TokenHandler;


// eslint-disable-next-line require-jsdoc
function timestamp() {
	return Date.now();
}
