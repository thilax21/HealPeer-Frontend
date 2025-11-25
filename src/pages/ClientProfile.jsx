


// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";
// import { Edit2, Trash } from "lucide-react";
// import { toast } from "react-hot-toast";




// const ClientProfile = () => {
//   const navigate = useNavigate();
//   const [client, setClient] = useState(null);
//   const [blogs, setBlogs] = useState([]);
//   const [sessions, setSessions] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [editingProfile, setEditingProfile] = useState(false);
//   const [profileData, setProfileData] = useState({});
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [activeTab, setActiveTab] = useState("profile");

//   const clientId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");
//   const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

//   // Fetch client profile
//   useEffect(() => {
//     if (!clientId) return;
  
//     const fetchClient = async () => {
//       try {
//         const { data } = await API.get(`/users/${clientId}`, {
//           headers: authHeaders,
//         });
  
//         setClient(data.data);
  
//         setProfileData({
//           name: data.data?.name || "",
//           bio: data.data?.bio || "",
//           contactNumber: data.data?.contactNumber || "",
//           profileImage: data.data?.profileImage || "",
//         });
  
//       } catch (err) {
//         console.error("Fetch client error:", err);
//       }
//     };
  
//     fetchClient();
//   }, [clientId]);
  

//   // Fetch user's blogs
//   // Fetch user's blogs
// useEffect(() => {
//   const fetchBlogs = async () => {
//     if (!token) return;
//     try {
//       const { data } = await API.get("/blogs/my-blogs", {
//         headers: authHeaders,
//       });
//       setBlogs(data.data || []);
//     } catch (err) {
//       console.error("Fetch blogs error:", err);
//       toast.error("Failed to load your blogs.");
//     }
//   };
//   fetchBlogs();
// }, [token]);


//   // Fetch sessions
//   useEffect(() => {
//     const fetchSessions = async () => {
//       if (!token) return;
//       try {
//         const { data } = await API.get(`/sessions/my-sessions`, { headers: authHeaders });
//         setSessions(data.data || []);
//       } catch (err) {
//         console.error("Fetch sessions error:", err);
//       }
//     };
//     fetchSessions();
//   }, [token]);

//   // Fetch bookings
//   useEffect(() => {
//     const fetchBookings = async () => {
//       if (!clientId || !token) return;
//       try {
//         const { data } = await API.get(`/booking/client/${clientId}`, { headers: authHeaders });
//         setBookings(data.bookings || []);
//       } catch (err) {
//         console.error("Fetch bookings error:", err);
//       }
//     };
//     fetchBookings();
//   }, [clientId, token]);

//   const handleProfileChange = (e) =>
//     setProfileData({ ...profileData, [e.target.name]: e.target.value });

//   const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

//   const submitProfileUpdate = async (e) => {
//     e.preventDefault();
//     if (!token) return toast.error("You are not authenticated");

//     try {
//       const formData = new FormData();
//       formData.append("name", profileData.name);
//       formData.append("bio", profileData.bio);
//       formData.append("contactNumber", profileData.contactNumber);
//       if (selectedFile) formData.append("profileImage", selectedFile);


//       const { data } = await API.put(`/profile/update`, formData, {
//         headers: { ...authHeaders, "Content-Type": "multipart/form-data" },
//       });
      
    
      

//       setClient(data.data);
//       setEditingProfile(false);
//       toast.success("Profile updated!");
//     } catch (err) {
//       console.error("Update profile error:", err);
//       toast.error("Failed to update profile.");
//     }
//   };

//   const handleDeleteBlog = async (id) => {
//     if (!window.confirm("Delete this blog?")) return;
//     try {
//       await API.delete(`/blogs/${id}`, { headers: authHeaders });
//       setBlogs(blogs.filter((b) => b._id !== id));
//       toast.success("Blog deleted!");
//     } catch (err) {
//       console.error("Delete blog error:", err);
//       toast.error("Failed to delete blog.");
//     }
//   };

//   if (!client) return <div className="text-center py-20">Loading profile...</div>;

