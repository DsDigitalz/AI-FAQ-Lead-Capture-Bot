import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Send,
  User,
  Tag,
  Search,
  CornerUpLeft,
  MessageCircle,
  XCircle,
  Info,
  Paperclip,
  ClipboardList,
  Clock,
  CheckCircle,
  Mail,
} from "lucide-react";
import { supabase } from "../../utils/supabase";
import { useAuth } from "../../contexts/AuthContext";

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.1 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

// --- Sub-Components ---
const ConversationItem = ({ convo, isSelected, onClick }) => {
  const lastMessage = convo.messages?.[convo.messages.length - 1];

  return (
    <motion.div
      variants={itemVariants}
      onClick={onClick}
      className={`p-3 border-b cursor-pointer transition-colors ${
        isSelected
          ? "bg-fuchsia-900/40 border-fuchsia-600"
          : "bg-[#140036] border-[#210045] hover:bg-fuchsia-900/20"
      }`}
    >
      <div className="flex justify-between items-center">
        <span
          className={`font-semibold truncate ${
            isSelected ? "text-white" : "text-gray-200"
          }`}
        >
          {convo.title ||
            `Session ${convo.session_id?.slice(0, 8) ?? convo.id?.slice(0, 8)}`}
        </span>
        <span className="text-xs text-gray-500 ml-2 shrink-0">
          {convo.updated_at
            ? new Date(convo.updated_at).toLocaleTimeString()
            : ""}
        </span>
      </div>
      <p className="text-sm text-gray-400 truncate mt-1">
        {lastMessage?.content || "No messages yet"}
      </p>
      <div className="flex items-center justify-between mt-2 text-xs">
        <span className="text-fuchsia-400 flex items-center space-x-1">
          <MessageCircle size={14} />
          <span>Status: {convo.status}</span>
        </span>
      </div>
    </motion.div>
  );
};

