import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Key,
  Copy,
  RotateCcw,
  Trash2,
  Check,
  ExternalLink,
  Settings,
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

const itemVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

// --- Dummy Data ---
const dummyKeys = [
  {
    id: 1,
    name: "Public Bot Access Key",
    prefix: "pk_live_",
    maskedKey: "****************abcde",
    created: "2025-09-01",
    lastUsed: "Just now",
    type: "Publishable",
  },
  {
    id: 2,
    name: "Webhooks Secret",
    prefix: "wh_sec_",
    maskedKey: "****************fgdsa",
    created: "2025-10-10",
    lastUsed: "3 days ago",
    type: "Secret",
  },
];

// --- Key Row Component ---
const KeyRow = ({ apiKey, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey.prefix + "***");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const typeColor =
    apiKey.type === "Secret"
      ? "bg-red-900/40 text-red-400"
      : "bg-green-900/40 text-green-400";

  return (
    <motion.article
      variants={itemVariants}
      custom={index * 0.1}
      className="grid grid-cols-1 md:grid-cols-5 items-center p-4 border-b border-[#210045] hover:bg-[#1e004a] transition-colors"
    >
      {/* Name */}
      <div className="col-span-1">
        <h3 className="font-medium text-white">{apiKey.name}</h3>
        <span className={`md:hidden text-xs px-2 py-0.5 rounded ${typeColor}`}>
          {apiKey.type}
        </span>
      </div>

      {/* Key Value */}
      <div className="col-span-2 flex items-center space-x-3 py-2 md:py-0">
        <span className="text-gray-400 font-mono text-sm break-all">
          {apiKey.prefix}
          {apiKey.maskedKey.slice(-4)}
        </span>

        <motion.button
          className={`p-2 rounded-full text-gray-400 transition-colors ${
            copied
              ? "text-green-400"
              : "hover:text-fuchsia-400 hover:bg-fuchsia-900/40"
          }`}
          whileHover={{ scale: 1.1 }}
          onClick={handleCopy}
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </motion.button>
      </div>

      {/* Last Used */}
      <span className="hidden md:block text-gray-500 text-sm">
        {apiKey.lastUsed}
      </span>

      {/* Actions */}
      <div className="col-span-1 flex justify-end space-x-3">
        <motion.button
          className="p-2 rounded-full text-gray-400 hover:text-yellow-400 hover:bg-yellow-900/40"
          whileHover={{ scale: 1.1 }}
        >
          <RotateCcw size={18} title="Rotate Key" />
        </motion.button>

        <motion.button
          className="p-2 rounded-full text-gray-400 hover:text-red-400 hover:bg-red-900/40"
          whileHover={{ scale: 1.1 }}
        >
          <Trash2 size={18} title="Delete Key" />
        </motion.button>
      </div>
    </motion.article>
  );
};

// --- Main Component ---
export default function ApiKeys() {
  return (
    <motion.section
      className="space-y-8 p-4 md:p-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.header
        variants={itemVariants}
        className="pb-4 border-b border-[#210045] flex justify-between items-center"
      >
        <h2 className="text-3xl font-extrabold text-white flex items-center space-x-3">
          <Key size={30} className="text-fuchsia-400" />
          <span>API Key Management</span>
        </h2>

        <motion.button
          className="flex items-center space-x-2 bg-fuchsia-600 px-4 py-2 rounded-lg font-medium hover:bg-fuchsia-700 text-white transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          <Plus size={20} />
          <span>Generate New Key</span>
        </motion.button>
      </motion.header>

      {/* Keys Table */}
      <motion.div
        variants={itemVariants}
        className="bg-[#140036] rounded-xl border border-[#210045] shadow-lg overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-5 p-4 font-semibold text-gray-400 border-b border-[#210045]">
          <span className="col-span-1">Name / Type</span>
          <span className="col-span-2">Key Value</span>
          <span className="hidden md:block">Last Used</span>
          <span className="text-right">Actions</span>
        </div>

        <motion.div variants={containerVariants}>
          {dummyKeys.map((key, index) => (
            <KeyRow key={key.id} apiKey={key} index={index} />
          ))}
        </motion.div>
      </motion.div>

      {/* Docs */}
      <motion.div variants={itemVariants} className="pt-4 space-y-3">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <Settings size={20} className="text-gray-400" />
          <span>Usage Documentation</span>
        </h3>

        <p className="text-gray-400 text-sm">
          Use these keys to connect your bot to external platforms or custom
          backend scripts.
        </p>

        <motion.button
          className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
          whileHover={{ x: 5 }}
        >
          <span>View Developer Docs</span>
          <ExternalLink size={16} />
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
