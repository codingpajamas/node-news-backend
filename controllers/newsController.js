const async = require("async");
const config = require('../configs/config');
const NewsAPI = require('newsapi');
const Article = require('../models/article');
const newsapi = new NewsAPI(config.newsApiKey); 

/*
* Endpoint to display Top Headline News
* @query sources
* @query pageNum
* @query pageSize
* @query q
* @return json
*/ 
exports.news_list = (req, res) => {
  let newsConfig = {};

  if(req.query.sources) {
  	newsConfig.sources = req.query.sources;
  } else {
      newsConfig.language = 'en';
  }

  if(req.query.pageNum) {
  	newsConfig.page = req.query.pageNum;
  }

  if(req.query.pageSize) {
  	newsConfig.pageSize = req.query.pageSize;
  }

  if(req.query.q) {
      newsConfig.q = req.query.q;
  }

  newsapi.v2.topHeadlines(newsConfig).then(response => {
    saveArticles(response.articles);
	  res.json(response);
	}); 
};

/*
* Endpoint to display News Sources
* For simplicity of this mini news app,
* only US source are included
* @return json
*/ 
exports.news_source = (req, res) => {
  newsapi.v2.sources({
	  language: 'en',
	  country: 'us'
	}).then(response => {
	  res.json(response) 
	});
};

/*
* Endpoint to display news articles saved from mongoDB
* @query pageNum
* @return json
*/ 
exports.news_from_atlas = (req, res) => {
    let pageNum = req.query.pageNum ? req.query.pageNum : 1;
    let limit = 10;
    let skip = (parseInt(pageNum) * limit) - limit;

    Article.find({}, {}, {skip:skip, limit:limit}, (err, articles) => {
      if(err){
          response = {"success":false, "message":err};
      }else{
          response = {"success":true, "message":'ok', articles: articles};
      } 

      res.json(response); 
    })
};

/*
* TODO: transfer this functionality in a QUEUE or job server
* This will save the articles to mongo in the background
* @return void
*/ 
function saveArticles(articles) {
    async.each(articles, (article, callback) => {
      Article.findOneAndUpdate({
        url: article.url
      }, {
        author: article.author,
        title: article.title,
        description: article.description,
        urlToImage: article.urlToImage,
        content: article.content,
        publishedAt: article.publishedAt
      }, {
        upsert: true
      }, (err, article) => {
        callback();
      }); 
    }, (err) => { 
      if( err ) {
        console.log('Unable to save some article ');
      } else {
        console.log('All articles are saved');
      }
    });
};

/*
* Remove all saved articles in mongoDB
* Please ignore this, or use it for cleanup when testing my exam
* @return json
*/ 
exports.delete_from_atlas = (req, res) => {
    Article.deleteMany({}, () => { 
      res.json({response:'deleted'}); 
    })
};