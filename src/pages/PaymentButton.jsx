import React from "react";
import API from "../api/api.js";

const PaymentButton = ({ bookingId }) => {
  const handlePay = async () => {
    try {
      const { data } = await API.post("/payment/session", { bookingId });
      // redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
    
      } else {
        alert("No checkout url returned.");
      }
    } catch (err) {
      console.error(err);
      alert("Payment error: " + err.message);
    }
  };

  return <button onClick={handlePay}>Pay Now</button>;
};

export default PaymentButton;
