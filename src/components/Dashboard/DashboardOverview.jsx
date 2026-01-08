import React from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, MessageSquare } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function DashboardOverview() {
  return (
    <motion.section
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 🟢 Semantic Markup: <header> */}
      <motion.header
        variants={itemVariants}
        className="mt-18 lg:mt-0 b-4 border-b border-[#210045]"
      >
        <h2 className="text-3xl font-extrabold text-white flex items-center space-x-3">
          <LayoutDashboard size={30} className="text-fuchsia-400" />
          <span>Client Overview</span>
        </h2>
        <p className="text-gray-400 mt-1">
          Welcome back! Quick look at your bot's performance.
        </p>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 🟢 Semantic Markup: <article> Total Leads */}
        <motion.article
          variants={itemVariants}
          className="bg-[#140036] p-6 rounded-xl border border-[#210045] space-y-2"
        >
          <Users size={24} className="text-fuchsia-400" />
          <h3 className="text-2xl font-bold text-white">450</h3>
          <p className="text-gray-400">Total Leads Captured</p>
        </motion.article>

        {/* 🟢 Semantic Markup: <article> Open Conversations */}
        <motion.article
          variants={itemVariants}
          className="bg-[#140036] p-6 rounded-xl border border-[#210045] space-y-2"
        >
          <MessageSquare size={24} className="text-green-400" />
          <h3 className="text-2xl font-bold text-white">3</h3>
          <p className="text-gray-400">Open Conversations</p>
        </motion.article>

        {/* 🟢 Semantic Markup: <article> Revenue */}
        <motion.article
          variants={itemVariants}
          className="bg-[#140036] p-6 rounded-xl border border-[#210045] space-y-2"
        >
          <h3 className="text-3xl font-bold text-fuchsia-400">₦150k</h3>
          <p className="text-xl font-semibold text-white mt-1">
            Revenue Generated
          </p>
          <p className="text-gray-400">Via bot payments this month</p>
        </motion.article>
      </div>
    </motion.section>
  );
}
