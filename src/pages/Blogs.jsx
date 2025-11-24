
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/Blog.css";

const Blogs = ({ user }) => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await API.get("/blogs/all");
        setBlogs(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, []);

  const getFirstParagraph = (content) => {
    const paragraphs = content.split("\n").filter(p => p.trim() !== "");
    return paragraphs.length > 0 ? paragraphs[0] : content.slice(0, 100);
  };

  return (
    <div className="blogs-list-page max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">All Blogs</h1>
        
        {/* Write Blog Button */}
        {user && (
          <button
            onClick={() => navigate("/blogs/write")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transition"
          >
            ✍️ Write Blog
          </button>
        )}
      </div>

      {/* Search & Categories */}
      <div className="flex flex-col md:flex-row md:justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search blogs..."
          className="border p-2 rounded w-full md:w-1/2 focus:outline-indigo-400"
        />
        <div className="flex flex-wrap gap-2">
          {["All", "Trending", "Tech", "Love", "Health", "Life"].map(cat => (
            <span key={cat} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm cursor-pointer hover:bg-indigo-200">
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Blogs List */}
      {blogs.length === 0 ? (
        <p className="text-gray-500 text-center py-20">No blogs available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map(blog => (
            <Link to={`/blogs/${blog._id}`} key={blog._id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden">
              {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover" />}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">{blog.title}</h3>
                <p className="text-gray-700 text-sm mb-3">{getFirstParagraph(blog.content)}...</p>
                <p className="text-gray-500 text-xs">✍️ {blog.author?.name} ({blog.author?.role})</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
