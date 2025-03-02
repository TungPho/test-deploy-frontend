import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const url = import.meta.env.VITE_URL_DEPLOY_BACKEND;
const socket = io(`${url}`, {
  transports: ["websocket"],
}); // Khi deploy, thay URL backend

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  console.log(url);
  useEffect(() => {
    socket.on("chat message", (msg) => {
      console.log(msg);
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("chat message");
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chat message", message);
      setMessage("");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Socket.io Chat</h2>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
