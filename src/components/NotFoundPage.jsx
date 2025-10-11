import React from "react";
// 🔑 Framer Motion for smooth entry animation
import { motion } from "framer-motion";
// 🔑 MODIFIED: Importing UserPlus instead of Search
import { Shield, Zap, Home, UserPlus } from "lucide-react";
import { Link } from "react-router";

// --- Framer Motion Setup ---
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delayChildren: 0.2,
      staggerChildren: 0.1, // Stagger items inside the section
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// Logo Component (reused for branding)
const HelplyAILogo = ({ className = "w-16 h-16" }) => (
  <div className={`relative ${className}`}>
    <Shield className="w-full h-full text-fuchsia-400" strokeWidth={1.5} />
    <Zap
      className="absolute top-1/2 left-1/2 w-6 h-6 text-white fill-white transform -translate-x-1/2 -translate-y-1/2"
      strokeWidth={0}
    />
  </div>
);

// --- Main Component ---

export default function NotFoundPage() {
  return (
    // The <main> tag is STATIC to keep the background fixed.
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0A0027] text-white p-8">
      {/* 🔑 ANIMATED Content Section */}
      <motion.section
        className="flex flex-col items-center text-center max-w-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Logo */}
        <motion.div variants={itemVariants}>
          <HelplyAILogo />
        </motion.div>

        {/* 404 Error Text */}
        <motion.h1
          variants={itemVariants}
          className="mt-8 text-7xl sm:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-fuchsia-400"
        >
          404
        </motion.h1>

        {/* 🟢 Semantic Markup: Used <header> for the title/summary */}
        <header className="mt-4">
          <motion.h2 variants={itemVariants} className="text-3xl font-bold">
            Page Not Found
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-2 text-gray-400">
            Oops! It looks like you've followed a broken link or entered a URL
            that doesn't exist on our site.
          </motion.p>
        </header>

        {/* Navigation/Action Links */}
        {/* 🟢 Semantic Markup: Used <nav> for navigation links */}
        <motion.nav
          variants={itemVariants}
          className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 px-6 py-3 border border-fuchsia-600 text-fuchsia-400 rounded-lg font-semibold transition-colors hover:bg-fuchsia-900/40"
          >
            <Home size={20} />
            <span>Go to Homepage</span>
          </Link>
          <Link
            to="/signup"
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-fuchsia-600 text-white rounded-lg font-semibold transition-colors hover:bg-fuchsia-700 shadow-lg shadow-fuchsia-500/30"
          >
            {/* 🔑 MODIFIED: Icon changed to UserPlus */}
            <UserPlus size={20} />
            {/* 🔑 MODIFIED: Text changed to "Sign Up Page" */}
            <span>Sign Up Page</span>
          </Link>
        </motion.nav>
      </motion.section>
    </main>
  );
}
