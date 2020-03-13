var config = require('../configs/config');
var NewsAPI = require('newsapi');
var Article = require('../models/article');
var newsapi = new NewsAPI(config.newsApiKey); 

exports.news_list = function(req, res) {

    let newsConfig = {};

    if(req.query.sources){
    	newsConfig.sources = req.query.sources;
    } else {
        newsConfig.language = 'en';
    }

    if(req.query.pageNum){
    	newsConfig.page = req.query.pageNum;
    }

    if(req.query.pageSize){
    	newsConfig.pageSize = req.query.pageSize;
    }

    if(req.query.q){
        newsConfig.q = req.query.q;
    }

    newsapi.v2.topHeadlines(newsConfig).then(response => {
	  res.json(response);
	}); 
};

exports.news_source = function(req, res) {
    newsapi.v2.sources({
	  language: 'en',
	  country: 'us'
	}).then(response => {
	  res.json(response) 
	});
};