//   const bookedSessions = sessions.filter((s) => s.status === "booked");
//   const completedSessions = sessions.filter((s) => s.status === "completed");

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-10">
//       {/* Header */}
//       <div className="flex flex-col items-center text-center space-y-4">
//         <img
//           src={client.profileImage || "https://cdn-icons-png.flaticon.com/512/219/219969.png"}
//           alt="Avatar"
//           className="w-32 h-32 rounded-full border-2 border-gray-200 object-cover shadow-md"
//         />
//         <h1 className="text-3xl font-bold text-gray-900">{client.name}</h1>
//         <p className="text-gray-600 max-w-xl">{client.bio || "This user hasn't added a bio yet."}</p>
//         <div className="flex items-center space-x-4 mt-2 text-gray-500 text-sm">
//           <span>{client.email}</span>
//           <span>{client.contactNumber || "No contact number"}</span>
//           <button
//             onClick={() => setEditingProfile(true)}
//             className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium"
//           >
//             <Edit2 size={16} /> Edit
//           </button>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
//         <div className="bg-indigo-50 p-6 rounded-xl shadow hover:shadow-md transition">
//           <h3 className="text-2xl font-bold text-indigo-600">{blogs.length}</h3>
//           <p className="text-gray-600 mt-1">Blogs</p>
//         </div>
//         <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition">
//           <h3 className="text-2xl font-bold text-green-600">{bookedSessions.length}</h3>
//           <p className="text-gray-600 mt-1">Booked Sessions</p>
//         </div>
//         <div className="bg-yellow-50 p-6 rounded-xl shadow hover:shadow-md transition">
//           <h3 className="text-2xl font-bold text-yellow-600">{completedSessions.length}</h3>
//           <p className="text-gray-600 mt-1">Completed Sessions</p>
//         </div>
//         <div className="bg-purple-50 p-6 rounded-xl shadow hover:shadow-md transition">
//           <h3 className="text-2xl font-bold text-purple-600">{bookings.length}</h3>
//           <p className="text-gray-600 mt-1">Bookings</p>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex justify-center gap-4 border-b pb-2">
//         {["profile", "blogs", "sessions", "bookings"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`capitalize px-4 py-2 font-medium rounded-t-lg ${
//               activeTab === tab ? "bg-indigo-600 text-white" : "text-indigo-600 hover:text-indigo-900"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div className="space-y-6">
//         {/* Profile Tab */}
//         {activeTab === "profile" && (
//           <div>
//             {!editingProfile ? (
//               <div className="space-y-2 text-gray-700">
//                 <p><strong>Name:</strong> {client.name}</p>
//                 <p><strong>Bio:</strong> {client.bio || "-"}</p>
//                 <p><strong>Contact:</strong> {client.contactNumber || "-"}</p>
//                 <p><strong>Email:</strong> {client.email}</p>
//               </div>
//             ) : (
//               <form onSubmit={submitProfileUpdate} className="bg-white p-6 rounded-xl shadow space-y-4 border max-w-xl mx-auto">
//                 <input type="text" name="name" value={profileData.name} onChange={handleProfileChange} className="w-full p-3 border rounded" placeholder="Name" />
//                 <textarea name="bio" value={profileData.bio} onChange={handleProfileChange} className="w-full p-3 border rounded" placeholder="Bio" />
//                 <input type="text" name="contactNumber" value={profileData.contactNumber} onChange={handleProfileChange} className="w-full p-3 border rounded" placeholder="Contact Number" />
//                 <input type="file" onChange={handleFileChange} />
//                 <div className="flex space-x-4 mt-2">
//                   <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 flex items-center gap-1">
//                     <Edit2 size={16} /> Save
//                   </button>
//                   <button type="button" onClick={() => setEditingProfile(false)} className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300">Cancel</button>
//                 </div>
//               </form>
//             )}
//           </div>
//         )}

