const BlogPost = require('../models/BlogPost');
const User = require('../models/User');

exports.likeBlogPost = async (req, res) => {
    try
    {
        const userId = req.params.userId;
        const blogPostId = req.params.blogPostId;

        const user = await User.findById(userId);
        const blogPost = await BlogPost.findById(blogPostId);

        // Check if the user and blog post exist
        if (!user || !blogPost)
        {
            return res.status(404).json({ message: 'User or blog post not found.' });
        }

        // Check if the user has already liked the post
        if (blogPost.likes.includes(user._id))
        {
            return res.status(400).json({ message: 'User already liked this post.' });
        }

        // Add user to the list of likes
        blogPost.likes.push(user._id);
        await blogPost.save();

        res.json({ message: 'Post liked successfully.' });
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};

exports.commentOnBlogPost = async (req, res) => {
    try {
      const userId = req.params.userId;
      const blogPostId = req.params.blogPostId;
      const { text } = req.body;
  
      const user = await User.findById(userId);
      const blogPost = await BlogPost.findById(blogPostId);
  
      // Check if the user and blog post exist
      if (!user || !blogPost) {
        return res.status(404).json({ message: 'User or blog post not found.' });
      }
  
      // Add user's comment to the post
      blogPost.comments.push({ user: user._id, text });
      await blogPost.save();
  
      res.json({ message: 'Comment added successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