const ChatBubble = ({ message }) => {
  const isAgent = message.sender_type === "agent";
  const isBot = message.sender_type === "bot";
  const isInternal = message.sender_type === "internal";

  if (isInternal) {
    return (
      <div className="text-center my-4">
        <span className="text-xs text-gray-500 bg-[#1e004a] px-3 py-1 rounded-full border border-[#210045] flex items-center justify-center mx-auto w-max">
          <ClipboardList size={14} className="mr-1" />
          Internal Note: {message.content}
        </span>
      </div>
    );
  }

  return (
    <motion.div
      variants={itemVariants}
      className={`flex mb-4 ${isAgent ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xs lg:max-w-md p-3 rounded-xl shadow-lg ${
          isAgent
            ? "bg-fuchsia-600 text-white rounded-br-none"
            : isBot
              ? "bg-[#1e004a] text-gray-300 rounded-tl-none border border-[#210045]"
              : "bg-[#140036] text-gray-200 rounded-tl-none border border-[#210045]"
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <span
          className={`block mt-1 text-right text-xs ${
            isAgent ? "text-fuchsia-200" : "text-gray-500"
          }`}
        >
          {message.created_at
            ? new Date(message.created_at).toLocaleTimeString()
            : ""}
        </span>
      </div>
    </motion.div>
  );
};

// --- Main Component ---
export default function TeamInbox() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConvo, setSelectedConvo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  // --- Fetch Messages for a conversation ---
  const fetchMessages = useCallback(async (conversationId) => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
      return;
    }

    setMessages(data || []);
  }, []);

  // --- Fetch Conversations ---
  const fetchConversations = useCallback(
    async (tenantId) => {
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .eq("tenant_id", tenantId)
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Error fetching conversations:", error);
        setError(error.message);
        setLoading(false);
        return;
      }

      setConversations(data || []);

      if (data && data.length > 0) {
        setSelectedConvo(data[0]);
        fetchMessages(data[0].id);
      }

      setLoading(false);
    },
    [fetchMessages],
  );

  // --- Fetch Profile and bootstrap ---
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Profile error:", error);
        setError(error.message);
        setLoading(false);
        return;
      }

      if (!data) {
        setError(
          "No profile found for your account. Please contact your administrator.",
        );
        setLoading(false);
        return;
      }

      if (!data.tenant_id) {
        setError(
          "Your profile is not linked to a workspace. Please contact your administrator.",
        );
        setLoading(false);
        return;
      }

      setProfile(data);
      fetchConversations(data.tenant_id);
    };

    fetchProfile();
  }, [user, fetchConversations]);

  // --- Realtime: Subscribe to new messages for selected conversation ---
  useEffect(() => {
    if (!selectedConvo) return;

    const channel = supabase
      .channel(`messages_${selectedConvo.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${selectedConvo.id}`,
        },
        (payload) => {
          setMessages((prev) => {
            // Avoid duplicates
            const exists = prev.some((m) => m.id === payload.new.id);
            if (exists) return prev;
            return [...prev, payload.new];
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedConvo?.id]);

  // --- Realtime: Subscribe to conversation updates ---
  useEffect(() => {
    if (!profile?.tenant_id) return;

    const channel = supabase
      .channel("conversations_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "conversations",
          filter: `tenant_id=eq.${profile.tenant_id}`,
        },
        (payload) => {
          setConversations((prev) => [payload.new, ...prev]);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "conversations",
          filter: `tenant_id=eq.${profile.tenant_id}`,
        },
        (payload) => {
          setConversations((prev) =>
            prev.map((c) => (c.id === payload.new.id ? payload.new : c)),
          );
          setSelectedConvo((prev) =>
            prev?.id === payload.new.id ? { ...prev, ...payload.new } : prev,
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile?.tenant_id]);

  // --- Handle conversation selection ---
  const handleSelectConvo = (convo) => {
    setSelectedConvo(convo);
    setMessages([]);
    fetchMessages(convo.id);
  };

  // --- Handle send reply ---
  const handleSendReply = async () => {
    if (!replyText.trim() || !selectedConvo || !user) return;

    setSending(true);

    const { error } = await supabase.from("messages").insert({
      conversation_id: selectedConvo.id,
      tenant_id: profile.tenant_id,
      sender_type: "agent",
      user_id: user.id,
      content: replyText.trim(),
    });

    if (error) {
      console.error("Error sending reply:", error);
      setSending(false);
      return;
    }

    setReplyText("");
    setSending(false);
  };

  // --- Handle take over conversation ---
  const handleTakeOver = async (conversationId) => {
    if (!user) return;

    const { error } = await supabase
      .from("conversations")
      .update({
        status: "human",
        assigned_agent_id: user.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", conversationId);

    if (error) {
      console.error("Error taking over conversation:", error);
    }
  };

  // --- Handle close conversation ---
  const handleCloseConvo = async () => {
    if (!selectedConvo) return;

    const { error } = await supabase
      .from("conversations")
      .update({ status: "closed" })
      .eq("id", selectedConvo.id);

    if (error) {
      console.error("Error closing conversation:", error);
    }
  };

  // --- Render: Error State ---
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-4 p-8">
        <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-2xl text-center max-w-md">
          <p className="text-red-400 font-semibold text-lg mb-2">
            Error Loading Team Inbox
          </p>
          <p className="text-gray-400 text-sm">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setLoading(true);
            }}
            className="mt-4 px-6 py-2 bg-fuchsia-600 rounded-lg text-white hover:bg-fuchsia-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // --- Render: Loading State ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-pulse text-fuchsia-400 font-semibold">
          Loading conversations...
        </div>
      </div>
    );
  }

  // --- Render: Main UI ---
  return (
    <motion.section
      className="mt-18 lg:mt-0 h-[calc(100vh-6rem)] grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)_300px] gap-4 text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ===== Left Pane - Conversation List ===== */}
      <motion.div
        variants={containerVariants}
        className="bg-[#140036] rounded-xl shadow-xl flex flex-col h-full overflow-hidden border border-[#210045]"
      >
        <div className="p-4 border-b border-[#210045]">
          <h2 className="text-xl font-bold">Team Inbox</h2>
          <p className="text-xs text-gray-500 mt-1">
            {conversations.length} conversation
            {conversations.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="p-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-[#1e004a] border border-[#210045] rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 text-white"
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {conversations.length === 0 ? (
            <div className="p-6 text-center text-gray-500 text-sm">
              No conversations yet.
            </div>
          ) : (
            conversations.map((convo, index) => (
              <ConversationItem
                key={convo.id ?? index}
                convo={convo}
                isSelected={convo.id === selectedConvo?.id}
                onClick={() => handleSelectConvo(convo)}
              />
            ))
          )}
        </div>
      </motion.div>

      {/* ===== Center Pane - Chat Window ===== */}
      <motion.div
        variants={containerVariants}
        className="bg-[#140036] rounded-xl shadow-xl flex flex-col h-full overflow-hidden border border-[#210045]"
      >
        {selectedConvo ? (
          <>
            {/* Chat Header */}
            <header className="p-4 border-b border-[#210045] flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {selectedConvo.title ||
                    `Session ${
                      selectedConvo.session_id?.slice(0, 8) ??
                      selectedConvo.id?.slice(0, 8)
                    }`}
                </h2>
                <p className="text-sm text-gray-400 flex items-center space-x-2">
                  <MessageCircle size={14} />
                  <span>Status: {selectedConvo.status}</span>
                </p>
              </div>
              <div className="flex space-x-2">
                {selectedConvo.status !== "human" && (
                  <button
                    onClick={() => handleTakeOver(selectedConvo.id)}
                    className="flex items-center space-x-2 bg-green-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    <User size={16} />
                    <span>Take Over</span>
                  </button>
                )}
                {selectedConvo.status !== "closed" && (
                  <button
                    onClick={handleCloseConvo}
                    className="flex items-center space-x-2 bg-fuchsia-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-fuchsia-700 transition-colors"
                  >
                    <CornerUpLeft size={16} />
                    <span>Close</span>
                  </button>
                )}
              </div>
            </header>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.length === 0 ? (
                <p className="text-center text-gray-500 text-sm mt-8">
                  No messages yet.
                </p>
              ) : (
                messages.map((msg, index) => (
                  <ChatBubble key={msg.id ?? index} message={msg} />
                ))
              )}
            </div>

            {/* Reply Input */}
            <div className="p-4 border-t border-[#210045] bg-[#1e004a]">
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-400 hover:text-fuchsia-400 transition-colors">
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !sending && handleSendReply()
                  }
                  placeholder="Type your reply..."
                  className="flex-1 bg-transparent border border-[#210045] rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none"
                />
                <button
                  onClick={handleSendReply}
                  disabled={!replyText.trim() || sending}
                  className="p-3 bg-fuchsia-600 rounded-full hover:bg-fuchsia-700 transition-colors disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
            Select a conversation to view messages.
          </div>
        )}
      </motion.div>

      {/* ===== Right Pane - Conversation Details ===== */}
      <motion.div
        variants={containerVariants}
        className="bg-[#140036] rounded-xl shadow-xl flex flex-col h-full overflow-hidden border border-[#210045]"
      >
        <div className="p-4 border-b border-[#210045]">
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <Info size={20} />
            <span>Details</span>
          </h2>
        </div>

        <div className="p-4 space-y-6 overflow-y-auto">
          {/* Actions */}
          <motion.div variants={itemVariants} className="space-y-3">
            <div className="text-lg font-semibold text-fuchsia-400">
              Actions
            </div>
            <select className="w-full bg-[#1e004a] border border-[#210045] rounded-lg p-2 text-white">
              <option>Change Status...</option>
              <option value="open">Open</option>
              <option value="human">Human</option>
              <option value="closed">Closed</option>
            </select>
            <div className="flex flex-wrap gap-2 text-sm">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedConvo?.status === "open"
                    ? "bg-green-900/40 text-green-400"
                    : selectedConvo?.status === "human"
                      ? "bg-blue-900/40 text-blue-400"
                      : "bg-red-900/40 text-red-400"
                }`}
              >
                {selectedConvo?.status ?? "—"}
              </span>
            </div>
          </motion.div>

          {/* Conversation Info */}
          <motion.div
            variants={itemVariants}
            className="space-y-3 pt-4 border-t border-[#210045]"
          >
            <div className="text-lg font-semibold text-fuchsia-400">
              Conversation Info
            </div>

            <p className="text-gray-400 flex items-center space-x-2 text-sm">
              <Mail size={16} className="shrink-0" />
              <span className="truncate">
                User: {selectedConvo?.user_id?.slice(0, 12) ?? "Anonymous"}
              </span>
            </p>

            <p className="text-gray-400 flex items-center space-x-2 text-sm">
              <Clock size={16} className="shrink-0" />
              <span>
                Started:{" "}
                {selectedConvo
                  ? new Date(selectedConvo.created_at).toLocaleDateString()
                  : "—"}
              </span>
            </p>

            <p className="text-gray-400 flex items-center space-x-2 text-sm">
              <CheckCircle size={16} className="text-green-500 shrink-0" />
              <span>Status: {selectedConvo?.status ?? "—"}</span>
            </p>

            <p className="text-gray-400 flex items-center space-x-2 text-sm">
              <XCircle size={16} className="text-red-500 shrink-0" />
              <span>Messages: {messages.length} total</span>
            </p>

            {selectedConvo?.assigned_agent_id && (
              <p className="text-gray-400 flex items-center space-x-2 text-sm">
                <User size={16} className="text-fuchsia-400 shrink-0" />
                <span>
                  Agent: {selectedConvo.assigned_agent_id.slice(0, 12)}
                </span>
              </p>
            )}
          </motion.div>

          {/* Tags */}
          <motion.div
            variants={itemVariants}
            className="space-y-3 pt-4 border-t border-[#210045]"
          >
            <div className="text-lg font-semibold text-fuchsia-400">Tags</div>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="flex items-center space-x-1 bg-blue-900/40 text-blue-400 px-3 py-1 rounded-full">
                <Tag size={14} />
                <span>Lead</span>
              </span>
              <span className="flex items-center space-x-1 bg-fuchsia-900/40 text-fuchsia-400 px-3 py-1 rounded-full">
                <Tag size={14} />
                <span>Support</span>
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
