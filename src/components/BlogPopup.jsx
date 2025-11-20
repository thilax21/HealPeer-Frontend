
import React, { useState, useEffect } from "react";
import API from "../api/api";
import "../styles/BlogPopup.css"; // make new CSS file

const BlogPopup = ({ user, counselor, existingBlog = null, onClose }) => {
  const [blog, setBlog] = useState({
    title: existingBlog?.title || "",
    content: existingBlog?.content || "",
    image: null,
    preview: existingBlog?.image || null,
  });

  useEffect(() => {
    if (existingBlog) {
      setBlog({ 
        title: existingBlog.title, 
        content: existingBlog.content, 
        preview: existingBlog.image || null 
      });
    }
  }, [existingBlog]);

  const handleChange = (e) => setBlog({ ...blog, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBlog({ ...blog, image: file, preview: URL.createObjectURL(file) });
  };

  const handleSubmit = async () => {
    if (!blog.title || !blog.content) return alert("Title and content are required!");
    try {
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("content", blog.content);
      if (blog.image) formData.append("image", blog.image);

      const token = localStorage.getItem("token");

      if (existingBlog) {
        await API.put(`/blogs/${existingBlog._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await API.post("/blogs", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      alert("Blog saved successfully!");
      onClose();
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to save blog");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <div className="popup-header">
          <h2>{existingBlog ? "Edit Blog" : `Write a Blog for ${counselor?.name || "Counselor"}`}</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        <input
          name="title"
          placeholder="Your Blog Title..."
          value={blog.title}
          onChange={handleChange}
          className="blog-title-input"
        />

        {blog.preview && (
          <div className="image-preview">
            <img src={blog.preview} alt="preview" />
          </div>
        )}

        <label className="upload-btn">
          📸 Add Image
          <input type="file" onChange={handleImageChange} hidden />
        </label>

        <textarea
          name="content"
          placeholder="Write your story..."
          value={blog.content}
          onChange={handleChange}
          className="blog-content-textarea"
        />

        <div className="popup-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="publish-btn" onClick={handleSubmit}>
            {existingBlog ? "Update Blog" : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPopup;
