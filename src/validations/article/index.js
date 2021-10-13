const yup = require('yup');

exports.createArticleSchema = yup.object().shape({
	title: yup.string().min(5).max(30).required(),
	content: yup.string().required(),
	status: yup.string().required(),
});

exports.updateArticleSchema = yup.object().shape({
	title: yup.string().min(5).max(30),
	content: yup.string(),
	status: yup.string(),
});
