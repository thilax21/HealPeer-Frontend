// import React, { useState } from "react";
// import API from "../api/api.js";

// const PaymentButton = ({ bookingId, amount }) => {
//   const [loading, setLoading] = useState(false);

//   const handlePay = async () => {
//     if (!bookingId) {
//       alert("Booking ID is required");
//       return;
//     }

//     setLoading(true);
//     try {
//       const { data } = await API.post("/payment/session", { bookingId });
      
//       // redirect to Stripe Checkout
//       if (data.url) {
//         window.location.href = data.url;
//       } else {
//         alert("No checkout URL returned.");
//       }
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Payment error: " + (err.response?.data?.message || err.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handlePay}
//       disabled={loading || !bookingId}
//       className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-200 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
//     >
//       {loading ? (
//         <>
//           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//           Processing...
//         </>
//       ) : (
//         <>Pay ${(amount / 100).toFixed(2) || 1.00} Now</>
//       )}
//     </button>
//   );
// };

// export default PaymentButton;

// import React, { useState } from "react";
// import API from "../api/api.js";

// const PaymentButton = ({ bookingId, amount }) => {
//   const [loading, setLoading] = useState(false);

//   const handlePay = async () => {
//     if (!bookingId) {
//       alert("Booking ID is required");
//       return;
//     }

//     if (amount < 200) {
//       alert("Minimum amount for Stripe payment is Rs. 200");
//       return;
//     }

//     setLoading(true);
//     try {
//       const { data } = await API.post("/payment/session", { bookingId });
      
//       if (data.url) {
//         window.location.href = data.url;
//       } else {
//         alert("No checkout URL returned.");
//       }
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Payment error: " + (err.response?.data?.message || err.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handlePay}
//       disabled={loading || !bookingId}
//       className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-200 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
//     >
//       {loading ? (
//         <>
//           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//           Processing...
//         </>
//       ) : (
//         <>Pay Rs. {amount} Now</>
//       )}
//     </button>
//   );
// };

// export default PaymentButton;


// import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import API from "../api/api.js";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// export default function PaymentButton({ bookingId, amount }) {
//   const [loading, setLoading] = useState(false);
//   const MIN_AMOUNT = 200; // Minimum amount for Stripe

//   const handlePayment = async () => {
//     if (!bookingId) {
//       alert("Booking ID is required");
//       return;
//     }

//     if (amount < MIN_AMOUNT) {
//       alert(`Minimum payment amount is Rs. ${MIN_AMOUNT}`);
//       return;
//     }

//     setLoading(true);
//     try {
//       const { data } = await API.post("/payment/create-checkout-session", { bookingId });
      
//       if (data.url) {
//         window.location.href = data.url;
//       } else {
//         alert("No checkout URL returned.");
//       }
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Payment error: " + (err.response?.data?.message || err.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handlePayment}
//       disabled={loading || !bookingId}
//       className="w-full bg-[#1c1917] text-white py-4 rounded-full font-bold uppercase tracking-widest disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
//     >
//       {loading ? (
//         <>
//           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//           Processing...
//         </>
//       ) : (
//         <>Pay Rs. {amount || 1000}</>
//       )}
//     </button>
//   );
// }

// import React from "react";
// import API from "../api/api";

// const PaymentButton = ({ bookingId, amount }) => {

//   const handlePayment = async () => {
//     try {
//       const { data } = await API.post("/payment/create-checkout-session", {
//         bookingId,
//         amount
//       });

//       if (data.url) {
//         window.location.href = data.url;   // 🔥 Stripe checkout redirect
//       }
//     } catch (error) {
//       alert("Payment Failed. Try again.");
//     }
//   };

//   return (
//     <button
//       onClick={handlePayment}
//       className="w-full bg-[#1c1917] text-white py-4 rounded-xl font-bold"
//     >
//       Proceed to Payment
//     </button>
//   );
// };

// export default PaymentButton;

import React, { useState } from "react";
import API from "../api/api";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

const PaymentButton = ({ bookingId, amount }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      // 1. Create Stripe checkout session on server
      const { data } = await API.post("/payment/create-checkout-session", {
        bookingId,
        amount,
      });

      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe not loaded");

      // 2. Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) throw error;
    } catch (err) {
      console.error(err);
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-[#3f6212] hover:bg-[#1c1917] text-white py-4 rounded-2xl font-bold transition-colors"
      >
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>
      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
    </div>
  );
};

export default PaymentButton;
