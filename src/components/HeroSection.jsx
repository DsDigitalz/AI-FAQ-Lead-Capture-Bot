import React, { useEffect, useState } from "react";
import { Send, Shield, Zap, CheckCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

// --- HelplyAI Logo ---
const HelplyAILogo = ({ className = "w-7 h-7" }) => (
  <div className={`relative ${className}`}>
    <Shield className="w-full h-full text-white" strokeWidth={1.5} />
    <Zap
      className="absolute top-1/2 left-1/2 w-3 h-3 text-fuchsia-400 fill-fuchsia-400 transform -translate-x-1/2 -translate-y-1/2"
      strokeWidth={0}
    />
  </div>
);

export default function HeroSection({ onStartChatting, onRequestDemo }) {
  // --- Infinite Light/Dark Theme ---
  const [theme, setTheme] = useState("light"); // "light" or "dark"
  useEffect(() => {
    const interval = setInterval(() => {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }, 10000); // change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  // --- Typewriter / Chat State ---
  const botMessages = [
    "Hi there! I'm here to help answer your questions instantly. What would you like to know?",
    "Our service is a B2B SaaS platform that integrates with your website to provide 24/7 support and intelligently qualify leads.",
  ];

  const [displayText, setDisplayText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [phase, setPhase] = useState("intro"); // intro → user → answer → loop
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(blink);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentMessage = botMessages[messageIndex];
    let speed = isDeleting ? 25 : 45;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentMessage.length) {
        setDisplayText(currentMessage.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentMessage.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === currentMessage.length) {
        if (phase === "intro") setTimeout(() => setPhase("user"), 1200);
        else if (phase === "answer")
          setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setMessageIndex(0);
        setPhase("intro");
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, messageIndex, phase]);

  // Transition from user question to AI answer
  useEffect(() => {
    if (phase === "user") {
      setTimeout(() => {
        setPhase("answer");
        setMessageIndex(1);
        setCharIndex(0);
        setDisplayText("");
      }, 1500);
    }
  }, [phase]);

  // --- Framer Motion Variants ---
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delayChildren: 0.3, staggerChildren: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      className="pt-30 pb:10 md:pb-16 lg:pt-60 lg:pb-50 text-white bg-gradient-to-br from-[#00031F] via-[#10003B] to-[#21000B]"
      id="demo"
    >
      <motion.div
        className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 space-y-12 lg:space-y-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* LEFT SIDE */}
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
            Stop waiting on hold. Get{" "}
            <strong>lightning-fast, 24/7 support</strong> and automatically
            capture leads the moment they need help.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <button
              onClick={onStartChatting}
              className="inline-block py-3 px-8 cursor-pointer text-lg font-semibold rounded-full bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors shadow-lg"
            >
              Start Chatting →
            </button>
            <button
              onClick={onRequestDemo}
              className="inline-block py-3 px-8 cursor-pointer text-lg font-semibold rounded-full border border-gray-500 hover:border-white hover:bg-gray-800 transition-colors"
            >
              Request a Demo
            </button>
          </motion.div>

          <motion.nav
            variants={itemVariants}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8"
          >
            <p className="flex items-center text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
              <span className="font-semibold">GDPR Compliant</span>
            </p>
            <p className="flex items-center text-sm text-gray-300">
              <ShieldCheck className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
              <span className="font-semibold">99.9% Uptime SLA</span>
            </p>
          </motion.nav>
        </main>

        {/* RIGHT CHAT MOCKUP */}
        <motion.div className="w-full max-w-sm sm:max-w-md lg:w-1/2 flex justify-center p-4">
          <motion.article
            className="rounded-xl shadow-2xl overflow-hidden p-6 w-full transform transition-transform duration-500 scrollbar-hide"
            animate={{
              backgroundColor: theme === "light" ? "#ffffff" : "#111827",
            }}
            transition={{ duration: 2 }}
          >
            {/* Header */}
            <header className="flex items-center space-x-3 pb-4 border-b border-[#ffffff1e]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-fuchsia-500 to-blue-500 flex items-center justify-center">
                <HelplyAILogo className="w-6 h-6" />
              </div>
              <div>
                <p
                  className={
                    theme === "light"
                      ? "text-gray-800 font-semibold"
                      : "text-gray-200 font-semibold"
                  }
                >
                  AI Assistant
                </p>
                <p className="text-green-500 text-xs flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-1 flex-shrink-0"></span>
                  Online now
                </p>
              </div>
            </header>

            {/* Chat */}
            <section className="h-48 overflow-y-scroll space-y-3 pt-4">
              {(phase === "intro" ||
                phase === "user" ||
                phase === "answer") && (
                <p
                  className={
                    theme === "light"
                      ? "text-gray-800 text-sm leading-relaxed"
                      : "text-gray-200 text-sm leading-relaxed"
                  }
                >
                  {messageIndex === 0 && (
                    <>
                      {displayText}
                      <span
                        className={`inline-block w-1 ${
                          cursorVisible
                            ? theme === "light"
                              ? "bg-gray-800"
                              : "bg-gray-200"
                            : "bg-transparent"
                        } ml-0.5 align-bottom`}
                        style={{ height: "1em" }}
                      ></span>
                    </>
                  )}
                </p>
              )}

              {(phase === "user" || phase === "answer") && (
                <div className="flex justify-end">
                  <p className="bg-fuchsia-500 text-white py-2 px-4 rounded-xl rounded-br-none max-w-[70%] text-sm shadow-md">
                    How does your service work?
                  </p>
                </div>
              )}

              {phase === "answer" && (
                <p
                  className={
                    theme === "light"
                      ? "text-gray-800 text-sm leading-relaxed"
                      : "text-gray-200 text-sm leading-relaxed"
                  }
                >
                  {messageIndex === 1 && (
                    <>
                      {displayText}
                      <span
                        className={`inline-block w-1 ${
                          cursorVisible
                            ? theme === "light"
                              ? "bg-gray-800"
                              : "bg-gray-200"
                            : "bg-transparent"
                        } ml-0.5 align-bottom`}
                        style={{ height: "1em" }}
                      ></span>
                    </>
                  )}
                </p>
              )}
            </section>

            {/* Footer */}
            <footer className="pt-4 flex items-center border-t border-[#ffffff1e] mt-4">
              <input
                type="text"
                placeholder="Type your question here..."
                className={`flex-grow p-3 rounded-full focus:outline-none ${
                  theme === "light"
                    ? "bg-gray-100 text-gray-700"
                    : "bg-gray-800 text-gray-200"
                }`}
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
