// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";
// import "../styles/CounselorList.css"; // optional external styling
// import PaymentButton from "../components/PaymentButton.jsx";
// const Counselor = ({ user }) => {
//   const [counselors, setCounselors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCounselors = async () => {
//       try {
//         const { data } = await API.get("/counselors/all"); // ✅ fixed endpoint
//         setCounselors(data.data);
//       } catch (err) {
//         console.error("Error fetching counselors:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCounselors();
//   }, []);

//   const handleViewProfile = (id) => {
//     navigate(`/counselor/${id}`);
//   };

 

//   const handleBookSession = (counselor) => {
//     if (!user) {
//       alert("Please login first");
//       navigate("/login");
//       return;
//     }
//     if (user.role !== "client") {
//       alert("Only clients can book sessions");
//       return;
//     }
  
//     // Redirect to Stripe Checkout
//     navigate(`/book-session/${counselor._id}`); // optional if you want to show booking page
//   };

//   if (loading) return <p style={{ textAlign: "center" }}>Loading counselors...</p>;

//   return (
//     <div className="counselor-list-container">
//       <h2>Meet Our Counselors</h2>
//       {counselors.length === 0 ? (
//         <p>No counselors available at the moment.</p>
//       ) : (
//         <div className="counselor-grid">
//           {counselors.map((c) => (
//             <div className="counselor-card" key={c._id}>
//               <img
//                 src={
//                   c.profileImage ||
//                   "https://cdn-icons-png.flaticon.com/512/219/219969.png"
//                 }
//                 alt={c.name}
//                 className="counselor-img"
//               />
//               <h3>{c.name}</h3>
//               <p><strong>Specialization:</strong> {c.specialization || "Not specified"}</p>
//               <p><strong>Experience:</strong> {c.experience || "Not available"}</p>
//               <p><strong>Bio:</strong> {c.bio || "No bio provided"}</p>
//               <p><strong>Contact:</strong> {c.contactNumber || "Not provided"}</p>

//               <div style={{ marginTop: "10px" }}>
//                 <button onClick={() => handleViewProfile(c._id)}>View Profile</button>
//                 <button onClick={() => handleBookSession(c._id)} style={{ marginLeft: "10px" }}>
//                   Book Session
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Counselor;

import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/CounselorList.css";
import PaymentButton from "../pages/PaymentButton"; // <-- import payment button

const Counselor = ({ user }) => {
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const { data } = await API.get("/counselors/all");
        setCounselors(data.data);
      } catch (err) {
        console.error("Error fetching counselors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounselors();
  }, []);

  const handleViewProfile = (id) => {
    navigate(`/counselor/${id}`);
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading counselors...</p>;

  return (
    <div className="counselor-list-container">
      <h2>Meet Our Counselors</h2>
      {counselors.length === 0 ? (
        <p>No counselors available at the moment.</p>
      ) : (
        <div className="counselor-grid">
          {counselors.map((c) => (
            <div className="counselor-card" key={c._id}>
              <img
                src={
                  c.profileImage ||
                  "https://cdn-icons-png.flaticon.com/512/219/219969.png"
                }
                alt={c.name}
                className="counselor-img"
              />
              <h3>{c.name}</h3>
              <p><strong>Specialization:</strong> {c.specialization || "Not specified"}</p>
              <p><strong>Experience:</strong> {c.experience || "Not available"}</p>
              <p><strong>Bio:</strong> {c.bio || "No bio provided"}</p>
              <p><strong>Contact:</strong> {c.contactNumber || "Not provided"}</p>

              <div style={{ marginTop: "10px" }}>
                <button onClick={() => handleViewProfile(c._id)}>View Profile</button>

                {user && user.role === "client" ? (
                  <PaymentButton
                    amount={c.sessionFee || 50} // session fee from backend
                    counselorId={c._id}
                    counselorName={c.name}
                    type="client"
                  />
                ) : (
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                      if (!user) {
                        alert("Please login first to book a session");
                        navigate("/login");
                      } else {
                        alert("Only clients can book counseling sessions.");
                      }
                    }}
                  >
                    Book Session
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Counselor;

