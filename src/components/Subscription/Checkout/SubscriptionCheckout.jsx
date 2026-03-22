import React, { useState, useEffect } from "react"; // 🔑 MODIFIED: ADDED useEffect
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Zap, CreditCard, DollarSign, CheckCircle } from "lucide-react";

// --- Utility Components ---
const HelplyAILogo = ({ className = "w-8 h-8" }) => (
  <div className={`relative ${className}`}>
    <Shield className="w-full h-full text-white" strokeWidth={1.5} />
    <Zap
      className="absolute top-1/2 left-1/2 w-3 h-3 text-fuchsia-400 fill-fuchsia-400 transform -translate-x-1/2 -translate-y-1/2"
      strokeWidth={0}
    />
  </div>
);

// 🔑 OPTIMIZED Variants for smooth, fast animation (GPU-accelerated)
// Apply the previously agreed-upon performance optimizations here.
const containerVariants = {
  hidden: {
    opacity: 0,
    transform: "scale(0.98) translateZ(0)",
  },
  visible: {
    opacity: 1,
    transform: "scale(1) translateZ(0)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    transform: "translateY(10px) translateZ(0)",
  },
  visible: {
    opacity: 1,
    transform: "translateY(0) translateZ(0)",
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

// 🟢 Semantic Markup: Main page component for checkout
export default function SubscriptionCheckout({ plan = "Pro Automation" }) {
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  // 🔑 NEW: useEffect Hook to force scroll to the top on page load/view.
  useEffect(() => {
    // Scrolls the window to the top (0, 0) upon component mount.
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures it only runs once

  // Example Plan Data (Ideally pulled from an external source or routing params)
  const planDetails = {
    "Starter Bot": {
      price: "₦120,000",
      features: ["1,000 chats/month", "Instant 24/7 Support", "Email Support"],
    },
    "Pro Automation": {
      price: "₦360,000",
      features: [
        "5,000 chats/month",
        "Intelligent Lead Qualification",
        "CRM/Slack Integration",
      ],
    },
  };

  const currentPlan = planDetails[plan] || planDetails["Pro Automation"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    console.log(`Processing subscription for ${plan} with details...`);

    setTimeout(() => {
      setLoading(false);
      alert(`Successfully subscribed to the ${plan} plan!`);
      // Redirect to dashboard
    }, 2000);
  };

  return (
    // 🟢 Semantic Markup: Used <main>
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00031F] to-[#10003B] p-4 text-white">
      <motion.section
        className="w-full max-w-2xl bg-[#140036] rounded-xl shadow-2xl p-8 border border-[#210045] grid grid-cols-1 lg:grid-cols-2 gap-8"
        // 🔑 MODIFIED: Use the optimized containerVariants
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Column 1: Plan Summary */}
        <motion.div
          variants={itemVariants}
          className="lg:border-r lg:border-[#210045] lg:pr-8"
        >
          <Link to="/">
            <div className="flex justify-center mb-6">
              <HelplyAILogo className="w-10 h-10" />
            </div>
          </Link>
          <h1 className="text-3xl font-extrabold mb-2 text-center">
            Confirm Your Plan
          </h1>
          <p className="text-gray-400 text-center mb-6">
            You're one step away from **{plan}**!
          </p>

          <div className="p-5 bg-[#1e004a] rounded-lg border border-fuchsia-600/50">
            <h2 className="text-xl font-bold text-fuchsia-400 mb-1">{plan}</h2>
            <p className="text-4xl font-extrabold text-white mb-4">
              {currentPlan.price}
              <span className="text-lg font-normal text-gray-400">/mo</span>
            </p>
            <ul className="space-y-2">
              {currentPlan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-300 text-sm"
                >
                  <CheckCircle
                    size={16}
                    className="text-green-400 mr-2 flex-shrink-0"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Column 2: Payment Form */}
        <motion.div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white flex items-center">
            <CreditCard size={24} className="text-blue-400 mr-3" />
            Payment Details
          </h2>
          {/* 🟢 Semantic Markup: Used <form> */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Card Number */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-gray-300 sr-only"
              >
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                placeholder="Card Number"
                required
                className="w-full pl-4 pr-4 py-3 bg-[#1e004a] border border-[#210045] rounded-lg text-white placeholder-gray-500 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none"
              />
            </motion.div>

            <div className="flex space-x-4">
              {/* Expiry Date */}
              <motion.div variants={itemVariants} className="flex-1">
                <label
                  htmlFor="expiryDate"
                  className="block text-sm font-medium text-gray-300 sr-only"
                >
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  placeholder="MM/YY"
                  required
                  className="w-full pl-4 pr-4 py-3 bg-[#1e004a] border border-[#210045] rounded-lg text-white placeholder-gray-500 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none"
                />
              </motion.div>
              {/* CVC */}
              <motion.div variants={itemVariants} className="flex-1">
                <label
                  htmlFor="cvc"
                  className="block text-sm font-medium text-gray-300 sr-only"
                >
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  placeholder="CVC"
                  required
                  className="w-full pl-4 pr-4 py-3 bg-[#1e004a] border border-[#210045] rounded-lg text-white placeholder-gray-500 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none"
                />
              </motion.div>
            </div>

            {/* Action Button */}
            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={loading}
              className={`
                w-full py-3 mt-6 rounded-full text-lg font-semibold transition-all duration-300
                flex items-center justify-center space-x-2
                ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-fuchsia-600 hover:opacity-90 active:opacity-70 shadow-lg shadow-fuchsia-500/50"
                }
              `}
            >
              <DollarSign size={20} />
              {loading ? "Processing..." : `Pay ${currentPlan.price}`}
            </motion.button>
          </form>

          <motion.p
            variants={itemVariants}
            className="text-center text-xs text-gray-500 mt-4"
          >
            Encrypted and secure payments via Flutterwave.
          </motion.p>
        </motion.div>
      </motion.section>
    </main>
  );
}
