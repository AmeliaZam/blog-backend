const { authentication } = require('../../middlewares/authentication');
const { registerSchema, loginSchema } = require('../../validations/user');
const userController = require('../../controllers/user');
const { validation } = require('../../middlewares/validation');

exports.user = (router) => {
	router.post('/register', validation(registerSchema), userController.register);
	router.post('/login', validation(loginSchema), userController.login);
	router.get('/me', authentication, userController.profile);

	return router;
};
