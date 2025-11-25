import { useState } from "react";
import API from "../api/api";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await API.post("/chat", { messages: newMessages });
      const botMsg = { role: "bot", text: res.data.reply };
      setMessages([...newMessages, botMsg]);
    } catch (err) {
      console.error(err);
      alert("Error contacting AI server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "400px",
          overflowY: "auto",
          marginBottom: "10px",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.role === "user" ? "right" : "left",
              margin: "5px 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "15px",
                backgroundColor: m.role === "user" ? "#007bff" : "#f1f1f1",
                color: m.role === "user" ? "#fff" : "#000",
              }}
            >
              {m.text}
            </span>
          </div>
        ))}
        {loading && <div><em>Bot is typing...</em></div>}
      </div>

      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && sendMessage()}
        placeholder="Type your message..."
        style={{ width: "80%", padding: "10px", marginRight: "10px" }}
      />
      <button onClick={sendMessage} style={{ padding: "10px 20px" }}>
        Send
      </button>
    </div>
  );
}

export default Chat;
