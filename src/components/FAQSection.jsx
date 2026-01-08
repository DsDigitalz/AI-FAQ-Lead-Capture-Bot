import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

// --- Framer Motion Setup ---
const scrollFadeVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const accordionVariants = {
  collapsed: { height: 0, opacity: 0, marginTop: 0 },
  expanded: { height: "auto", opacity: 1, marginTop: 12 },
};

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.article
      variants={scrollFadeVariants}
      className={`mb-4 rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "bg-white/5 border-fuchsia-500/30 shadow-lg shadow-fuchsia-500/5"
          : "bg-[#140036]/40 border-white/5 hover:border-white/20"
      }`}
    >
      <button
        className="flex justify-between items-center w-full p-6 text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="flex gap-4 items-center">
          <div
            className={`p-2 rounded-lg transition-colors ${
              isOpen
                ? "bg-fuchsia-500 text-white"
                : "bg-white/5 text-gray-400 group-hover:text-white"
            }`}
          >
            <HelpCircle size={18} />
          </div>
          <span
            className={`text-lg font-bold tracking-tight transition-colors ${
              isOpen ? "text-white" : "text-gray-300"
            }`}
          >
            {question}
          </span>
        </div>

        <div
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <ChevronDown
            className={isOpen ? "text-fuchsia-400" : "text-gray-500"}
            size={20}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={accordionVariants}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-6 pb-6 pt-0 ml-12">
              <p className="text-gray-400 leading-relaxed max-w-2xl">
                {answer}
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default function FAQSection() {
  return (
    <section className="relative py-24 bg-[#0A0027] overflow-hidden" id="faq">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="lg:flex lg:gap-20">
          {/* Left Side: Header */}
          <header className="lg:w-5/12 mb-12 lg:mb-0">
            <motion.div variants={scrollFadeVariants} className="sticky top-24">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                <MessageCircle size={14} />
                Knowledge Base
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                Common <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-fuchsia-400">
                  Questions.
                </span>
              </h2>

              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Everything you need to know about integrating HelplyAI into your
                workflow. Can't find what you're looking for?
                <a
                  href="#contact"
                  className="ml-2 text-fuchsia-400 hover:underline font-semibold"
                >
                  Contact support
                </a>
              </p>

              {/* Quick Trust Stat */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 max-w-xs">
                <div className="text-3xl font-bold text-white mb-1">99.9%</div>
                <div className="text-sm text-gray-500 font-medium">
                  Resolution accuracy with properly trained knowledge bases.
                </div>
              </div>
            </motion.div>
          </header>

          {/* Right Side: Accordions */}
          <main className="lg:w-7/12">
            {[
              {
                question: "How long does it take to set up and train the bot?",
                answer:
                  "Setup is instant. You can train the AI in less than 5 minutes by uploading PDFs, FAQs, or website links. The bot processes and learns your data immediately without manual coding.",
              },
              {
                question: "What happens when I exceed my monthly chat limit?",
                answer:
                  "We notify you at 80% usage. Beyond your limit, conversations continue uninterrupted at a small fixed rate per chat, or you can choose to auto-upgrade to the next tier.",
              },
              {
                question: "Can the bot integrate with my existing CRM?",
                answer:
                  "Yes. HelplyAI supports two-way integration with HubSpot, Salesforce, Zoho, and Slack. Lead data and transcripts are automatically synced to your pipeline.",
              },
              {
                question: "Is my proprietary data secure when training the AI?",
                answer:
                  "Security is our priority. All training data is encrypted at rest and in transit. We are GDPR compliant and your data is isolated; it is never used to train global AI models.",
              },
              {
                question: "Do you offer a free trial?",
                answer:
                  "We offer a 7-day full-access trial of our Starter plan. No credit card is required. You can test lead capture and API integrations immediately.",
              },
            ].map((faq, index) => (
              <AccordionItem key={index} {...faq} />
            ))}
          </main>
        </div>
      </motion.div>
    </section>
  );
}
