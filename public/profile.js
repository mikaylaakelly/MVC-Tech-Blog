
const newBlogFormHandler = async (event) => {
    event.preventDefault();
  
  
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
  
    
    const response = await fetch('/api/blogs/add', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create blog post');
    }
  };
  
 
  const updateBlogFormHandler = async (event) => {
    event.preventDefault();
  
    
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
    const id = document.querySelector('#blog-id').value.trim();
  
    
    const response = await fetch(`/api/blogs/post/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to update blog post');
    }
  };
  
  
  const deleteBlogHandler = async (id) => {
    
    const response = await fetch(`/api/blogs/post/${id}`, {
      method: 'DELETE',
    });
  
    
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete blog post');
    }
  };
  
  
  document.querySelector('#new-blog-form').addEventListener('submit', newBlogFormHandler);
  document.querySelector('#update-blog-form').addEventListener('submit', updateBlogFormHandler);
  document.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      deleteBlogHandler(id);
    });
  });