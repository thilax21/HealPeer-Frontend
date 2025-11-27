

// import { useState, useRef, useEffect } from "react";
// import API from "../api/api";

// function Chat() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const chatEndRef = useRef(null);

//   const scrollToBottom = () => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(scrollToBottom, [messages, loading]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMsg = { role: "user", text: input };
//     const newMessages = [...messages, userMsg];
//     setMessages(newMessages);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await API.post("/chat", { messages: newMessages });
//       const botMsg = { role: "bot", text: res.data.reply };
//       setMessages([...newMessages, botMsg]);
//     } catch {
//       alert("Error contacting AI server");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{

//         maxWidth: "800px",
//         margin: "50px auto",
//         border: "1px solid #ddd",
//         borderRadius: "18px",
//         overflow: "hidden",
//         boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//         marginBottom:"295px"
//       }}
//     >

//       {/* Header */}
//       <div
//         style={{
//           background: "linear-gradient(90deg, #7b5bff, #5ad4ff)",
//           padding: "15px",
//           color: "white",
//           fontSize: "18px",        width: "100%",
//           fontWeight: "bold",
//           textAlign: "center",
//         }}
//       >
//         HealPeer AI Chat Assistant
//       </div>

//       {/* Chat Area */}
//       <div
//         style={{
//           height: "420px",
//           overflowY: "auto",
//           padding: "20px",
//           backgroundColor: "#f4f7fb",
//         }}
//       >
//         {messages.map((m, i) => (
//           <div
//             key={i}
//             style={{
//               display: "flex",
//               justifyContent: m.role === "user" ? "flex-end" : "flex-start",
//               marginBottom: "12px",
//             }}
//           >
//             <div
//               style={{
//                 maxWidth: "70%",
//                 padding: "12px 16px",
//                 borderRadius: "18px",
//                 background:
//                   m.role === "user"
//                     ? "linear-gradient(90deg, #7b5bff, #5ad4ff)"
//                     : "#ffffff",
//                 color: m.role === "user" ? "#fff" : "#000",
//                 fontSize: "15px",
//                 lineHeight: "1.4",
//                 boxShadow:
//                   m.role === "user"
//                     ? "0 3px 10px rgba(123,91,255,0.3)"
//                     : "0 3px 10px rgba(0,0,0,0.08)",
//               }}
//             >
//               {m.text}
//             </div>
//           </div>
//         ))}

//         {loading && (
//           <div style={{ marginBottom: "10px", opacity: 0.6 }}>
//             <div
//               style={{
//                 padding: "10px 15px",
//                 background: "#fff",
//                 display: "inline-block",
//                 borderRadius: "12px",
//                 fontStyle: "italic",
//                 color: "#555",
//                 boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
//               }}
//             >
//               Bot is typing...
//             </div>
//           </div>
//         )}

//         <div ref={chatEndRef} />
//       </div>

//       {/* Input Area */}
//       <div
//         style={{
//           padding: "15px",
//           display: "flex",
//           gap: "10px",
//           background: "#fff",
//           borderTop: "1px solid #eee",
//         }}
//       >
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Type your message..."
//           style={{
//             flex: 1,
//             padding: "12px 15px",
//             borderRadius: "20px",
//             border: "1px solid #ccc",
//             fontSize: "15px",
//             outline: "none",
//             backgroundColor: "#f9f9f9",
//           }}
//         />

//         <button
//           onClick={sendMessage}
//           style={{
//             padding: "12px 20px",
//             border: "none",
//             borderRadius: "20px",
//             background: "linear-gradient(90deg, #7b5bff, #5ad4ff)",
//             color: "#fff",
//             fontWeight: "bold",
//             cursor: "pointer",
//             fontSize: "15px",
//             boxShadow: "0 3px 10px rgba(91,91,255,0.4)",
//           }}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Chat;

