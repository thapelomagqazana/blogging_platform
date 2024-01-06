const express = require('express');
const blogPostInteractionController = require('../controllers/blogPostInteractionController');

const router = express.Router();

router.post('/blog-posts/:blogPostId/like/:userId', blogPostInteractionController.likeBlogPost);
router.post('/blog-posts/:blogPostId/comment/:userId', blogPostInteractionController.commentOnBlogPost);

module.exports = router;