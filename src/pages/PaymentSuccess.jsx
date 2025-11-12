import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("sessionId");

  useEffect(() => {
    const confirmPayment = async () => {
      await fetch("http://localhost:5010/api/payments/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ sessionId }),
      });
    };

    confirmPayment();
  }, [sessionId]);

  return (
    <div className="success-container">
      <h2>✅ Payment Successful!</h2>
      <p>Your counseling session is confirmed.</p>
    </div>
  );
};

export default PaymentSuccess;
