

// import React, { useState } from 'react';
// import API from '../api/api';
// import { useNavigate, useParams } from 'react-router-dom';

// const Register = () => {
//   const { role } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: '', email: '', password: '', role: role || 'client',
//     bio: '', specialization: '', experience: '', contactNumber: '', profileImage: ''
//   });

//   const [selectedImageFile, setSelectedImageFile] = useState(null);
//   const [fileUploading, setFileUploading] = useState(false);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   // Handle file select
//   const handleFileChange = (e) => setSelectedImageFile(e.target.files[0]);

//   // Upload image before submitting form
//   const handleImageUpload = async () => {
//     if (!selectedImageFile) return alert("Please select an image first");
//     setFileUploading(true);
//     try {
//       const formData = new FormData();
//       formData.append("profileImage", selectedImageFile);

//       const res = await API.post("/auth/signup", formData, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });

//       setForm({ ...form, profileImage: res.data.user.profileImage });
//       alert("Image uploaded successfully!");
//     } catch (err) {
//       console.error("Upload failed", err);
//       alert("Image upload failed");
//     } finally {
//       setFileUploading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const fd = new FormData();
//       Object.keys(form).forEach((key) => {
//         if (form[key]) fd.append(key, form[key]);
//       });

//       const res = await API.post("/auth/signup", fd, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });

//       alert(form.role === "counselor"
//         ? "Registered as counselor — pending admin approval"
//         : "Registered successfully");

//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h2>Create Account</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
//         <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
//         <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />

//         {form.role === 'counselor' && (
//           <>
//             <textarea name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} />
//             <input name="specialization" placeholder="Specialization" value={form.specialization} onChange={handleChange} />
//             <input name="experience" placeholder="Experience" value={form.experience} onChange={handleChange} />
//             <input name="contactNumber" placeholder="Contact number" value={form.contactNumber} onChange={handleChange} />

//             <div>
//               <label>Profile Image</label>
//               <input type="file" onChange={handleFileChange} />
//               <button type="button" onClick={handleImageUpload} disabled={fileUploading}>
//                 {fileUploading ? "Uploading..." : "Upload Image"}
//               </button>
//               {form.profileImage && <img src={form.profileImage} alt="Profile" width={80} />}
//             </div>
//           </>
//         )}

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;

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


import React, { useState, useEffect } from 'react';
import API from '../api/api';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Briefcase, 
  FileText, 
  Phone, 
  Award, 
  UploadCloud, 
  ArrowLeft, 
  Loader2, 
  CheckCircle,
  Stethoscope,
  Heart
} from 'lucide-react';

// --- Visual Utils ---

const GrainTexture = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
       style={{ 
         backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
         filter: 'contrast(170%) brightness(100%)'
       }} />
);

const InputField = ({ icon: Icon, ...props }) => (
  <div className="relative group">
    <div className="absolute left-0 top-4 text-stone-400 group-focus-within:text-[#3f6212] transition-colors">
      <Icon size={18} />
    </div>
    <input
      className="w-full bg-transparent border-b border-stone-200 py-4 pl-8 pr-4 text-[#1c1917] placeholder-stone-400 outline-none focus:border-[#1c1917] transition-all duration-300 font-medium"
      {...props}
    />
  </div>
);

// --- Main Component ---

