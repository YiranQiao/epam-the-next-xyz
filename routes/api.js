var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var _ = require('underscore');

var Article=mongoose.model('Portery');



// note that typically data would NOT be loaded from the filesystem in this manner :)

router.get('/articles', function(req, res, next) {

	/*var fs = require('fs');
	var obj;
	fs.readFile('./data/articles.json', 'utf8', function (err, data) {
	  if (err) throw err;
	  res.json(JSON.parse(data));
	});*/
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Header", "X-Requestd-With");

	Article.find({},null,{sort:{data:-1}},function(err,data){
		if(err) throw err;
		res.send(data);
	})
});


router.get('/articles/:id', function(req, res, next) {

	/*var fs = require('fs');
	var obj;
	fs.readFile('./data/articles.json', 'utf8', function (err, data) {
		if (err) throw err;

		data = _.filter(JSON.parse(data), function(item) {
		    return item.id == req.params.id;
		});
		res.json(data);*/



			Article.findById(req.params.id,function(err,article){
				if(!err){
					res.json(article);
				}
				else{
					console.log(err);
					res.send(404);
				}
			});

});


router.post('/articles', function(req, res, next) {
     console.log(req.body);

     var article = new Article(req.body);
     article.save(function(err, article) {
     	if (err) {
     		console.log(err);
     		// do something
        res.send(404);
     	}

     	 res.redirect('/dashboard');
     });

});



		module.exports = router;