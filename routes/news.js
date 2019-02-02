var express = require('express');
var router = express.Router();
var newsController = require('../private/controllers/newsController');

router.get('/', newsController.getArticles);

router.get('/:id', newsController.getArticle);

router.post('/', newsController.createArticle);

router.put('/:id', newsController.updateArticle);

router.delete('/:id', newsController.deleteArticle);

module.exports = router;
