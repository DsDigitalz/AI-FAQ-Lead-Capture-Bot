import React, { useState, useEffect } from "react"; // 🔑 MODIFIED: ADDED useEffect
// 🔑 ADDED: Framer Motion import
import { motion } from "framer-motion";
import { Shield, Zap, ArrowRight, User, Mail, Lock } from "lucide-react";
import { Link } from "react-router";

// --- Framer Motion Animation Setup (Fade-in and Slide-in) ---
const containerVariants = {
  hidden: {
    opacity: 0,
    // 🔑 OPTIMIZED: Combine scale and add translateZ(0) for GPU acceleration
    transform: "scale(0.98) translateZ(0)",
  },
  visible: {
    opacity: 1,
    transform: "scale(1) translateZ(0)",
    transition: {
      // 🔑 MODIFIED: Reduced duration for snappier feel (0.5s -> 0.3s)
      duration: 0.3,
      ease: "easeOut", // Use a smooth easing function
      delayChildren: 0.1, // Reduced delay
      staggerChildren: 0.05, // 🔑 MODIFIED: Faster stagger for sequential field appearance
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    // 🔑 OPTIMIZED: Use translateY for GPU-accelerated slide-in
    transform: "translateY(10px) translateZ(0)",
  },
  visible: {
    opacity: 1,
    transform: "translateY(0) translateZ(0)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};
// -----------------------------------------------------------

// --- Utility Components ---

// Logo Component
const HelplyAILogo = ({ className = "w-8 h-8" }) => (
  <div className={`relative ${className}`}>
    <Shield className="w-full h-full text-white" strokeWidth={1.5} />
    <Zap
      className="absolute top-1/2 left-1/2 w-3 h-3 text-fuchsia-400 fill-fuchsia-400 transform -translate-x-1/2 -translate-y-1/2"
      strokeWidth={0}
    />
  </div>
);

// 🔑 MODIFIED: Input Field Component wrapped in motion.div
const InputField = ({ id, label, type = "text", icon: Icon, placeholder }) => (
  <motion.div variants={itemVariants} className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-gray-400">
      {label}
    </label>
    <div className="relative">
      {/* Input Icon */}
      {Icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon className="w-5 h-5 text-gray-500" />
        </div>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        required
        className="w-full pl-10 pr-4 py-3 bg-[#1e004a] border border-[#210045] rounded-lg text-white placeholder-gray-500 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-colors"
      />
    </div>
  </motion.div>
);

// --- Main Component ---

export default function GetStartedPage() {
  const [loading, setLoading] = useState(false);

  // 🔑 NEW: useEffect Hook to force scroll to the top on page load/view.
  useEffect(() => {
    // Scrolls the window to the top (0, 0) upon component mount.
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures it only runs once

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Sign up successful! Check your email for verification.");
      // In a real app, you would redirect the user here
    }, 2000);
  };

  return (
    // 🟢 Semantic Markup: Used <main> as this component represents the primary content of the page (route)
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0A0027] p-4 sm:p-6 lg:p-8 text-white">
      {/* 🔑 MODIFIED: Container for the sign-up card now uses motion.section */}
      <motion.section
        className="w-full max-w-xl bg-[#140036] rounded-xl shadow-2xl p-8 sm:p-10 border border-[#210045]"
        variants={containerVariants}
        initial="hidden"
        animate="visible" // Use 'animate' to trigger animation on mount
      >
        {/* 🟢 Semantic Markup: Used <header> for the sign-up form's title and description */}
        <header className="text-center mb-8">
          {/* 🔑 MODIFIED: Logo container wrapped in motion.div */}
          <Link to="/">
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-4"
            >
              <HelplyAILogo className="w-10 h-10" />
            </motion.div>
          </Link>
          {/* 🔑 MODIFIED: H2 wrapped in motion.h2 */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-extrabold text-white mb-2"
          >
            Start Your Free Trial
          </motion.h2>
          {/* 🔑 MODIFIED: P wrapped in motion.p */}
          <motion.p variants={itemVariants} className="text-gray-400">
            Automate support in 5 minutes. No credit card required.
          </motion.p>
        </header>

        {/* 🟢 Semantic Markup: Used <form> for the submission area */}
        {/* Note: The form itself is static, the children handle the stagger */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            id="full-name"
            label="Full Name"
            icon={User}
            placeholder="e.g., Adaobi Okoro"
          />
          <InputField
            id="work-email"
            label="Work Email"
            type="email"
            icon={Mail}
            placeholder="adaobi@yourcompany.com"
          />
          <InputField
            id="password"
            label="Password (min 8 characters)"
            type="password"
            icon={Lock}
            placeholder="••••••••"
          />

          {/* 🔑 MODIFIED: Action Button wrapped in motion.button */}
          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={loading}
            className={`
              w-full py-3 mt-8 rounded-full text-lg font-semibold transition-all duration-300
              flex items-center justify-center space-x-2
              ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-fuchsia-600 hover:bg-fuchsia-700 shadow-lg shadow-fuchsia-500/50"
              }
            `}
          >
            {loading ? (
              <>
                {/* Simple loading spinner */}
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Starting Trial...</span>
              </>
            ) : (
              <>
                <span>Activate Free Trial</span>
                <ArrowRight size={20} />
              </>
            )}
          </motion.button>
        </form>

        {/* 🔑 MODIFIED: Legal and sign-in links wrapped in motion.nav */}
        <motion.nav
          variants={itemVariants}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
            >
              Sign In
            </Link>
          </p>
          <p className="mt-4">
            By signing up, you agree to our{" "}
            <a
              href="/terms"
              className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              Privacy Policy
            </a>
          </p>
        </motion.nav>
      </motion.section>
    </main>
  );
}
