const express = require('express');
const blogPostController = require('../controllers/blogPostController');

const router = express.Router();

router.get('/featured-posts', blogPostController.getFeaturedPosts);

module.exports = router;
