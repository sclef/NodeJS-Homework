//let articles = require('../entities/articles.js');
const filePath = './entities/articles.json';

const fs = require('fs');
const util = require('util');

let express = require('express');
let router = express.Router();

let readFileAsync = util.promisify(fs.readFile);
let writeFileAsync = util.promisify(fs.writeFile);



/* GET news listing. */
router.get('/', async function (req, res, next) {
    let articles = await getArticles();
    res.send(articles);
});

/* GET articles listing. */
router.get('/:id', async function (req, res, next) {
    let articles = await getArticles();
    let article = articles.filter(x => x.id == req.params.id)[0];
    if (!article) {
        res.statusCode = 404;
        return res.send({error: 'Not found'});
    }
    else {
        return res.send({status: 'OK', article: article});
    }
});

router.post('/', async function (req, res, next) {
    let id = await getNewId();
    let article = {
        Id: id,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        url: req.body.images,
        urlToImage: req.body.urlToImage
    };
    let articles = await getArticles();
    articles.push(article);
    await writeFileAsync(filePath, JSON.stringify({articles: articles, newId: ++id}));

    return res.send({status: 'OK', article: article});
});

router.put('/:id', async function (req, res, next) {
    let articles = await getArticles();
    let index = articles.findIndex(x => x.id == req.params.id);
    if (!index) {
        res.statusCode = 404;
        return res.send({error: 'Not found'});
    }
    else {
        articles[index] = {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            url: req.body.images,
            urlToImage: req.body.urlToImage
        };
        await writeFileAsync(filePath, JSON.stringify({articles: articles, newId: getNewId()}));
        return res.send({status: 'OK', article: article});
    }
});

router.delete('/:id', async function (req, res, next) {
    let articles = await getArticles();
    let id = getNewId();
    articles = articles.filter(x => x.id != req.params.id);
    await writeFileAsync(filePath, JSON.stringify({articles: articles, newId: id}));
    //return res.send({status: 'Delete OK', id: id});
    if (!articles) {
        res.statusCode = 404;
        return res.send({error: 'Not found'});
    }
    else {
        return res.send({status: 'OK', articles: articles});
    }

});

let getArticles = async function () {
    let content = await readFileAsync(filePath);
    let articles = JSON.parse(content).articles;
    return articles;
};

let getNewId = async function () {
    let content = await readFileAsync(filePath);
    let newId = JSON.parse(content).newId;
    return newId;
};

module.exports = router;
