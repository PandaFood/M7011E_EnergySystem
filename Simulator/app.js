const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const auth = require('./auth/authenticated');

const apiRouter = require('./api/api');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');


const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(auth);

app.use('/api', apiRouter);
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerDocument));

const Simulation = require('./simulation/simulator');

Simulation.runSimulation();


module.exports = app;
