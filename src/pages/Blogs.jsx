import React, { useEffect, useState } from "react";
import API from "../api/api";

const Blog = ({ user }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newBlog, setNewBlog] = useState({ title: "", content: "" });
  const [editBlogId, setEditBlogId] = useState(null);

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await API.get("/blogs"); // Public approved blogs
        setBlogs(data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  // Create blog
  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newBlog.title);
      formData.append("content", newBlog.content);
      if (newBlog.image) formData.append("image", newBlog.image);
  
      const { data } = await API.post("/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setBlogs([data.data, ...blogs]);
      setNewBlog({ title: "", content: "" });
    } catch (err) {
      console.error(err);
      alert("Creation failed");
    }
  }
  // Set blog for edit
  const handleEditInit = (blog) => {
    setEditBlogId(blog._id);
    setNewBlog({ title: blog.title, content: blog.content });
  };

  // Update blog
  const handleUpdate = async () => {
    try {
      const { data } = await API.put(`/blogs/${editBlogId}`, newBlog);
      setBlogs(
        blogs.map((b) => (b._id === editBlogId ? data.data : b))
      );
      setEditBlogId(null);
      setNewBlog({ title: "", content: "" });
      alert("Blog updated!");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  // Delete blog
  const handleDelete = async (id) => {
    try {
      await API.delete(`/blogs/${id}`);
      setBlogs(blogs.filter((b) => b._id !== id));
      alert("Blog deleted!");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (loading) return <p>Loading blogs...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Blogs</h2>

      {/* Create / Edit Form */}
      {user && (
        <div style={{ marginBottom: "20px" }}>
          <input
            placeholder="Title"
            name="title"
            value={newBlog.title}
            onChange={handleChange}
          />
          <textarea
            placeholder="Content"
            name="content"
            value={newBlog.content}
            onChange={handleChange}
          />
          {editBlogId ? (
            <button onClick={handleUpdate}>Update Blog</button>
          ) : (
            <button onClick={handleCreate}>Create Blog</button>
          )}
        </div>
      )}

      {/* Blog List */}
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id} style={{ marginBottom: "20px" }}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <input
  type="file"
  name="image"
  onChange={(e) => setNewBlog({ ...newBlog, image: e.target.files[0] })}
/>
            <p>
              <strong>Author:</strong> {blog.author.name} ({blog.author.role})
            </p>


            {/* Edit/Delete buttons only for owner or admin */}
            {user &&
              (user.role === "admin" || user._id === blog.author._id) && (
                <div>
                  <button onClick={() => handleEditInit(blog)}>Edit</button>
                  <button onClick={() => handleDelete(blog._id)}>Delete</button>
                </div>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;

