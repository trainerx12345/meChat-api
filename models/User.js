const mongoose = require('mongoose');
const mongooseAutoPopulate = require('mongoose-autopopulate');
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
		avatar: {
			type: String,
			trim: true,
		},
		isOnline: {
			type: Boolean,
			default: false,
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
module.exports = mongoose.model('User', schema);
