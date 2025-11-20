// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";

// const ClientProfile = ({ user, setUser }) => {
//   const navigate = useNavigate();
//   const [client, setClient] = useState(null);
//   const [sessions, setSessions] = useState([]);
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingProfile, setEditingProfile] = useState(false);
//   const [profileData, setProfileData] = useState({});
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [activeTab, setActiveTab] = useState("profile");

//   useEffect(() => {
//     const fetchClient = async () => {
//       try {
//         const { data } = await API.get(`/users/${user._id}`);
//         setClient(data.data || user);
//         setProfileData({
//           name: data.data?.name || user.name,
//           bio: data.data?.bio || "",
//           contactNumber: data.data?.contactNumber || "",
//         });
//       } catch (err) {
//         setClient(user);
//       }
//     };
//     fetchClient();
//   }, [user]);

//   useEffect(() => {
//     const fetchSessions = async () => {
//       try {
//         const { data } = await API.get("/sessions/my-sessions");
//         const mySessions = data.data.filter((s) => s.client._id === user._id);
//         setSessions(mySessions);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSessions();
//   }, [user]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const { data } = await API.get("/blogs/my-blogs");
//         setBlogs(data.data || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   const handleProfileChange = (e) => {
//     setProfileData({ ...profileData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const submitProfileUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("name", profileData.name);
//       formData.append("bio", profileData.bio);
//       formData.append("contactNumber", profileData.contactNumber);
//       if (selectedFile) formData.append("profileImage", selectedFile);

//       const { data } = await API.put(`/users/update-profile/${user._id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setClient(data.data);
//       setUser(data.data);
//       setEditingProfile(false);
//       alert("Profile updated!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update profile.");
//     }
//   };

//   const handleDeleteBlog = async (id) => {
//     if (!window.confirm("Delete this blog?")) return;
//     try {
//       await API.delete(`/blogs/${id}`);
//       setBlogs(blogs.filter((b) => b._id !== id));
//       alert("Blog deleted!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete blog.");
//     }
//   };

//   if (loading) return <div className="text-center py-20">Loading...</div>;
//   if (!client) return <div className="text-center py-20">Client not found.</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Left Panel */}
//         <div className="md:w-1/3 bg-gradient-to-b from-indigo-200 to-indigo-100 p-6 rounded-3xl shadow-lg flex flex-col items-center">
//           <img
//             src={client.profileImage || "https://cdn-icons-png.flaticon.com/512/219/219969.png"}
//             alt="Profile"
//             className="w-32 h-32 rounded-full border-4 border-indigo-400 object-cover shadow-md"
//           />
//           <h2 className="mt-4 text-2xl font-bold text-indigo-700">{client.name}</h2>
//           <p className="text-gray-700 mt-1 capitalize">{client.role}</p>
//           <button
//             onClick={() => setEditingProfile(true)}
//             className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//           >
//             Edit Profile
//           </button>
//         </div>

//         {/* Right Panel */}
//         <div className="md:w-2/3 bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg p-6">
//           {/* Tabs */}
//           <div className="flex gap-4 border-b pb-2 mb-4">
//             {["profile", "blogs", "sessions"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`capitalize px-4 py-2 font-medium rounded-t-lg ${
//                   activeTab === tab
//                     ? "bg-indigo-600 text-white"
//                     : "text-indigo-700 hover:text-indigo-900"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           {/* Tab Content */}
//           {activeTab === "profile" && (
//             <div>
//               {!editingProfile ? (
//                 <div className="space-y-2">
//                   <p><strong>Bio:</strong> {client.bio || "-"}</p>
//                   <p><strong>Contact:</strong> {client.contactNumber || "-"}</p>
//                   <p><strong>Email:</strong> {client.email}</p>
//                 </div>
//               ) : (
//                 <form onSubmit={submitProfileUpdate} className="space-y-3">
//                   <input
//                     type="text"
//                     name="name"
//                     value={profileData.name}
//                     onChange={handleProfileChange}
//                     className="w-full p-2 border rounded"
//                     placeholder="Name"
//                   />
//                   <textarea
//                     name="bio"
//                     value={profileData.bio}
//                     onChange={handleProfileChange}
//                     className="w-full p-2 border rounded"
//                     placeholder="Bio"
//                   />
//                   <input
//                     type="text"
//                     name="contactNumber"
//                     value={profileData.contactNumber}
//                     onChange={handleProfileChange}
//                     className="w-full p-2 border rounded"
//                     placeholder="Contact Number"
//                   />
//                   <input type="file" onChange={handleFileChange} />
//                   <div className="flex gap-2">
//                     <button
//                       type="submit"
//                       className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                     >
//                       Save
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setEditingProfile(false)}
//                       className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               )}
//             </div>
//           )}

