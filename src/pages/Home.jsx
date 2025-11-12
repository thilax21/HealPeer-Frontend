import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Welcome to HealPeer</h1>
      <p>Your online platform for mental health counseling and guidance.</p>

      <div style={{ marginTop: "30px" }}>
        <Link to="/register" style={buttonStyle}>Register</Link>
        <Link to="/login" style={{ ...buttonStyle, marginLeft: "10px" }}>Login</Link>
      </div>

      <section style={{ marginTop: "50px" }}>
        <h2>Our Services</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>🧠 Personal Counseling</li>
          <li>💬 Online Chat with Counselors</li>
          <li>✍️ Blog Writing & Sharing</li>
          <li>📅 Book Counseling Sessions</li>
        </ul>
      </section>
    </div>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#0077cc",
  color: "#fff",
  borderRadius: "5px",
  textDecoration: "none",
};

export default Home;
