import React, { useState, useRef, useEffect } from "react";
import Layout from "../layout/layout";

const Support = () => {
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const chatEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // Send message
  const sendMessage = () => {
    if (!message.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: message,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChat([...chat, newMsg]);
    setMessage("");
  };

  const joinChat = () => {
    setJoined(true);
    setChat([
      {
        id: "welcome",
        text: "Welcome to Support! How can we help you today?",
        sender: "support",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const leaveChat = () => {
    setJoined(false);
    setChat([]);
  };

  return (
    <Layout>
      <div className="min-h-screen flex justify-center items-center p-6">
        <div className="w-full max-w-3xl bg-[#0d1b2a] shadow-lg rounded-xl border border-gray-700 overflow-hidden">

          {/* Header */}
          <div className="p-4 bg-[#1b263b] border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-white text-xl font-semibold">Support Chat</h2>

            <span
              className={`px-3 py-1 text-sm rounded-full ${
                joined ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
              }`}
            >
              {joined ? "Online" : "Offline"}
            </span>
          </div>

          {/* Chat Body */}
          <div className="h-96 overflow-y-auto p-4 space-y-3">
            {chat.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-xl text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-200"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-[10px] opacity-70">{msg.time}</span>
                </div>
              </div>
            ))}

            <div ref={chatEndRef} />
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700 bg-[#1b263b]">

            {!joined ? (
              <button
                onClick={joinChat}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
              >
                Join Chat
              </button>
            ) : (
              <>
                {/* Message Input */}
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 bg-[#0d1b2a] text-white rounded-lg border border-gray-600 focus:outline-none"
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />

                  <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                  >
                    Send
                  </button>
                </div>

                {/* Leave Chat */}
                <button
                  onClick={leaveChat}
                  className="w-full mt-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold"
                >
                  Leave Chat
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Support;
