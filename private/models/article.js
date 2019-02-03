var mongoose = require("mongoose");

var ArticlesSchema = new mongoose.Schema({
  title: 'string',
  author: 'string',
  description: 'string',
  url: 'string',
  urlToImage: 'string',
});

module.exports = mongoose.model('Article', ArticlesSchema); 