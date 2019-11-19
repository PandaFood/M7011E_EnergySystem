const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const apiRouter = require('./routes/api');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const app = express();

// swagger definition
const swaggerDefinition = {
	info: {
		title: 'Green Lean Electrics API',
		version: '0.0.1',
		description: 'Green Lean Electrics API for reaching their electric data.',
	},
	host: 'localhost:3000',
	basePath: '/',
};

const options = {
	swaggerDefinition: swaggerDefinition,
	apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
});


module.exports = app;
