
// import React, { useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import API from "../api/api";

// const PaymentSuccess = () => {
//   const [params] = useSearchParams();
//   const sessionId = params.get("session_id");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const confirmPaymentAndBook = async () => {
//       try {
//         // 1️⃣ Confirm payment with Stripe (optional)
//         await API.post("/payments/confirm", { sessionId });

//         // 2️⃣ Create session in backend (need booking info stored in localStorage or via backend)
//         const bookingData = JSON.parse(localStorage.getItem("bookingData"));
//         if (bookingData) {
//           await API.post("/sessions/book", bookingData, {
//             headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//           });
//           localStorage.removeItem("bookingData");
//         }

//         alert("✅ Session booked successfully!");
//         navigate("/my-sessions");
//       } catch (err) {
//         console.error(err);
//         alert("Booking failed");
//       }
//     };

//     confirmPaymentAndBook();
//   }, [sessionId, navigate]);

//   return (
//     <div className="text-center py-20">
//       <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h2>
//       <p>Your session is being confirmed...</p>
//     </div>
//   );
// };

// export default PaymentSuccess;

import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../api/api";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const navigate = useNavigate();

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        // Confirm Stripe session
        await API.post("/payments/confirm", { sessionId });

        // Create session booking
        const bookingData = JSON.parse(localStorage.getItem("bookingData"));
        if (bookingData) {
          await API.post("/sessions/book", bookingData, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          localStorage.removeItem("bookingData");
        }

        setTimeout(() => {
          navigate("/my-sessions");
        }, 2000); // Redirect after 2 seconds
      } catch (error) {
        console.error(error);
        alert("Something went wrong. Try again.");
        navigate("/counselors");
      }
    };

    confirmPayment();
  }, [sessionId, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50 text-center px-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full animate-fadeIn">
        <div className="text-green-600 text-5xl mb-4">✓</div>

        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Successful!
        </h2>

        <p className="text-gray-600 text-lg">
          Your session is being confirmed.  
          You’ll be redirected shortly...
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
