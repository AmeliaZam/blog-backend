const yup = require('yup');

exports.registerSchema = yup.object().shape({
	firstname: yup.string().min(3).max(30).required(),
	lastname: yup.string().min(3).max(30).required(),
	email: yup.string().email().required(),
	password: yup.string().min(8).max(30).required(),
});

exports.loginSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
});