//         {/* Blogs Tab */}
//         {activeTab === "blogs" && (
//           <div className="space-y-4">
//             {blogs.length === 0 ? (
//               <p className="text-gray-500">You haven't written any blogs yet.</p>
//             ) : blogs.map((blog) => (
//               <div key={blog._id} className="p-4 bg-white border rounded-xl shadow hover:shadow-md transition flex flex-col">
//                 <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
//                 <p className="text-gray-600 mt-2">{blog.content.slice(0, 150)}...</p>
//                 <div className="flex justify-between items-center mt-3 text-gray-500 text-sm">
//                   <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
//                   <div className="flex space-x-3">
//                     <button onClick={() => navigate(`/blog/edit/${blog._id}`)} className="flex items-center gap-1 text-indigo-600 hover:underline">
//                       <Edit2 size={14} /> Edit
//                     </button>
//                     <button onClick={() => handleDeleteBlog(blog._id)} className="flex items-center gap-1 text-red-600 hover:underline">
//                       <Trash size={14} /> Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Sessions & Bookings Tabs */}
//         {activeTab === "sessions" && (
//           <div className="space-y-6">
//             <h3 className="text-lg font-semibold text-gray-700">Booked Sessions</h3>
//             {bookedSessions.length === 0 ? <p className="text-gray-500">No booked sessions.</p> :
//               bookedSessions.map((s) => (
//                 <div key={s._id} className="p-4 bg-white border rounded-xl shadow flex justify-between items-center">
//                   <div>
//                     <p><strong>Counselor:</strong> {s.counselor.name}</p>
//                     <p><strong>Date:</strong> {new Date(s.date).toLocaleString()}</p>
//                     <p><strong>Payment:</strong> {s.paymentStatus}</p>
//                   </div>
//                   <button onClick={() => navigate(`/counselor/${s.counselor._id}`)} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">View Counselor</button>
//                 </div>
//               ))}
//           </div>
//         )}

//         {activeTab === "bookings" && (
//           <div className="space-y-6">
//             <h3 className="text-lg font-semibold text-gray-700">All Bookings</h3>
//             {bookings.length === 0 ? <p className="text-gray-500">No bookings yet.</p> :
//               bookings.map((b) => (
//                 <div key={b._id} className="p-5 bg-white border rounded-xl shadow flex flex-col md:flex-row justify-between items-center">
//                   <div>
//                     <p className="text-gray-800 font-semibold">Counselor: {b.counselorId?.name}</p>
//                     <p className="text-gray-600 mt-1">Date: {new Date(b.date).toLocaleDateString()}</p>
//                     <p className="text-gray-600 mt-1">Time: {b.time}</p>
//                     <p className="text-gray-600 mt-1">Duration: {b.durationMin} min</p>
//                     <p className="text-gray-600 mt-1">Amount: {(b.amount / 100).toFixed(2)} USD</p>
//                     <p className="text-gray-600 mt-1">Payment: {b.paymentStatus || "Pending"}</p>
//                     <p className="text-gray-600 mt-1">Notes: {b.notes}</p>
//                   </div>
//                   <span className={`mt-2 md:mt-0 font-medium ${b.status === "completed" ? "text-green-600" : b.status === "booked" ? "text-yellow-600" : "text-gray-500"}`}>
//                     {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
//                   </span>
//                 </div>
//               ))
//             }
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ClientProfile;


// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";
// import { Edit2, Trash } from "lucide-react";
// import { toast } from "react-hot-toast";

// const ClientProfile = () => {
//   const navigate = useNavigate();
//   const clientId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");

//   const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

//   const [client, setClient] = useState(null);
//   const [blogs, setBlogs] = useState([]);
//   const [sessions, setSessions] = useState([]);
//   const [bookings, setBookings] = useState([]);

//   const [editingProfile, setEditingProfile] = useState(false);
//   const [profileData, setProfileData] = useState({
//     name: "",
//     bio: "",
//     contactNumber: "",
//   });
//   const [selectedFile, setSelectedFile] = useState(null);

//   const [activeTab, setActiveTab] = useState("profile");

//   // -------------------------------
//   // Fetch Client Profile
//   // -------------------------------
//   useEffect(() => {
//     if (!clientId) return;

//     const fetchClient = async () => {
//       try {
//         const res = await API.get(`/users/${clientId}`, { headers: authHeaders });
//         setClient(res.data.data);

//         setProfileData({
//           name: res.data.data.name || "",
//           bio: res.data.data.bio || "",
//           contactNumber: res.data.data.contactNumber || "",
//         });
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load profile");
//       }
//     };

//     fetchClient();
//   }, [clientId]);

//   // -------------------------------
//   // Fetch Blogs
//   // -------------------------------
//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const res = await API.get("/blogs/my-blogs", { headers: authHeaders });
//         setBlogs(res.data.data || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   // -------------------------------
//   // Fetch Sessions
//   // -------------------------------
//   useEffect(() => {
//     const fetchSessions = async () => {
//       try {
//         const res = await API.get("/sessions/my-sessions", { headers: authHeaders });
//         setSessions(res.data.data || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchSessions();
//   }, []);

