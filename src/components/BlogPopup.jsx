
// import React, { useState, useEffect } from "react";
// import API from "../api/api";
// import "../styles/BlogPopup.css"; // make new CSS file

// const BlogPopup = ({ user, counselor, existingBlog = null, onClose }) => {
//   const [blog, setBlog] = useState({
//     title: existingBlog?.title || "",
//     content: existingBlog?.content || "",
//     image: null,
//     preview: existingBlog?.image || null,
//   });

//   useEffect(() => {
//     if (existingBlog) {
//       setBlog({ 
//         title: existingBlog.title, 
//         content: existingBlog.content, 
//         preview: existingBlog.image || null 
//       });
//     }
//   }, [existingBlog]);

//   const handleChange = (e) => setBlog({ ...blog, [e.target.name]: e.target.value });

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setBlog({ ...blog, image: file, preview: URL.createObjectURL(file) });
//   };

//   const handleSubmit = async () => {
//     if (!blog.title || !blog.content) return alert("Title and content are required!");
//     try {
//       const formData = new FormData();
//       formData.append("title", blog.title);
//       formData.append("content", blog.content);
//       if (blog.image) formData.append("image", blog.image);

//       const token = localStorage.getItem("token");

//       if (existingBlog) {
//         await API.put(`/blogs/${existingBlog._id}`, formData, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       } else {
//         await API.post("/blogs", formData, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       }

//       alert("Blog saved successfully!");
//       onClose();
//       window.location.reload();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save blog");
//     }
//   };

//   return (
//     <div className="popup-overlay">
//       <div className="popup-box">
//         <div className="popup-header">
//           <h2>{existingBlog ? "Edit Blog" : `Write a Blog for ${counselor?.name || "Counselor"}`}</h2>
//           <button className="close-btn" onClick={onClose}>✖</button>
//         </div>

//         <input
//           name="title"
//           placeholder="Your Blog Title..."
//           value={blog.title}
//           onChange={handleChange}
//           className="blog-title-input"
//         />

//         {blog.preview && (
//           <div className="image-preview">
//             <img src={blog.preview} alt="preview" />
//           </div>
//         )}

//         <label className="upload-btn">
//           📸 Add Image
//           <input type="file" onChange={handleImageChange} hidden />
//         </label>

//         <textarea
//           name="content"
//           placeholder="Write your story..."
//           value={blog.content}
//           onChange={handleChange}
//           className="blog-content-textarea"
//         />

//         <div className="popup-actions">
//           <button className="cancel-btn" onClick={onClose}>Cancel</button>
//           <button className="publish-btn" onClick={handleSubmit}>
//             {existingBlog ? "Update Blog" : "Publish"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogPopup;


import React, { useState, useEffect } from "react";
import API from "../api/api";

const BlogPopup = ({ user, existingBlog = null, onClose, onSaved }) => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    image: null,
    preview: null,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (existingBlog) {
      setBlog({
        title: existingBlog.title || "",
        content: existingBlog.content || "",
        image: null,
        preview: existingBlog.imageUrl || null,
      });
    } else {
      setBlog({ title: "", content: "", image: null, preview: null });
    }
  }, [existingBlog]);

  const handleChange = (e) => setBlog({ ...blog, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBlog({ ...blog, image: file, preview: URL.createObjectURL(file) });
  };


  const handleSubmit = async () => {
    if (!blog.title.trim() || !blog.content.trim())
      return alert("Title and content are required");
  
    setSaving(true);
  
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
  
      formData.append("title", blog.title);
      formData.append("content", blog.content);
  
      // IMPORTANT: matched field name
      if (blog.image) formData.append("image", blog.image);
  
      if (existingBlog) {
        await API.put(`/blogs/${existingBlog._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await API.post("/blogs", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
  
      if (onSaved) onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save blog");
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-indigo-700">{existingBlog ? "Edit Blog" : "Write a Blog"}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✖</button>
        </div>

        <div className="p-6 space-y-4">
          <input
            name="title"
            value={blog.title}
            onChange={handleChange}
            placeholder="Blog title..."
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-200 outline-none"
          />

          {blog.preview && (
            <div className="rounded-lg overflow-hidden">
              <img src={blog.preview} alt="preview" className="w-full h-56 object-cover" />
            </div>
          )}

          <label className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg cursor-pointer">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3l-4 4-4-4" /></svg>
            <span className="text-sm">Add Image</span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>

          <textarea
            name="content"
            value={blog.content}
            onChange={handleChange}
            placeholder="Write your story..."
            rows="8"
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-200 outline-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : existingBlog ? "Update" : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPopup;
