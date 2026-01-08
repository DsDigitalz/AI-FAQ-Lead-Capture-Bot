import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Scale, FileCheck, AlertCircle, Ban, Zap, Globe } from "lucide-react";

// --- Framer Motion Animation Setup ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TermsOfService() {
  // 🔑 Scroll to Top on Mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="text-white pt-32 lg:pt-48 pb-24 px-6 max-w-5xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 🟢 Semantic Markup: Page Header */}
      <header className="mb-20 text-center lg:text-left">
        <motion.div
          variants={sectionVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
        >
          <Scale size={14} />
          Legal Framework
        </motion.div>
        <motion.h1
          variants={sectionVariants}
          className="text-5xl md:text-6xl font-black mb-6 tracking-tighter"
        >
          Terms of{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-fuchsia-400">
            Service
          </span>
        </motion.h1>
        <motion.p variants={sectionVariants} className="text-gray-400 text-lg">
          Please read these terms carefully before using our AI solutions.
        </motion.p>
      </header>

      <div className="space-y-8">
        {/* 1. Acceptance of Terms */}
        <motion.section
          variants={sectionVariants}
          className="p-8 bg-[#140036]/50 backdrop-blur-xl rounded-[2rem] border border-white/5"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-fuchsia-500/10 rounded-xl text-fuchsia-400">
              <FileCheck size={24} />
            </div>
            <h2 className="text-2xl font-bold">1. Acceptance</h2>
          </div>
          <p className="text-gray-300 leading-relaxed text-lg">
            By accessing or using HelplyAI, you agree to be bound by these Terms
            of Service. If you are entering into this agreement on behalf of a
            company, you represent that you have the legal authority to bind
            that entity to these terms.
          </p>
        </motion.section>

        {/* 2. Service Usage & Restrictions */}
        <motion.section
          variants={sectionVariants}
          className="p-8 bg-[#140036]/50 backdrop-blur-xl rounded-[2rem] border border-white/5"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-red-500/10 rounded-xl text-red-400">
              <Ban size={24} />
            </div>
            <h2 className="text-2xl font-bold">2. Use Restrictions</h2>
          </div>
          <p className="text-gray-400 mb-6">
            You agree not to use the Service to:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Generate harmful or deceptive content",
              "Bypass automated rate limits",
              "Reverse engineer AI models",
              "Collect unauthorized personal data",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-gray-400 bg-white/5 p-4 rounded-xl border border-white/5"
              >
                <AlertCircle size={16} className="text-red-500" />
                {item}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* 3. AI Performance Disclaimer */}
        <motion.section
          variants={sectionVariants}
          className="p-8 bg-gradient-to-br from-blue-600/20 to-transparent backdrop-blur-xl rounded-[2rem] border border-blue-500/20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
              <Zap size={24} />
            </div>
            <h2 className="text-2xl font-bold">3. AI Disclosures</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            HelplyAI utilizes large language models and automation. While we
            strive for 99.9% accuracy, you acknowledge that AI-generated
            responses should be monitored. HelplyAI is not liable for outcomes
            based on automated decisions made by the bot without human
            oversight.
          </p>
        </motion.section>

        {/* 4. Governing Law */}
        <motion.section
          variants={sectionVariants}
          className="p-8 bg-[#140036]/50 backdrop-blur-xl rounded-[2rem] border border-white/5"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Globe size={24} />
            </div>
            <h2 className="text-2xl font-bold">4. Jurisdiction</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            These terms are governed by the laws of the **Federal Republic of
            Nigeria**. Any disputes arising from the use of this service shall
            be resolved in the courts located in Lagos, Nigeria.
          </p>
        </motion.section>

        {/* 5. Termination */}
        <motion.section
          variants={sectionVariants}
          className="text-center py-12"
        >
          <h2 className="text-2xl font-bold mb-4">
            Questions about these terms?
          </h2>
          <p className="text-gray-400 mb-8">
            Contact our legal department at{" "}
            <span className="text-fuchsia-400 font-bold">
              legal@helplyai.com
            </span>
          </p>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.section>
      </div>
    </motion.div>
  );
}
