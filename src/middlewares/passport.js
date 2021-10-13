const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const userService = require('../services/user');

passport.use(
	'login',
	new localStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email, password, done) => {
			try {
				const user = await userService.findUserByEmail({ email });

				if (!user) return done(null, false, { message: "User doesn't exists" });

				const validate = await user.isValidPassword(password);

				if (!validate) return done(null, false, { message: 'Wrong credentials' });

				return done(null, user, { message: 'Successfully logged in' });
			} catch (error) {
				return done(error, false, { message: error.message });
			}
		}
	)
);

passport.use(
	new JWTstrategy(
		{
			secretOrKey: `${process.env.JWT_SECRET}`,
			jwtFromRequest: ExtractJWT.fromHeader('authorization'),
		},
		(token, done) => {
			try {
				return done(null, token);
			} catch (error) {
				done(error, null, { message: error.message });
			}
		}
	)
);
