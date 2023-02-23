import mongoose from 'mongoose';
import { randomBytes } from 'crypto';
import { isPasswordHash } from '../routes/Auth.js';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const generateRandomToken = () =>
	randomBytes(48).toString('base64').replace(/[+/]/g, '.');

const schema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		name: {
			type: String,
			trim: true,
		},
		phoneNumber: {
			type: String,
			trim: true,
		},
		token: {
			type: String,
			default: generateRandomToken,
		},
		contacts: [
			{
				type: Array,
				ref: 'Users',
				autopopulate: true,
				default: [],
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

schema.plugin(mongooseAutoPopulate);
const User = mongoose.model('User', schema);
export default User;
