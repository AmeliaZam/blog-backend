const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
	title: {
		type: String,
		required: true,
		index: true,
		min: 5,
		max: 30,
	},
	content: {
		type: String,
		required: true,
	},
	authorId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	status: {
		type: String,
		enum: {
			values: ['published', 'draft'],
			message: '{VALUE} is not supported, Value can only be published or draft.',
		},
		required: true,
	},
	createdDate: {
		type: Schema.Types.Date,
		default: Date.now(),
		required: true,
	},
	updatedDate: {
		type: Schema.Types.Date,
		default: null,
	},
});

exports.Article = mongoose.model('Article', articleSchema);
