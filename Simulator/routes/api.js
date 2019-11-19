const express = require('express');
const router = express.Router();

const Simulator = require('../simulation/simulator');
const Database = require('./../postgres/database');


/**
 * @swagger
 * definitions:
 *   House:
 *     properties:
 *       id:
 *         type: uuid
 *       name:
 *         type: string
 *       adress:
 *         type: string
 *       Windturbines:
 *         type: Windturbine
 * 
 *   Windturbine:
 *      properties:
 *          name:
 *              type: string
 *          
 */


/**
 * @swagger
 * /api/house/{houseID}:
 *   get:
 *     tags:
 *       - House
 *     description: Returns all houses
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of houses
 *         schema:
 *           $ref: '#/definitions/House'
 */
router.get('/house/:houseid', function(req, res, next) {
	Database.getHouse(req.params.houseid)
		.then((v) => res.json(v.rows))
		.catch((err) => console.log(err));
});

/**
 * @swagger
 * /api/houses:
 *   get:
 *     tags:
 *       - House
 *     description: Returns all houses
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of houses
 *         schema:
 *           $ref: '#/definitions/House'
 */
router.get('/house', function(req, res, next) {
	Database.getHouses()
		.then((v) => res.json(v.rows))
		.catch((err) => console.log(err));
});

/**
 * @swagger
 * /api/resource:
 *   get:
 *     tags:
 *       - Puppies
 *     description: Returns all puppies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of puppies
 *         schema:
 *           $ref: '#/definitions/Puppy'
 */
router.get('/resource', function(req, res, next) {

	res.json('respond with a resource');
});

module.exports = router;
