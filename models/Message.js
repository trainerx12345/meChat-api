const mongoose = require('mongoose');
const mongooseAutoPopulate = require('mongoose-autopopulate');

const schema = new mongoose.Schema(
	{
		message: {
			type: String,
			trim: true,
		},
		timestamp: {
			type: String,
			trim: true,
		},
		from_userId: {
			type: mongoose.ObjectId,
			ref: 'User',
			autopopulate: true,
		},
		to_userId: {
			type: mongoose.ObjectId,
			ref: 'User',
			autopopulate: true,
		},
	},
	{
		versionKey: false,
	},
);

schema.plugin(mongooseAutoPopulate);

module.exports = mongoose.model('Message', schema);