//   // -------------------------------
//   // Fetch Bookings
//   // -------------------------------
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await API.get(`/booking/client/${clientId}`, { headers: authHeaders });
//         setBookings(res.data.bookings || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchBookings();
//   }, []);

//   // -------------------------------
//   // Handle Inputs
//   // -------------------------------
//   const handleProfileChange = (e) => {
//     setProfileData({ ...profileData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   // -------------------------------
//   // Submit Profile Update
//   // -------------------------------
//   const submitProfileUpdate = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("name", profileData.name);
//       formData.append("bio", profileData.bio);
//       formData.append("contactNumber", profileData.contactNumber);

//       if (selectedFile) {
//         formData.append("profileImage", selectedFile);
//       }

//       const { data } = await API.put("/profile/update", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           ...authHeaders,
//         },
//       });
      
//       setClient(res.data.data);
//       setEditingProfile(false);
//       toast.success("Profile Updated!");

//     } catch (err) {
//       console.error(err);
//       toast.error("Error updating profile");
//     }
//   };

//   // -------------------------------
//   // Delete Blog
//   // -------------------------------
//   const handleDeleteBlog = async (id) => {
//     if (!window.confirm("Delete this blog permanently?")) return;

//     try {
//       await API.delete(`/blogs/${id}`, { headers: authHeaders });
//       setBlogs(blogs.filter((b) => b._id !== id));
//       toast.success("Blog deleted");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete");
//     }
//   };

//   if (!client) return <div className="text-center py-20">Loading...</div>;

//   const bookedSessions = sessions.filter((s) => s.status === "booked");
//   const completedSessions = sessions.filter((s) => s.status === "completed");

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-10">
      
//       {/* ---------------------------------- */}
//       {/* Header Profile */}
//       {/* ---------------------------------- */}
//       <div className="flex flex-col items-center text-center space-y-4">
        
//         <img
//           src={client.profileImage || "https://cdn-icons-png.flaticon.com/512/219/219969.png"}
//           alt="Avatar"
//           className="w-32 h-32 rounded-full border object-cover shadow-md"
//         />

//         <h1 className="text-3xl font-bold">{client.name}</h1>
//         <p className="text-gray-600 max-w-xl">{client.bio || "No bio added."}</p>

//         <div className="flex items-center space-x-4 text-sm text-gray-500">
//           <span>{client.email}</span>
//           <span>{client.contactNumber || "No contact"}</span>

//           <button
//             onClick={() => setEditingProfile(true)}
//             className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium"
//           >
//             <Edit2 size={16} /> Edit
//           </button>
//         </div>
//       </div>

//       {/* ---------------------------------- */}
//       {/* Stats */}
//       {/* ---------------------------------- */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
//         <StatBox label="Blogs" value={blogs.length} color="indigo" />
//         <StatBox label="Booked Sessions" value={bookedSessions.length} color="green" />
//         <StatBox label="Completed Sessions" value={completedSessions.length} color="yellow" />
//         <StatBox label="Bookings" value={bookings.length} color="purple" />
//       </div>

//       {/* ---------------------------------- */}
//       {/* Tabs */}
//       {/* ---------------------------------- */}
//       <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

//       {/* ---------------------------------- */}
//       {/* Tab Contents */}
//       {/* ---------------------------------- */}
//       <div className="space-y-6">

//         {activeTab === "profile" && (
//           !editingProfile ? (
//             <ProfileView client={client} />
//           ) : (
//             <ProfileForm
//               profileData={profileData}
//               handleProfileChange={handleProfileChange}
//               handleFileChange={handleFileChange}
//               submitProfileUpdate={submitProfileUpdate}
//               cancel={() => setEditingProfile(false)}
//             />
//           )
//         )}

//         {activeTab === "blogs" && (
//           <BlogsTab blogs={blogs} handleDeleteBlog={handleDeleteBlog} navigate={navigate} />
//         )}

//         {activeTab === "sessions" && (
//           <SessionsTab sessions={sessions} navigate={navigate} />
//         )}

//         {activeTab === "bookings" && (
//           <BookingsTab bookings={bookings} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ClientProfile;

