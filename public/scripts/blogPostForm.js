document.addEventListener('DOMContentLoaded', () => {
    const blogPostForm = document.getElementById('blogPostForm');
    const blogPostsList = document.getElementById('blogPostsList');
  
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
          listItem.textContent = `${post.title} by ${post.author.username}`;
          blogPostsList.appendChild(listItem);
        });
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };
  
    // Initial fetch and display
    fetchBlogPosts();
  });