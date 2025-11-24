// import { useState, useEffect } from "react";
// import API from "../api/api";
// import PaymentButton from "./PaymentButton";

// const BookingPage = () => {
//   const [clientId, setClientId] = useState(""); // localStorage id
//   const [form, setForm] = useState({
//     counselorId: "",
//     date: "",
//     time: "",
//     durationMin: 60,
//     amount: 5000, // cents
//     notes: ""
//   });
//   const [booking, setBooking] = useState(null);

//   useEffect(() => {
//     // localStorage-ல சேமிக்கப்பட்ட clientId பெறுவது
//     const storedClientId = localStorage.getItem("userId");
//     if (storedClientId) setClientId(storedClientId);
//   }, []);

//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   const createBooking = async () => {
//     if (!clientId) return alert("Client not logged in!");
//     try {
//       const { data } = await API.post("/booking", {
//         counselorId: form.counselorId,
//         clientId,
//         date: form.date,
//         time: form.time,
//         durationMin: Number(form.durationMin),
//         amount: Number(form.amount),
//         notes: form.notes
//       });
//       setBooking(data.booking);
//       alert("Booking created (pending). Click Pay to complete.");
//     } catch (err) {
//       console.error(err);
//       alert("Error creating booking: " + err.message);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Book a session</h2>
//       <div>
//         <label>Counselor ID (simulate):</label>
//         <input name="counselorId" value={form.counselorId} onChange={handleChange} />
//       </div>
//       <div>
//         <label>Date (YYYY-MM-DD):</label>
//         <input name="date" value={form.date} onChange={handleChange} />
//       </div>
//       <div>
//         <label>Time (HH:mm):</label>
//         <input name="time" value={form.time} onChange={handleChange} />
//       </div>
//       <div>
//         <label>Duration (min):</label>
//         <input name="durationMin" value={form.durationMin} onChange={handleChange} />
//       </div>
//       <div>
//         <label>Amount (in cents):</label>
//         <input name="amount" value={form.amount} onChange={handleChange} />
//       </div>
//       <div>
//         <label>Note:</label>
//         <textarea name="notes" value={form.notes} onChange={handleChange} />
//       </div>
//       <button onClick={createBooking}>Create Booking</button>

//       {booking && (
//         <div style={{ marginTop: 20 }}>
//           <h3>Pay for booking</h3>
//           <PaymentButton bookingId={booking._id} amount={booking.amount} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingPage;


import React, { useEffect, useState } from "react";
import API, { createCheckoutSession } from "../api/api";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const clientId = localStorage.getItem("clientId"); // get logged-in client ID

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await API.get(`/bookings/client/${clientId}`);
      if (data.success) setBookings(data.bookings);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  const handlePayment = async (bookingId) => {
    try {
      const { data } = await createCheckoutSession(bookingId);
      window.location.href = data.url; // redirect to Stripe checkout
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-5">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="p-5 bg-white shadow rounded-lg mb-4 flex justify-between items-center">
            <div>
              <p><strong>Counselor:</strong> {b.counselorId.name}</p>
              <p><strong>Date:</strong> {new Date(b.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {b.time}</p>
              <p><strong>Duration:</strong> {b.durationMin} min</p>
              <p><strong>Amount:</strong> {b.amount / 100} USD</p>
              <p><strong>Status:</strong> {b.status}</p>
            </div>

            {b.status === "pending" && (
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => handlePayment(b._id)}
              >
                Pay Now
              </button>
            )}

            {b.status === "paid" && b.meetLink && (
              <a
                href={b.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Join Session
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default BookingsPage;
