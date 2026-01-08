import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

// 🟢 Semantic Markup: Reusable Logo Component
const HelplyAILogo = ({ className = "w-12 h-12" }) => (
  <div className={`relative ${className}`}>
    <Shield className="w-full h-full text-white" strokeWidth={1.5} />
    <Zap
      className="absolute top-1/2 left-1/2 w-5 h-5 text-fuchsia-400 fill-fuchsia-400 transform -translate-x-1/2 -translate-y-1/2"
      strokeWidth={0}
    />
  </div>
);

// --- Framer Motion Animation Setup ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30, // Combined fade-in and slide-in
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function FinalCTASection() {
  return (
    // 🟢 Semantic Markup: <section> with a clear ID for navigation
    <section
      className="py-24 md:py-32 bg-[#0A0027] relative overflow-hidden"
      id="cta-section"
    >
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-fuchsia-600/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        className="max-w-4xl mx-auto px-6 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Branding & Visual Hook */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center mb-8"
        >
          <HelplyAILogo className="mb-4" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-fuchsia-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles size={12} />
            Instant Deployment
          </div>
        </motion.div>

        {/* 🟢 Semantic Markup: <header> for titles */}
        <header>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter mb-6"
          >
            Ready to Automate Support and{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-fuchsia-400">
              Capture More Leads?
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Join 500+ Nigerian businesses scaling their operations. Try the full
            power of HelplyAI free for 7 days—no credit card needed.
          </motion.p>
        </header>

        {/* 🟢 Semantic Markup: Primary Action Area */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-6"
        >
          <Link to="/signup" className="w-full sm:w-auto">
            <button className="group relative w-full sm:w-auto inline-flex items-center justify-center py-5 px-12 text-xl font-black text-white rounded-2xl bg-fuchsia-600 hover:bg-fuchsia-500 transition-all duration-300 shadow-[0_20px_50px_rgba(192,38,211,0.3)] hover:shadow-[0_20px_50px_rgba(192,38,211,0.5)] active:scale-95">
              Start Your Free Trial
              <ArrowRight
                size={22}
                className="ml-3 group-hover:translate-x-1 transition-transform"
              />
            </button>
          </Link>

          <p className="text-gray-500 text-sm font-medium">
            Setup in <span className="text-white">5 minutes</span> • No
            commitment
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
