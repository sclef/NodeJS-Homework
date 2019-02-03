const Article = require('../models/article');

var service = {};

service.getArticles = async function() {
    return await Article.find();
}

service.getArticle = async function(id) {
    return await Article.findById(id);
}

service.createArticle = async function(title) {
    const article = new Article(title);

    await article.save(function(err){
        if (err) {
            next(err);
        }
    });
}

service.updateArticle = async function(id, title) {
    return await Article.findByIdAndUpdate(id, { title: title }, function(err) {
        if (err) {
            console.log(err);
            next(err);
        }
    })
}

service.deleteArticle = async function(id) {
    return await Article.findByIdAndDelete(id, function(err) {
        if (err) {
            console.log(err);
            next(err);
        }
    })
}

module.exports = service;