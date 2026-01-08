import React, { useEffect, useState } from "react";
import {
  Send,
  Shield,
  Zap,
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// Assuming BotAnimation is a separate component as per your code
import BotAnimation from "./BotAnimation";

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

// --- Animation Variants ---
const scrollFadeVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroSection({ onStartChatting, onRequestDemo }) {
  // --- Theme & Chat State ---
  const [theme, setTheme] = useState("dark");
  const botMessages = [
    "Hi there! I'm here to help answer your questions instantly. What would you like to know?",
    "Our service is a B2B SaaS platform that integrates with your website to provide 24/7 support and qualify leads.",
  ];

  const [displayText, setDisplayText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [phase, setPhase] = useState("intro");
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Auto-theme switcher (Refined to 10s for better UX)
  useEffect(() => {
    const interval = setInterval(() => {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Blinking cursor logic
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(blink);
  }, []);

  // Typewriter effect logic
  useEffect(() => {
    const currentMessage = botMessages[messageIndex];
    let speed = isDeleting ? 30 : 50;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentMessage.length) {
        setDisplayText(currentMessage.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentMessage.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === currentMessage.length) {
        if (phase === "intro") setTimeout(() => setPhase("user"), 1500);
        else if (phase === "answer")
          setTimeout(() => setIsDeleting(true), 3000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setMessageIndex(0);
        setPhase("intro");
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, messageIndex, phase]);

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

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0027] pt-25 md:pt-30 pb-12"
      id="hero"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE: Content */}
        <main className="text-center lg:text-left space-y-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollFadeVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-sm font-medium"
          >
            <Sparkles size={14} className="animate-pulse" />
            <span>Next-Gen AI Support</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollFadeVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
          >
            Get Instant Answers with Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-blue-400">
              Smart AI Bot
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollFadeVariants}
            className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Stop losing leads to slow response times. HelplyAI automates your
            customer support and sales qualification with{" "}
            <strong>99% accuracy</strong>.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollFadeVariants}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <button
              onClick={onStartChatting}
              className="group relative px-8 py-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-full font-bold text-lg transition-all shadow-xl shadow-fuchsia-600/20 flex items-center gap-2"
            >
              Start Chatting
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={onRequestDemo}
              className="px-8 py-4 border border-gray-700 hover:border-gray-500 text-white rounded-full font-bold text-lg transition-all bg-white/5 backdrop-blur-sm"
            >
              Request a Demo
            </button>
          </motion.div>

          {/* Social Proof / Badges */}
          <nav className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle size={18} className="text-green-500" />
              <span className="font-medium">Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <ShieldCheck size={18} className="text-blue-500" />
              <span className="font-medium">GDPR & CCPA Ready</span>
            </div>
          </nav>
        </main>

        {/* RIGHT SIDE: Chat Mockup */}
        <aside className="relative flex justify-center">
          {/* Decorative Glow behind the card */}
          <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500/30 to-blue-500/30 blur-[80px] rounded-full opacity-50" />

          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollFadeVariants}
            animate={{
              backgroundColor:
                theme === "light"
                  ? "rgba(255, 255, 255, 0.95)"
                  : "rgba(20, 0, 54, 0.8)",
              borderColor:
                theme === "light"
                  ? "rgba(229, 231, 235, 1)"
                  : "rgba(75, 0, 130, 0.3)",
            }}
            className="relative w-full max-w-[420px] rounded-3xl border backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col h-[520px]"
          >
            {/* Header */}
            <header className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <HelplyAILogo className="w-6 h-6" />
                </div>
                <div>
                  <h3
                    className={`font-bold text-sm ${
                      theme === "light" ? "text-gray-900" : "text-white"
                    }`}
                  >
                    Helply Assistant
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </header>

            {/* Chat Area */}
            <section className="flex-grow p-6 overflow-y-auto space-y-4 scrollbar-hide">
              <AnimatePresence mode="popLayout">
                {/* Bot Message */}
                {(phase === "intro" ||
                  phase === "user" ||
                  phase === "answer") && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-2xl rounded-tl-none text-sm leading-relaxed shadow-sm ${
                      theme === "light"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-white/5 text-gray-200"
                    }`}
                  >
                    {messageIndex === 0 && (
                      <p>
                        {displayText}
                        {cursorVisible && (
                          <span className="inline-block w-1.5 h-4 ml-1 bg-fuchsia-500 align-middle" />
                        )}
                      </p>
                    )}
                  </motion.div>
                )}

                {/* User Message Bubble */}
                {(phase === "user" || phase === "answer") && (
                  <motion.div
                    initial={{ opacity: 0, x: 10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    className="flex justify-end"
                  >
                    <p className="bg-fuchsia-600 text-white p-4 rounded-2xl rounded-br-none text-sm font-medium shadow-lg max-w-[85%]">
                      How does your service work?
                    </p>
                  </motion.div>
                )}

                {/* Bot Answer */}
                {phase === "answer" && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-2xl rounded-tl-none text-sm leading-relaxed shadow-sm ${
                      theme === "light"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-white/5 text-gray-200"
                    }`}
                  >
                    {messageIndex === 1 && (
                      <p>
                        {displayText}
                        {cursorVisible && (
                          <span className="inline-block w-1.5 h-4 ml-1 bg-fuchsia-500 align-middle" />
                        )}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* Mock Input Footer */}
            <footer className="p-5 bg-white/5 border-t border-white/10">
              <div
                className={`flex items-center gap-2 p-2 rounded-xl border ${
                  theme === "light"
                    ? "bg-white border-gray-200"
                    : "bg-[#0A0027] border-white/10"
                }`}
              >
                <div className="flex-grow text-xs text-gray-500 px-2 italic">
                  Ask me anything...
                </div>
                <div className="p-2 bg-fuchsia-600 rounded-lg text-white">
                  <Send size={16} />
                </div>
              </div>
            </footer>
          </motion.article>
        </aside>
      </div>

      {/* <BotAnimation /> */}
    </section>
  );
}
