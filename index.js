//DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const server = express();
require('dotenv').config();

//MIDDLEWARES
server.use(morgan('dev'));
server.use(cors());
server.use(bodyParser.json());
server.use(helmet());

//ROUTES
const routes = require('./routes/index.js');

//DEPRECATION WARNING SOLN
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.enable('json spaces');
server.enable('strict routing');

mongoose.set('strictQuery', false);
//DATABASE CONNECTION
mongoose.connect(process.env.URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

server.get('/', (request, response) => {
	response.send('Welcome to meChat API');
});

//ENDPOINTS
server.use(routes);
server.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});