//           {activeTab === "blogs" && (
//             <div className="grid md:grid-cols-2 gap-4">
//               {blogs.length === 0 && <p className="text-gray-500">No blogs yet.</p>}
//               {blogs.map((blog) => (
//                 <div key={blog._id} className="border p-4 rounded shadow hover:shadow-md relative">
//                   <h3 className="font-semibold text-lg">{blog.title}</h3>
//                   <p className="text-gray-700 mt-1">{blog.content.slice(0, 100)}...</p>
//                   <div className="flex justify-between items-center mt-2">
//                     <span className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</span>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => navigate(`/blog/edit/${blog._id}`)}
//                         className="text-blue-600 hover:underline text-sm"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteBlog(blog._id)}
//                         className="text-red-600 hover:underline text-sm"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {activeTab === "sessions" && (
//             <div className="space-y-4">
//               {sessions.length === 0 && <p className="text-gray-500">No sessions booked yet.</p>}
//               {sessions.map((s) => (
//                 <div
//                   key={s._id}
//                   className="border p-4 rounded shadow hover:shadow-md transition flex justify-between items-center"
//                 >
//                   <div>
//                     <p><strong>Counselor:</strong> {s.counselor.name}</p>
//                     <p><strong>Date:</strong> {new Date(s.date).toLocaleString()}</p>
//                     <p><strong>Status:</strong> {s.status}</p>
//                     <p><strong>Payment:</strong> {s.paymentStatus}</p>
//                   </div>
//                   {s.status === "booked" && (
//                     <button
//                       onClick={() => navigate(`/counselor/${s.counselor._id}`)}
//                       className="bg-indigo-600 text-white py-1 px-3 rounded hover:bg-indigo-700"
//                     >
//                       View Counselor
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientProfile;
import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash } from "lucide-react";
import { toast } from "react-hot-toast";

