import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, Mail } from "lucide-react";

// --- Framer Motion Animation Setup ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  },
};

export default function PrivacyPolicy() {
  // 🔑 Scroll to Top on Mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // 🟢 Semantic Markup: Wrapped in a motion.div for page-wide animation
    <motion.div
      className="text-white pt-32 lg:pt-48 pb-24 px-6 max-w-5xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="mb-20 text-center lg:text-left">
        <motion.div variants={sectionVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-xs font-bold uppercase tracking-widest mb-6">
          <Shield size={14} />
          Compliance & Trust
        </motion.div>
        <motion.h1 
          variants={sectionVariants}
          className="text-5xl md:text-6xl font-black mb-6 tracking-tighter"
        >
          Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-fuchsia-400">Policy</span>
        </motion.h1>
        <motion.p variants={sectionVariants} className="text-gray-400 text-lg">
          Version 1.2 • Last Updated: <span className="text-white">October 10, 2025</span>
        </motion.p>
      </header>

      <div className="space-y-8">
        {/* 1. Introduction Section */}
        <motion.section
          variants={sectionVariants}
          className="group p-8 bg-[#140036]/50 backdrop-blur-xl rounded-[2rem] border border-white/5 hover:border-fuchsia-500/30 transition-colors duration-500"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-fuchsia-500/10 rounded-xl text-fuchsia-400">
              <Eye size={24} />
            </div>
            <h2 className="text-2xl font-bold">1. Introduction</h2>
          </div>
          <p className="text-gray-300 leading-relaxed text-lg">
            HelplyAI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by our B2B SaaS platform. By using our service, you agree to the collection and use of information in accordance with this policy.
          </p>
        </motion.section>

        {/* 2. Information We Collect */}
        <motion.section
          variants={sectionVariants}
          className="group p-8 bg-[#140036]/50 backdrop-blur-xl rounded-[2rem] border border-white/5 hover:border-fuchsia-500/30 transition-colors duration-500"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
              <FileText size={24} />
            </div>
            <h2 className="text-2xl font-bold">2. Information Collection</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 text-gray-400">
            <div>
              <h4 className="text-white font-bold mb-3 uppercase text-xs tracking-widest">Account Data</h4>
              <p className="mb-4">Standard identification data including name, company email, and encrypted billing details.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3 uppercase text-xs tracking-widest">Bot Interaction</h4>
              <p className="mb-4">Content of conversations processed on your behalf to facilitate support automation.</p>
            </div>
          </div>
        </motion.section>

        {/* 3. Data Protection */}
        <motion.section
          variants={sectionVariants}
          className="group p-8 bg-[#140036]/50 backdrop-blur-xl rounded-[2rem] border border-white/5 hover:border-fuchsia-500/30 transition-colors duration-500"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-green-500/10 rounded-xl text-green-400">
              <Lock size={24} />
            </div>
            <h2 className="text-2xl font-bold">3. Security Standards</h2>
          </div>
          <p className="text-gray-300 leading-relaxed mb-6">
            We utilize industry-leading security protocols to ensure your data is safe.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['AES-256 Encryption', 'TLS 1.3 in Transit', 'SOC2 Compliant Centers', 'Weekly Security Audits'].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 p-3 rounded-lg border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
                {item}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* 4. Rights & Contact */}
        <motion.section
          variants={sectionVariants}
          className="relative group p-12 bg-gradient-to-br from-fuchsia-600 to-blue-700 rounded-[2.5rem] overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#0A0027]/80 backdrop-blur-sm" />
          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-black mb-4">Have questions about your data?</h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Our Data Protection Officer is available to help you understand your rights under GDPR and local regulations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="mailto:privacy@helplyai.com" 
                className="flex items-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-2xl hover:bg-gray-200 transition-colors"
              >
                <Mail size={18} />
                Contact Privacy Team
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}