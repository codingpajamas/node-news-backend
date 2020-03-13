var express = require('express');
var router = express.Router();
var news_controller = require('../controllers/newsController');

// define the available routes
router.get('/', news_controller.news_list);
router.get('/source', news_controller.news_source);
router.get('/from-db', news_controller.news_from_atlas);
router.get('/delete', news_controller.delete_from_atlas);

module.exports = router;
