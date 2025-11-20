// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import { useParams } from "react-router-dom";
// import { Star, Video, Phone, MessageCircle, Calendar, MapPin } from "lucide-react";
// import PaymentButton from "./PaymentButton";

// const CounselorProfile = ({ user }) => {
//   const { id } = useParams();
//   const [counselor, setCounselor] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Booking Modal
//   const [bookingOpen, setBookingOpen] = useState(false);
//   const [bookingData, setBookingData] = useState({
//     sessionType: "",
//     duration: "",
//     date: "",
//     time: "",
//   });

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const { data } = await API.get(`/counselors/${id}`);
//         setCounselor(data.data);
//       } catch (err) {
//         console.error("Error loading profile:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [id]);

//   const handleBookingChange = (e) => {
//     setBookingData({ ...bookingData, [e.target.name]: e.target.value });
//   };

//   if (loading) return <div className="text-center py-20">Loading...</div>;
//   if (!counselor) return <div className="text-center py-20">Counselor not found.</div>;

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">

//       {/* Top Profile Section */}
//       <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl">
//         <div className="flex flex-col md:flex-row items-center gap-8">

//           {/* Profile Image */}
//           <img
//             src={
//               counselor.profileImage ||
//               "https://cdn-icons-png.flaticon.com/512/219/219969.png"
//             }
//             className="w-40 h-40 rounded-full border-4 border-indigo-300 object-cover shadow-md"
//           />

//           {/* Info */}
//           <div className="flex-1">
//             <h1 className="text-3xl font-bold text-indigo-700">
//               {counselor.name}
//             </h1>

//             <p className="text-lg text-gray-600 mt-1">
//               {counselor.specialization}
//             </p>

//             {/* Rating */}
//             <div className="flex items-center gap-2 mt-2">
//               <Star className="text-yellow-500" size={20} />
//               <span className="text-gray-700 text-sm">
//                 {counselor.rating || "4.8"} / 5.0
//               </span>
//             </div>

//             {/* Experience + Location */}
//             <div className="mt-3 text-gray-700 space-y-1">
//               <p><strong>Experience:</strong> {counselor.experience} Years</p>
//               <p className="flex items-center gap-2">
//                 <MapPin size={16} className="text-indigo-600" />
//                 Colombo, Sri Lanka
//               </p>
//             </div>

//             {/* Fee */}
//             <p className="mt-2 text-indigo-700 font-semibold text-xl">
//               ${counselor.sessionFee || 50} / Session
//             </p>

//             {/* Book Session Button */}
//             <button
//               onClick={() => setBookingOpen(true)}
//               className="mt-4 bg-indigo-600 text-white py-2 px-6 rounded-xl shadow hover:bg-indigo-700 transition"
//             >
//               Book a Session
//             </button>
//           </div>

//         </div>
//       </div>

//       {/* About Section */}
//       <div className="bg-white/70 backdrop-blur-xl p-8 mt-8 rounded-3xl shadow-xl">
//         <h2 className="text-2xl font-bold mb-3 text-indigo-700">About</h2>
//         <p className="text-gray-700 leading-relaxed">
//           {counselor.bio || "This counselor has not added a bio yet."}
//         </p>
//       </div>

//       {/* Specializations */}
//       <div className="bg-white/70 backdrop-blur-xl p-8 mt-8 rounded-3xl shadow-xl">
//         <h2 className="text-2xl font-bold mb-3 text-indigo-700">Specializations</h2>
//         <div className="flex flex-wrap gap-3">
//           {counselor.specialties?.length > 0 ? (
//             counselor.specialties.map((s, i) => (
//               <span
//                 key={i}
//                 className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl text-sm shadow-sm"
//               >
//                 {s}
//               </span>
//             ))
//           ) : (
//             <p className="text-gray-500">No specializations added.</p>
//           )}
//         </div>
//       </div>

//       {/* Session Types */}
//       <div className="bg-white/70 backdrop-blur-xl p-8 mt-8 rounded-3xl shadow-xl">
//         <h2 className="text-2xl font-bold mb-3 text-indigo-700">Session Types</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">

//           <div className="p-5 bg-white shadow rounded-xl flex flex-col items-center">
//             <Video className="text-indigo-600" size={40} />
//             <p className="mt-2 font-medium">Video Call</p>
//           </div>

