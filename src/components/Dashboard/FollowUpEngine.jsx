import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Clock,
  Send,
  MessageSquare,
  Tag,
  Plus,
  Trash2,
  Settings,
  ChevronDown,
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
const followUpSequences = [
  {
    id: 1,
    name: "Abandoned Cart Recovery",
    trigger: "Lead drops off after pricing page",
    steps: 3,
    status: "Active",
  },
  {
    id: 2,
    name: "Cold Lead Re-engagement",
    trigger: "Lead inactive for 30 days",
    steps: 5,
    status: "Inactive",
  },
  {
    id: 3,
    name: "Demo Booking Reminder",
    trigger: "Demo scheduled but not attended",
    steps: 2,
    status: "Active",
  },
];

// --- Sequence Card Component ---
const SequenceCard = ({ sequence, index }) => {
  const isActive = sequence.status === "Active";
  const statusColor = isActive
    ? "text-green-400 bg-green-900/40"
    : "text-red-400 bg-red-900/40";

  return (
    <motion.article
      variants={itemVariants}
      custom={index * 0.1}
      className="bg-[#140036] p-5 rounded-xl border border-[#210045] shadow-lg space-y-3 flex flex-col justify-between"
    >
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">{sequence.name}</h3>
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${statusColor}`}
          >
            {sequence.status}
          </span>
        </div>

        <p className="text-gray-400 text-sm flex items-center space-x-2">
          <Zap size={16} className="text-fuchsia-400" />
          <span>Trigger: {sequence.trigger}</span>
        </p>

        <p className="text-gray-400 text-sm flex items-center space-x-2">
          <Clock size={16} className="text-gray-500" />
          <span>Steps: {sequence.steps} messages</span>
        </p>
      </div>

      <div className="flex space-x-3 pt-3 border-t border-[#210045]">
        <button className="flex-1 py-2 text-sm rounded-lg bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-medium">
          <Settings size={16} className="inline mr-1" /> Edit Flow
        </button>
        <button className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-900/40">
          <Trash2 size={18} />
        </button>
      </div>
    </motion.article>
  );
};

// --- Main Component ---
export default function FollowUpEngine() {
  return (
    <motion.section
      className="mt-18 lg:mt-0 space-y-8 p-4 md:p-0"
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
          <Send size={30} className="text-fuchsia-400" />
          <span>AI Follow-Up Engine (The Money Maker)</span>
        </h2>

        <motion.button
          className="flex items-center space-x-2 bg-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-700 text-white transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          <Plus size={20} />
          <span>Create New Sequence</span>
        </motion.button>
      </motion.header>

      {/* Metrics */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.article className="bg-[#140036] p-6 rounded-xl border border-[#210045] space-y-2">
          <span className="text-sm font-semibold text-gray-400 flex items-center space-x-1">
            <MessageSquare size={16} />
            Sequences Sent
          </span>
          <h3 className="text-3xl font-bold text-white">1,420</h3>
        </motion.article>

        <motion.article className="bg-[#140036] p-6 rounded-xl border border-[#210045] space-y-2">
          <span className="text-sm font-semibold text-gray-400 flex items-center space-x-1">
            <Tag size={16} />
            Leads Re-engaged
          </span>
          <h3 className="text-3xl font-bold text-green-400">185</h3>
        </motion.article>

        <motion.article className="bg-[#140036] p-6 rounded-xl border border-[#210045] space-y-2">
          <span className="text-sm font-semibold text-gray-400 flex items-center space-x-1">
            <Clock size={16} />
            Avg. Conversion Time
          </span>
          <h3 className="text-3xl font-bold text-yellow-400">4.5 Days</h3>
        </motion.article>
      </motion.div>

      {/* Sequence List */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-2xl font-bold text-white">
          Active Follow-Up Sequences
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {followUpSequences.map((sequence, index) => (
            <SequenceCard key={sequence.id} sequence={sequence} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Global Settings */}
      <motion.div
        variants={itemVariants}
        className="pt-6 border-t border-[#210045] space-y-4"
      >
        <h3 className="text-2xl font-bold text-white">
          Global Follow-Up Settings
        </h3>

        <div className="bg-[#140036] p-6 rounded-xl border border-[#210045] space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 rounded-lg border border-[#1e004a]">
            <label
              htmlFor="stop-response"
              className="text-gray-300 font-medium"
            >
              Opt-out Command
            </label>

            <input
              type="text"
              id="stop-response"
              defaultValue="STOP"
              className="w-full sm:w-1/3 mt-2 sm:mt-0 bg-transparent border border-[#210045] rounded-lg py-2 px-4 text-white focus:ring-fuchsia-500"
            />
          </div>

          <p className="text-sm text-gray-500">
            The sequence will automatically stop if the lead responds with this
            command.
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
}
