const articleController = require('../../controllers/article');
const { authentication } = require('../../middlewares/authentication');
const { createArticleSchema, updateArticleSchema } = require('../../validations/article');
const { validation } = require('../../middlewares/validation');

exports.article = (router) => {
	router.post('/', authentication, validation(createArticleSchema), articleController.createArticle);

	router.get('/published', articleController.getAllPublishedArticles);

	router.get('/drafts', authentication, articleController.getAllDraftedArticles);

	router.get('/mine', authentication, articleController.getPublishedArticlesForAuthenticatedUser);

	router.get('/:id', articleController.getArticleById);

	router.patch('/:id', authentication, validation(updateArticleSchema), articleController.updateArticle);

	router.delete('/:id', authentication, validation(updateArticleSchema), articleController.deleteArticle);

	return router;
};
