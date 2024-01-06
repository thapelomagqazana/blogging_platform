const express = require('express');
const blogPostController = require('../controllers/blogPostController');

const router = express.Router();

router.post('/blog-posts', blogPostController.createBlogPost);
router.get('/blog-posts', blogPostController.getAllBlogPosts);

module.exports = router;
