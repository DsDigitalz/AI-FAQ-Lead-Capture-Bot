import React, { useState } from "react";
// 🔑 Framer Motion for fade-in/slide-in animation
import { motion } from "framer-motion";
import { Shield, Zap, Mail, Lock, LogIn } from "lucide-react";
import { Link } from "react-router";

// --- Framer Motion Animation Setup (Fade-in and Slide-in) ---
const containerVariants = {
  hidden: {
    opacity: 0,
    // 🔑 OPTIMIZED: Combine scale and add translateZ(0) for GPU acceleration.
    transform: "scale(0.98) translateZ(0)",
  },
  visible: {
    opacity: 1,
    transform: "scale(1) translateZ(0)",
    transition: {
      // 🔑 MODIFIED: Reduced duration from 0.5s to 0.3s for a snappier feel.
      duration: 0.3,
      ease: "easeOut", // Use a clean easing function
      delayChildren: 0.1, // Reduced for faster appearance
      // 🔑 MODIFIED: Faster stagger for sequential field appearance.
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    // 🔑 OPTIMIZED: Use translateY for GPU-accelerated slide-in (faster than 'y').
    transform: "translateY(10px) translateZ(0)",
  },
  visible: {
    opacity: 1,
    transform: "translateY(0) translateZ(0)",
    transition: {
      duration: 0.25, // Quick item slide
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

// 🔑 ANIMATED Input Field Component
const InputField = ({ id, label, type = "text", icon: Icon, placeholder }) => (
  <motion.div variants={itemVariants} className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-gray-400">
      {label}
    </label>
    <div className="relative">
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

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Welcome back! Redirecting to dashboard...");
      // In a real app, you would handle token and redirect here
    }, 1500);
  };

  return (
    // 🟢 Semantic Markup: Used <main>
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0A0027] p-4 sm:p-6 lg:p-8 text-white">
      {/* 🔑 ANIMATED Container for the login card */}
      <motion.section
        className="w-full max-w-xl bg-[#140036] rounded-xl shadow-2xl p-8 sm:p-10 border border-[#210045]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 🟢 Semantic Markup: Used <header> */}

        <header className="text-center mb-8">
          {/* 🔑 MODIFIED: Link added around the Logo */}
          <Link to="/">
            {/* 🔑 MODIFIED: Wrapping the logo in a link */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-4"
            >
              <HelplyAILogo />
            </motion.div>
          </Link>

          {/* ... rest of the header content ... */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-extrabold text-white mb-2"
          >
            Welcome Back!
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-400">
            Sign in to continue to your HelplyAI dashboard.
          </motion.p>
        </header>

        {/* 🟢 Semantic Markup: Used <form> */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            id="work-email"
            label="Work Email"
            type="email"
            icon={Mail}
            placeholder="adaobi@yourcompany.com"
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            icon={Lock}
            placeholder="••••••••"
          />

          {/* Forgot Password Link */}
          <motion.div
            variants={itemVariants}
            className="flex justify-end text-sm"
          >
            <a
              href="/forgot-password"
              className="font-medium text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
            >
              Forgot Password?
            </a>
          </motion.div>

          {/* 🔑 ANIMATED Action Button */}
          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={loading}
            className={`
              w-full py-3 rounded-full text-lg font-semibold transition-all duration-300
              flex items-center justify-center space-x-2
              ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-fuchsia-600 hover:bg-fuchsia-700 shadow-lg shadow-fuchsia-500/50 mt-8"
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
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <LogIn size={20} />
              </>
            )}
          </motion.button>
        </form>
        {/* 🟢 Semantic Markup: Used <nav> for links related to authentication */}
        <motion.nav
          variants={itemVariants}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>
            Don't have an account yet?{" "}
            <Link
              to="/signup"
              className="font-medium text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
            >
              Get Started Free
            </Link>
          </p>
        </motion.nav>
      </motion.section>

      {/* 🟢 Semantic Markup: Used <footer> */}
      <footer className="mt-8 text-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} HelplyAI. All rights reserved.</p>
      </footer>
    </main>
  );
}
