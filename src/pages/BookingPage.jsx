// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../api/api";

// const BookingPage = ({ user }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [counselor, setCounselor] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [booking, setBooking] = useState({
//     date: "",
//     time: "",
//     duration: "",
//     notes: "",
//   });

//   // Fetch Counselor by ID
//   useEffect(() => {
//     const fetchCounselor = async () => {
//       try {
//         const { data } = await API.get(`/counselors/${id}`);
//         setCounselor(data.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCounselor();
//   }, [id]);

//   const handleChange = (e) => {
//     setBooking({ ...booking, [e.target.name]: e.target.value });
//   };

//   const handleConfirm = async () => {
//     if (!user) {
//       return navigate("/login");
//     }

//     try {
//       const res = await API.post("/session/book", {
//         counselorId: id,
//         clientId: user._id,
//         ...booking,
//       });

//       alert("Booking Successful!");
//       navigate("/my-bookings");

//     } catch (error) {
//       console.error(error);
//       alert("Booking failed");
//     }
//   };

//   if (loading) return <div className="p-20 text-center">Loading...</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-6">

//       {/* Counselor Header */}
//       <div className="flex gap-6 items-center bg-white shadow p-6 rounded-xl">
//         <img
//           src={counselor.profileImage}
//           alt="profile"
//           className="w-24 h-24 rounded-full object-cover border-4 border-indigo-300"
//         />
//         <div>
//           <h2 className="text-2xl font-bold">{counselor.name}</h2>
//           <p className="text-indigo-600">{counselor.specialization}</p>
//           <p className="text-gray-600 mt-1">{counselor.experience} Years Experience</p>
//         </div>
//       </div>

//       {/* Booking Form */}
//       <div className="mt-8 bg-white p-6 shadow rounded-xl">
//         <h3 className="text-xl font-bold mb-4">Select Your Session</h3>

//         <div className="space-y-4">
//           <select
//             name="duration"
//             className="w-full border p-2 rounded"
//             value={booking.duration}
//             onChange={handleChange}
//           >
//             <option value="">Select Duration</option>
//             <option value="30">30 Minutes</option>
//             <option value="60">1 Hour</option>
//           </select>

//           <input
//             type="date"
//             name="date"
//             className="w-full border p-2 rounded"
//             value={booking.date}
//             onChange={handleChange}
//           />

//           <input
//             type="time"
//             name="time"
//             className="w-full border p-2 rounded"
//             value={booking.time}
//             onChange={handleChange}
//           />

//           <textarea
//             name="notes"
//             placeholder="Anything you want counselor to know?"
//             className="w-full border p-2 rounded h-24"
//             value={booking.notes}
//             onChange={handleChange}
//           />

//           <button
//             onClick={handleConfirm}
//             className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
//           >
//             Confirm Booking
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingPage;


// src/pages/BookingPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import PaymentButton from "../pages/PaymentButton";

const BookingPage = ({ user }) => {
  const { id } = useParams(); // counselorId
  const navigate = useNavigate();

  const [counselor, setCounselor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    duration: "",
  });

  useEffect(() => {
    if (!user) {
      alert("Please login first.");
      return navigate("/login");
    }
    if (user.role !== "client") {
      alert("Only clients can book sessions.");
      return navigate("/");
    }

    const fetchCounselor = async () => {
      try {
        const { data } = await API.get(`/counselors/${id}`);
        setCounselor(data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch counselor.");
      } finally {
        setLoading(false);
      }
    };

    fetchCounselor();
  }, [id, user, navigate]);

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!counselor) return <div className="text-center py-20">Counselor not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">
        Book a Session with {counselor.name}
      </h2>

      {/* Booked Sessions */}
      {counselor.bookedSessions?.length > 0 && (
        <div className="mb-6 bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">Already Booked Sessions</h3>
          {counselor.bookedSessions.map((s, i) => (
            <div key={i} className="text-sm text-gray-700 border-b py-1 last:border-none">
              {new Date(s.dateTime).toLocaleDateString()} - {new Date(s.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({s.duration} mins)
            </div>
          ))}
        </div>
      )}

      {/* Booking Form */}
      <div className="space-y-4 bg-white p-6 rounded shadow">
        <select
          name="duration"
          value={bookingData.duration}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Duration</option>
          <option value="30">30 Minutes</option>
          <option value="60">60 Minutes</option>
        </select>

        <input
          type="date"
          name="date"
          value={bookingData.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="time"
          name="time"
          value={bookingData.time}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {bookingData.duration && bookingData.date && bookingData.time ? (
          <PaymentButton
            amount={counselor.sessionFee || 50}
            counselorId={counselor._id}
            counselorName={counselor.name}
            booking={bookingData}
          />
        ) : (
          <p className="text-red-500 text-sm">Fill all fields to continue</p>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
