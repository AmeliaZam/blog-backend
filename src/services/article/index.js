const { Article } = require('../../db/models/article');

exports.createArticle = async ({ title, content, authorId, status }) =>
	new Article({ title, content, authorId, status }).save();

exports.getAllArticles = async ({ status }) =>
	Article.find({ status }).populate({ path: 'authorId', select: '-password -__v' }).select('-__v');

exports.getAllArticlesForUser = async ({ authorId, status }) =>
	Article.find({ status, authorId }).populate({ path: 'authorId', select: '-password -__v' }).select('-__v');

exports.getAllPaginatedArticles = async ({ status, limit = 10, page = 1 }) =>
	baseArticleQuery({ status }, { limit, page });

exports.getAllPaginatedArticlesForUser = async ({ authorId, status, limit = 10, page = 1 }) =>
	baseArticleQuery({ status, authorId }, { limit, page });

exports.getArticleById = async ({ id }) =>
	Article.findOne({ _id: id }).populate({ path: 'authorId', select: '-password -__v' }).select('-__v');

exports.updateArticle = async ({ id, title, content, authorId, status }) =>
	Article.findOneAndUpdate(
		{
			_id: id,
			authorId,
		},
		{
			$set: {
				title,
				content,
				status,
				updatedDate: Date.now(),
			},
		},
		{ returnOriginal: false }
	);

exports.deleteArticle = async ({ id, authorId }) => Article.findOneAndDelete({ _id: id, authorId });

const baseArticleQuery = (query, options = {}) =>
	Article.find(query)
		.skip((options.page - 1) * options.limit)
		.limit(options.limit)
		.populate({ path: 'authorId', select: '-password -__v' })
		.select('-__v')
		.exec();
