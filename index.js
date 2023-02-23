import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/index.js';

import dotenv from 'dotenv';

dotenv.config();

const URI = process.env.URI;
const PORT = parseInt(process.env.PORT, 10) || 3000;
const server = express();

server.enable('json spaces');
server.enable('strict routing');
server.use(helmet());
server.use(cors());
server.use(express.json);
server.use(routes);

// Database connection
mongoose.connect(URI);

server.get('/', (request, response) => {
	response.send(`Welcome to me-chat API`);
});

server.use(routes);

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