// /* ------------------------------
//    Small Components Used Above
// ------------------------------ */

// const StatBox = ({ label, value, color }) => (
//   <div className={`bg-${color}-50 p-6 rounded-xl shadow`}>
//     <h3 className={`text-2xl font-bold text-${color}-600`}>{value}</h3>
//     <p className="text-gray-600">{label}</p>
//   </div>
// );

// const Tabs = ({ activeTab, setActiveTab }) => (
//   <div className="flex justify-center gap-4 border-b pb-2">
//     {["profile", "blogs", "sessions", "bookings"].map((tab) => (
//       <button
//         key={tab}
//         onClick={() => setActiveTab(tab)}
//         className={`capitalize px-4 py-2 font-medium rounded-t-lg ${
//           activeTab === tab
//             ? "bg-indigo-600 text-white"
//             : "text-indigo-600 hover:text-indigo-900"
//         }`}
//       >
//         {tab}
//       </button>
//     ))}
//   </div>
// );

// const ProfileView = ({ client }) => (
//   <div className="space-y-2 text-gray-700">
//     <p><strong>Name:</strong> {client.name}</p>
//     <p><strong>Bio:</strong> {client.bio || "-"}</p>
//     <p><strong>Contact:</strong> {client.contactNumber || "-"}</p>
//     <p><strong>Email:</strong> {client.email}</p>
//   </div>
// );

// const ProfileForm = ({ profileData, handleProfileChange, handleFileChange, submitProfileUpdate, cancel }) => (
//   <form onSubmit={submitProfileUpdate} className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto space-y-4">

//     <input
//       type="text"
//       name="name"
//       value={profileData.name}
//       onChange={handleProfileChange}
//       className="w-full p-3 border rounded"
//       placeholder="Name"
//     />

//     <textarea
//       name="bio"
//       value={profileData.bio}
//       onChange={handleProfileChange}
//       className="w-full p-3 border rounded"
//       placeholder="Bio"
//     />

//     <input
//       type="text"
//       name="contactNumber"
//       value={profileData.contactNumber}
//       onChange={handleProfileChange}
//       className="w-full p-3 border rounded"
//       placeholder="Contact Number"
//     />

//     <div>
//       <label className="font-semibold">Profile Image</label>
//       <input type="file" onChange={handleFileChange} className="mt-2" />
//     </div>

//     <div className="flex gap-4">
//       <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded flex items-center gap-1">
//         <Edit2 size={16} /> Save
//       </button>
//       <button type="button" onClick={cancel} className="bg-gray-200 px-6 py-2 rounded">
//         Cancel
//       </button>
//     </div>
//   </form>
// );

// const BlogsTab = ({ blogs, handleDeleteBlog, navigate }) => (
//   <div className="space-y-4">
//     {blogs.length === 0 ? (
//       <p className="text-gray-500">No blogs yet.</p>
//     ) : (
//       blogs.map((blog) => (
//         <div key={blog._id} className="bg-white p-4 border rounded shadow space-y-2">
//           <h3 className="text-xl font-bold">{blog.title}</h3>
//           <p className="text-gray-600">{blog.content.slice(0, 150)}...</p>

//           <div className="flex justify-between items-center text-gray-500">
//             <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
//             <div className="flex gap-3">
//               <button onClick={() => navigate(`/blog/edit/${blog._id}`)} className="text-indigo-600">Edit</button>
//               <button onClick={() => handleDeleteBlog(blog._id)} className="text-red-600">Delete</button>
//             </div>
//           </div>
//         </div>
//       ))
//     )}
//   </div>
// );

// const SessionsTab = ({ sessions, navigate }) => (
//   <div className="space-y-4">
//     {sessions.filter(s => s.status === "booked").map((s) => (
//       <div key={s._id} className="p-4 bg-white border rounded shadow flex justify-between">
//         <div>
//           <p><strong>Counselor:</strong> {s.counselor.name}</p>
//           <p><strong>Date:</strong> {new Date(s.date).toLocaleString()}</p>
//           <p><strong>Payment:</strong> {s.paymentStatus}</p>
//         </div>
//         <button
//           onClick={() => navigate(`/counselor/${s.counselor._id}`)}
//           className="bg-indigo-600 text-white px-4 py-2 rounded"
//         >
//           View
//         </button>
//       </div>
//     ))}
//   </div>
// );