//           <div className="p-5 bg-white shadow rounded-xl flex flex-col items-center">
//             <Phone className="text-green-600" size={40} />
//             <p className="mt-2 font-medium">Voice Call</p>
//           </div>

//           <div className="p-5 bg-white shadow rounded-xl flex flex-col items-center">
//             <MessageCircle className="text-blue-600" size={40} />
//             <p className="mt-2 font-medium">Live Chat</p>
//           </div>

//         </div>
//       </div>

//       {/* Reviews */}
//       <div className="bg-white/70 backdrop-blur-xl p-8 mt-8 rounded-3xl shadow-xl">
//         <h2 className="text-2xl font-bold mb-3 text-indigo-700">Reviews</h2>
//         <p className="text-gray-500">Reviews feature coming soon…</p>
//       </div>

//       {/* Booking Modal */}
//       {bookingOpen && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
//           <div className="bg-white rounded-2xl p-6 w-[380px] shadow-2xl">

//             <h3 className="text-xl font-bold mb-3 text-indigo-700">
//               Book Session with {counselor.name}
//             </h3>

//             <div className="space-y-4">

//               <select
//                 name="sessionType"
//                 className="border w-full p-2 rounded-xl"
//                 value={bookingData.sessionType}
//                 onChange={handleBookingChange}
//               >
//                 <option value="">Session Type</option>
//                 <option value="video">Video Call</option>
//                 <option value="audio">Voice Call</option>
//                 <option value="chat">Live Chat</option>
//               </select>

//               <select
//                 name="duration"
//                 className="border w-full p-2 rounded-xl"
//                 value={bookingData.duration}
//                 onChange={handleBookingChange}
//               >
//                 <option value="">Duration</option>
//                 <option value="30">30 Minutes</option>
//                 <option value="60">1 Hour</option>
//               </select>

//               <input
//                 type="date"
//                 name="date"
//                 className="border w-full p-2 rounded-xl"
//                 value={bookingData.date}
//                 onChange={handleBookingChange}
//               />

//               <input
//                 type="time"
//                 name="time"
//                 className="border w-full p-2 rounded-xl"
//                 value={bookingData.time}
//                 onChange={handleBookingChange}
//               />

//               {/* Payment */}
//               {bookingData.sessionType &&
//               bookingData.duration &&
//               bookingData.date &&
//               bookingData.time ? (
//                 <PaymentButton
//                   amount={counselor.sessionFee || 50}
//                   counselorId={counselor._id}
//                   booking={bookingData}
//                 />
//               ) : (
//                 <p className="text-red-500 text-sm">
//                   Fill all fields to continue
//                 </p>
//               )}

//             </div>

//             <button
//               onClick={() => setBookingOpen(false)}
//               className="mt-4 w-full bg-gray-300 p-2 rounded-xl hover:bg-gray-400"
//             >
//               Close
//             </button>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default CounselorProfile;
// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import { useParams } from "react-router-dom";
// import { Star, MapPin } from "lucide-react";

// const CounselorProfile = ({ user, setUser, setCounselors }) => {
//   const { id } = useParams();
//   const [counselor, setCounselor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     bio: "",
//     specialization: "",
//     sessionFee: "",
//     profileImage: "",
//     specialties: [],
//   });

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const { data } = await API.get(`/counselors/${id}`);
//         setCounselor(data.data);
//         setForm({
//           name: data.data.name,
//           bio: data.data.bio,
//           specialization: data.data.specialization,
//           sessionFee: data.data.sessionFee,
//           profileImage: data.data.profileImage,
//           specialties: data.data.specialties || [],
//         });
//       } catch (err) {
//         console.error("Error loading profile:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [id]);

