const { User } = require('../../db/models/user');

exports.findUserByEmail = ({ email }) => User.findOne({ email });

exports.findUserById = ({ id }) => User.findById({ _id: id });

exports.createUser = async ({ firstname, lastname, email, password }) =>
	new User({
		firstname,
		lastname,
		email,
		password,
	}).save();