const ClientProfile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

 
  useEffect(() => {
    if (!user || !user._id) return; // ⛔ stop API call if user id missing
  
    const fetchClient = async () => {
      try {
        const { data } = await API.get(`/users/${user._id}`);
        setClient(data.data || user);
        setProfileData({
          name: data.data?.name || user.name,
          bio: data.data?.bio || "",
          contactNumber: data.data?.contactNumber || "",
        });
      } catch (err) {
        console.error(err);
        setClient(user);
      }
    };
  
    fetchClient();
  }, [user]);
  

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await API.get("/blogs/my-blogs");
        setBlogs(data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const { data } = await API.get("/session/my-sessions");
        setSessions(data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSessions();
  }, []);

  const handleProfileChange = (e) =>
    setProfileData({ ...profileData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const submitProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("bio", profileData.bio);
      formData.append("contactNumber", profileData.contactNumber);
      if (selectedFile) formData.append("profileImage", selectedFile);

      const { data } = await API.put(
        `/users/update-profile/${user._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setClient(data.data);
      setUser(data.data);
      setEditingProfile(false);
      toast.success("Profile updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await API.delete(`/blogs/${id}`);
      setBlogs(blogs.filter((b) => b._id !== id));
      toast.success("Blog deleted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete blog.");
    }
  };

  if (!client) return 
  
  <div className="text-center py-20">Loading...</div>;

  const bookedSessions = sessions.filter((s) => s.status === "booked");
  const completedSessions = sessions.filter((s) => s.status === "completed");

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-4">
        <img
          src={client.profileImage || "https://cdn-icons-png.flaticon.com/512/219/219969.png"}
          alt="Avatar"
          className="w-32 h-32 rounded-full border-2 border-gray-200 object-cover shadow-md"
        />
        <h1 className="text-3xl font-bold text-gray-900">{client.name}</h1>
        <p className="text-gray-600 max-w-xl">{client.bio || "This user hasn't added a bio yet."}</p>
        <div className="flex items-center space-x-4 mt-2 text-gray-500 text-sm">
          <span>{client.email}</span>
          <span>{client.contactNumber || "No contact number"}</span>
          <button
            onClick={() => setEditingProfile(true)}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium"
          >
            <Edit2 size={16} /> Edit
          </button>
        </div>
      </div>

      {/* Stats Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-indigo-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-2xl font-bold text-indigo-600">{blogs.length}</h3>
          <p className="text-gray-600 mt-1">Blogs</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-2xl font-bold text-green-600">{bookedSessions.length}</h3>
          <p className="text-gray-600 mt-1">Booked Sessions</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-2xl font-bold text-yellow-600">{completedSessions.length}</h3>
          <p className="text-gray-600 mt-1">Completed Sessions</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 border-b pb-2">
        {["profile", "blogs", "sessions"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize px-4 py-2 font-medium rounded-t-lg ${
              activeTab === tab
                ? "bg-indigo-600 text-white"
                : "text-indigo-600 hover:text-indigo-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Profile */}
        {activeTab === "profile" && (
          <div>
            {!editingProfile ? (
              <div className="space-y-2 text-gray-700">
                <p><strong>Name:</strong> {client.name}</p>
                <p><strong>Bio:</strong> {client.bio || "-"}</p>
                <p><strong>Contact:</strong> {client.contactNumber || "-"}</p>
                <p><strong>Email:</strong> {client.email}</p>
              </div>
            ) : (
              <form
                onSubmit={submitProfileUpdate}
                className="bg-white p-6 rounded-xl shadow space-y-4 border max-w-xl mx-auto"
              >
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-300"
                  placeholder="Name"
                />
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-300"
                  placeholder="Bio"
                />
                <input
                  type="text"
                  name="contactNumber"
                  value={profileData.contactNumber}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-300"
                  placeholder="Contact Number"
                />
                <input type="file" onChange={handleFileChange} />
                <div className="flex space-x-4 mt-2">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 flex items-center gap-1"
                  >
                    <Edit2 size={16} /> Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProfile(false)}
                    className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Blogs */}
        {activeTab === "blogs" && (
          <div className="space-y-4">
            {blogs.length === 0 ? (
              <p className="text-gray-500">You haven't written any blogs yet.</p>
            ) : (
              blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="p-4 bg-white border rounded-xl shadow hover:shadow-md transition flex flex-col"
                >
                  <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
                  <p className="text-gray-600 mt-2">{blog.content.slice(0, 150)}...</p>
                  <div className="flex justify-between items-center mt-3 text-gray-500 text-sm">
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => navigate(`/blog/edit/${blog._id}`)}
                        className="flex items-center gap-1 text-indigo-600 hover:underline"
                      >
                        <Edit2 size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog._id)}
                        className="flex items-center gap-1 text-red-600 hover:underline"
                      >
                        <Trash size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Sessions */}
        {activeTab === "sessions" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700">Booked Sessions</h3>
            {bookedSessions.length === 0 ? (
              <p className="text-gray-500">No booked sessions.</p>
            ) : (
              bookedSessions.map((s) => (
                <div key={s._id} className="p-4 bg-white border rounded-xl shadow flex justify-between items-center">
                  <div>
                    <p><strong>Counselor:</strong> {s.counselor.name}</p>
                    <p><strong>Date:</strong> {new Date(s.date).toLocaleString()}</p>
                    <p><strong>Payment:</strong> {s.paymentStatus}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/counselor/${s.counselor._id}`)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    View Counselor
                  </button>
                </div>
              ))
            )}

            <h3 className="text-lg font-semibold text-gray-700 mt-6">Completed Sessions</h3>
            {completedSessions.length === 0 ? (
              <p className="text-gray-500">No completed sessions yet.</p>
            ) : (
              completedSessions.map((s) => (
                <div key={s._id} className="p-4 bg-gray-50 border rounded-xl shadow flex justify-between items-center">
                  <div>
                    <p><strong>Counselor:</strong> {s.counselor.name}</p>
                    <p><strong>Date:</strong> {new Date(s.date).toLocaleString()}</p>
                    <p><strong>Payment:</strong> {s.paymentStatus}</p>
                  </div>
                  <span className="text-green-600 font-medium">Completed</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientProfile;
