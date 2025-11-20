// import React from "react";
// import axios from "axios";

// const PaymentButton = ({ amount, counselorId, counselorName, type }) => {
//   const handlePayment = async () => {
//     try {
//       const endpoint = type === "admin" ? "/api/payment/admin-payout" : "/api/payment/session";

//       const { data } = await axios.post(`http://localhost:3000${endpoint}`, {
//         amount,
//         counselorId,
//         counselorName,
//       });

//       window.location.href = data.url; // Redirect to Stripe Checkout
//     } catch (err) {
//       console.error(err);
//       alert("Payment failed");
//     }
//   };

//   return (
//     <button onClick={handlePayment}>
//       {type === "admin" ? "Pay Now" : `Pay $${amount} & Book Session`}
//     </button>
//   );
// };

// export default PaymentButton;


import React from "react";
import axios from "axios";

const PaymentButton = ({ amount, counselorId, counselorName, booking }) => {
  const handlePayment = async () => {
    console.log("Sending to backend:", { amount, counselorId, booking });

    try {
      // 1️⃣ Create Stripe session
      const { data } = await axios.post("http://localhost:3000/api/payment/session", {
        amount,
        counselorName,
      });

      // 2️⃣ Redirect to Stripe Checkout
      const stripeSessionUrl = data.url;
      window.location.href = stripeSessionUrl;

      // Note: After payment, redirect will go to /success page
      // There, you can call the backend to create a booked session
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
    >
      Pay ${amount} & Book Session
    </button>
  );
};

export default PaymentButton;
