import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'; // Import Navigate component for navigation
import './CreateBlog.css'; // Import CSS file for form styling

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [submitted, setSubmitted] = useState(false); // State to track form submission

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title,
        body,
        author
      });

      console.log('New blog post created:', response.data);
      alert('New blog post created!'); // Display alert

      // Set submitted to true to trigger navigation
      setSubmitted(true);
    } catch (error) {
      console.error('Error creating new blog post:', error);
      alert('Error creating new blog post'); // Display alert for error
    }
  };

  // If form is submitted successfully, navigate to the home page
  if (submitted) {
    return <Navigate to="/" />;
  }

  return (
    <div className="form-container">
      <h2>Create a New Blog Post</h2>
      <form className="blog-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="body">Content:</label>
          <textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default CreateBlog;
