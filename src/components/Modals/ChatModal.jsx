import React, { useState, useEffect } from "react";
// 🔑 MODIFIED: Import motion for the scroll effect personalization
import { motion } from "framer-motion";
import { X, Send, Shield, Zap } from "lucide-react";
import { Link } from "react-router";
import { supabase } from "../../utils/supabase";

// Animation Variants (using combination of fade-in and slide-in)
const modalVariants = {
  hidden: {
    opacity: 0,
    // 🔑 OPTIMIZED: Use translateZ(0) for hardware acceleration (force GPU layer)
    // 🔑 MODIFIED: Use translateY for faster, smoother movement than 'y'
    transform: "translateY(100%) translateZ(0)",
  },
  visible: {
    opacity: 1,
    // 🔑 OPTIMIZED: Target transform directly
    transform: "translateY(0%) translateZ(0)",
    transition: {
      // 🔑 MODIFIED: Changed from 'spring' to 'tween' for predictable, lightweight motion
      type: "tween",
      ease: "easeOut", // Standard smooth easing
      duration: 0.3, // Slightly increased duration (from 0.2) to feel less jarring, but still fast
      delayChildren: 0.1, // Reduced delay to feel snappier
    },
  },
  exit: {
    opacity: 0,
    transform: "translateY(100%) translateZ(0)",
    transition: {
      duration: 0.2, // Fast exit
    },
  },
};

// Simple Chat Bubble Component
const ChatBubble = ({ message }) => {
  const isBot = message.sender_type === "bot";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}>
      <div
        className={`max-w-xs px-4 py-3 rounded-xl shadow-lg text-sm ${
          isBot
            ? "bg-[#180045] text-white rounded-tl-none"
            : "bg-fuchsia-600 text-white rounded-tr-none"
        }`}
      >
        {message.content}
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
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(false);

  // For demo, use a fixed tenant_id. In production, this should be dynamic
  const tenantId = "550e8400-e29b-41d4-a716-446655440000"; // Example UUID

  // Create or get conversation
  useEffect(() => {
    if (!isOpen) return;

    const initializeConversation = async () => {
      // For demo, create a new conversation each time. In production, use session storage or user ID
      const customerId = `customer_${Date.now()}`;

      const { data, error } = await supabase
        .from("conversations")
        .insert({
          tenant_id: tenantId,
          customer_id: customerId,
          status: "open",
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating conversation:", error);
        return;
      }

      setConversation(data);
    };

    initializeConversation();
  }, [isOpen]);

  // Subscribe to conversation changes
  useEffect(() => {
    if (!conversation) return;

    const channel = supabase
      .channel(`conversation_${conversation.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
          filter: `id=eq.${conversation.id}`,
        },
        (payload) => {
          setConversation(payload.new);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversation.id}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversation]);

  // Fetch existing messages
  useEffect(() => {
    if (!conversation) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversation.id)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
        return;
      }

      setMessages(data);
    };

    fetchMessages();
  }, [conversation]);

  const handleSend = async () => {
    if (input.trim() === "" || !conversation) return;

    setLoading(true);

    // Add user message
    const { error: msgError } = await supabase.from("messages").insert({
      conversation_id: conversation.id,
      sender_type: "user",
      content: input,
    });

    if (msgError) {
      console.error("Error sending message:", msgError);
      setLoading(false);
      return;
    }

    setInput("");

    // Check conversation status
    if (conversation.status === "human") {
      // Send to realtime channel for agent
      // For now, just add a placeholder response
      setTimeout(async () => {
        await supabase.from("messages").insert({
          conversation_id: conversation.id,
          sender_type: "agent",
          sender_id: conversation.assigned_agent_id,
          content: "This is a human agent response.",
        });
      }, 1000);
    } else {
      // Send to AI (placeholder)
      setTimeout(async () => {
        await supabase.from("messages").insert({
          conversation_id: conversation.id,
          sender_type: "bot",
          content: "This is an AI response.",
        });
      }, 1000);
    }

    setLoading(false);
  };

  if (!isOpen) return null;

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
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id ?? index}
              initial={{ opacity: 0, x: msg.sender_type === "user" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChatBubble message={msg} />
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
              onKeyPress={(e) => e.key === "Enter" && !loading && handleSend()}
              placeholder="Type your question here..."
              className="flex-grow bg-transparent text-white placeholder-gray-500 border-none focus:ring-0 px-4 py-2 outline-none"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              className="p-3 bg-fuchsia-600 rounded-full text-white hover:bg-fuchsia-500 transition-colors disabled:opacity-50"
              disabled={input.trim() === "" || loading}
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
