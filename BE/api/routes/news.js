const express = require('express');
const router = express.Router();

const newsController = require('../controllers/news')

const checkAuth = require('../middleware/check-auth');

router.post('/published', checkAuth, newsController.news_get_all);
router.post('/', newsController.news_post);
router.post('/mysection', newsController.news_get_my_news);


module.exports = router;