import React from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  Zap,
  Link,
  CheckCircle,
  XCircle,
  Key,
  BarChart,
  ShoppingCart,
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

// --- Dummy Data (Gateway Integrations) ---
const gatewayIntegrations = [
  {
    name: "Paystack",
    icon: DollarSign,
    status: "Active",
    config: "Public Key: pk_live_...",
    color: "text-green-500",
    region: "Africa",
  },
  {
    name: "Flutterwave",
    icon: Zap,
    status: "Requires Keys",
    config: "Not Connected",
    color: "text-yellow-500",
    region: "Africa",
  },
  {
    name: "Stripe",
    icon: Link,
    status: "Disconnected",
    config: "Not Connected",
    color: "text-blue-500",
    region: "Global",
  },
  {
    name: "PayPal",
    icon: ShoppingCart,
    status: "Inactive",
    config: "Last synced 1 week ago",
    color: "text-red-500",
    region: "Global",
  },
];

// --- Gateway Card Component ---
const GatewayCard = ({ gateway, index }) => {
  const isConnected = gateway.status === "Active";
  const isAuthRequired = gateway.status.includes("Key");

  const statusIcon = isConnected ? (
    <CheckCircle size={18} className="text-green-500" />
  ) : (
    <XCircle size={18} className="text-red-500" />
  );

  const statusText = isConnected
    ? "Active"
    : isAuthRequired
    ? "Keys Needed"
    : gateway.status;
  const statusClass = isConnected
    ? "text-green-400"
    : isAuthRequired
    ? "text-yellow-400"
    : "text-red-400";
  const buttonText = isConnected ? "View Transactions" : "Add API Keys";

  return (
    <motion.article
      variants={itemVariants}
      custom={index * 0.1}
      className="bg-[#140036] p-5 rounded-xl border border-[#210045] shadow-lg flex flex-col justify-between"
    >
      {/* Header Row */}
      <div className="space-y-2">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-lg bg-fuchsia-900/30 text-fuchsia-400">
            <gateway.icon size={24} />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">{gateway.name}</h3>
            <p className="text-xs text-gray-500">{gateway.region} Focused</p>
          </div>
        </div>

        <div
          className={`flex items-center space-x-2 text-sm pt-2 ${statusClass}`}
        >
          {statusIcon}
          <span>{statusText}</span>
        </div>
      </div>

      {/* CTA Button */}
      <button
        className={`flex items-center justify-center space-x-2 w-full py-3 mt-4 rounded-lg font-medium transition-colors ${
          isConnected
            ? "bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
            : "bg-gray-700/50 hover:bg-gray-700 text-gray-300"
        }`}
      >
        <Key size={18} />
        <span>{buttonText}</span>
      </button>
    </motion.article>
  );
};

// --- Main Component ---
export default function PaymentIntegration() {
  return (
    <motion.section
      className="mt-18 lg:mt-0 space-y-8 p-4 md:p-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page Header */}
      <motion.header
        variants={itemVariants}
        className="pb-4 border-b border-[#210045]"
      >
        <h2 className="text-3xl font-extrabold text-white flex items-center space-x-3">
          <DollarSign size={30} className="text-fuchsia-400" />
          <span>Payment Integration & Revenue</span>
        </h2>
        <p className="text-gray-400 mt-1">
          Make your bot a revenue generator by connecting global and regional
          payment gateways.
        </p>
      </motion.header>

      {/* Revenue Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.article className="bg-[#140036] p-6 rounded-xl border border-[#210045] space-y-2">
          <span className="text-sm font-semibold text-gray-400 flex items-center space-x-1">
            <DollarSign size={16} /> Total Bot Revenue (L30D)
          </span>
          <h3 className="text-3xl font-bold text-green-400">₦2,540,000</h3>
        </motion.article>

        <motion.article className="bg-[#140036] p-6 rounded-xl border border-[#210045] space-y-2">
          <span className="text-sm font-semibold text-gray-400 flex items-center space-x-1">
            <ShoppingCart size={16} /> Successful Transactions
          </span>
          <h3 className="text-3xl font-bold text-white">458</h3>
        </motion.article>

        <motion.article className="bg-[#140036] p-6 rounded-xl border border-[#210045] space-y-2">
          <span className="text-sm font-semibold text-gray-400 flex items-center space-x-1">
            <BarChart size={16} /> Avg. Transaction Value
          </span>
          <h3 className="text-3xl font-bold text-fuchsia-400">₦5,545</h3>
        </motion.article>
      </motion.div>

      {/* Gateway Integrations */}
      <motion.div
        variants={itemVariants}
        className="space-y-4 pt-6 border-t border-[#210045]"
      >
        <h3 className="text-2xl font-bold text-white">
          Connect Payment Gateways
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gatewayIntegrations.map((gateway, index) => (
            <GatewayCard key={gateway.name} gateway={gateway} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Payment Flow Config */}
      <motion.div
        variants={itemVariants}
        className="pt-6 border-t border-[#210045] space-y-4"
      >
        <h3 className="text-2xl font-bold text-white">
          Payment Flow Configuration
        </h3>

        <div className="bg-[#140036] p-6 rounded-xl border border-[#210045] space-y-4">
          {/* Default Gateway */}
          <div className="space-y-2">
            <label
              htmlFor="default-gateway"
              className="text-gray-300 font-medium block"
            >
              Default Payment Gateway
            </label>

            <select
              id="default-gateway"
              className="w-full bg-[#1e004a] border border-[#210045] rounded-lg p-3 text-white focus:ring-fuchsia-500"
            >
              <option>Paystack (Active)</option>
              <option>Flutterwave (Requires Keys)</option>
              <option disabled>Stripe (Disconnected)</option>
            </select>

            <p className="text-sm text-gray-500">
              This gateway is used when a bot flow is set to collect payment.
            </p>
          </div>

          {/* Booking Deposit */}
          <div className="space-y-2 pt-4 border-t border-[#210045]">
            <h4 className="text-lg font-medium text-gray-300">
              Default Booking Deposit
            </h4>

            <div className="flex space-x-3">
              <input
                type="number"
                placeholder="Amount"
                defaultValue="5000"
                className="w-1/3 bg-transparent border border-[#210045] rounded-lg py-3 px-4 text-white focus:ring-fuchsia-500"
              />

              <select className="w-1/3 bg-[#1e004a] border border-[#210045] rounded-lg p-3 text-white focus:ring-fuchsia-500">
                <option>NGN (₦)</option>
                <option>USD ($)</option>
              </select>
            </div>

            <p className="text-sm text-gray-500">
              The default deposit amount collected when a booking is scheduled.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
