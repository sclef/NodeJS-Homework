var articles = require('../entities/articles.js');
var express = require('express');
var router = express.Router();

/* GET news listing. */
router.get('/', function(req, res, next) {
  res.send(articles);
});

/* GET articles listing. */
router.get('/:id', function(req, res, next) {
    let article=articles.filter(x=>x.id==req.params.id)[0];
    if(!article) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
    }
    else {
        return res.send({ status: 'OK', article:article });
    }
  });

  router.post('/', function(req, res, next) {
    var article = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        url: req.body.images,
        urlToImage:req.body.urlToImage
    };
    articles.push(article);
    return res.send({ status: 'OK', article:article });
  });

  router.put('/:id', function(req, res, next) {
    let index=articles.findIndex(x=>x.id==req.params.id);
    if(!index) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
    }
    else {
        articles[index]={
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            url: req.body.images,
            urlToImage:req.body.urlToImage
        };
        return res.send({ status: 'OK', article:article });
    }
  });

  router.delete('/:id', function(req, res, next) {
    articles=articles.filter(x=>x.id!==req.params.id);
    if(!articles) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
    }
    else {
        return res.send({ status: 'OK', articles:articles });
    }
  });
  
module.exports = router;
