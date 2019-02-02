let articleService = require('../services/newsService')
let controller = {};

controller.getArticles = function (req, res, next) {
    return articleService.getArticles(res)
}

controller.getArticle = function (req, res, next) {
    return articleService.getArticle(res, req.params.id)
}

controller.createArticle = function (req, res, next) {
    return articleService.createArticle(res, req.body);
}

controller.updateArticle = function (req, res, next) {
    return articleService.updateArticle(res, req.params.id, req.body);
}

controller.deleteArticle = function (req, res, next) {
    return articleService.deleteArticle(res, req.params.id);
}

module.exports = controller