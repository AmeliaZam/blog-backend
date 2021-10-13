const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstname: {
		type: String,
		required: true,
		min: 3,
		max: 30,
	},
  lastname: {
		type: String,
		required: true,
		min: 3,
		max: 30,
	},
	email: {
		type: String,
		required: true,
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
		index: true,
	},
	password: {
		type: String,
		required: true,
		min: 8,
		max: 30,
	},
});

userSchema.methods.generateAuthToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			name: this.name,
			email: this.email,
			isAdmin: this.isAdmin,
		},
		process.env.JWT_SECRET
	);
};

userSchema.methods.excludePassword = function () {
	const { password: pass, __v, ...rest } = this._doc;
	return rest;
};

userSchema.pre('save', function (next) {
	const user = this;

	const hash = bcrypt.hashSync(user.password, 10);

	this.password = hash;
	next();
});

userSchema.methods.isValidPassword = async function (password) {
	const user = this;
	const compare = bcrypt.compareSync(password, user.password);

	return compare;
};

exports.User = mongoose.model('User', userSchema);