// const BookingsTab = ({ bookings }) => (
//   <div className="space-y-4">
//     {bookings.map((b) => (
//       <div key={b._id} className="p-4 bg-white border rounded shadow">
//         <p><strong>Counselor:</strong> {b.counselorId?.name}</p>
//         <p><strong>Date:</strong> {new Date(b.date).toLocaleDateString()}</p>
//         <p><strong>Time:</strong> {b.time}</p>
//         <p><strong>Duration:</strong> {b.durationMin} min</p>
//         <p><strong>Amount:</strong> {(b.amount / 100).toFixed(2)} USD</p>
//         <p><strong>Status:</strong> {b.status}</p>
//       </div>
//     ))}
//   </div>
// );


// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";
// import { Edit2, Trash } from "lucide-react";
// import { toast } from "react-hot-toast";

// const BASE_URL = "http://localhost:3000"; // <-- Backend base URL

// const ClientProfile = () => {
//   const navigate = useNavigate();
//   const [client, setClient] = useState(null);
//   const [blogs, setBlogs] = useState([]);
//   const [sessions, setSessions] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [editingProfile, setEditingProfile] = useState(false);
//   const [profileData, setProfileData] = useState({});
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [activeTab, setActiveTab] = useState("profile");

//   const clientId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");
//   const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

//   // Fetch client profile
//   useEffect(() => {
//     if (!clientId) return;
//     const fetchClient = async () => {
//       try {
//         const { data } = await API.get(`/users/${clientId}`, { headers: authHeaders });
//         setClient(data.data);
//         setProfileData({
//           name: data.data?.name || "",
//           bio: data.data?.bio || "",
//           contactNumber: data.data?.contactNumber || "",
//           profileImage: data.data?.profileImage || "",
//         });
//       } catch (err) {
//         console.error("Fetch client error:", err);
//       }
//     };
//     fetchClient();
//   }, [clientId]);

//   // File input change
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedFile(file);

//     // Preview image immediately
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (ev) => {
//         setProfileData((prev) => ({ ...prev, profileImage: ev.target.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleProfileChange = (e) =>
//     setProfileData({ ...profileData, [e.target.name]: e.target.value });

//   // Submit updated profile
//   const submitProfileUpdate = async (e) => {
//     e.preventDefault();
//     if (!token) return toast.error("You are not authenticated");

//     try {
//       const formData = new FormData();
//       formData.append("name", profileData.name);
//       formData.append("bio", profileData.bio);
//       formData.append("contactNumber", profileData.contactNumber);
//       if (selectedFile) formData.append("profileImage", selectedFile);

//       const { data } = await API.put(`/users/update-profile/${clientId}`, formData, {
//         headers: { ...authHeaders, "Content-Type": "multipart/form-data" },
//       });

//       setClient(data.data);
//       setEditingProfile(false);
//       toast.success("Profile updated!");
//     } catch (err) {
//       console.error("Update profile error:", err);
//       toast.error("Failed to update profile.");
//     }
//   };

//   if (!client) return <div className="text-center py-20">Loading profile...</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-10">
//       {/* Header */}
//       <div className="flex flex-col items-center text-center space-y-4">
//         <img
//           src={
//             profileData.profileImage.startsWith("data:") // if preview from file
//               ? profileData.profileImage
//               : client.profileImage
//               ? `${BASE_URL}${client.profileImage}`
//               : "https://cdn-icons-png.flaticon.com/512/219/219969.png"
//           }
//           alt="Avatar"
//           className="w-32 h-32 rounded-full border-2 border-gray-200 object-cover shadow-md"
//         />
//         <h1 className="text-3xl font-bold text-gray-900">{client.name}</h1>
//         <p className="text-gray-600 max-w-xl">{client.bio || "This user hasn't added a bio yet."}</p>
//         <div className="flex items-center space-x-4 mt-2 text-gray-500 text-sm">
//           <span>{client.email}</span>
//           <span>{client.contactNumber || "No contact number"}</span>
//           <button
//             onClick={() => setEditingProfile(true)}
//             className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium"
//           >
//             <Edit2 size={16} /> Edit
//           </button>
//         </div>
//       </div>

//       {/* Profile Edit Form */}
//       {editingProfile && (
//         <form onSubmit={submitProfileUpdate} className="bg-white p-6 rounded-xl shadow space-y-4 border max-w-xl mx-auto">
//           <input
//             type="text"
//             name="name"
//             value={profileData.name}
//             onChange={handleProfileChange}
//             className="w-full p-3 border rounded"
//             placeholder="Name"
//           />
//           <textarea
//             name="bio"
//             value={profileData.bio}
//             onChange={handleProfileChange}
//             className="w-full p-3 border rounded"
//             placeholder="Bio"
//           />
//           <input
//             type="text"
//             name="contactNumber"
//             value={profileData.contactNumber}
//             onChange={handleProfileChange}
//             className="w-full p-3 border rounded"
//             placeholder="Contact Number"
//           />

//           <input type="file" onChange={handleFileChange} />
//           {selectedFile && (
//             <img
//               src={profileData.profileImage}
//               alt="Preview"
//               className="w-24 h-24 rounded-full object-cover mt-2"
//             />
//           )}

//           <div className="flex space-x-4 mt-2">
//             <button
//               type="submit"
//               className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 flex items-center gap-1"
//             >
//               <Edit2 size={16} /> Save
//             </button>
//             <button
//               type="button"
//               onClick={() => setEditingProfile(false)}
//               className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default ClientProfile;


import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash } from "lucide-react";
import { toast } from "react-hot-toast";

