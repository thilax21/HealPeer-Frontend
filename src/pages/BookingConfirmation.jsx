// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import API from "../api/api";

// const BookingConfirmation = ({ user }) => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const booking = state?.booking;
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   if (!booking) {
//     return (
//       <div className="max-w-3xl mx-auto p-6 text-center">
//         <p className="text-gray-500">No booking found. Please start from the counselors page.</p>
//         <button onClick={() => navigate("/counselors")} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded">Go to counselors</button>
//       </div>
//     );
//   }

//   const handleConfirm = async () => {
//     setLoading(true);
//     try {
//       // example payload — adapt to your backend
//       const payload = {
//         counselorId: id,
//         dateTime: `${date} ${time}`,
//         duration,
//         notes,
//         amount
//         // optionally user id from user context/token
//       };

//       const res = await API.post("/session/book", payload);
//       setMessage("Booking confirmed! Check your email for details.");
//       // optionally navigate to bookings page
//       setTimeout(() => navigate("/bookings"), 1200);
//     } catch (err) {
//       console.error(err);
//       setMessage("Failed to confirm booking. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">Confirm booking</h2>

//       <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
//         <div><strong>Counselor:</strong> {booking.counselorName}</div>
//         <div className="mt-1"><strong>Type:</strong> {booking.sessionType}</div>
//         <div className="mt-1"><strong>Duration:</strong> {booking.duration} mins</div>
//         <div className="mt-1"><strong>Date:</strong> {booking.date}</div>
//         <div className="mt-1"><strong>Time:</strong> {booking.time}</div>
//         <div className="mt-1"><strong>Amount:</strong> ${booking.amount}</div>
//       </div>

//       <div className="mt-4 flex gap-3">
//         <button onClick={handleConfirm} disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded">
//           {loading ? "Confirming..." : "Confirm Booking"}
//         </button>
//         <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-300 rounded">Back</button>
//       </div>

//       {message && <div className="mt-3 text-sm text-indigo-600">{message}</div>}
//     </div>
//   );
// };

// export default BookingConfirmation;
