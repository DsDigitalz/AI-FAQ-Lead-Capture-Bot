import React, { useState, useEffect } from "react"; // 🔑 MODIFIED: ADDED useEffect
import { motion } from "framer-motion";
// 🔑 ADDED: Shield, Zap, CheckCircle for logo and submission state
import {
  Send,
  User,
  Mail,
  Briefcase,
  MessageSquare,
  Shield,
  Zap,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom"; // 🔑 MODIFIED: Corrected to use 'react-router-dom'

// --- Utility Components ---

// Logo Component (Re-added for self-sufficiency)
const HelplyAILogo = ({ className = "w-8 h-8" }) => (
  <div className={`relative ${className}`}>
    <Shield className="w-full h-full text-white" strokeWidth={1.5} />
    <Zap
      className="absolute top-1/2 left-1/2 w-3 h-3 text-fuchsia-400 fill-fuchsia-400 transform -translate-x-1/2 -translate-y-1/2"
      strokeWidth={0}
    />
  </div>
);

// 🔑 OPTIMIZED Animation Variants for Performance (GPU-accelerated)
const containerVariants = {
  hidden: {
    opacity: 0,
    // OPTIMIZED: Use transform for GPU acceleration
    transform: "translateY(20px) translateZ(0)",
  },
  visible: {
    opacity: 1,
    transform: "translateY(0) translateZ(0)",
    transition: {
      // OPTIMIZED: Switched from 'spring' to 'tween' for speed and reliability
      type: "tween",
      ease: "easeOut",
      duration: 0.3, // Snappy duration
      delayChildren: 0.1,
      staggerChildren: 0.05, // Faster stagger
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    // OPTIMIZED: Use translateY for GPU-accelerated slide-in
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

// 🟢 Semantic Markup: Main page component for sales contact
export default function ContactSalesPage() {
  // 🔑 NEW: useEffect Hook to force scroll to the top on page load/view.
  useEffect(() => {
    // Scrolls the window to the top (0, 0) upon component mount.
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures it only runs once

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    employees: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call to CRM
    console.log("Enterprise Sales Request:", formData);

    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00031F] to-[#10003B] p-4 text-white">
        <motion.div
          className="w-full max-w-lg bg-[#140036] p-10 rounded-xl shadow-2xl border border-[#210045] text-center"
          // MODIFIED: Simplified transition for submission success
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          <CheckCircle className="w-16 h-16 text-fuchsia-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-3">Request Received!</h1>
          <p className="text-gray-400">
            Thank you for your interest in Enterprise AI. A dedicated account
            manager will review your needs and contact you within one business
            day.
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    // 🟢 Semantic Markup: Used <main>
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#00031F] to-[#10003B] p-4 text-white">
      <motion.section
        // 🟢 Semantic Markup: Used <section> for the form card
        className="w-full max-w-lg bg-[#140036] p-8 md:p-10 rounded-xl shadow-2xl border border-[#210045]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 🔑 ADDED: HelplyAI Logo at the top of the container */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-6"
        >
          <Link to="/">
            <HelplyAILogo className="w-10 h-10" />
          </Link>
        </motion.div>

        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-2 bg-clip-text bg-gradient-to-r from-blue-400 to-fuchsia-400 text-transparent">
            Contact Sales for Enterprise
          </h1>
          <p className="text-gray-400">
            Discuss custom solutions, on-premise deployment, and SLA
            requirements.
          </p>
        </header>

        {/* 🟢 Semantic Markup: Used <form> */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <motion.div variants={itemVariants}>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-400 sr-only"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              required
              placeholder="Full Name"
              className="w-full p-3 bg-[#1e004a] border border-[#210045] rounded-lg text-white placeholder-gray-500 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none"
            />
          </motion.div>

          {/* Email Input */}
          <motion.div variants={itemVariants}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400 sr-only"
            >
              Work Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              required
              placeholder="Work Email"
              className="w-full p-3 bg-[#1e004a] border border-[#210045] rounded-lg text-white placeholder-gray-500 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none"
            />
          </motion.div>

          {/* Company and Employees (Grid) */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div variants={itemVariants}>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-400 sr-only"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                onChange={handleChange}
                required
                placeholder="Acme Corp"
                className="w-full p-3 bg-[#1e004a] border border-[#210045] rounded-lg text-white placeholder-gray-500 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label
                htmlFor="employees"
                className="block text-sm font-medium text-gray-400 sr-only"
              >
                Number of Employees
              </label>
              <input
                type="number"
                id="employees"
                name="employees"
                onChange={handleChange}
                required
                placeholder="50+"
                className="w-full p-3 bg-[#1e004a] border border-[#210045] rounded-lg text-white placeholder-gray-500 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none"
              />
            </motion.div>
          </div>

          {/* Message Textarea */}
          <motion.div variants={itemVariants}>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-400 sr-only"
            >
              Your Needs (Uptime, Scale, Security)
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              onChange={handleChange}
              required
              placeholder="Tell us about your specific needs (uptime, scale, security requirements)..."
              className="w-full p-3 bg-[#1e004a] border border-[#210045] rounded-lg text-white placeholder-gray-500 focus:ring-fuchsia-500 focus:border-fuchsia-500 resize-none outline-none"
            />
          </motion.div>

          {/* Submit Button */}
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
            <Send size={20} />
            {loading ? "Sending Request..." : "Submit Sales Request"}
          </motion.button>
        </form>
      </motion.section>
    </main>
  );
}
