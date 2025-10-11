import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap } from "lucide-react";

// 🟢 NEW LOGO COMPONENT (for consistency)
const HelplyAILogo = ({ className = "w-10 h-10" }) => (
  <div className={`relative ${className}`}>
    {/* Shield Icon: Represents help and protection */}
    <Shield className="w-full h-full text-white" strokeWidth={1.5} />
    {/* Zap Icon: Represents intelligence and speed */}
    <Zap
      className="absolute top-1/2 left-1/2 w-4 h-4 text-fuchsia-400 fill-fuchsia-400 transform -translate-x-1/2 -translate-y-1/2"
      strokeWidth={0}
    />
  </div>
);

// --- Framer Motion Animation Setup ---
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
// ------------------------------------

export default function FinalCTASection() {
  return (
    // 🟢 Semantic Markup: Used <section> for the main container
    <section className="py-20 md:py-24 bg-[#0A0027] text-white">
      <motion.div
        className="max-w-4xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* 🟢 Semantic Markup: Used <header> for the heading and sub-text */}
        <header>
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-6"
          >
            <HelplyAILogo />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4"
          >
            Ready to Automate Support and{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-fuchsia-400">
              Capture More Leads?
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            Stop waiting. Start converting. Try the full power of HelplyAI free
            for 7 days—no credit card needed.
          </motion.p>
        </header>

        {/* 🟢 Semantic Markup: Used <main> for the primary action button */}
        <main>
          <motion.a
            variants={itemVariants}
            href="#signup"
            className="inline-flex items-center justify-center py-4 px-12 text-xl font-bold rounded-full bg-fuchsia-600 hover:bg-fuchsia-700 hover:transition-all duration-300 shadow-2xl shadow-fuchsia-500/50 transform hover:scale-[1.03]"
          >
            Start Your Free 7-Day Trial
            <ArrowRight size={22} className="ml-3" />
          </motion.a>
        </main>
      </motion.div>
    </section>
  );
}
