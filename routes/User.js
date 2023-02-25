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
	await User.findOne({ _id: request.params.id })
		.then((result) => response.status(200).send(result))
		.catch((error) => response.status(404).send(error));
});

//Fetch a User
router.get('/email/:email', async (request, response) => {
	await User.findOne({ email: request.params.email })
		.then((result) => response.status(200).send(result))
		.catch((error) => response.status(404).send(error));
});

//Update a  User
router.put('/:id/:uid', async (request, response) => {
	try {
		const updateUser = await User.updateOne(
			{ _id: request.params.id },
			{ $push: { contacts: request.params.uid } },
		)
			.then((result) => {
				if (result.modifiedCount === 1) {
					response.status(204).send(result);
					// console.log(result);
				}
			})
			.catch((error) => response.status(404).send(error));
	} catch (error) {
		response.status(400).json({ error });
	}
});

module.exports = router;
