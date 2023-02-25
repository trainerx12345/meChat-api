const express = require('express');
const router = express.Router();
const Message = require('../models/Message.js');

//Fetch a Message
router.get('/:id', async (request, response) => {
	Message.findOne({ _id: request.params.id })
		.then((result) => response.status(200).send(result))
		.catch((error) => response.status(404).send(error));
});

//Fetch all the messages
router.get('/:userId/:correspondingUserId', async (request, response) => {
	await Message.find({
		from_userId: request.params.userId,
		to_userId: request.params.correspondingUserId,
	})
		.then((result) => response.status(200).send(result))
		.catch((error) => response.status(404).send(error));
});

// Add a Message to the conversation
router.post('/', async (request, response) => {
	const { message } = request.body;
	try {
		const newMessage = await Message({
			...message,
		});
		newMessage.save();
		return response.status(201).send({ newMessage });
	} catch (error) {
		response.status(400).json({ status: 'Bad Request' });
	}
});

module.exports = router;
