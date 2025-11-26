import React, { useState } from "react";
import API from "../api/api.js";

const PaymentButton = ({ bookingId, amount }) => {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (!bookingId) {
      alert("Booking ID is required");
      return;
    }

    setLoading(true);
    try {
      const { data } = await API.post("/payment/session", { bookingId });
      
      // redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("No checkout URL returned.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment error: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePay}
      disabled={loading || !bookingId}
      className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-200 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Processing...
        </>
      ) : (
        <>Pay ${amount || 50} Now</>
      )}
    </button>
  );
};

export default PaymentButton;