import { useState, useRef, useEffect } from "react";
import API from "../api/api";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionStart, setSessionStart] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const chatEndRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Countdown timer
  useEffect(() => {
    if (!sessionStart) return;
    const interval = setInterval(() => {
      const remaining = 300 - Math.floor((Date.now() - sessionStart) / 1000);
      setTimeLeft(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionStart]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Start session on first message
    if (!sessionStart) setSessionStart(Date.now());

    // 5 min limit check
    if (sessionStart && Date.now() - sessionStart > 300000) {
      setMessages(prev => [
        ...prev,
        { role: "bot", text: "⏳ Your free 5-minute chat session has ended. Please upgrade to continue chatting." }
      ]);
      return;
    }

    const userMsg = { role: "user", text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await API.post("/chat/chat", { messages: newMessages, sessionStart });
      const botMsg = { role: "bot", text: res.data.reply };
      setMessages([...newMessages, botMsg]);
      if (res.data.reply === "DAILY_LIMIT_REACHED") {
        setShowPopup(true);
        setLoading(false);
        return;
      }
      
    } catch (err) {
      console.error(err);
      alert("Error contacting AI server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      {/* Timer */}
      {sessionStart && timeLeft > 0 && (
        <div style={{ textAlign: "center", color: "#777", marginBottom: "8px" }}>
          ⏳ Time left: {timeLeft}s
        </div>
      )}

      {/* Chat Box */}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "15px",
          height: "400px",
          padding: "15px",
          overflowY: "auto",
          backgroundColor: "#f4f7fb",
          margin:"30px Auto",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              marginBottom: "12px"
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "10px 14px",
                borderRadius: "18px",
                background: m.role === "user" ? "linear-gradient(90deg,#7b5bff,#5ad4ff)" : "#fff",
                color: m.role === "user" ? "#fff" : "#000",
                boxShadow: m.role === "user" ? "0 3px 10px rgba(123,91,255,0.3)" : "0 3px 10px rgba(0,0,0,0.1)",
              }}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div
            style={{
              padding: "10px 15px",
              borderRadius: "12px",
              fontStyle: "italic",
              opacity: 0.7,
              background: "#fff",
              width: "fit-content"
            }}
          >
            Bot is typing...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div style={{ display: "flex", marginTop: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder={timeLeft === 0 ? "Session ended" : "Type your message..."}
          disabled={timeLeft === 0}
          style={{
            flex: 1,
            padding: "12px 15px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            outline: "none",
            backgroundColor: timeLeft === 0 ? "#eee" : "#f9f9f9"
          }}
        />
        <button
          onClick={sendMessage}
          disabled={timeLeft === 0}
          style={{
            marginLeft: "10px",
            padding: "12px 20px",
            borderRadius: "20px",
            border: "none",
            background: timeLeft === 0 ? "#999" : "linear-gradient(90deg,#7b5bff,#5ad4ff)",
            color: "#fff",
            cursor: timeLeft === 0 ? "not-allowed" : "pointer"
          }}
        >
          Send
        </button>
      </div>
      {showPopup && (
  <div style={{
    position: "fixed",
    top: "0", left: "0", right: "0", bottom: "0",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }}>
    <div style={{
      width: "380px",
      padding: "20px",
      background: "#fff",
      borderRadius: "12px",
      textAlign: "center",
      boxShadow: "0 5px 20px rgba(0,0,0,0.2)"
    }}>
      <h3>Chat Limit Reached</h3>
      <p>
        Your free 5-minute chat for today has ended.<br/>
        Would you like to connect with a counselor?
      </p>

      <button
        style={{
          padding: "10px 18px",
          borderRadius: "20px",
          marginTop: "10px",
          marginRight: "10px",
          border: "none",
          background: "linear-gradient(90deg,#7b5bff,#5ad4ff)",
          color: "#fff",
          cursor: "pointer"
        }}
        onClick={() => window.location.href = "/counselors"}
      >
        Connect Now
      </button>

      <button
        style={{
          padding: "10px 18px",
          borderRadius: "20px",
          marginTop: "10px",
          border: "1px solid #ccc",
          background: "#eee",
          cursor: "pointer"
        }}
        onClick={() => setShowPopup(false)}
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
}

export default Chat;
