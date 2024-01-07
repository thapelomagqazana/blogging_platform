

document.addEventListener('DOMContentLoaded', () => {
    const blogPostForm = document.getElementById('blogPostForm');

    
    var Delta = Quill.import('delta');
    // Initialize Quill with autosave
    var quill = new Quill('#editor', {
        modules: {
            toolbar: true
        },
        placeholder: 'Type your blog post here...',
        theme: 'snow'
    });

    // Store accumulated changes
    var change = new Delta();
    quill.on('text-change', function (delta) {
        change = change.compose(delta);
    });

    // Save periodically
    setInterval(function () {
    
        const title_1 = blogPostForm.querySelector('#title').value;
        const authorId_1 = blogPostForm.querySelector('#authorId').value;

        if (change.length() > 0) {
            console.log('Saving changes', change);

            var contents = quill.getContents();
            autosaveToServer(title_1, authorId_1, contents);

            change = new Delta();
        }
    }, 5 * 1000);

    // Check for unsaved data
    window.onbeforeunload = function () {
        if (change.length() > 0) {
            return 'There are unsaved changes. Are you sure you want to leave?';
        }
    }

    // Event listener for form submission
    blogPostForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const title = blogPostForm.querySelector('#title').value;
        const authorId = blogPostForm.querySelector('#authorId').value;
        const content = quill.root.innerHTML;

        // Check if title, authorId, and content are not empty
        if (!title || !authorId || !content) {
            alert('Title, Author ID, and Content cannot be empty.');
            return;
        }

        // Implement your logic to save the final content to the server
        saveToServer(title, authorId, content);
    });

    // Function to autosave content
    async function autosaveToServer(title, authorId, quillContents)
    {
        try {
            // Extract text content from Quill Delta
            const content = quillContents.ops.map(op => op.insert).join('\n');

            // Create an object to send to the server
            const postData = {
                title: title,
                authorId: authorId,
                content: content
            };

            const response = await fetch('http://localhost:5000/api/blog-posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                console.log('Blog post autosaved successfully.');
            } else {
                const data = await response.json();
                console.error(data.error || 'Failed to create blog post.');
            }
        } catch (error) {
            console.error('Error creating blog post:', error);
        }
    }

    // Function to save content to the server
    async function saveToServer(title, authorId, content) {
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
                window.location.href = '../index.html'; // Redirect to the homepage
            } else {
                const data = await response.json();
                console.error(data.error || 'Failed to create blog post.');
            }
        } catch (error) {
            console.error('Error creating blog post:', error);
        }
    }
});