import { useState, useEffect } from "react";
import API from "../api/api";
import PaymentButton from "./PaymentButton";

const BookingPage = () => {
  const [clientId, setClientId] = useState(""); // localStorage id
  const [form, setForm] = useState({
    counselorId: "",
    date: "",
    time: "",
    durationMin: 60,
    amount: 5000, // cents
    notes: ""
  });
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    // localStorage-ல சேமிக்கப்பட்ட clientId பெறுவது
    const storedClientId = localStorage.getItem("userId");
    if (storedClientId) setClientId(storedClientId);
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const createBooking = async () => {
    if (!clientId) return alert("Client not logged in!");
    try {
      const { data } = await API.post("/booking", {
        counselorId: form.counselorId,
        clientId,
        date: form.date,
        time: form.time,
        durationMin: Number(form.durationMin),
        amount: Number(form.amount),
        notes: form.notes
      });
      setBooking(data.booking);
      alert("Booking created (pending). Click Pay to complete.");
    } catch (err) {
      console.error(err);
      alert("Error creating booking: " + err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Book a session</h2>
      <div>
        <label>Counselor ID (simulate):</label>
        <input name="counselorId" value={form.counselorId} onChange={handleChange} />
      </div>
      <div>
        <label>Date (YYYY-MM-DD):</label>
        <input name="date" value={form.date} onChange={handleChange} />
      </div>
      <div>
        <label>Time (HH:mm):</label>
        <input name="time" value={form.time} onChange={handleChange} />
      </div>
      <div>
        <label>Duration (min):</label>
        <input name="durationMin" value={form.durationMin} onChange={handleChange} />
      </div>
      <div>
        <label>Amount (in cents):</label>
        <input name="amount" value={form.amount} onChange={handleChange} />
      </div>
      <div>
        <label>Note:</label>
        <textarea name="notes" value={form.notes} onChange={handleChange} />
      </div>
      <button onClick={createBooking}>Create Booking</button>

      {booking && (
        <div style={{ marginTop: 20 }}>
          <h3>Pay for booking</h3>
          <PaymentButton bookingId={booking._id} amount={booking.amount} />
        </div>
      )}
    </div>
  );
};

export default BookingPage;