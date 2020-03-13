var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
	author: String, 
	title: String, 
	description: String, 
	url: String, 
	urlToImage: String, 
	content: String, 
	publishedAt: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('Article', articleSchema);