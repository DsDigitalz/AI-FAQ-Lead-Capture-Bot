import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  Cloud,
  Zap,
  CheckCircle,
  XCircle,
  Settings,
  Mail,
  ChevronRight,
  HardDrive,
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
const calendarIntegrations = [
  {
    name: "Google Calendar",
    icon: Calendar,
    status: "Active",
    config: "user@email.com",
    color: "text-blue-500",
  },
  {
    name: "Calendly",
    icon: Zap,
    status: "Requires Auth",
    config: "Not Connected",
    color: "text-green-500",
  },
  {
    name: "Microsoft Outlook",
    icon: Mail,
    status: "Disconnected",
    config: "Not Connected",
    color: "text-red-500",
  },
];

const crmIntegrations = [
  {
    name: "HubSpot",
    icon: HardDrive,
    status: "Active",
    config: "API Key: ****4321",
    color: "text-green-500",
  },
  {
    name: "Salesforce",
    icon: Cloud,
    status: "Disconnected",
    config: "Not Connected",
    color: "text-red-500",
  },
  {
    name: "Google Sheets",
    icon: HardDrive,
    status: "Active",
    config: "Spreadsheet ID: X...",
    color: "text-blue-500",
  },
  {
    name: "Notion/Airtable",
    icon: HardDrive,
    status: "Requires Auth",
    config: "Not Connected",
    color: "text-yellow-500",
  },
];

// --- Integration Card ---
const IntegrationCard = ({ integration, type, index }) => {
  const isConnected = integration.status === "Active";
  const isAuthRequired = integration.status === "Requires Auth";

  const statusIcon = isConnected ? (
    <CheckCircle size={18} className="text-green-500" />
  ) : isAuthRequired ? (
    <XCircle size={18} className="text-yellow-500" />
  ) : (
    <XCircle size={18} className="text-red-500" />
  );

  const statusText = isConnected
    ? "Connected"
    : isAuthRequired
    ? "Authorization Needed"
    : "Disconnected";

  const statusClass = isConnected
    ? "text-green-400"
    : isAuthRequired
    ? "text-yellow-400"
    : "text-red-400";

  const buttonText = isConnected ? "Manage" : "Connect Account";

  return (
    <motion.article
      variants={itemVariants}
      custom={index * 0.1}
      className="bg-[#140036] p-5 rounded-xl border border-[#210045] shadow-lg flex flex-col justify-between"
    >
      <div className="flex items-start space-x-4 mb-4">
        <div
          className={`p-3 rounded-lg bg-fuchsia-900/30 ${integration.color}`}
        >
          <integration.icon size={24} />
        </div>

        <div>
          <h3 className="text-xl font-bold text-white">{integration.name}</h3>

          <div
            className={`flex items-center space-x-2 text-sm mt-1 ${statusClass}`}
          >
            {statusIcon}
            <span>{statusText}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-400 text-sm mb-4">
        Configuration:{" "}
        <span className="text-gray-300">{integration.config}</span>
      </p>

      <button
        className={`flex items-center justify-center space-x-2 w-full py-3 rounded-lg font-medium transition-colors
        ${
          isConnected
            ? "bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
            : "bg-gray-700/50 hover:bg-gray-700 text-gray-300"
        }`}
      >
        <Settings size={18} />
        <span>{buttonText}</span>
      </button>
    </motion.article>
  );
};

// --- Main Component ---
export default function Integrations() {
  return (
    <motion.section
      className="mt-18 lg:mt-0 space-y-10 p-4 md:p-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.header
        variants={itemVariants}
        className="pb-4 border-b border-[#210045]"
      >
        <h2 className="text-3xl font-extrabold text-white flex items-center space-x-3">
          <Cloud size={30} className="text-fuchsia-400" />
          <span>External Integrations (CRM & Scheduling)</span>
        </h2>
        <p className="text-gray-400 mt-1">
          Connect your critical business tools for seamless lead syncing and
          automated appointments.
        </p>
      </motion.header>

      {/* Calendar Integrations */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Calendar size={24} className="text-yellow-400" />
          <span>Bot Scheduling & Booking</span>
        </h3>
        <p className="text-gray-500 text-sm">
          Allow the bot to automatically book consultations, demos, and
          appointments.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calendarIntegrations.map((integration, index) => (
            <IntegrationCard
              key={integration.name}
              integration={integration}
              type="calendar"
              index={index}
            />
          ))}
        </div>
      </motion.div>

      {/* CRM Integrations */}
      <motion.div
        variants={itemVariants}
        className="pt-6 border-t border-[#210045] space-y-4"
      >
        <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Users size={24} className="text-blue-400" />
          <span>CRM & Lead Syncing</span>
        </h3>
        <p className="text-gray-500 text-sm">
          Sync all captured lead data and conversation history directly to your
          customer records.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {crmIntegrations.map((integration, index) => (
            <IntegrationCard
              key={integration.name}
              integration={integration}
              type="crm"
              index={index + calendarIntegrations.length}
            />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
