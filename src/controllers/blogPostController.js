const BlogPost = require('../models/BlogPost');

exports.getFeaturedPosts = async (req, res) => {
    try
    {
        const featuredPosts = await BlogPost.find({ featured: true }).populate('author', 'username');

        res.json(featuredPosts);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};