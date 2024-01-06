document.addEventListener('DOMContentLoaded', () => {
    const blogPostsList = document.getElementById('blogPostsList');
    const blogPostForm = document.getElementById('blogPostForm');
    
    // Event listener for form submission
    blogPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const formData = new FormData(blogPostForm);
        const title = formData.get('title');
        const content = formData.get('content');
        const authorId = formData.get('authorId');
    
        // Create a new blog post
        try {
          const response = await fetch('http://localhost:5000/api/blog-posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, authorId }),
          });
    
          if (response.ok) {
            console.log('Blog post created successfully.');
            blogPostForm.reset();
            await fetchBlogPosts();
          } else {
            const data = await response.json();
            console.error(data.error || 'Failed to create blog post.');
          }
        } catch (error) {
          console.error('Error creating blog post:', error);
        }
      });
  
    // Event listener for like button click
    blogPostsList.addEventListener('click', async (event) => {
      if (event.target.classList.contains('like-button')) {
        const blogPostId = event.target.dataset.blogPostId;
        const userId = prompt('Enter your user ID:'); // In a real app, use authentication
  
        try {
          const response = await fetch(`http://localhost:5000/api/blog-posts/${blogPostId}/like/${userId}`, {
            method: 'POST',
          });
  
          if (response.ok) {
            console.log('Post liked successfully.');
            await fetchBlogPosts();
          } else {
            const data = await response.json();
            console.error(data.error || 'Failed to like the post.');
          }
        } catch (error) {
          console.error('Error liking the post:', error);
        }
      }
    });
  
    // Event listener for commenting
    blogPostsList.addEventListener('submit', async (event) => {
      if (event.target.classList.contains('comment-form')) {
        event.preventDefault();
  
        const formData = new FormData(event.target);
        const blogPostId = formData.get('blogPostId');
        const userId = prompt('Enter your user ID:'); // In a real app, use authentication
        const text = formData.get('text');
  
        try {
          const response = await fetch(`http://localhost:5000/api/blog-posts/${blogPostId}/comment/${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
          });
  
          if (response.ok) {
            console.log('Comment added successfully.');
            await fetchBlogPosts();
          } else {
            const data = await response.json();
            console.error(data.error || 'Failed to add comment.');
          }
        } catch (error) {
          console.error('Error adding comment:', error);
        }
      }
    });
  
    // Fetch and display all blog posts
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blog-posts');
        const blogPosts = await response.json();
  
        // Clear the existing list
        blogPostsList.innerHTML = '';
  
        // Display the retrieved blog posts
        blogPosts.forEach((post) => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <strong>${post.title}</strong> by ${post.author.username}
            <br>
            ${post.content}
            <br>
            Likes: ${post.likes.length}
            <button class="like-button" data-blog-post-id="${post._id}">Like</button>
            <br>
            <form class="comment-form">
              <input type="hidden" name="blogPostId" value="${post._id}">
              <label for="text">Comment:</label>
              <input type="text" name="text" required>
              <button type="submit">Add Comment</button>
            </form>
            <ul>
              ${post.comments.map(comment => `<li>${comment.text} by ${comment.user.username}</li>`).join('')}
            </ul>
            <hr>
          `;
          blogPostsList.appendChild(listItem);
        });
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };
  
    // Initial fetch and display
    fetchBlogPosts();
  });