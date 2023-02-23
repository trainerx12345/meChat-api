const mongoose = require('mongoose');
const mongooseAutoPopulate = reqiure('mongoose-autopopulate');

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
			ref: 'Users',
			autopopulate: true,
		},
		to_userId: {
			type: mongoose.ObjectId,
			ref: 'Users',
			autopopulate: true,
		},
		message: {
			type: String,
			trim: true,
		},
	},
	{
		versionKey: false,
	},
);

schema.plugin(mongooseAutoPopulate);

const Message = mongoose.model('Message', schema);

export default Message;
