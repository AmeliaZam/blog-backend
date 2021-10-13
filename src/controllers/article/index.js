const articleService = require('../../services/article');
const { promise } = require('../../middlewares/promise');

exports.createArticle = promise(async (req, res) => {
	const authorId = req.user._id;
	let { title, content, status } = req.body;

	status = status.toLowerCase();

	const article = await articleService.createArticle({ title, content, authorId, status });

	res.status(200).json({ message: 'Successfully created article', article });
});

exports.getAllPublishedArticles = promise(async (req, res) => {
	const { limit, page } = req.query;

	const articles = await articleService.getAllArticles({ status: 'published' });
	const paginatedArticles = await articleService.getAllPaginatedArticles({
		status: 'published',
		limit,
		page,
	});

	res.status(200).json({ count: articles?.length, rows: paginatedArticles });
});

exports.getAllDraftedArticles = promise(async (req, res) => {
	const authorId = req.user._id;
	const { limit, page } = req.query;

	const articles = await articleService.getAllArticlesForUser({ authorId, status: 'draft' });
	const paginatedArticles = await articleService.getAllPaginatedArticlesForUser({
		status: 'draft',
		authorId,
		limit,
		page,
	});

	res.status(200).json({ count: articles?.length, rows: paginatedArticles });
});

exports.getPublishedArticlesForAuthenticatedUser = promise(async (req, res) => {
	const authorId = req.user._id;
	const { limit, page } = req.query;

	const articles = await articleService.getAllArticlesForUser({ authorId, status: 'published' });
	const paginatedArticles = await articleService.getAllPaginatedArticlesForUser({
		status: 'published',
		authorId,
		limit,
		page,
	});

	res.status(200).json({ count: articles?.length, rows: paginatedArticles });
});

exports.getArticleById = promise(async (req, res) => {
	const { id } = req.params;

	const article = await articleService.getArticleById({ id });

	res.status(200).json({ article });
});

exports.updateArticle = promise(async (req, res) => {
	const { id } = req.params;
	const authorId = req.user._id;
	let { title, content, status } = req.body;

	status = status.toLowerCase();

	const article = await articleService.updateArticle({
		id,
		title,
		content,
		authorId,
		status,
	});

	if (article === null) return res.status(403).json({ message: "Article doesn't exists" });

	res.status(200).json({ message: 'Successfully updated article' });
});

exports.deleteArticle = promise(async (req, res) => {
	const { id } = req.params;
	const authorId = req.user._id;

	const article = await articleService.deleteArticle({
		id,
		authorId,
	});

	if (article === null) return res.status(403).json({ message: "Article doesn't exists" });

	res.status(200).json({ message: 'Successfully delete article' });
});