const Register = () => {
  const { role: paramRole } = useParams();
  const navigate = useNavigate();

  // State
  const [role, setRole] = useState(paramRole || 'client');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState({
    name: '', 
    email: '', 
    password: '', 
    bio: '', 
    specialization: '', 
    experience: '', 
    contactNumber: ''
  });

  // Sync role if URL param changes
  useEffect(() => {
    if (paramRole) setRole(paramRole);
  }, [paramRole]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      // Append all text fields
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });
      
      // Explicitly append role & file
      formData.append('role', role);
      if (file) formData.append('profileImage', file);

      // Single API call for everything
      await API.post("/auth/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      // Success & Redirect
      setTimeout(() => navigate("/login"), 1000);
      
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed. Please try again."); // ideally replace with toast
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f2ed] font-sans selection:bg-[#3f6212] selection:text-white relative overflow-x-hidden flex">
      <GrainTexture />

      {/* --- LEFT: Form Section --- */}
      <div className="w-full lg:w-[50%] xl:w-[45%] min-h-screen flex flex-col px-6 sm:px-12 lg:px-20 py-12 relative z-10 bg-[#f4f2ed]">
        <Link to="/" className="w-fit flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-[#1c1917] transition-colors mb-8">
          <ArrowLeft size={14} /> Back Home
        </Link>

        <div className="max-w-lg w-full mx-auto flex-grow flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif text-[#1c1917] mb-4 tracking-tight">
              Create Account
            </h1>
            <p className="text-stone-500 mb-8">Join our community and start your journey.</p>

            {/* Role Switcher */}
            <div className="bg-stone-200/50 p-1 rounded-full flex mb-8 w-full max-w-sm">
              <button
                type="button"
                onClick={() => setRole('client')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${role === 'client' ? 'bg-white shadow-md text-[#1c1917]' : 'text-stone-500 hover:text-stone-700'}`}
              >
                <Heart size={14} /> Patient
              </button>
              <button
                type="button"
                onClick={() => setRole('counselor')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${role === 'counselor' ? 'bg-white shadow-md text-[#1c1917]' : 'text-stone-500 hover:text-stone-700'}`}
              >
                <Stethoscope size={14} /> Counselor
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5">
                <InputField icon={User} name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
                <InputField icon={Mail} name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
                <InputField icon={Lock} name="password" type="password" placeholder="Create Password" value={form.password} onChange={handleChange} required />
              </div>

              {/* Dynamic Counselor Fields */}
              <AnimatePresence>
                {role === 'counselor' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-5 pt-2"
                  >
                    <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm space-y-5">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-[#3f6212] mb-2">Professional Profile</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <InputField icon={Briefcase} name="specialization" placeholder="Specialization" value={form.specialization} onChange={handleChange} />
                        <InputField icon={Award} name="experience" placeholder="Years Exp." value={form.experience} onChange={handleChange} />
                      </div>
                      <InputField icon={Phone} name="contactNumber" placeholder="Work Phone" value={form.contactNumber} onChange={handleChange} />
                      <InputField icon={FileText} name="bio" placeholder="Short Bio / Methodology" value={form.bio} onChange={handleChange} />

                      {/* Custom Image Upload */}
                      <div className="mt-4">
                        <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Profile Photo</label>
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-stone-300 rounded-xl cursor-pointer hover:bg-stone-50 hover:border-stone-400 transition-all group">
                          {previewUrl ? (
                            <div className="relative w-full h-full overflow-hidden rounded-xl">
                               <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                               <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Change Photo</div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <UploadCloud className="w-8 h-8 text-stone-400 mb-2 group-hover:scale-110 transition-transform" />
                              <p className="text-xs text-stone-500">Click to upload image</p>
                            </div>
                          )}
                          <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-[#1c1917] text-[#f2f0e9] h-14 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#3f6212] active:scale-[0.98] transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : "Complete Registration"}
              </button>

              <p className="text-center text-stone-500 text-sm mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-[#1c1917] font-bold hover:underline underline-offset-4">
                  Sign in
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>

      {/* --- RIGHT: Visual Section (Desktop) --- */}
      <div className="hidden lg:block w-[50%] xl:w-[55%] fixed right-0 top-0 bottom-0 bg-[#1c1917]">
        <div className="absolute inset-0">
           <img 
             src={role === 'client' 
               ? "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=2400&auto=format&fit=crop" 
               : "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2400&auto=format&fit=crop"
             }
             alt="Background"
             className="w-full h-full object-cover opacity-60 transition-opacity duration-700"
           />
           {/* Gradient Overlay */}
           <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#1c1917]/40 to-[#1c1917] mix-blend-multiply" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917] via-transparent to-transparent" />
        </div>

        <div className="absolute bottom-24 left-16 max-w-lg z-20 text-[#f2f0e9]">
           <AnimatePresence mode='wait'>
             <motion.div
               key={role}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.5 }}
             >
               <div className="w-12 h-1 bg-[#3f6212] mb-6"></div>
               <h2 className="text-5xl font-serif leading-tight mb-6">
                 {role === 'client' ? "Your sanctuary for growth and healing." : "Empower others on their journey to wellness."}
               </h2>
               <div className="flex items-center gap-4 text-sm opacity-70 font-medium tracking-wide">
                 <span className="flex items-center gap-2"><CheckCircle size={16} className="text-[#3f6212]" /> Secure & Private</span>
                 <span className="flex items-center gap-2"><CheckCircle size={16} className="text-[#3f6212]" /> 24/7 Support</span>
               </div>
             </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Register;