const ClientProfile = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  const clientId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  // Fetch client profile
  useEffect(() => {
    if (!clientId) return;

    const fetchClient = async () => {
      try {
        const { data } = await API.get(`/users/${clientId}`, {
          headers: authHeaders,
        });

        setClient(data.data);

        setProfileData({
          name: data.data.name || "",
          bio: data.data.bio || "",
          contactNumber: data.data.contactNumber || "",
          profileImage: data.data.profileImage || "",
        });

        setPreviewImage(
          data.data.profileImage
            ? `http://localhost:3000${data.data.profileImage}`
            : null
        );
      } catch (err) {
        console.error("Fetch client error:", err);
        toast.error("Failed to fetch profile.");
      }
    };

    fetchClient();
  }, [clientId]);

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      if (!token) return;
      try {
        const { data } = await API.get("/blogs/my-blogs", {
          headers: authHeaders,
        });
        setBlogs(data.data || []);
      } catch (err) {
        console.error("Fetch blogs error:", err);
        toast.error("Failed to load your blogs.");
      }
    };
    fetchBlogs();
  }, [token]);

  // Fetch sessions
  useEffect(() => {
    const fetchSessions = async () => {
      if (!token) return;
      try {
        const { data } = await API.get("/sessions/my-sessions", {
          headers: authHeaders,
        });
        setSessions(data.data || []);
      } catch (err) {
        console.error("Fetch sessions error:", err);
      }
    };
    fetchSessions();
  }, [token]);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (!clientId || !token) return;
      try {
        const { data } = await API.get(`/booking/client/${clientId}`, {
          headers: authHeaders,
        });
        setBookings(data.bookings || []);
      } catch (err) {
        console.error("Fetch bookings error:", err);
      }
    };
    fetchBookings();
  }, [clientId, token]);

  const handleProfileChange = (e) =>
    setProfileData({ ...profileData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const preview = URL.createObjectURL(file);
      setPreviewImage(preview);
    }
  };

  const submitProfileUpdate = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("You are not authenticated");

    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("bio", profileData.bio);
      formData.append("contactNumber", profileData.contactNumber);
      if (selectedFile) formData.append("profileImage", selectedFile);

      const { data } = await API.put(
        `/profile/update`,
        formData,
        {
          headers: { ...authHeaders, "Content-Type": "multipart/form-data" },
        }
      );

      setClient(data.data);
      setProfileData({
        name: data.data.name,
        bio: data.data.bio,
        contactNumber: data.data.contactNumber,
        profileImage: data.data.profileImage,
      });
      setPreviewImage(
        data.data.profileImage
          ? `http://localhost:3000${data.data.profileImage}`
          : null
      );
      setEditingProfile(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update profile error:", err);
      toast.error("Failed to update profile.");
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await API.delete(`/blogs/${id}`, { headers: authHeaders });
      setBlogs(blogs.filter((b) => b._id !== id));
      toast.success("Blog deleted!");
    } catch (err) {
      console.error("Delete blog error:", err);
      toast.error("Failed to delete blog.");
    }
  };

  if (!client)
    return <div className="text-center py-20">Loading profile...</div>;

  const bookedSessions = sessions.filter((s) => s.status === "booked");
  const completedSessions = sessions.filter((s) => s.status === "completed");

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-4">
        <img
          src={
            previewImage ||
            "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
          }
          alt="Avatar"
          className="w-32 h-32 rounded-full border-2 border-gray-200 object-cover shadow-md"
        />
        <h1 className="text-3xl font-bold text-gray-900">{client.name}</h1>
        <p className="text-gray-600 max-w-xl">
          {client.bio || "This user hasn't added a bio yet."}
        </p>
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        <div className="bg-indigo-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-2xl font-bold text-indigo-600">{blogs.length}</h3>
          <p className="text-gray-600 mt-1">Blogs</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-2xl font-bold text-green-600">
            {bookedSessions.length}
          </h3>
          <p className="text-gray-600 mt-1">Booked Sessions</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-2xl font-bold text-yellow-600">
            {completedSessions.length}
          </h3>
          <p className="text-gray-600 mt-1">Completed Sessions</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-2xl font-bold text-purple-600">{bookings.length}</h3>
          <p className="text-gray-600 mt-1">Bookings</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 border-b pb-2">
        {["profile", "blogs", "sessions", "bookings"].map((tab) => (
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
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div>
            {!editingProfile ? (
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Name:</strong> {client.name}
                </p>
                <p>
                  <strong>Bio:</strong> {client.bio || "-"}
                </p>
                <p>
                  <strong>Contact:</strong> {client.contactNumber || "-"}
                </p>
                <p>
                  <strong>Email:</strong> {client.email}
                </p>
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
                  className="w-full p-3 border rounded"
                  placeholder="Name"
                />
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded"
                  placeholder="Bio"
                />
                <input
                  type="text"
                  name="contactNumber"
                  value={profileData.contactNumber}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded"
                  placeholder="Contact Number"
                />
                <input type="file" onChange={handleFileChange} />
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-32 h-32 rounded-full object-cover mt-2 border"
                  />
                )}
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

        {/* Blogs Tab */}
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
                  <h3 className="text-xl font-semibold text-gray-800">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {blog.content.slice(0, 150)}...
                  </p>
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

        {/* Sessions & Bookings Tabs */}
        {activeTab === "sessions" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700">
              Booked Sessions
            </h3>
            {bookedSessions.length === 0 ? (
              <p className="text-gray-500">No booked sessions.</p>
            ) : (
              bookedSessions.map((s) => (
                <div
                  key={s._id}
                  className="p-4 bg-white border rounded-xl shadow flex justify-between items-center"
                >
                  <div>
                    <p>
                      <strong>Counselor:</strong> {s.counselor.name}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(s.date).toLocaleString()}
                    </p>
                    <p>
                      <strong>Payment:</strong> {s.paymentStatus}
                    </p>
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
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700">All Bookings</h3>
            {bookings.length === 0 ? (
              <p className="text-gray-500">No bookings yet.</p>
            ) : (
              bookings.map((b) => (
                <div
                  key={b._id}
                  className="p-5 bg-white border rounded-xl shadow flex flex-col md:flex-row justify-between items-center"
                >
                  <div>
                    <p className="text-gray-800 font-semibold">
                      Counselor: {b.counselorId?.name}
                    </p>
                    <p className="text-gray-600 mt-1">
                      Date: {new Date(b.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 mt-1">Time: {b.time}</p>
                    <p className="text-gray-600 mt-1">
                      Duration: {b.durationMin} min
                    </p>
                    <p className="text-gray-600 mt-1">
                      Amount: {(b.amount / 100).toFixed(2)} USD
                    </p>
                    <p className="text-gray-600 mt-1">
                      Payment: {b.paymentStatus || "Pending"}
                    </p>
                    <p className="text-gray-600 mt-1">Notes: {b.notes}</p>
                  </div>
                  <span
                    className={`mt-2 md:mt-0 font-medium ${
                      b.status === "completed"
                        ? "text-green-600"
                        : b.status === "booked"
                        ? "text-yellow-600"
                        : "text-gray-500"
                    }`}
                  >
                    {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                  </span>
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
