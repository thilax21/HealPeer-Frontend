// import { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const BokingSuccess = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     // Optional: get session_id from URL if needed
//     const params = new URLSearchParams(location.search);
//     const sessionId = params.get("session_id");
//     console.log("Payment successful. Stripe session:", sessionId);

//     // Wait 2 seconds then navigate to home page
//     const timer = setTimeout(() => {
//       navigate("/"); // home page
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [navigate, location]);

//   return (
//     <div style={{ textAlign: "center", marginTop: 50 }}>
//       <h2>Payment Successful ✅</h2>
//       <p>Redirecting to home page...</p>
//     </div>
//   );
// };

// export default BokingSuccess;




import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const BokingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");

    if (sessionId) {
      // fetch updated booking
      axios
        .get(`http://localhost:3000/api/booking/session/${sessionId}`)
        .then((res) => {
          if (res.data.success) {
            setBooking(res.data.booking);
          }
        })
        .catch((err) => console.error(err));
    }

    const timer = setTimeout(() => {
      navigate("/"); // redirect after 2s
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, location]);

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>Payment Successful ✅</h2>
      {booking && (
        <p>
          Booking Status: <strong>{booking.status}</strong>
        </p>
      )}
      <p>Redirecting to home page...</p>
    </div>
  );
};

export default BokingSuccess;
