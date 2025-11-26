
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import API from "../api/api";
// import "../styles/Blog.css";

// const Blogs = ({ user }) => {
//   const [blogs, setBlogs] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const { data } = await API.get("/blogs/all");
//         setBlogs(data.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   const getFirstParagraph = (content) => {
//     const paragraphs = content.split("\n").filter(p => p.trim() !== "");
//     return paragraphs.length > 0 ? paragraphs[0] : content.slice(0, 100);
//   };

//   return (
//     <div className="blogs-list-page max-w-6xl mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-indigo-700">All Blogs</h1>
        
//         {/* Write Blog Button */}
//         {user && (
//           <button
//             onClick={() => navigate("/blogs/write")}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transition"
//           >
//             ✍️ Write Blog
//           </button>
//         )}
//       </div>

//       {/* Search & Categories */}
//       <div className="flex flex-col md:flex-row md:justify-between mb-6 gap-4">
//         <input
//           type="text"
//           placeholder="Search blogs..."
//           className="border p-2 rounded w-full md:w-1/2 focus:outline-indigo-400"
//         />
//         <div className="flex flex-wrap gap-2">
//           {["All", "Trending", "Tech", "Love", "Health", "Life"].map(cat => (
//             <span key={cat} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm cursor-pointer hover:bg-indigo-200">
//               {cat}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Blogs List */}
//       {blogs.length === 0 ? (
//         <p className="text-gray-500 text-center py-20">No blogs available.</p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {blogs.map(blog => (
//             <Link to={`/blogs/${blog._id}`} key={blog._id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden">
//               {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover" />}
//               <div className="p-4">
//                 <h3 className="text-xl font-semibold text-indigo-700 mb-2">{blog.title}</h3>
//                 <p className="text-gray-700 text-sm mb-3">{getFirstParagraph(blog.content)}...</p>
//                 <p className="text-gray-500 text-xs">✍️ {blog.author?.name} ({blog.author?.role})</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Blogs;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function BlogsWebsiteUI({ user }) {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await API.get("/blogs/all");
        setBlogs(data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(b =>
    (b.title || "").toLowerCase().includes(search.toLowerCase())
  );

  const getFirstParagraph = (content) => {
    const paragraphs = content.split("\n").filter(p => p.trim() !== "");
    return paragraphs.length > 0 ? paragraphs[0] : content.slice(0, 120);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          📝 Explore Blogs
        </h1>
        {user && (
          <button
            onClick={() => navigate('/blogs/write')}
            className="px-5 py-2.5 rounded-full bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 transition"
          >
            ✍️ Write Blog
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search blogs by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
      </div>

      {/* Blogs Grid */}
      {filteredBlogs.length === 0 ? (
        <p className="text-gray-500 text-center py-20 text-lg">No blogs found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map(blog => (
            <Link
              to={`/blogs/${blog._id}`}
              key={blog._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              {/* Image */}
              {blog.imageUrl ? (
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {getFirstParagraph(blog.content)}...
                </p>
                <div className="text-xs text-gray-500">
                  ✍️ {blog.author?.name || 'Unknown'}
                  <span className="text-indigo-600"> ({blog.author?.role || 'Author'})</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}