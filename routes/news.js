var express = require('express');
var router = express.Router();
var news_controller = require('../controllers/newsController');

router.get('/', news_controller.news_list);
router.get('/source', news_controller.news_source);

module.exports = router;
