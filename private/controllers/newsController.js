let articleService = require('../services/newsService')
let controller = {};

controller.getArticles = function(req, res, next) {
    articleService.getArticles()
        .then(articles => {
            res.send(articles);
        });
}

controller.getArticle = function(req, res, next) {
    articleService.getArticle(req.params.id)
        .then(article => {
            res.send(article);
        });
}

controller.createArticle = function(req, res, next) {
    articleService.createArticle(req.body.title)
        .then(() => {
            res.status(200).send('Article created');
        });
}

controller.updateArticle = function(req, res, next) {
    articleService.updateArticle(req.params.id, req.body.title)
        .then(() => {
            res.status(200).send("Article updated");
        });
}

controller.deleteArticle = function(req, res, next) {
    articleService.deleteArticle(req.params.id)
        .then(() => {
            res.status(200).send("Article deleted");
        });
}

module.exports = controller