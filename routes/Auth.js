import { Router } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const salt = 10;
const router = Router();
export const generatePasswordHash = (password) => {
	const hash = bcrypt.hash(password, salt);
	return hash;
};
export const validatePassword = async (password, hash) => {
	const result = await bcrypt.compare(password, hash);
	return result;
};
export const isPasswordHash = (hash) => {
	if (!hash || hash.length !== 60) return false;
	try {
		bcrypt.getRounds(hash);
		return true;
	} catch {
		return false;
	}
};

//Register A User
router.post('/register', async (request, response) => {
	const { email, password } = request.body;
	const hashedPassword = await generatePasswordHash(password);
	const existingUser = await User.findOne({ email }).exec();
	if (existingUser) {
		return response.status(409).send('User already exists.');
	}
	try {
		const newUser = await User({
			...request.body,
			email: email,
			password: hashedPassword,
		});
		await newUser.save();

		const userId = newUser._id;
		return response.status(201).send({ userId });
	} catch (error) {
		response.status(400).json({ error: 'Bad Request' });
	}
});

// Login User
router.post('/login', async (request, response) => {
	const { email, password } = request.body;
	const user = await User.findOne({ email }).exec();
	if (!user) {
		return response.status(404).json('User not found');
	}
	const passwordValid = await validatePassword(password, user.password);
	try {
		if (user && passwordValid) {
			const userId = user._id;
			return response.status(201).send({ userId, user });
		}
		return response.status(400).json('Invalid Credentials');
	} catch (error) {
		response.status(400).json({ status: 'Bad Request 2' });
	}
});

router.put('/password' + '/:id', async (request, response) => {
	const user = await User.findOne({ _id: request.params.id }).exec();
	const newPassword = await generatePasswordHash(request.body);
	try {
		const existingPassword = user[0].password;
		const updateUser = await User.updateOne({ password: newPassword });
		response.status(204).send({ updateUser });
	} catch (error) {
		response.status(400).json({ error });
	}
});

router.post(`/logout`, async (request, response) => {
	const { email } = request.body;
	const user = await User.findOne({ email }).exec();
	user.token = generateRandomToken();
	if (user) {
		response.status(204).json({ status: 'logout', data: user });
	}
});
export default router;