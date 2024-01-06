const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    featured: { type: Boolean, default : false }, // Indicates if the post is featured
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of users who liked the post
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            text: { type: String, required: true },
        }
    ],
    // Other fields...
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;