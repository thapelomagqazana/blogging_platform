const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    featured: { type: Boolean, default : false }, // Indicates if the post is featured
    // Other fields...
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;