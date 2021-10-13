const express = require('express');

const { user } = require('./user');
const { article } = require('./article');

const router = express.Router();

router.get('/', (_req, res) => res.json({ message: 'Crowd Linker RESTful API' }));

router.use('/user', user(router));
router.use('/article', article(router));

router.use((_req, res) => {
	const error = new Error('Route not found');
	error.status = 404;
	res.status(error.status || 500).json({ error: error.message });
});

module.exports = router;
