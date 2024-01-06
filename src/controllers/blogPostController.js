const BlogPost = require('../models/BlogPost');
const User = require('../models/User');

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

exports.createBlogPost = async (req, res) => {
    try {
      const { title, content, authorId } = req.body;
  
      // Check if the author exists
      const authorExists = await User.findById(authorId);
      if (!authorExists) {
        return res.status(404).json({ message: 'Author not found.' });
      }
  
      // Create a new blog post
      const newBlogPost = new BlogPost({ title, content, author: authorId });
      await newBlogPost.save();
  
      res.status(201).json({ message: 'Blog post created successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.getAllBlogPosts = async (req, res) => {
    try {
      const blogPosts = await BlogPost.find().populate('author', 'username');
  
      res.json(blogPosts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};





