import React, { useState } from "react";
// 🔑 MODIFIED: Import motion for the scroll effect personalization
import { motion } from "framer-motion";
import { X, Send, Shield, Zap } from "lucide-react";
import { Link } from "react-router";

// Animation Variants (using combination of fade-in and slide-in)
const modalVariants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.2,
      delayChildren: 0.3,
    },
  },
  exit: { opacity: 0, y: "100%" },
};

// Simple Chat Bubble Component
const ChatBubble = ({ message, sender }) => {
  const isBot = sender === "bot";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}>
      <div
        className={`max-w-xs px-4 py-3 rounded-xl shadow-lg text-sm ${
          isBot
            ? "bg-[#180045] text-white rounded-tl-none"
            : "bg-fuchsia-600 text-white rounded-tr-none"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

// New Logo Component (repeated for self-sufficiency)
const HelplyAILogo = ({ className = "w-8 h-8" }) => (
  <div className={`relative ${className}`}>
    <Shield className="w-full h-full text-white" strokeWidth={1.5} />
    <Zap
      className="absolute top-1/2 left-1/2 w-3 h-3 text-fuchsia-400 fill-fuchsia-400 transform -translate-x-1/2 -translate-y-1/2"
      strokeWidth={0}
    />
  </div>
);

// 🟢 Semantic Markup: <section> is appropriate for a primary content container like a modal
export default function ChatModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      message:
        "Hi there! I'm here to help answer your questions instantly. What would you like to know?",
      sender: "bot",
    },
    { id: 2, message: "How does your service work?", sender: "user" },
    {
      id: 3,
      message:
        "Our service is a B2B SaaS platform that integrates with your website to provide 24/7 support and intelligently qualify leads.",
      sender: "bot",
    },
  ]);

  const handleSend = () => {
    if (input.trim() !== "") {
      const newMessage = { id: Date.now(), message: input, sender: "user" };
      setMessages([...messages, newMessage]);
      setInput("");

      // Simulate Bot Response (simplified)
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            message:
              "I've noted your question! Is there anything else I can help with?",
            sender: "bot",
          },
        ]);
      }, 1000);
    }
  };

  return (
    // 🟢 Semantic Markup: Use a div role="dialog" for accessibility (Aria)
    <div
      className="fixed inset-0 z-[1000] bg-black bg-opacity-80 flex items-center justify-center p-4 transition-opacity"
      role="dialog"
      aria-modal="true"
    >
      {/* 🔑 PERSONALIZATION: Applied Framer Motion for scroll/fade effect */}
      <motion.section
        className="w-full sm:max-w-lg lg:max-w-2xl h-full max-h-[800px] flex flex-col bg-[#0A0027] rounded-xl shadow-2xl border border-[#1e004a]"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-[#210045]">
          <div className="flex items-center space-x-3">
            <HelplyAILogo className="w-6 h-6" />

            <div>
              <h2 className="text-white text-lg font-semibold">AI Assistant</h2>
              <span className="text-fuchsia-400 text-xs flex items-center">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
                Online now
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full"
            aria-label="Close chat"
          >
            <X size={24} />
          </button>
        </header>

        {/* Chat Body */}
        <main className="flex-grow  p-4 overflow-y-auto custom-scrollbar">
          {messages.map((msg) => (
            // 🔑 PERSONALIZATION: Applying Framer Motion animation to each message (scroll effect)
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChatBubble message={msg.message} sender={msg.sender} />
            </motion.div>
          ))}
        </main>

        {/* Input Footer */}
        <footer className="p-4 border-t border-[#210045]">
          <div className="flex items-center bg-[#180045] rounded-full p-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your question here..."
              className="flex-grow bg-transparent text-white placeholder-gray-500 border-none focus:ring-0 px-4 py-2 outline-none"
            />
            <button
              onClick={handleSend}
              className="p-3 bg-fuchsia-600 rounded-full text-white hover:bg-fuchsia-500 transition-colors disabled:opacity-50"
              disabled={input.trim() === ""}
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </div>
        </footer>
      </motion.section>
    </div>
  );
}

// Example usage is shown below after the second component.
