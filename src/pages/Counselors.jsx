

import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import PaymentButton from "./PaymentButton";

const Counselor = ({ user, counselors, setCounselors }) => {
  const [filteredCounselors, setFilteredCounselors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [sortFee, setSortFee] = useState("");

  // Booking modal
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [bookingData, setBookingData] = useState({
    duration: "",
    date: "",
    time: "",
  });

  const navigate = useNavigate();

  // Fetch counselors if not already loaded
  useEffect(() => {
    if (!counselors || counselors.length === 0) {
      const fetchCounselors = async () => {
        try {
          const { data } = await API.get("/counselors/all");
          setCounselors(data.data);
          setFilteredCounselors(data.data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchCounselors();
    } else {
      setFilteredCounselors(counselors);
      setLoading(false);
    }
  }, [counselors, setCounselors]);

  // Apply Filters
  useEffect(() => {
    let result = [...counselors];

    if (search.trim()) {
      result = result.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (specialization) {
      result = result.filter((c) => c.specialization === specialization);
    }

    if (sortFee === "low-high") {
      result.sort((a, b) => (a.sessionFee || 0) - (b.sessionFee || 0));
    } else if (sortFee === "high-low") {
      result.sort((a, b) => (b.sessionFee || 0) - (a.sessionFee || 0));
    }

    setFilteredCounselors(result);
  }, [search, specialization, sortFee, counselors]);

  const handleViewProfile = (id) => navigate(`/counselor/${id}`);

  // const openBookingModal = (counselor) => {
  //   if (!user) {
  //     alert("Please login first.");
  //     return navigate("/login");
  //   }
  //   if (user.role !== "client") {
  //     return alert("Only clients can book sessions.");
  //   }
  //   setSelectedCounselor(counselor);
  // };

  const openBookingModal= (counselor) => {
    if (!user) {
      alert("Please login first.");
      return navigate("/login");
    }
    if (user.role !== "client") {
      alert("Only clients can book sessions.");
      return;
    }
    navigate(`/counselor/${counselor._id}/book`);
  };
  


  const handleBookingChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const closeBookingModal = () => {
    setSelectedCounselor(null);
    setBookingData({ duration: "", date: "", time: "" });
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  const handleBookingPage = (id) => {
    if (!user) return navigate("/login");
    if (user.role !== "client") return alert("Only clients can book sessions.");
    navigate(`/counselor/${id}/book`);
  };
  


  

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
        Meet Our Counselors
      </h2>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-4 justify-center">
        <input
          type="text"
          placeholder="Search name..."
          className="border p-2 rounded w-60"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded w-60"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        >
          <option value="">Filter by Specialization</option>
          <option value="Depression">Depression</option>
          <option value="Relationship">Relationship</option>
          <option value="Anxiety">Anxiety</option>
          <option value="Career">Career</option>
        </select>

        <select
          className="border p-2 rounded w-60"
          value={sortFee}
          onChange={(e) => setSortFee(e.target.value)}
        >
          <option value="">Sort by Fee</option>
          <option value="low-high">Low → High</option>
          <option value="high-low">High → Low</option>
        </select>
      </div>

      {/* Counselor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCounselors.map((c) => (
          <div
            key={c._id}
            className="bg-white/60 backdrop-blur border shadow-lg rounded-xl p-5 hover:-translate-y-2 transition"
          >
            <div className="flex justify-center">
              <img
                src={
                  user && user._id === c._id
                    ? user.profileImage
                    : c.profileImage || "https://cdn-icons-png.flaticon.com/512/219/219969.png"
                }
                className="w-28 h-28 object-cover rounded-full border-4 border-indigo-300"
              />
            </div>

            <h3 className="text-xl font-semibold text-center mt-3">{c.name}</h3>
            <p className="text-center mt-1 text-indigo-600 font-medium">
              {c.specialization || "General Counselor"}
            </p>

            <div className="mt-3 text-gray-700 space-y-1">
              <p><strong>Experience:</strong> {c.experience} Years</p>
              <p><strong>Bio:</strong> {c.bio}</p>
              <p><strong>Fee:</strong> ${c.sessionFee || 50}</p>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button
                className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                onClick={() => handleViewProfile(c._id)}
              >
                View Profile
              </button>

              <button
                className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
                onClick={() => handleBookingPage(c._id)}
                
              >
                Book Session
              </button>
            </div>

            {/* Show booked sessions if any */}
            {c.bookedSessions?.length > 0 && (
              <div className="mt-4 bg-gray-100 p-3 rounded-xl">
                <h4 className="font-medium text-gray-700 mb-2">Booked Sessions</h4>
                {c.bookedSessions.map((s, i) => (
                  <div key={i} className="text-sm text-gray-600 border-b last:border-none py-1">
                    {s.date} - {s.time} ({s.duration} mins)
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedCounselor && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-6 w-[400px] rounded-xl shadow-xl">

            <h3 className="text-xl font-bold mb-3">
              Book Session with {selectedCounselor.name}
            </h3>

            <div className="space-y-3">
              <select
                name="duration"
                className="w-full border p-2 rounded"
                value={bookingData.duration}
                onChange={handleBookingChange}
              >
                <option value="">Select Duration</option>
                <option value="30">30 Minutes</option>
                <option value="60">1 Hour</option>
              </select>

              <input
                type="date"
                name="date"
                className="w-full border p-2 rounded"
                value={bookingData.date}
                onChange={handleBookingChange}
              />

              <input
                type="time"
                name="time"
                className="w-full border p-2 rounded"
                value={bookingData.time}
                onChange={handleBookingChange}
              />

              {bookingData.duration && bookingData.date && bookingData.time ? (
                <PaymentButton
                  amount={selectedCounselor.sessionFee || 50}
                  counselorId={selectedCounselor._id}
                  booking={bookingData}
                />
              ) : (
                <p className="text-red-500 text-sm">
                  Fill all fields to continue
                </p>
              )}
            </div>

            <button
              className="mt-4 w-full bg-gray-300 py-2 rounded hover:bg-gray-400"
              onClick={closeBookingModal}
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Counselor;