import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Chatmessage from "./Chatmessage";

const ChatPage = () => {
  const { otherId } = useParams(); // otherId = the person you chat with
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({ id: "", role: "" });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");
    
    if (!userId || !userRole) {
      navigate("/login");
      return;
    }
    
    setCurrentUser({ id: userId, role: userRole });
  }, [navigate]);

  if (!currentUser.id) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Loading...</p>
      </div>
    );
  }

  // Determine roles
  const counselorId = currentUser.role === "client" ? otherId : currentUser.id;
  const clientId = currentUser.role === "client" ? currentUser.id : otherId;

  return (
    <div>
      <div style={{ padding: "20px", textAlign: "center", backgroundColor: "#7b5bff", color: "white" }}>
        <h2>Chat Room</h2>
        <p>You are chatting as {currentUser.role === "client" ? "Client" : "Counselor"}</p>
      </div>
      <Chatmessage 
        counselorId={counselorId} 
        clientId={clientId} 
        userId={currentUser.id} 
      />
    </div>
  );
};

export default ChatPage;
