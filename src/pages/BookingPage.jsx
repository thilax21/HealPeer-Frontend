import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import PaymentButton from "./PaymentButton";

const BookingPage = ({ user }) => {
  const { id } = useParams(); // counselor ID
  const navigate = useNavigate();
  
  const [counselor, setCounselor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    sessionType: "video",
    date: "",
    time: "",
    durationMin: 60,
    notes: ""
  });
  const [bookingCreated, setBookingCreated] = useState(null);
  const [error, setError] = useState("");

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
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert("Please login first to book a session");
      navigate("/login");
      return;
    }

    if (user.role !== "client") {
      alert("Only clients can book sessions");
      return;
    }

    if (!bookingData.date || !bookingData.time) {
      setError("Please select both date and time");
      return;
    }

    try {
      const bookingPayload = {
        clientId: user._id,
        counselorId: id,
        date: bookingData.date,
        time: bookingData.time,
        durationMin: bookingData.durationMin,
        notes: bookingData.notes,
        sessionType: bookingData.sessionType,
        amount: counselor.sessionFee || 50
      };

      const { data } = await API.post("/booking", bookingPayload);
      setBookingCreated(data.booking);
      setError("");
    } catch (err) {
      console.error("Booking error:", err);
      setError(err.response?.data?.message || "Failed to create booking");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading counselor information...</p>
        </div>
      </div>
    );
  }

  if (!counselor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Counselor not found</p>
          <button 
            onClick={() => navigate("/counselors")}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Back to Counselors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate("/counselors")}
            className="text-indigo-600 hover:text-indigo-800 mb-4 flex items-center"
          >
            ← Back to Counselors
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Book a Session</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Counselor Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <img
                src={counselor.profileImage || "https://cdn-icons-png.flaticon.com/512/219/219969.png"}
                alt={counselor.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold">{counselor.name}</h2>
                <p className="text-indigo-600">{counselor.specialization || "General Counselor"}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-gray-700">
              <p><strong>Experience:</strong> {counselor.experience} Years</p>
              <p><strong>Bio:</strong> {counselor.bio || "No bio available"}</p>
              <p><strong>Session Fee:</strong> ${counselor.sessionFee || 50}</p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Session Details</h3>
            
            {!bookingCreated ? (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {/* Session Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="relative">
                      <input
                        type="radio"
                        name="sessionType"
                        value="video"
                        checked={bookingData.sessionType === "video"}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="p-4 border-2 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:bg-indigo-50 hover:bg-gray-50">
                        <div className="text-center">
                          <div className="text-2xl mb-2">📹</div>
                          <div className="font-medium">Video Call</div>
                          <div className="text-sm text-gray-500">Google Meet</div>
                        </div>
                      </div>
                    </label>
                    
                    <label className="relative">
                      <input
                        type="radio"
                        name="sessionType"
                        value="chat"
                        checked={bookingData.sessionType === "chat"}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="p-4 border-2 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:bg-indigo-50 hover:bg-gray-50">
                        <div className="text-center">
                          <div className="text-2xl mb-2">💬</div>
                          <div className="font-medium">Chat Session</div>
                          <div className="text-sm text-gray-500">Real-time Chat</div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={bookingData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={bookingData.time}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <select
                    name="durationMin"
                    value={bookingData.durationMin}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={30}>30 Minutes</option>
                    <option value={60}>1 Hour</option>
                    <option value={90}>1.5 Hours</option>
                    <option value={120}>2 Hours</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={bookingData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Any specific concerns or topics you'd like to discuss..."
                  />
                </div>

                {/* Error Display */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-200 font-medium"
                >
                  Create Booking
                </button>
              </form>
            ) : (
              /* Payment Section */
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
                  <h4 className="font-semibold">Booking Created Successfully!</h4>
                  <p className="text-sm mt-1">
                    {bookingData.sessionType === "chat" ? "Chat Session" : "Video Call"} on {bookingData.date} at {bookingData.time}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Complete Your Booking</h4>
                  <p className="text-gray-600 mb-4">
                    Please complete the payment to confirm your session.
                  </p>
                  
                  <PaymentButton
                    bookingId={bookingCreated._id}
                    amount={bookingCreated.amount}
                  />
                </div>

                <button
                  onClick={() => {
                    setBookingCreated(null);
                    setBookingData({
                      sessionType: "video",
                      date: "",
                      time: "",
                      durationMin: 60,
                      notes: ""
                    });
                  }}
                  className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200"
                >
                  Create Another Booking
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Session Information */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">What to Expect</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-indigo-600 mb-2">📹 Video Call Sessions</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Face-to-face interaction via Google Meet</li>
                <li>• Real-time video and audio communication</li>
                <li>• Screen sharing capabilities</li>
                <li>• Recording option (with consent)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-indigo-600 mb-2">💬 Chat Sessions</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Text-based real-time messaging</li>
                <li>• File sharing capabilities</li>
                <li>• Message history preserved</li>
                <li>• Available anytime during scheduled slot</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
