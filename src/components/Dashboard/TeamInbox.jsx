import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  User,
  Bot,
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

// Dummy Data
const conversations = [
  {
    id: 1,
    name: "Adaobi Okoro",
    channel: "WhatsApp",
    lastMessage: "Yes, please book the demo for tomorrow.",
    time: "2m ago",
    unread: 2,
    status: "Open",
    agent: "Unassigned",
  },
  {
    id: 2,
    name: "TechCorp Inquiry",
    channel: "Website Widget",
    lastMessage: "The bot was helpful but I need a human.",
    time: "1h ago",
    unread: 0,
    status: "In Progress",
    agent: "Uche",
  },
  {
    id: 3,
    name: "John Doe",
    channel: "Facebook Messenger",
    lastMessage: "What is your refund policy?",
    time: "5h ago",
    unread: 0,
    status: "Closed",
    agent: "Uche",
  },
];

const messages = [
  {
    id: 1,
    sender: "customer",
    text: "Hello, I was talking to the bot, but I have a complex question about the API limits.",
    time: "10:00 AM",
  },
  {
    id: 2,
    sender: "bot",
    text: "I apologize if I could not fully assist you. I have successfully escalated your chat to a human agent.",
    time: "10:01 AM",
  },
  {
    id: 3,
    sender: "human",
    text: "Hi Adaobi, I see the history. I can help with the API limits. We offer a tier-based limit. Are you on the Pro plan?",
    time: "10:05 AM",
  },
  {
    id: 4,
    sender: "internal",
    text: "Assign to Uche for follow-up on API documentation.",
    time: "10:06 AM",
  },
];

// --- Sub-Components ---
const ConversationItem = ({ convo, isSelected, onClick }) => (
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
        className={`font-semibold ${
          isSelected ? "text-white" : "text-gray-200"
        }`}
      >
        {convo.name}
      </span>
      <span className="text-xs text-gray-500">{convo.time}</span>
    </div>
    <p className="text-sm text-gray-400 truncate mt-1">{convo.lastMessage}</p>
    <div className="flex items-center justify-between mt-2 text-xs">
      <span className="text-fuchsia-400 flex items-center space-x-1">
        <MessageCircle size={14} />
        <span>{convo.channel}</span>
      </span>
      {convo.unread > 0 && (
        <span className="bg-red-600 text-white px-2 py-0.5 rounded-full">
          {convo.unread}
        </span>
      )}
    </div>
  </motion.div>
);

