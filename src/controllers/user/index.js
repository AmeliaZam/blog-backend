const passport = require('passport');

const userService = require('../../services/user');
const { promise } = require('../../middlewares/promise');

exports.register = promise(async (req, res) => {
	const { firstname, lastname, email, password } = req.body;

	const emailExists = await userService.findUserByEmail({ email });

	if (emailExists) return res.status(400).json({ message: 'Email already Exists' });

	const user = await userService.createUser({
		firstname,
		lastname,
		email,
		password,
	});

	const newUserObj = user.excludePassword();

	const token = user.generateAuthToken(newUserObj);

	res.status(200).header('authorization', token).json({ message: 'Successfully registered', user: newUserObj });
});

exports.login = (req, res, next) => {
	passport.authenticate('login', (err, user, info) => {
		if (err) next(err);

		if (!user) res.status(404).json({ message: info.message });

		const newUserObj = user?.excludePassword();

		req.login(user, { session: false }, () => {
			const token = user.generateAuthToken(newUserObj);

			res.json({ message: info.message, user: newUserObj, token });
		});
	})(req, res, next);
};

exports.profile = promise(async (req, res) => {
	const user = await userService.findUserById({ id: req.user._id });

	const newUserObj = user.excludePassword();

	res.status(200).json({ user: newUserObj });
});
