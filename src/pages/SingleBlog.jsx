// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import API from "../api/api";

// const SingleBlog = ({ user }) => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [liked, setLiked] = useState(false);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const { data } = await API.get(`/blogs`);
//         const selected = data.data.find((b) => b._id === id);
//         setBlog(selected);

//         if (user && selected.likes?.includes(user._id)) {
//           setLiked(true); // Already liked
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchBlog();
//   }, [id, user]);

//   const handleLike = async () => {
//     if (!user) return alert("Please login to like blogs");
//     if (liked) return; // Prevent multiple likes

//     try {
//       const { data } = await API.post(`/blogs/${id}/like`);
//       setBlog(data.data);
//       setLiked(true);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!blog) return <p>Loading...</p>;

//   return (
//     <div className="single-blog-page">
//       <div className="blog-header">
//         <h1>{blog.title}</h1>
//         {user && (
//           <Link to="/blogs/write" className="write-btn">
//             ✍️ Write
//           </Link>
//         )}
//       </div>

//       {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} className="blog-image" />}
//       <p className="blog-content">{blog.content}</p>
//       <p className="author">✍️ {blog.author?.name} ({blog.author?.role})</p>

//       <button
//         className={`like-btn ${liked ? "liked" : ""}`}
//         onClick={handleLike}
//         disabled={liked}
//       >
//         👍 Like ({blog.likes?.length || 0})
//       </button>
//     </div>
//   );
// };

// export default SingleBlog;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import API from "../api/api";
// import BlogPopup from "../components/BlogPopup";

// const SingleBlog = ({ user }) => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [showEditPopup, setShowEditPopup] = useState(false);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const { data } = await API.get("/blogs");
//         const selected = data.data.find((b) => b._id === id);
//         setBlog(selected);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchBlog();
//   }, [id]);

//   if (!blog) return <p>Loading...</p>;

//   const isAuthor = user && blog.author?._id === user._id;

//   return (
//     <div className="single-blog-page">
//       <h1>{blog.title}</h1>
//       {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} />}
//       <p>{blog.content}</p>
//       <p className="author">✍️ {blog.author?.name}</p>

//       {isAuthor && (
//         <button
//           className="edit-blog-btn"
//           onClick={() => setShowEditPopup(true)}
//         >
//           ✏️ Edit
//         </button>
//       )}

//       {showEditPopup && (
//         <BlogPopup
//           user={user}
//           existingBlog={blog}
//           onClose={() => setShowEditPopup(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default SingleBlog;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api";
import BlogPopup from "../components/BlogPopup";

const SingleBlog = ({ user }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [liked, setLiked] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const fetchBlog = async () => {
    try {
      const { data } = await API.get(`/blogs/${id}`);
      setBlog(data.data);
      if (user && data.data.likes?.some(l => l === user._id || l._id === user._id)) setLiked(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line
  }, [id]);

  const handleLike = async () => {
    if (!user) return alert("Please login to like");
    if (liked) return;
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.post(`/blogs/${id}/like`, null, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlog(data.data);
      setLiked(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (!blog) return <div className="p-8 text-center">Loading...</div>;

  const isAuthor = user && blog.author && (blog.author._id === user._id || blog.author === user._id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">{blog.title}</h1>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <div>✍️ {blog.author?.name || "Unknown"}</div>
          <div>•</div>
          <div>{new Date(blog.createdAt).toLocaleString()}</div>
        </div>
      </div>

      {blog.imageUrl && (
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
          <img src={blog.imageUrl} alt={blog.title} className="w-full h-96 object-cover" />
        </div>
      )}

      <div className="prose max-w-none mb-8">
        {/* If you have content with newlines, preserve them */}
        {blog.content.split("\n").map((p, idx) => (
          <p key={idx} className="text-gray-700 leading-7">{p}</p>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleLike}
          disabled={liked}
          className={`px-4 py-2 rounded-lg border ${liked ? "bg-gray-100 text-gray-500" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
        >
          👍 {liked ? "Liked" : "Like"} ({blog.likes?.length || 0})
        </button>

        {isAuthor && (
          <button onClick={() => setShowEdit(true)} className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50">
            ✏️ Edit
          </button>
        )}

        <Link to="/blogs" className="ml-auto text-sm text-indigo-600 hover:underline">← Back to blogs</Link>
      </div>

      {showEdit && (
        <BlogPopup
          user={user}
          existingBlog={blog}
          onClose={() => { setShowEdit(false); fetchBlog(); }}
          onSaved={() => fetchBlog()}
        />
      )}
    </div>
  );
};

export default SingleBlog;
