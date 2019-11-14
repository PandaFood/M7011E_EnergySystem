const express = require('express');
const router = express.Router();

const Simulator = require('../simulation/simulator');


/**
 * @swagger
 * definitions:
 *   House:
 *     properties:
 *       name:
 *         type: string
 *       breed:
 *         type: string
 *       age:
 *         type: integer
 *       sex:
 *         type: string
 *   Windturbine:
 *      properties:
 *          name:
 *              type: string
 *          
 */


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
	//Simulator.runSimulation();

	res.json('respond with a resource');
});

module.exports = router;
