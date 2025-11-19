import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { Send, Users, MessageSquare, User } from 'lucide-react';
import Layout from "../layout/Layout";

const socket = io("http://localhost:8000");

const AdminChat=()=> {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const token = Cookies.get("token");
    socket.emit("registerUser", { token });

    socket.on("newMessageToAdmin", (msg) => {
      setUsers((prev) => {
        const exists = prev.find((u) => u.userId === msg.userId);
        if (!exists)
          return [...prev, { userId: msg.userId, name: "Guest", lastMessage: msg.message, timestamp: new Date() }];
        
        // Update last message for existing user
        return prev.map(u => 
          u.userId === msg.userId 
            ? { ...u, lastMessage: msg.message, timestamp: new Date() }
            : u
        );
      });

      if (msg.userId === selectedUser) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    socket.on("loadChatHistory", (history) => {
      setMessages(history);
    });

    return () => socket.off();
  }, [selectedUser]);

  const openChat = (userId) => {
    setSelectedUser(userId);
    socket.emit("getChatHistory", userId);
  };

  const sendReply = (e) => {
    if (e) e.preventDefault();
    if (!selectedUser || !reply.trim()) return;

    const newMsg = {
      userId: selectedUser,
      message: reply,
      sender: "admin",
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newMsg]);
    socket.emit("adminReply", newMsg);
    setReply("");
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'G';
  };

  const selectedUserData = users.find(u => u.userId === selectedUser);

  return (

    <div className="  text-white p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="flex h-[600px]">
          {/* Users Sidebar */}
          <div className="w-80 bg-[#1b263b] border-r border-gray-700 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Active Chats</h2>
                  <p className="text-gray-300 text-sm">{users.length} users online</p>
                </div>
              </div>
            </div>

            {/* Users List */}
            <div className="flex-1 overflow-y-auto">
              {users.map((user, index) => (
                <div
                  key={user.userId}
                  onClick={() => openChat(user.userId)}
                  className={`p-4 border-b border-gray-700 cursor-pointer transition-all duration-200 ${
                    selectedUser === user.userId 
                      ? "bg-blue-600 border-l-4 border-l-blue-400" 
                      : "hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {getInitials(user.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-white truncate">
                          {user.name}
                        </h3>
                        {user.timestamp && (
                          <span className="text-xs text-gray-400 whitespace-nowrap">
                            {formatTime(user.timestamp)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-300 truncate">
                        {user.lastMessage || "No messages yet"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {users.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <MessageSquare className="w-12 h-12 mb-4 opacity-50" />
                  <p className="text-center">No active chats</p>
                  <p className="text-sm text-center mt-2">Waiting for users to message...</p>
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            {selectedUser ? (
              <div className="p-6 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {getInitials(selectedUserData?.name)}
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-800">
                      {selectedUserData?.name || "Guest"}
                    </h2>
                    <p className="text-sm text-gray-500">User ID: {selectedUser}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-3 text-gray-500">
                  <MessageSquare className="w-6 h-6" />
                  <h2 className="font-bold">Select a chat to start messaging</h2>
                </div>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 bg-gray-50 overflow-y-auto p-6">
              {selectedUser ? (
                <>
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <MessageSquare className="w-16 h-16 mb-4 opacity-50" />
                      <p className="text-lg">No messages yet</p>
                      <p className="text-sm mt-2">Start a conversation with this user</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            message.sender === "admin" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                              message.sender === "admin"
                                ? "bg-blue-600 text-white rounded-br-none"
                                : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <div className={`text-xs mt-1 ${
                              message.sender === "admin" ? "text-blue-200" : "text-gray-500"
                            }`}>
                              {formatTime(message.timestamp)}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <User className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-lg">Welcome to Admin Chat</p>
                  <p className="text-sm mt-2">Select a user from the sidebar to start chatting</p>
                </div>
              )}
            </div>

            {/* Message Input */}
            {selectedUser && (
              <div className="p-6 border-t border-gray-200 bg-white">
                <form onSubmit={sendReply} className="flex gap-3">
                  <input
                    type="text"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                  <button
                    type="submit"
                    disabled={!reply.trim()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  
  );
}

export default AdminChat;