import React from "react";
// 🟢 CHANGE: Added CheckCircle and ShieldCheck to the imports
import { Send, Shield, Zap, CheckCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

// 🟢 NEW LOGO COMPONENT for the chat widget (consistent with Header)
const HelplyAILogo = ({ className = "w-7 h-7" }) => (
  // 🟢 Semantic Markup: Keeping <div> as this is purely a visual, non-semantic container for positioning icons
  <div className={`relative ${className}`}>
    {/* Shield Icon: Represents help and protection */}
    <Shield className="w-full h-full text-white" strokeWidth={1.5} />
    {/* Zap Icon: Represents intelligence and speed */}
    <Zap
      className="absolute top-1/2 left-1/2 w-3 h-3 text-fuchsia-400 fill-fuchsia-400 transform -translate-x-1/2 -translate-y-1/2"
      strokeWidth={0}
    />
  </div>
);

export default function HeroSection() {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    // 🟢 Semantic Markup: Use <section> for the hero block
    <section className=" pt-20 pb:10 md:pb-16 lg:pt-32 lg:pb-40 text-white bg-gradient-to-br from-[#00031F] via-[#10003B] to-[#21000B]">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 space-y-12 lg:space-y-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Content Area */}
        {/* 🟢 Semantic Markup: Use <main> or <article> for primary, unique page content */}
        <main className="w-full lg:w-1/2 text-center lg:text-left">
          <motion.p
            variants={itemVariants}
            className="text-fuchsia-400 font-semibold mb-3 flex items-center justify-center lg:justify-start"
          >
            <span className="text-sm mr-2">✨</span>AI-Powered Support
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
          >
            Get Instant Answers with Our <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-fuchsia-400">
              Smart AI Bot
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-300 mb-10 max-w-lg mx-auto lg:mx-0"
          >
            Stop waiting on hold. Get **lightning-fast, 24/7 support** and
            automatically capture leads the moment they need help.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <a
              href="#chat"
              className="inline-block py-3 px-8 text-lg font-semibold rounded-full bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors shadow-lg"
            >
              Start Chatting →
            </a>
            <a
              href="#demo"
              className="inline-block py-3 px-8 text-lg font-semibold rounded-full border border-gray-500 hover:border-white hover:bg-gray-800 transition-colors"
            >
              Request a Demo
            </a>
          </motion.div>

          {/* 🟢 Semantic Markup: Used <nav> for the Assurance Strip as it's a bar of secondary, trust-based links/information */}
          <motion.nav
            variants={itemVariants}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8"
          >
            {/* Assurance Badge 1: Data Integrity */}
            <p className="flex items-center text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
              <span className="font-semibold">GDPR Compliant</span>
            </p>

            {/* Assurance Badge 2: Uptime/Reliability */}
            <p className="flex items-center text-sm text-gray-300">
              <ShieldCheck className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
              <span className="font-semibold">99.9% Uptime SLA</span>
            </p>
          </motion.nav>
        </main>

        {/* Right Mockup Area (The Bot) */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-sm sm:max-w-md lg:w-1/2 flex justify-center p-4"
        >
          {/* 🟢 Semantic Markup: Use <article> for the self-contained chat mockup */}
          <motion.article
            href="#chat"
            className="bg-white rounded-xl shadow-2xl overflow-hidden p-6 w-full transform transition-transform duration-500 hover:scale-[1.02] cursor-pointer block"
            whileHover={{
              scale: 1.03,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Bot Header */}
            <header className="flex items-center space-x-3 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-fuchsia-500 to-blue-500 flex items-center justify-center">
                <HelplyAILogo className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-800 font-semibold">AI Assistant</p>
                <p className="text-green-500 text-xs flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                  Online now
                </p>
              </div>
            </header>

            {/* Conversation Area */}
            <section className="h-48 overflow-y-scroll space-y-3 pt-4">
              <p className="text-gray-800">
                Hi there! I'm here to help answer your questions instantly. What
                would you like to know?
              </p>
              <div className="flex justify-end">
                <p className="bg-fuchsia-500 text-white py-2 px-4 rounded-xl rounded-br-none max-w-[70%] text-sm shadow-md">
                  How does your service work?
                </p>
              </div>
              <p className="text-gray-800">
                Our service is a B2B SaaS platform that integrates with your
                website to provide 24/7 support and intelligently qualify leads.
              </p>
            </section>

            {/* Input Field (Mockup) */}
            <footer className="pt-4 flex items-center border-t border-gray-100 mt-4">
              <input
                type="text"
                placeholder="Type your question here..."
                className="flex-grow p-3 border border-gray-200 rounded-full focus:outline-none text-gray-700"
                disabled
              />
              <button
                className="ml-2 bg-fuchsia-600 p-3 rounded-full pointer-events-none"
                disabled
              >
                <Send size={20} className="text-white" />
              </button>
            </footer>
          </motion.article>
        </motion.div>
      </motion.div>
    </section>
  );
}
