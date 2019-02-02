const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const filePath = './private/entities/articles.json';

var service = {};

service.getArticles = async function (res) {
    let articles = await getArticlesData();
    res.send(articles);
}

service.getArticle = async function (res, id) {
    let articles = await getArticlesData();
    let article = articles.filter(x => x.id == id)[0];
    if (!article) {
        res.statusCode = 404;
        res.send({error: 'Not found'});
    }
    else {
        res.send({status: 'OK', article: article});
    }
}

service.createArticle = async function (res, body) {
    let id = await getNewId();
    let article = {
        Id: id,
        title: body.title,
        author: body.author,
        description: body.description,
        url: body.images,
        urlToImage: body.urlToImage
    };
    let articles = await getArticlesData();
    articles.push(article);
    await writeFileAsync(filePath, JSON.stringify({articles: articles, newId: ++id}));

    return res.send({status: 'OK', article: article});
}

service.updateArticle = async function (res, id, body) {
    let articles = await getArticlesData();
    let index = articles.findIndex(x => x.id == id);
    if (!index) {
        res.statusCode = 404;
        return res.send({error: 'Not found'});
    }
    else {
        articles[index] = {
            title: body.title,
            author: body.author,
            description: body.description,
            url: body.images,
            urlToImage: body.urlToImage
        };
        await writeFileAsync(filePath, JSON.stringify({articles: articles, newId: getNewId()}));
        return res.send({status: 'OK', article: article});
    }
}

service.deleteArticle = async function (res, id) {
    let content = await readFileAsync(filePath);
    let result = JSON.parse(content)
    for (var i = 0; i < result.articles.length; i++) {
        if (result.articles[i].id == id) {
            result.articles.splice(i, 1);

        }
    }

    await writeFileAsync(filePath, JSON.stringify(result));

    if (!result.articles) {
        res.statusCode = 404;
        return res.send({error: 'Not found'});
    }
    else {
        return res.send({status: 'OK', articles: result.articles});
    }
}

async function getArticlesData() {
    let content = await readFileAsync(filePath);
    let articles = JSON.parse(content).articles;
    return articles;
};

async function getNewId() {
    let content = await readFileAsync(filePath);
    let newId = JSON.parse(content).newId;
    return newId;
};

module.exports = service;