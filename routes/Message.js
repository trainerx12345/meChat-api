import { response, Router } from 'express';
import Message from '../models/Message.js';

const router = Router();

//Fetch a Message
router.get('api/v1/message/:id', async (request, response) => {
	Exam.findOne({ _id: request.params.id })
		.then((result) => response.status(200).send(result))
		.catch((error) => response.status(404).send(error));
});

//Fetch all the messages
router.get('', async (request, response) => {
	const { messageId } = request.body;
	try {
		const result = await Message.find({ messageId }).toArray();
		response.status(201).send({ result });
	} catch (error) {
		response.status(400).json({ error });
	}
});

// Add a Message to the conversation
router.post('', async (req, res) => {
	const { messageId } = request.body;
	const result = await Message.findOne({ messageId }).exec();
	if (!result) {
		return response.status(404).json('No Message present');
	}
	try {
		return response.status(201).send({ result });
	} catch (error) {
		response.status(400).json({ status: 'Bad Request' });
	}
});
export default router;