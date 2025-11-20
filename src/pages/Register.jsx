

import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate, useParams } from 'react-router-dom';

const Register = () => {
  const { role } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', email: '', password: '', role: role || 'client',
    bio: '', specialization: '', experience: '', contactNumber: '', profileImage: ''
  });

  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [fileUploading, setFileUploading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle file select
  const handleFileChange = (e) => setSelectedImageFile(e.target.files[0]);

  // Upload image before submitting form
  const handleImageUpload = async () => {
    if (!selectedImageFile) return alert("Please select an image first");
    setFileUploading(true);
    try {
      const formData = new FormData();
      formData.append("profileImage", selectedImageFile);

      const res = await API.post("/auth/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setForm({ ...form, profileImage: res.data.user.profileImage });
      alert("Image uploaded successfully!");
    } catch (err) {
      console.error("Upload failed", err);
      alert("Image upload failed");
    } finally {
      setFileUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) fd.append(key, form[key]);
      });

      const res = await API.post("/auth/signup", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert(form.role === "counselor"
        ? "Registered as counselor — pending admin approval"
        : "Registered successfully");

      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />

        {form.role === 'counselor' && (
          <>
            <textarea name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} />
            <input name="specialization" placeholder="Specialization" value={form.specialization} onChange={handleChange} />
            <input name="experience" placeholder="Experience" value={form.experience} onChange={handleChange} />
            <input name="contactNumber" placeholder="Contact number" value={form.contactNumber} onChange={handleChange} />

            <div>
              <label>Profile Image</label>
              <input type="file" onChange={handleFileChange} />
              <button type="button" onClick={handleImageUpload} disabled={fileUploading}>
                {fileUploading ? "Uploading..." : "Upload Image"}
              </button>
              {form.profileImage && <img src={form.profileImage} alt="Profile" width={80} />}
            </div>
          </>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";
// import { Star, MapPin, Heart, Search } from "lucide-react";
// import PaymentButton from "../pages/PaymentButton";

// const Counselor = ({ user }) => {
//   const [counselors, setCounselors] = useState([]);
//   const [filteredCounselors, setFilteredCounselors] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");
//   const [specialization, setSpecialization] = useState("");
//   const [sortFee, setSortFee] = useState("");

//   const [selectedCounselor, setSelectedCounselor] = useState(null);
//   const [bookingData, setBookingData] = useState({
//     sessionType: "",
//     duration: "",
//     date: "",
//     time: "",
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCounselors = async () => {
//       try {
//         const { data } = await API.get("/counselors/all");
//         setCounselors(data.data);
//         setFilteredCounselors(data.data);
//       } catch (err) {
//         console.error("Error fetching counselors:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCounselors();
//   }, []);

//   useEffect(() => {
//     let result = [...counselors];

//     if (search.trim()) {
//       result = result.filter((c) =>
//         c.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (specialization) {
//       result = result.filter((c) => c.specialization === specialization);
//     }

//     if (sortFee === "low-high") {
//       result.sort((a, b) => (a.sessionFee || 0) - (b.sessionFee || 0));
//     } else if (sortFee === "high-low") {
//       result.sort((a, b) => (b.sessionFee || 0) - (a.sessionFee || 0));
//     }

//     setFilteredCounselors(result);
//   }, [search, specialization, sortFee, counselors]);

//   const handleViewProfile = (id) => navigate(`/counselor/${id}`);

//   const openBookingModal = (counselor) => {
//     if (!user) {
//       alert("Please login first.");
//       return navigate("/login");
//     }
//     if (user.role !== "client") {
//       return alert("Only clients can book sessions.");
//     }
//     setSelectedCounselor(counselor);
//   };

//   const handleBookingChange = (e) => {
//     setBookingData({ ...bookingData, [e.target.name]: e.target.value });
//   };

//   const closeBookingModal = () => {
//     setSelectedCounselor(null);
//     setBookingData({ sessionType: "", duration: "", date: "", time: "" });
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">

//       {/* Header */}
//       <h2 className="text-4xl font-extrabold text-center mb-10 text-indigo-700 drop-shadow">
//         Find & Connect with a Counselor
//       </h2>

//       {/* Filter Section */}
//       <div className="bg-white/70 backdrop-blur p-5 rounded-2xl shadow-xl mb-8 flex flex-wrap gap-4 justify-center">
        
//         {/* Search */}
//         <div className="relative">
//           <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
//           <input
//             type="text"
//             placeholder="Search counselor..."
//             className="pl-10 border p-2 rounded-xl w-60 shadow-sm"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* Specialization */}
//         <select
//           className="border p-2 rounded-xl w-60 shadow-sm"
//           value={specialization}
//           onChange={(e) => setSpecialization(e.target.value)}
//         >
//           <option value="">Specialization</option>
//           <option value="Depression">Depression</option>
//           <option value="Relationship">Relationship</option>
//           <option value="Anxiety">Anxiety</option>
//           <option value="Career">Career</option>
//         </select>

//         {/* Sort */}
//         <select
//           className="border p-2 rounded-xl w-60 shadow-sm"
//           value={sortFee}
//           onChange={(e) => setSortFee(e.target.value)}
//         >
//           <option value="">Sort by Fee</option>
//           <option value="low-high">Low → High</option>
//           <option value="high-low">High → Low</option>
//         </select>

//       </div>

//       {/* Counselor Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

//         {filteredCounselors.map((c) => (
//           <div
//             key={c._id}
//             className="p-6 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-indigo-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
//           >
//             {/* Profile Image */}
//             <div className="flex justify-center mb-3">
//               <img
//                 src={
//                   c.profileImage ||
//                   "https://cdn-icons-png.flaticon.com/512/219/219969.png"
//                 }
//                 className="w-28 h-28 object-cover rounded-full border-4 border-indigo-300 shadow-md"
//               />
//             </div>

//             {/* Name */}
//             <h3 className="text-xl font-semibold text-center">{c.name}</h3>

//             {/* Specialization */}
//             <p className="text-center text-indigo-600 font-medium">
//               {c.specialization}
//             </p>

//             {/* Ratings */}
//             <div className="flex justify-center items-center gap-1 mt-1">
//               <Star size={18} className="text-yellow-500" />
//               <span className="text-gray-700 text-sm">
//                 {c.rating || "4.8"} / 5.0
//               </span>
//             </div>

//             {/* Info */}
//             <div className="mt-4 text-gray-700 space-y-1 text-sm">
//               <p><strong>Experience:</strong> {c.experience} Years</p>
//               <p><strong>Fee:</strong> ${c.sessionFee || 50}</p>
//               <p className="line-clamp-2"><strong>Bio:</strong> {c.bio}</p>
//             </div>

//             {/* Buttons */}
//             <div className="mt-5 flex flex-col gap-3">
              
//               {/* View Profile */}
//               <button
//                 onClick={() => handleViewProfile(c._id)}
//                 className="py-2 rounded-xl bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
//               >
//                 View More
//               </button>

//               {/* Book */}
//               <button
//                 onClick={() => openBookingModal(c)}
//                 className="py-2 rounded-xl bg-green-600 text-white font-medium shadow hover:bg-green-700 transition"
//               >
//                 Book Session
//               </button>

//             </div>

//           </div>
//         ))}
//       </div>

//       {/* Booking Modal */}
//       {selectedCounselor && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
//           <div className="bg-white rounded-2xl p-6 w-[380px] shadow-2xl">

//             <h3 className="text-xl font-bold mb-3 text-indigo-700">
//               Book Session with {selectedCounselor.name}
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

//               {/* Payment Button */}
//               {bookingData.sessionType &&
//               bookingData.duration &&
//               bookingData.date &&
//               bookingData.time ? (
//                 <PaymentButton
//                   amount={selectedCounselor.sessionFee || 50}
//                   counselorId={selectedCounselor._id}
//                   booking={bookingData}
//                 />
//               ) : (
//                 <p className="text-red-500 text-sm">
//                   Fill all fields to continue
//                 </p>
//               )}

//             </div>

//             <button
//               onClick={closeBookingModal}
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

// export default Counselor;
