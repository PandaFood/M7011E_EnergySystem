const express = require('express');
const router = express.Router();



router.get('/authenticate', function(req, res, next) {
	res.sendStatus(200);
});


module.exports = router;
