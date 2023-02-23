const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

//Fetch all User
router.get('/', async (request, response) => {
	try {
		const fetch = await User.find();
		response.status(200).send({ fetch });
	} catch (error) {
		return response.status(401).json({ error });
	}
});

//Fetch a User
router.get('/:id', async (request, response) => {
	User.findOne({ _id: request.params.id })
		.then((result) => response.status(200).send(result))
		.catch((error) => response.status(404).send(error));
});

//Update a  User
router.put('/:id', async (request, response) => {
	try {
		const updateUser = await User.updateOne(
			{ _id: request.params.id },
			{ $set: request.body },
		)
			.then((result) => {
				if (result.modifiedCount === 1) {
					response.status(204).send(result);
				}
			})
			.catch((error) => response.status(404).send(error));
	} catch (error) {
		response.status(400).json({ error });
	}
});

module.exports = router;
