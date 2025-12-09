// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate, useParams } from "react-router-dom";
// import { ArrowLeft, Video, Sparkles, AlertCircle, CheckCircle2, Calendar, Clock, User, DollarSign } from "lucide-react";
// import Navbar from "../components/Navbar";
// import PaymentButton from "./PaymentButton";
// import api from "../api/api";

// const BookingPage = () => {
//   const { counselorId } = useParams();
//   const navigate = useNavigate();
  
//   const [counselor, setCounselor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [bookingData, setBookingData] = useState({
//     date: "",
//     time: "",
//     notes: ""
//   });
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [bookingCreated, setBookingCreated] = useState(null);
//   const [error, setError] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   // Fetch counselor details
//   useEffect(() => {
//     const fetchCounselor = async () => {
//       try {
//         const response = await api.get(`/user/counselor/${counselorId}`);
//         setCounselor(response.data.counselor);
//       } catch (error) {
//         console.error("Error fetching counselor:", error);
//         setError("Failed to load counselor information");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (counselorId) {
//       fetchCounselor();
//     }
//   }, [counselorId]);

//   // Fetch available slots when date is selected
//   useEffect(() => {
//     if (bookingData.date && counselorId) {
//       const fetchAvailableSlots = async () => {
//         try {
//           const response = await api.get(`/availability/available/${counselorId}?date=${bookingData.date}`);
//           setAvailableSlots(response.data.slots || []);
//           setError("");
//         } catch (error) {
//           console.error("Error fetching available slots:", error);
//           setError("Failed to load available slots");
//           setAvailableSlots([]);
//         }
//       };

//       fetchAvailableSlots();
//     }
//   }, [bookingData.date, counselorId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBookingData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);

//     // Validation
//     if (!bookingData.date || !bookingData.time) {
//       setError("Please select both date and time for your booking");
//       setSubmitting(false);
//       return;
//     }

//     try {
//       const bookingPayload = {
//         counselorId,
//         date: bookingData.date,
//         time: bookingData.time,
//         notes: bookingData.notes,
//         amount: counselor?.pricePerSession || 1000
//       };

//       const response = await api.post("/booking/create", bookingPayload);
//       setBookingCreated(response.data.booking);
//     } catch (error) {
//       console.error("Booking error:", error);
//       setError(error.response?.data?.message || "Failed to create booking. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const getMinDate = () => {
//     const today = new Date();
//     return today.toISOString().split('T')[0];
//   };

