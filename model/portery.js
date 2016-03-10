'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema=new Schema({
  title:String,
  url:String,
  image:String,
  author:String,
  summary:String,
  date:Date
});

module.exports = mongoose.model('Portery', ArticleSchema);