const ChatBubble = ({ message }) => {
  const isHuman = message.sender === "human";
  const isBot = message.sender === "bot";
  const isInternal = message.sender === "internal";

  if (isInternal) {
    return (
      <div className="text-center my-4">
        <span className="text-xs text-gray-500 bg-[#1e004a] px-3 py-1 rounded-full border border-[#210045] flex items-center justify-center mx-auto w-max">
          <ClipboardList size={14} className="mr-1" />
          Internal Note: {message.text}
        </span>
      </div>
    );
  }

  return (
    <motion.div
      variants={itemVariants}
      className={`flex mb-4 ${isHuman ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xs lg:max-w-md p-3 rounded-xl shadow-lg ${
          isHuman
            ? "bg-fuchsia-600 text-white rounded-br-none"
            : isBot
            ? "bg-[#1e004a] text-gray-300 rounded-tl-none border border-[#210045]"
            : "bg-[#140036] text-gray-200 rounded-tl-none border border-[#210045]"
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <span
          className={`block mt-1 text-right text-xs ${
            isHuman ? "text-fuchsia-200" : "text-gray-500"
          }`}
        >
          {message.time}
        </span>
      </div>
    </motion.div>
  );
};

// --- Main Component ---
export default function TeamInbox() {
  const [selectedConvo, setSelectedConvo] = useState(conversations[0]);

  return (
    <motion.section
      className="mt-18 lg:mt-0 h-[calc(100vh-6rem)] grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)_300px] gap-4 text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Left Pane */}
      <motion.div
        variants={containerVariants}
        className="bg-[#140036] rounded-xl shadow-xl flex flex-col h-full overflow-hidden border border-[#210045]"
      >
        <div className="p-4 border-b border-[#210045]">
          <h2 className="text-xl font-bold">Team Inbox</h2>
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
              className="w-full bg-[#1e004a] border border-[#210045] rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-fuchsia-500 focus:border-fuchsia-500"
            />
          </div>
        </div>
        <div className="overflow-y-auto flex-1">
          {conversations.map((convo) => (
            <ConversationItem
              key={convo.id}
              convo={convo}
              isSelected={convo.id === selectedConvo.id}
              onClick={() => setSelectedConvo(convo)}
            />
          ))}
        </div>
      </motion.div>

      {/* Center Pane */}
      <motion.div
        variants={containerVariants}
        className="bg-[#140036] rounded-xl shadow-xl flex flex-col h-full overflow-hidden border border-[#210045]"
      >
        <header className="p-4 border-b border-[#210045] flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">{selectedConvo.name}</h2>
            <p className="text-sm text-gray-400 flex items-center space-x-2">
              <MessageCircle size={14} />
              <span>via {selectedConvo.channel}</span>
            </p>
          </div>
          <button className="flex items-center space-x-2 bg-fuchsia-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-fuchsia-700 transition-colors">
            <CornerUpLeft size={16} />
            <span>Close Conversation</span>
          </button>
        </header>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
        </div>

        <div className="p-4 border-t border-[#210045] bg-[#1e004a]">
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-fuchsia-400 transition-colors">
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              placeholder="Type your message or internal note..."
              className="flex-1 bg-transparent border border-[#210045] rounded-lg py-2 px-4 text-white focus:ring-fuchsia-500 focus:border-fuchsia-500"
            />
            <button className="p-3 bg-fuchsia-600 rounded-full hover:bg-fuchsia-700 transition-colors">
              <Send size={20} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Right Pane */}
      <motion.div
        variants={containerVariants}
        className="bg-[#140036] rounded-xl shadow-xl flex flex-col h-full overflow-hidden border border-[#210045]"
      >
        <div className="p-4 border-b border-[#210045]">
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <Info size={20} />
            <span>Customer Details</span>
          </h2>
        </div>

        <div className="p-4 space-y-6 overflow-y-auto">
          {/* Actions */}
          <motion.div variants={itemVariants} className="space-y-3">
            <div className="text-lg font-semibold text-fuchsia-400">
              Actions
            </div>
            <select className="w-full bg-[#1e004a] border border-[#210045] rounded-lg p-2 text-white">
              <option>Assign to Agent...</option>
              <option>Uche</option>
              <option>Tola</option>
            </select>
            <select className="w-full bg-[#1e004a] border border-[#210045] rounded-lg p-2 text-white">
              <option>Change Status...</option>
              <option>Open</option>
              <option>Pending</option>
              <option>Closed</option>
            </select>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="flex items-center space-x-1 bg-blue-900/40 text-blue-400 px-3 py-1 rounded-full">
                <Tag size={14} />
                <span>Lead</span>
              </span>
              <span className="flex items-center space-x-1 bg-red-900/40 text-red-400 px-3 py-1 rounded-full">
                <Tag size={14} />
                <span>API Issue</span>
              </span>
            </div>
          </motion.div>

          {/* Customer History */}
          <motion.div
            variants={itemVariants}
            className="space-y-3 pt-4 border-t border-[#210045]"
          >
            <div className="text-lg font-semibold text-fuchsia-400">
              Customer History
            </div>
            <p className="text-gray-400 flex items-center space-x-2">
              <Mail size={16} />
              <span>adaobi@okoro.com</span>
            </p>
            <p className="text-gray-400 flex items-center space-x-2">
              <Clock size={16} />
              <span>Joined: 3 months ago</span>
            </p>
            <p className="text-gray-400 flex items-center space-x-2">
              <CheckCircle size={16} className="text-green-500" />
              <span>Plan: Pro Annual</span>
            </p>
            <p className="text-gray-400 flex items-center space-x-2">
              <XCircle size={16} className="text-red-500" />
              <span>5 previous chats (2 abandoned)</span>
            </p>
            <button className="text-fuchsia-400 text-sm hover:text-fuchsia-300">
              View Full CRM Profile
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