//   if (loading) return <div className="text-center py-20">Loading...</div>;
//   if (!counselor) return <div className="text-center py-20">Counselor not found.</div>;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setForm({ ...form, profileImage: reader.result });
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       const { data } = await API.put(`/counselors/${user._id}`, {
//         ...form,
//         specialties: form.specialties.map(s => s.trim()),
//       });

//       alert("Profile updated successfully!");

//       // Update user state
//       if (setUser) setUser({ ...user, ...form });

//       // Update counselors list
//       if (setCounselors) {
//         setCounselors(prev => prev.map(c => c._id === user._id ? { ...c, ...form } : c));
//       }

//       setEditing(false);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update profile.");
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">
//       <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl">
//         <div className="flex flex-col md:flex-row items-center gap-8">
//           {/* Profile Image */}
//           <div className="relative">
//             <img
//               src={form.profileImage || "https://cdn-icons-png.flaticon.com/512/219/219969.png"}
//               className="w-40 h-40 rounded-full border-4 border-indigo-300 object-cover shadow-md"
//             />
//             {editing && (
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="absolute bottom-0 right-0 w-10 h-10 opacity-70 cursor-pointer"
//               />
//             )}
//           </div>

//           {/* Info */}
//           <div className="flex-1">
//             {editing ? (
//               <>
//                 <input
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   className="border p-2 rounded w-full mb-2"
//                 />
//                 <input
//                   name="specialization"
//                   value={form.specialization}
//                   onChange={handleChange}
//                   className="border p-2 rounded w-full mb-2"
//                   placeholder="Specialization"
//                 />
//                 <input
//                   name="sessionFee"
//                   type="number"
//                   value={form.sessionFee}
//                   onChange={handleChange}
//                   className="border p-2 rounded w-full mb-2"
//                   placeholder="Session Fee"
//                 />
//               </>
//             ) : (
//               <>
//                 <h1 className="text-3xl font-bold text-indigo-700">{form.name}</h1>
//                 <p className="text-lg text-gray-600 mt-1">{form.specialization}</p>
//               </>
//             )}

//             <div className="flex items-center gap-2 mt-2">
//               <Star className="text-yellow-500" size={20} />
//               <span className="text-gray-700 text-sm">{counselor.rating || "4.8"} / 5.0</span>
//             </div>

//             <div className="mt-3 text-gray-700 space-y-1">
//               <p><strong>Experience:</strong> {counselor.experience} Years</p>
//               <p className="flex items-center gap-2">
//                 <MapPin size={16} className="text-indigo-600" />
//                 Colombo, Sri Lanka
//               </p>
//             </div>

//             <p className="mt-2 text-indigo-700 font-semibold text-xl">
//               ${form.sessionFee || 50} / Session
//             </p>

//             {user._id === id && (
//               <div className="mt-4 flex gap-2">
//                 {editing ? (
//                   <>
//                     <button
//                       onClick={handleSubmit}
//                       className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={() => setEditing(false)}
//                       className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400"
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     onClick={() => setEditing(true)}
//                     className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
//                   >
//                     Edit Profile
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* About / Bio */}
//       <div className="bg-white/70 backdrop-blur-xl p-8 mt-8 rounded-3xl shadow-xl">
//         <h2 className="text-2xl font-bold mb-3 text-indigo-700">About</h2>
//         {editing ? (
//           <textarea
//             name="bio"
//             value={form.bio}
//             onChange={handleChange}
//             className="border p-2 rounded w-full"
//             rows={5}
//           />
//         ) : (
//           <p className="text-gray-700 leading-relaxed">{form.bio || "No bio added yet."}</p>
//         )}
//       </div>

//       {/* Specialties */}
//       <div className="bg-white/70 backdrop-blur-xl p-8 mt-8 rounded-3xl shadow-xl">
//         <h2 className="text-2xl font-bold mb-3 text-indigo-700">Specializations</h2>
//         {editing ? (
//           <input
//             name="specialties"
//             value={form.specialties.join(", ")}
//             onChange={(e) =>
//               setForm({ ...form, specialties: e.target.value.split(",") })
//             }
//             className="border p-2 rounded w-full"
//             placeholder="Separate with commas"
//           />
//         ) : (
//           <div className="flex flex-wrap gap-3">
//             {form.specialties.length > 0 ? (
//               form.specialties.map((s, i) => (
//                 <span key={i} className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl text-sm shadow-sm">
//                   {s}
//                 </span>
//               ))
//             ) : (
//               <p className="text-gray-500">No specializations added.</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CounselorProfile;
// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import { useParams } from "react-router-dom";
// import { Star, MapPin } from "lucide-react";

// const CounselorProfile = ({ user }) => {
//   const { id } = useParams();
//   const [counselor, setCounselor] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     bio: "",
//     specialties: [],
//     sessionFee: "",
//     profileImage: "",
//   });

//   const [previewImage, setPreviewImage] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const { data } = await API.get(`/counselors/${id}`);
//         setCounselor(data.data);

//         // Initialize formData
//         setFormData({
//           name: data.data.name || "",
//           bio: data.data.bio || "",
//           specialties: data.data.specialties || [],
//           sessionFee: data.data.sessionFee || 50,
//           profileImage: data.data.profileImage || "",
//         });
//       } catch (err) {
//         console.error("Error loading profile:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSpecialtiesChange = (e) => {
//     const value = e.target.value.split(",").map((s) => s.trim());
//     setFormData((prev) => ({ ...prev, specialties: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPreviewImage(URL.createObjectURL(file));
//       setFormData((prev) => ({ ...prev, profileImage: file }));
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const updateData = new FormData();
//       updateData.append("name", formData.name);
//       updateData.append("bio", formData.bio);
//       updateData.append("specialties", JSON.stringify(formData.specialties));
//       updateData.append("sessionFee", formData.sessionFee);
//       if (formData.profileImage instanceof File) {
//         updateData.append("profileImage", formData.profileImage);
//       }

//       const { data } = await API.put(`/counselors/${id}`, updateData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setCounselor(data.data);
//       setEditing(false);
//       alert("Profile updated successfully!");
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       alert("Failed to update profile.");
//     }
//   };

//   if (loading) return <div className="text-center py-20">Loading...</div>;
//   if (!counselor) return <div className="text-center py-20">Counselor not found.</div>;

//   const isOwnProfile = user && user.role === "counselor" && user._id === counselor._id;

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">

//       <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl">
//         <div className="flex flex-col md:flex-row items-center gap-8">

//           {/* Profile Image */}
//           <div className="relative">
//             <img
//               src={previewImage || counselor.profileImage || "https://cdn-icons-png.flaticon.com/512/219/219969.png"}
//               className="w-40 h-40 rounded-full border-4 border-indigo-300 object-cover shadow-md"
//             />
//             {editing && (
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="absolute bottom-0 right-0 opacity-0 w-full h-full cursor-pointer"
//               />
//             )}
//           </div>

//           {/* Info */}
//           <div className="flex-1">
//             {editing ? (
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="border p-2 w-full rounded mb-2"
//               />
//             ) : (
//               <h1 className="text-3xl font-bold text-indigo-700">{counselor.name}</h1>
//             )}

//             {editing ? (
//               <input
//                 type="number"
//                 name="sessionFee"
//                 value={formData.sessionFee}
//                 onChange={handleChange}
//                 className="border p-2 w-32 rounded mt-1"
//               />
//             ) : (
//               <p className="mt-2 text-indigo-700 font-semibold text-xl">
//                 ${counselor.sessionFee || 50} / Session
//               </p>
//             )}

//             <div className="mt-3 text-gray-700 space-y-1">
//               <p><strong>Experience:</strong> {counselor.experience} Years</p>
//               <p className="flex items-center gap-2">
//                 <MapPin size={16} className="text-indigo-600" />
//                 Colombo, Sri Lanka
//               </p>
//             </div>

//             {/* Edit button */}
//             {isOwnProfile && (
//               <div className="mt-4 flex gap-2">
//                 {editing ? (
//                   <>
//                     <button onClick={handleSave} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
//                       Save
//                     </button>
//                     <button onClick={() => setEditing(false)} className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400">
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <button onClick={() => setEditing(true)} className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
//                     Edit Profile
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>

//         </div>
//       </div>

//       {/* About */}
//       <div className="bg-white/70 backdrop-blur-xl p-8 mt-8 rounded-3xl shadow-xl">
//         <h2 className="text-2xl font-bold mb-3 text-indigo-700">About</h2>
//         {editing ? (
//           <textarea
//             name="bio"
//             value={formData.bio}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             rows={4}
//           />
//         ) : (
//           <p className="text-gray-700 leading-relaxed">{counselor.bio || "No bio added."}</p>
//         )}
//       </div>

//       {/* Specialties */}
//       <div className="bg-white/70 backdrop-blur-xl p-8 mt-8 rounded-3xl shadow-xl">
//         <h2 className="text-2xl font-bold mb-3 text-indigo-700">Specialties</h2>
//         {editing ? (
//           <input
//             type="text"
//             value={formData.specialties.join(", ")}
//             onChange={handleSpecialtiesChange}
//             className="border p-2 w-full rounded"
//             placeholder="Comma separated"
//           />
//         ) : (
//           <div className="flex flex-wrap gap-3">
//             {counselor.specialties?.length > 0 ? (
//               counselor.specialties.map((s, i) => (
//                 <span key={i} className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl text-sm shadow-sm">{s}</span>
//               ))
//             ) : (
//               <p className="text-gray-500">No specialties added.</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CounselorProfile;

// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import { useParams, useNavigate } from "react-router-dom";
// import { Star, MapPin } from "lucide-react";

// const CounselorProfile = ({ user }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [counselor, setCounselor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [blogs, setBlogs] = useState([]);

//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     bio: "",
//     specialties: [],
//     sessionFee: "",
//     profileImage: "",
//   });
//   const [previewImage, setPreviewImage] = useState(null);

//   // Fetch counselor profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const { data } = await API.get(`/counselors/${id}`);
//         setCounselor(data.data);
//         setFormData({
//           name: data.data.name || "",
//           bio: data.data.bio || "",
//           specialties: data.data.specialties || [],
//           sessionFee: data.data.sessionFee || 50,
//           profileImage: data.data.profileImage || "",
//         });
//       } catch (err) {
//         console.error("Error loading profile:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [id]);

//   // Fetch counselor's blogs
//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const { data } = await API.get(`/blogs/counselor/${id}`); // Backend route: GET blogs by counselor
//         setBlogs(data.data);
//       } catch (err) {
//         console.error("Error fetching blogs:", err);
//       }
//     };
//     fetchBlogs();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSpecialtiesChange = (e) => {
//     const value = e.target.value.split(",").map((s) => s.trim());
//     setFormData((prev) => ({ ...prev, specialties: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPreviewImage(URL.createObjectURL(file));
//       setFormData((prev) => ({ ...prev, profileImage: file }));
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const updateData = new FormData();
//       updateData.append("name", formData.name);
//       updateData.append("bio", formData.bio);
//       updateData.append("specialties", JSON.stringify(formData.specialties));
//       updateData.append("sessionFee", formData.sessionFee);
//       if (formData.profileImage instanceof File) {
//         updateData.append("profileImage", formData.profileImage);
//       }

//       const { data } = await API.put(`/counselors/${id}`, updateData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setCounselor(data.data);
//       setEditing(false);
//       alert("Profile updated successfully!");
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       alert("Failed to update profile.");
//     }
//   };

//   const isOwnProfile = user && user.role === "counselor" && user._id === counselor?._id;

//   const handleDeleteBlog = async (blogId) => {
//     if (!window.confirm("Are you sure you want to delete this blog?")) return;
//     try {
//       await API.delete(`/blogs/${blogId}`);
//       setBlogs((prev) => prev.filter((b) => b._id !== blogId));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete blog.");
//     }
//   };

//   if (loading) return <div className="text-center py-20">Loading...</div>;
//   if (!counselor) return <div className="text-center py-20">Counselor not found.</div>;

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">

//       {/* Profile Section */}
//       <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl">
//         <div className="flex flex-col md:flex-row items-center gap-8">
//           <div className="relative">
//             <img
//               src={previewImage || counselor.profileImage || "https://cdn-icons-png.flaticon.com/512/219/219969.png"}
//               className="w-40 h-40 rounded-full border-4 border-indigo-300 object-cover shadow-md"
//             />
//             {editing && (
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="absolute bottom-0 right-0 opacity-0 w-full h-full cursor-pointer"
//               />
//             )}
//           </div>

//           <div className="flex-1">
//             {editing ? (
//               <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full rounded mb-2" />
//             ) : (
//               <h1 className="text-3xl font-bold text-indigo-700">{counselor.name}</h1>
//             )}

//             {editing ? (
//               <input type="number" name="sessionFee" value={formData.sessionFee} onChange={handleChange} className="border p-2 w-32 rounded mt-1" />
//             ) : (
//               <p className="mt-2 text-indigo-700 font-semibold text-xl">${counselor.sessionFee || 50} / Session</p>
//             )}

//             <div className="mt-3 text-gray-700 space-y-1">
//               <p><strong>Experience:</strong> {counselor.experience} Years</p>
//               <p className="flex items-center gap-2"><MapPin size={16} className="text-indigo-600" />Colombo, Sri Lanka</p>
//             </div>

//             {isOwnProfile && (
//               <div className="mt-4 flex gap-2">
//                 {editing ? (
//                   <>
//                     <button onClick={handleSave} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Save</button>
//                     <button onClick={() => setEditing(false)} className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400">Cancel</button>
//                   </>
//                 ) : (
//                   <button onClick={() => setEditing(true)} className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">Edit Profile</button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* About & Specialties */}
//       <div className="bg-white/70 backdrop-blur-xl p-8 mt-8 rounded-3xl shadow-xl">
//         <h2 className="text-2xl font-bold mb-3 text-indigo-700">About</h2>
//         {editing ? (
//           <textarea name="bio" value={formData.bio} onChange={handleChange} className="w-full border p-2 rounded" rows={4} />
//         ) : (
//           <p className="text-gray-700 leading-relaxed">{counselor.bio || "No bio added."}</p>
//         )}
//       </div>

//       <div className="bg-white/70 backdrop-blur-xl p-8 mt-8 rounded-3xl shadow-xl">
//         <h2 className="text-2xl font-bold mb-3 text-indigo-700">Specialties</h2>
//         {editing ? (
//           <input type="text" value={formData.specialties.join(", ")} onChange={handleSpecialtiesChange} className="border p-2 w-full rounded" placeholder="Comma separated" />
//         ) : (
//           <div className="flex flex-wrap gap-3">
//             {counselor.specialties?.length > 0 ? counselor.specialties.map((s,i)=>(<span key={i} className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl text-sm shadow-sm">{s}</span>)) : <p className="text-gray-500">No specialties added.</p>}
//           </div>
//         )}
//       </div>

//       {/* Counselor's Blogs */}
//       <div className="bg-white/70 backdrop-blur-xl p-8 mt-8 rounded-3xl shadow-xl">
//         <h2 className="text-2xl font-bold mb-3 text-indigo-700">My Blogs</h2>
//         {blogs.length === 0 && <p className="text-gray-500">No blogs yet.</p>}
//         {blogs.map((b) => (
//           <div key={b._id} className="border p-4 rounded mb-4 shadow hover:shadow-md transition">
//             <h3 className="text-xl font-semibold">{b.title}</h3>
//             <p className="text-gray-700 mt-1">{b.content.slice(0, 150)}...</p>
//             {isOwnProfile && (
//               <div className="mt-2 flex gap-2">
//                 <button onClick={() => navigate(`/edit-blog/${b._id}`)} className="bg-indigo-600 text-white py-1 px-3 rounded hover:bg-indigo-700">Edit</button>
//                 <button onClick={() => handleDeleteBlog(b._id)} className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700">Delete</button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default CounselorProfile;


import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const CounselorProfile = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [counselor, setCounselor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [sessions, setSessions] = useState([]);

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    specialties: [],
    sessionFee: "",
    profileImage: "",
  });
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch counselor profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get(`/counselors/${id}`);
        setCounselor(data.data);
        setFormData({
          name: data.data.name || "",
          bio: data.data.bio || "",
          specialties: data.data.specialties || [],
          sessionFee: data.data.sessionFee || 50,
          profileImage: data.data.profileImage || "",
        });
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };
    if (!id) return; 
    fetchProfile();
  }, [id]);

  // Fetch counselor's blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await API.get(`/blogs/my-blogs`);
        const myBlogs = data.data.filter(b => b.author._id === id);
        setBlogs(myBlogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, [id]);

  // Fetch counselor's sessions
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const { data } = await API.get("/sessions/my-sessions");
        const counselorSessions = data.data.filter(
          s => s.counselor._id === id
        );
        setSessions(counselorSessions);
      } catch (err) {
        console.error("Error fetching sessions:", err);
      }
    };
    fetchSessions();
  }, [id]);

  const isOwnProfile = user && user.role === "counselor" && user._id === id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSpecialtiesChange = (e) => {
    const value = e.target.value.split(",").map(s => s.trim());
    setFormData(prev => ({ ...prev, specialties: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, profileImage: file }));
    }
  };

  const handleSave = async () => {
    try {
      const updateData = new FormData();
      updateData.append("name", formData.name);
      updateData.append("bio", formData.bio);
      updateData.append("specialties", JSON.stringify(formData.specialties));
      updateData.append("sessionFee", formData.sessionFee);
      if (formData.profileImage instanceof File) {
        updateData.append("profileImage", formData.profileImage);
      }

      const { data } = await API.put(`/counselors/${id}`, updateData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setCounselor(data.data);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await API.delete(`/blogs/${blogId}`);
      setBlogs(prev => prev.filter(b => b._id !== blogId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog.");
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!counselor) return <div className="text-center py-20">Counselor not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Profile Section */}
      <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <img
              src={previewImage || counselor.profileImage || "https://cdn-icons-png.flaticon.com/512/219/219969.png"}
              className="w-40 h-40 rounded-full border-4 border-indigo-300 object-cover shadow-md"
            />
            {editing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute bottom-0 right-0 opacity-0 w-full h-full cursor-pointer"
              />
            )}
          </div>

          <div className="flex-1">
            {editing ? (
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full rounded mb-2" />
            ) : (
              <h1 className="text-3xl font-bold text-indigo-700">{counselor.name}</h1>
            )}

            {editing ? (
              <input type="number" name="sessionFee" value={formData.sessionFee} onChange={handleChange} className="border p-2 w-32 rounded mt-1" />
            ) : (
              <p className="mt-2 text-indigo-700 font-semibold text-xl">${counselor.sessionFee || 50} / Session</p>
            )}

            <div className="mt-3 text-gray-700 space-y-1">
              <p><strong>Experience:</strong> {counselor.experience || 0} Years</p>
              <p className="flex items-center gap-2"><MapPin size={16} className="text-indigo-600" />Colombo, Sri Lanka</p>
            </div>

            {isOwnProfile && (
              <div className="mt-4 flex gap-2">
                {editing ? (
                  <>
                    <button onClick={handleSave} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Save</button>
                    <button onClick={() => setEditing(false)} className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400">Cancel</button>
                  </>
                ) : (
                  <button onClick={() => setEditing(true)} className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">Edit Profile</button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* About & Specialties */}
      <div className="bg-white/70 backdrop-blur-xl p-8 mt-8 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold mb-3 text-indigo-700">About</h2>
        {editing ? (
          <textarea name="bio" value={formData.bio} onChange={handleChange} className="w-full border p-2 rounded" rows={4} />
        ) : (
          <p className="text-gray-700 leading-relaxed">{counselor.bio || "No bio added."}</p>
        )}
      </div>

      <div className="bg-white/70 backdrop-blur-xl p-8 mt-8 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold mb-3 text-indigo-700">Specialties</h2>
        {editing ? (
          <input type="text" value={formData.specialties.join(", ")} onChange={handleSpecialtiesChange} className="border p-2 w-full rounded" placeholder="Comma separated" />
        ) : (
          <div className="flex flex-wrap gap-3">
            {counselor.specialties?.length > 0 ? counselor.specialties.map((s,i)=>(<span key={i} className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl text-sm shadow-sm">{s}</span>)) : <p className="text-gray-500">No specialties added.</p>}
          </div>
        )}
      </div>

      {/* Counselor's Blogs */}
      <div className="bg-white/70 backdrop-blur-xl p-8 mt-8 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold mb-3 text-indigo-700">My Blogs</h2>
        {blogs.length === 0 && <p className="text-gray-500">No blogs yet.</p>}
        {blogs.map((b) => (
          <div key={b._id} className="border p-4 rounded mb-4 shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold">{b.title}</h3>
            <p className="text-gray-700 mt-1">{b.content.slice(0, 150)}...</p>
            {isOwnProfile && (
              <div className="mt-2 flex gap-2">
                <button onClick={() => navigate(`/edit-blog/${b._id}`)} className="bg-indigo-600 text-white py-1 px-3 rounded hover:bg-indigo-700">Edit</button>
                <button onClick={() => handleDeleteBlog(b._id)} className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700">Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Counselor's Sessions */}
      <div className="bg-white/70 backdrop-blur-xl p-8 mt-8 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold mb-3 text-indigo-700">My Sessions</h2>
        {sessions.length === 0 && <p className="text-gray-500">No sessions booked yet.</p>}
        {sessions.map(s => (
          <div key={s._id} className="border p-4 rounded mb-4 shadow hover:shadow-md transition flex justify-between items-center">
            <div>
              <p><strong>Client:</strong> {s.client.name}</p>
              <p><strong>Date:</strong> {new Date(s.date).toLocaleString()}</p>
              <p><strong>Status:</strong> {s.status}</p>
              <p><strong>Payment:</strong> {s.paymentStatus}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounselorProfile;
