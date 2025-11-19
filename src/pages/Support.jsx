import React, { useState, useRef, useEffect } from "react";
import Layout from "../layout/Layout";
import AdminChat from "./Chat";

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
      <AdminChat/>
    </Layout>
  );
};

export default Support;
