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
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import BlogPopup from "../components/BlogPopup";

const SingleBlog = ({ user }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await API.get("/blogs");
        const selected = data.data.find((b) => b._id === id);
        setBlog(selected);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  const isAuthor = user && blog.author?._id === user._id;

  return (
    <div className="single-blog-page">
      <h1>{blog.title}</h1>
      {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} />}
      <p>{blog.content}</p>
      <p className="author">✍️ {blog.author?.name}</p>

      {isAuthor && (
        <button
          className="edit-blog-btn"
          onClick={() => setShowEditPopup(true)}
        >
          ✏️ Edit
        </button>
      )}

      {showEditPopup && (
        <BlogPopup
          user={user}
          existingBlog={blog}
          onClose={() => setShowEditPopup(false)}
        />
      )}
    </div>
  );
};

export default SingleBlog;
