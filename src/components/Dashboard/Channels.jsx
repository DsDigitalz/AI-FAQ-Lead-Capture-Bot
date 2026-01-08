import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  MessageSquare,
  Facebook,
  Instagram,
  Twitter,
  Zap,
  CheckCircle,
  XCircle,
  Plus,
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
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

// --- Channel Data ---
const channels = [
  {
    name: "Website Widget",
    icon: Globe,
    status: "Active",
    integration: "Live",
    instructions: "Embed script on your site.",
    color: "text-green-500",
    button: "Get Embed Code",
  },
  {
    name: "WhatsApp",
    icon: MessageSquare,
    status: "Requires Setup",
    integration: "Twilio",
    instructions: "Connect your Twilio account.",
    color: "text-yellow-500",
    button: "Connect Twilio",
  },
  {
    name: "Instagram DMs",
    icon: Instagram,
    status: "Disconnected",
    integration: "Meta API",
    instructions: "Authorize via Meta Graph API.",
    color: "text-red-500",
    button: "Connect Instagram",
  },
  {
    name: "Facebook Messenger",
    icon: Facebook,
    status: "Disconnected",
    integration: "Meta API",
    instructions: "Authorize via Meta Graph API.",
    color: "text-red-500",
    button: "Connect Facebook",
  },
  {
    name: "Telegram",
    icon: Zap,
    status: "Ready",
    integration: "Bot Token",
    instructions: "Input your Telegram Bot Token.",
    color: "text-blue-500",
    button: "Add Bot Token",
  },
];

// --- Channel Card Component ---
const ChannelCard = ({ channel, index }) => {
  const isConnected = channel.status === "Active";

  return (
    <motion.article
      className="bg-[#140036] p-6 rounded-xl border border-[#210045] shadow-lg flex flex-col justify-between"
      variants={cardVariants}
      custom={index}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className={`p-3 rounded-full bg-fuchsia-900/30 ${channel.color}`}>
          <channel.icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-white">{channel.name}</h3>
      </div>

      <div className="flex items-center space-x-2 text-sm mb-4">
        {isConnected ? (
          <CheckCircle size={16} className="text-green-500" />
        ) : (
          <XCircle size={16} className="text-red-500" />
        )}
        <span className={channel.color}>{channel.status}</span>
      </div>

      <p className="text-gray-400 text-sm mb-6">
        <span className="font-semibold">Integration:</span>{" "}
        {channel.integration}
        <br />
        <span className="font-semibold">Next Step:</span> {channel.instructions}
      </p>

      <button
        className={`w-full py-3 rounded-lg font-semibold transition-colors duration-300 ${
          isConnected
            ? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
            : "bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
        }`}
        disabled={isConnected}
      >
        {isConnected ? "Active" : channel.button}
      </button>
    </motion.article>
  );
};

// --- Main Component ---
export default function Channels() {
  return (
    <motion.section
      className="mt-18 lg:mt-0 space-y-8 p-4 md:p-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header
        variants={cardVariants}
        className="pb-4 border-b border-[#210045]"
      >
        <h2 className="text-3xl font-extrabold text-white">
          Multi-Channel Support 🚀
        </h2>
        <p className="text-gray-400 mt-1">
          Connect all your communication platforms to manage conversations in
          one unified inbox.
        </p>
      </motion.header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {channels.map((channel, index) => (
          <ChannelCard key={channel.name} channel={channel} index={index} />
        ))}

        {/* Add New Channel Card */}
        <motion.article
          variants={cardVariants}
          custom={channels.length}
          className="bg-[#140036] p-6 rounded-xl border-2 border-dashed border-gray-700/50 hover:border-fuchsia-600 transition-colors cursor-pointer flex flex-col items-center justify-center text-center h-full min-h-[250px]"
        >
          <Plus size={40} className="text-gray-500 mb-3" />
          <p className="text-lg font-semibold text-gray-400">Add New Channel</p>
          <p className="text-sm text-gray-500 mt-1">
            Request custom integrations or APIs.
          </p>
        </motion.article>
      </div>
    </motion.section>
  );
}
