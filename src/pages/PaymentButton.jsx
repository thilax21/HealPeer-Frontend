import React from "react";
import axios from "axios";

const PaymentButton = ({ amount, counselorId, counselorName, type }) => {
  const handlePayment = async () => {
    try {
      const endpoint = type === "admin" ? "/api/payment/admin-payout" : "/api/payment/session";

      const { data } = await axios.post(`http://localhost:5011${endpoint}`, {
        amount,
        counselorId,
        counselorName,
      });

      window.location.href = data.url; // Redirect to Stripe Checkout
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <button onClick={handlePayment}>
      {type === "admin" ? "Pay Now" : `Pay $${amount} & Book Session`}
    </button>
  );
};

export default PaymentButton;
