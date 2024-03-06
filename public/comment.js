
async function submitComment(event) {
    event.preventDefault();
  
    const commentText = document.getElementById('comment-text').value.trim();
    const postId = document.getElementById('post-id').value;
  
    if (!commentText) {
      alert('Please enter a comment.');
      return;
    }
  
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ post_id: postId, comment_text: commentText }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to submit comment.');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('An error occurred while submitting the comment.');
    }
  }
  
  
  document.getElementById('comment-form').addEventListener('submit', submitComment);