//   const getMaxDate = () => {
//     const maxDate = new Date();
//     maxDate.setDate(maxDate.getDate() + 30); // Allow booking up to 30 days in advance
//     return maxDate.toISOString().split('T')[0];
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-stone-50 to-[#f9f8f6]">
//         <Navbar />
//         <div className="flex items-center justify-center min-h-[60vh]">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1c1917]"></div>
//         </div>
//       </div>
//     );
//   }

//   if (!counselor) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-stone-50 to-[#f9f8f6]">
//         <Navbar />
//         <div className="container mx-auto px-4 py-8">
//           <div className="text-center py-12">
//             <h2 className="text-2xl font-bold text-[#1c1917] mb-4">Counselor Not Found</h2>
//             <button 
//               onClick={() => navigate("/counselors")}
//               className="text-[#3f6212] hover:underline"
//             >
//               Back to Counselors
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-stone-50 to-[#f9f8f6]">
//       <Navbar />
      
//       <main className="container mx-auto px-4 py-8 max-w-6xl">
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Counselor Info Card */}
//           <div className="lg:col-span-1">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="bg-white rounded-3xl shadow-xl p-6 sticky top-8"
//             >
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="w-16 h-16 bg-gradient-to-br from-[#3f6212] to-[#1c1917] rounded-full flex items-center justify-center text-white text-xl font-bold">
//                   {counselor.name?.charAt(0) || "C"}
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-[#1c1917] text-lg">{counselor.name}</h3>
//                   <p className="text-sm text-stone-500">{counselor.specialization}</p>
//                 </div>
//               </div>
              
//               <div className="space-y-4 mb-6">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-[#f9f8f6] rounded-lg">
//                     <User size={16} className="text-[#1c1917]" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-stone-500">Experience</p>
//                     <p className="text-sm font-semibold text-[#1c1917]">{counselor.experience || "5+ years"}</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-[#f9f8f6] rounded-lg">
//                     <DollarSign size={16} className="text-[#1c1917]" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-stone-500">Session Fee</p>
//                     <p className="text-sm font-semibold text-[#1c1917]">Rs. {counselor.pricePerSession || 1000}</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="border-t border-stone-200 pt-4">
//                 <h4 className="font-semibold text-[#1c1917] mb-2">About</h4>
//                 <p className="text-sm text-stone-600 leading-relaxed">
//                   {counselor.bio || "Experienced counselor dedicated to helping clients achieve their mental health goals through personalized therapy sessions."}
//                 </p>
//               </div>
//             </motion.div>
//           </div>

//           {/* Booking Form */}
//           <div className="lg:col-span-2">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-3xl shadow-xl p-8"
//             >
//               <div className="mb-8">
//                 <h1 className="text-3xl font-bold text-[#1c1917] mb-2">Book Your Session</h1>
//                 <p className="text-stone-500">Select your preferred date and time to schedule a consultation</p>
//               </div>

//               <AnimatePresence mode="wait">
//                 {!bookingCreated ? (
//                   /* --- BOOKING FORM --- */
//                   <motion.form
//                     key="form"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     onSubmit={handleSubmit}
//                     className="space-y-6"
//                   >
//                     {/* Date Selection */}
//                     <div>
//                       <label className="flex items-center gap-2 text-sm font-bold text-[#1c1917] mb-3">
//                         <Calendar size={16} />
//                         Select Date
//                       </label>
//                       <input
//                         type="date"
//                         name="date"
//                         value={bookingData.date}
//                         onChange={handleInputChange}
//                         min={getMinDate()}
//                         max={getMaxDate()}
//                         required
//                         className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3f6212] focus:border-transparent"
//                       />
//                     </div>

//                     {/* Time Selection */}
//                     {bookingData.date && (
//                       <div>
//                         <label className="flex items-center gap-2 text-sm font-bold text-[#1c1917] mb-3">
//                           <Clock size={16} />
//                           Available Time Slots
//                         </label>
//                         {availableSlots.length > 0 ? (
//                           <div className="grid grid-cols-3 gap-3">
//                             {availableSlots.map((slot, index) => (
//                               <button
//                                 key={index}
//                                 type="button"
//                                 onClick={() => setBookingData(prev => ({ ...prev, time: slot }))}
//                                 className={`py-3 px-4 rounded-xl border-2 transition-all text-sm font-medium ${
//                                   bookingData.time === slot
//                                     ? "border-[#3f6212] bg-[#3f6212] text-white"
//                                     : "border-stone-200 hover:border-[#3f6212] text-[#1c1917]"
//                                 }`}
//                               >
//                                 {slot}
//                               </button>
//                             ))}
//                           </div>
//                         ) : (
//                           <div className="text-center py-8 bg-stone-50 rounded-xl">
//                             <p className="text-stone-500">No available slots for this date</p>
//                             <p className="text-sm text-stone-400 mt-1">Please try another date</p>
//                           </div>
//                         )}
//                       </div>
//                     )}

//                     {/* Notes */}
//                     <div>
//                       <label className="block text-sm font-bold text-[#1c1917] mb-3">
//                         Additional Notes (Optional)
//                       </label>
//                       <textarea
//                         name="notes"
//                         value={bookingData.notes}
//                         onChange={handleInputChange}
//                         rows={4}
//                         placeholder="Any specific concerns or topics you'd like to discuss..."
//                         className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3f6212] focus:border-transparent resize-none"
//                       />
//                     </div>

//                     {/* Error Display */}
//                     {error && (
//                       <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2 text-sm font-medium">
//                         <AlertCircle size={16} /> {error}
//                       </div>
//                     )}

//                     {/* Submit Button */}
//                     <button
//                       type="submit"
//                       disabled={submitting || !bookingData.date || !bookingData.time}
//                       className="w-full bg-[#1c1917] text-white py-5 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-[#3f6212] transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {submitting ? (
//                         <>
//                           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                           Processing...
//                         </>
//                       ) : (
//                         <>
//                           Confirm & Proceed <ArrowLeft className="rotate-180" size={16} />
//                         </>
//                       )}
//                     </button>
//                   </motion.form>
//                 ) : (
//                   /* --- PAYMENT STATE --- */
//                   <motion.div
//                     key="payment"
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="text-center py-12"
//                   >
//                     <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
//                       <CheckCircle2 size={40} />
//                     </div>
//                     <h2 className="text-3xl font-serif font-bold text-[#1c1917] mb-2">Reservation Held!</h2>
//                     <p className="text-stone-500 max-w-md mx-auto mb-10">
//                       Your slot for <span className="font-bold text-[#1c1917]">{bookingData.date} at {bookingData.time}</span> is reserved. 
//                       Please complete payment to finalize your booking.
//                     </p>

//                     <div className="max-w-sm mx-auto bg-[#f9f8f6] p-8 rounded-3xl border border-stone-200">
//                       <div className="flex justify-between items-center mb-6 pb-6 border-b border-stone-200">
//                         <span className="text-sm font-bold text-stone-500 uppercase tracking-wider">Total</span>
//                         <span className="text-4xl font-serif font-bold text-[#1c1917]">Rs. {counselor.pricePerSession || 1000}</span>
//                       </div>
                      
//                       <PaymentButton
//                         bookingId={bookingCreated._id}
//                         amount={bookingCreated.amount}
//                       />
                      
//                       <button 
//                         onClick={() => { setBookingCreated(null); }}
//                         className="mt-4 text-xs font-bold text-stone-400 hover:text-[#1c1917] underline"
//                       >
//                         Modify Booking Details
//                       </button>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>

//             {/* Info Footer */}
//             <div className="mt-8 grid md:grid-cols-2 gap-6">
//               <div className="bg-white/50 p-6 rounded-2xl border border-stone-100 flex gap-4 items-start">
//                 <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
//                   <Video size={18} />
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-[#1c1917] text-sm mb-1">Secure Video</h4>
//                   <p className="text-xs text-stone-500 leading-relaxed">
//                     Encrypted, high-quality video calls directly in your browser. No downloads required.
//                   </p>
//                 </div>
//               </div>
//               <div className="bg-white/50 p-6 rounded-2xl border border-stone-100 flex gap-4 items-start">
//                 <div className="p-2 bg-green-50 text-green-600 rounded-lg">
//                   <Sparkles size={18} />
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-[#1c1917] text-sm mb-1">Satisfaction Guarantee</h4>
//                   <p className="text-xs text-stone-500 leading-relaxed">
//                     If you're not satisfied with your session, we offer a free rescheduling option.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default BookingPage;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import PaymentButton from "./PaymentButton";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Calendar, Clock, Video, MessageSquare, 
  CheckCircle2, Sparkles, AlertCircle, ShieldCheck, User
} from "lucide-react";

// --- 🎨 VISUAL UTILS ---

const Grain = () => (
  <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] filter contrast-150 brightness-100" />
);

const InputGroup = ({ label, children, icon: Icon }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold uppercase tracking-widest text-stone-400 flex items-center gap-2">
      {Icon && <Icon size={12} />} {label}
    </label>
    {children}
  </div>
);

// --- 📅 MAIN COMPONENT ---

const BookingPage = ({ user }) => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [counselor, setCounselor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    sessionType: "video", // Default to video
    date: "",
    time: "",
    durationMin: 60,
    notes: ""
  });
  const [bookingCreated, setBookingCreated] = useState(null);
  const [error, setError] = useState("");

  // --- Logic ---

  useEffect(() => {
    const fetchCounselor = async () => {
      try {
        const { data } = await API.get(`/counselors/${id}`);
        setCounselor(data.data);
      } catch (err) {
        console.error("Error fetching counselor:", err);
        setError("Failed to load counselor information");
      } finally {
        setLoading(false);
      }
    };
    fetchCounselor();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleSessionTypeSelect = (type) => {
    setBookingData(prev => ({ ...prev, sessionType: type }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) return navigate("/login");
    if (user.role !== "client") return alert("Only clients can book sessions");
    if (!bookingData.date || !bookingData.time) return setError("Please select both date and time");

    try {
      let clientId = user._id || user.id || localStorage.getItem("userId");
      if (!clientId) {
        setError("User ID not found. Please login again.");
        return;
      }

      const bookingPayload = {
        clientId: clientId,
        counselorId: id,
        date: bookingData.date,
        time: bookingData.time,
        durationMin: bookingData.durationMin,
        notes: bookingData.notes,
        sessionType: bookingData.sessionType,
        amount: counselor.pricePerSession || 1000
      };

      const { data } = await API.post("/booking/create", bookingPayload);
      setBookingCreated(data.booking);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create booking");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#f4f2ed] flex items-center justify-center font-serif text-[#3f6212] animate-pulse text-xl">
      Loading Sanctuary...
    </div>
  );

  if (!counselor) return <div className="min-h-screen bg-[#f4f2ed] flex items-center justify-center">Counselor not found.</div>;

  return (
    <div className="min-h-screen bg-[#f4f2ed] text-[#1c1917] font-sans selection:bg-[#3f6212] selection:text-white relative">
      <Grain />

      {/* Header */}
      <header className="pt-8 pb-12 px-6 md:px-12 max-w-7xl mx-auto flex items-center justify-between relative z-10 top-30">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-[#1c1917] transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <div className="text-sm font-bold flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-stone-100">
          <ShieldCheck size={16} className="text-green-600" /> Secure Booking
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24 relative z-10 top-35">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* --- LEFT: COUNSELOR PASSPORT --- */}
          <div className="lg:col-span-4 lg:sticky lg:top-8 top-35">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-32 bg-[#1c1917]" />
              
              <div className="relative z-10 mb-6">
                <div className="w-32 h-32 mx-auto rounded-[2rem] overflow-hidden border-4 border-white shadow-md">
                  <img 
                    src={counselor.profileImage || "https://cdn-icons-png.flaticon.com/512/219/219969.png"} 
                    alt={counselor.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-serif font-bold text-[#1c1917] mb-1">{counselor.name}</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-[#3f6212] mb-6">{counselor.specialization || "Specialist"}</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#f9f8f6] p-4 rounded-2xl">
                  <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">Experience</p>
                  <p className="font-serif font-bold text-lg">{counselor.experience} Yrs</p>
                </div>
                <div className="bg-[#f9f8f6] p-4 rounded-2xl">
                  <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">Fee</p>
                  <p className="font-serif font-bold text-lg">${counselor.pricePerSession || 1000}</p>
                </div>
              </div>

              <div className="text-left bg-[#f9f8f6] p-6 rounded-2xl text-sm text-stone-500 leading-relaxed">
                <p className="line-clamp-4">{counselor.bio || "Dedicated to providing a safe space for healing and growth."}</p>
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT: BOOKING FORM --- */}
          <div className="lg:col-span-8 top-35">
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="bg-white p-8 md:p-12 rounded-[3rem] border border-stone-100 shadow-sm relative"
            >
              
              <AnimatePresence mode="wait">
                {!bookingCreated ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onSubmit={handleBookingSubmit} 
                    className="space-y-10"
                  >
                    <div>
                      <h1 className="text-4xl font-serif font-bold text-[#1c1917] mb-2">Session Details</h1>
                      <p className="text-stone-500">Customize your appointment preferences.</p>
                    </div>

                    {/* 1. Session Type */}
                    <InputGroup label="How would you like to meet?">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div 
                          onClick={() => handleSessionTypeSelect('video')}
                          className={`cursor-pointer p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                            bookingData.sessionType === 'video' 
                              ? 'border-[#3f6212] bg-[#3f6212]/5' 
                              : 'border-stone-100 hover:border-stone-300'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bookingData.sessionType === 'video' ? 'bg-[#3f6212] text-white' : 'bg-stone-100 text-stone-400'}`}>
                            <Video size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-[#1c1917]">Video Call</p>
                            <p className="text-xs text-stone-500">Google Meet</p>
                          </div>
                        </div>

                        <div 
                          onClick={() => handleSessionTypeSelect('chat')}
                          className={`cursor-pointer p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                            bookingData.sessionType === 'chat' 
                              ? 'border-[#3f6212] bg-[#3f6212]/5' 
                              : 'border-stone-100 hover:border-stone-300'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bookingData.sessionType === 'chat' ? 'bg-[#3f6212] text-white' : 'bg-stone-100 text-stone-400'}`}>
                            <MessageSquare size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-[#1c1917]">Live Chat</p>
                            <p className="text-xs text-stone-500">Real-time Text</p>
                          </div>
                        </div>
                      </div>
                    </InputGroup>

                    {/* 2. Date & Time */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <InputGroup label="Preferred Date" icon={Calendar}>
                        <input
                          type="date"
                          name="date"
                          value={bookingData.date}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full bg-[#f9f8f6] p-4 rounded-xl border-none focus:ring-2 focus:ring-[#3f6212] text-[#1c1917] font-medium outline-none"
                          required
                        />
                      </InputGroup>
                      <InputGroup label="Preferred Time" icon={Clock}>
                        <input
                          type="time"
                          name="time"
                          value={bookingData.time}
                          onChange={handleInputChange}
                          className="w-full bg-[#f9f8f6] p-4 rounded-xl border-none focus:ring-2 focus:ring-[#3f6212] text-[#1c1917] font-medium outline-none"
                          required
                        />
                      </InputGroup>
                    </div>

                    {/* 3. Duration & Notes */}
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="md:col-span-1">
                        <InputGroup label="Duration" icon={Clock}>
                          <select
                            name="durationMin"
                            value={bookingData.durationMin}
                            onChange={handleInputChange}
                            className="w-full bg-[#f9f8f6] p-4 rounded-xl border-none focus:ring-2 focus:ring-[#3f6212] text-[#1c1917] font-medium outline-none cursor-pointer"
                          >
                            <option value={30}>30 Minutes</option>
                            <option value={60}>1 Hour</option>
                            <option value={90}>1.5 Hours</option>
                          </select>
                        </InputGroup>
                      </div>
                      <div className="md:col-span-2">
                        <InputGroup label="Notes for Counselor (Optional)">
                          <input
                            name="notes"
                            value={bookingData.notes}
                            onChange={handleInputChange}
                            placeholder="Anything specific you want to discuss?"
                            className="w-full bg-[#f9f8f6] p-4 rounded-xl border-none focus:ring-2 focus:ring-[#3f6212] text-[#1c1917] outline-none placeholder:text-stone-400"
                          />
                        </InputGroup>
                      </div>
                    </div>

                    {/* Error & Submit */}
                    {error && (
                      <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2 text-sm font-medium">
                        <AlertCircle size={16} /> {error}
                      </div>
                    )}

                    <button type="submit" className="w-full bg-[#1c1917] text-white py-5 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-[#3f6212] transition-colors shadow-lg flex items-center justify-center gap-2">
                      Confirm & Proceed <ArrowLeft className="rotate-180" size={16} />
                    </button>

                  </motion.form>
                ) : (
                  /* --- PAYMENT SUCCESS STATE --- */
                  <motion.div 
                    key="payment"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                      <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-[#1c1917] mb-2">Reservation Held!</h2>
                    <p className="text-stone-500 max-w-md mx-auto mb-10">
                      Your slot for <span className="font-bold text-[#1c1917]">{bookingData.date} at {bookingData.time}</span> is reserved. 
                      Please complete the payment to finalize your booking.
                    </p>

                    <div className="max-w-sm mx-auto bg-[#f9f8f6] p-8 rounded-3xl border border-stone-200">
                      <div className="flex justify-between items-center mb-6 pb-6 border-b border-stone-200">
                        <span className="text-sm font-bold text-stone-500 uppercase tracking-wider">Total</span>
                        <span className="text-4xl font-serif font-bold text-[#1c1917]">${counselor.pricePerSession || 1000}</span>
                      </div>
                      
                      <PaymentButton
                        bookingId={bookingCreated._id}
                        amount={bookingCreated.amount}
                      />
                      
                      <button 
                        onClick={() => { setBookingCreated(null); }}
                        className="mt-4 text-xs font-bold text-stone-400 hover:text-[#1c1917] underline"
                      >
                        Modify Booking Details
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>

            {/* Info Footer */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-white/50 p-6 rounded-2xl border border-stone-100 flex gap-4 items-start">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Video size={18}/></div>
                <div>
                  <h4 className="font-bold text-[#1c1917] text-sm mb-1">Secure Video</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">Encrypted, high-quality video calls directly in your browser. No downloads required.</p>
                </div>
              </div>
              <div className="bg-white/50 p-6 rounded-2xl border border-stone-100 flex gap-4 items-start">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Sparkles size={18}/></div>
                <div>
                  <h4 className="font-bold text-[#1c1917] text-sm mb-1">Satisfaction Guarantee</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">If you're not satisfied with your session, we offer a free rescheduling option.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingPage;
