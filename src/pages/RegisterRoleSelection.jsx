import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterRoleSelection.css";

const RegisterRoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState("client");
  const navigate = useNavigate();

  const handleNext = () => {
    navigate(`/register/${selectedRole}`);
  };

  return (
    <div className="register-role-container">
      <h1>Heal<span>Peer</span></h1>
      <h2>Create a Heal Peer Account</h2>
      <p className="subtitle">
        Sign up to assist your clients on their path to a happier, healthier life.
      </p>

      <div className="cards-container">
        {/* Client Card */}
        <div
          className={`role-card ${
            selectedRole === "client" ? "selected-client" : ""
          }`}
          onClick={() => setSelectedRole("client")}
        >
          <div className="icon">👤</div>
          <div>
            <h3>I am a Client</h3>
            <p>Or register for someone else.</p>
          </div>
        </div>

        {/* Counselor Card */}
        <div
          className={`role-card ${
            selectedRole === "counselor" ? "selected-counselor" : ""
          }`}
          onClick={() => setSelectedRole("counselor")}
        >
          <div className="icon">💬</div>
          <div>
            <h3>I am a Counselor</h3>
            <p>Together let's ease the common mind.</p>
          </div>
          {selectedRole === "counselor" && <div className="tick">✓</div>}
        </div>
      </div>

      <button className="next-btn" onClick={handleNext}>
        NEXT
      </button>
    </div>
  );
};

export default RegisterRoleSelection;
