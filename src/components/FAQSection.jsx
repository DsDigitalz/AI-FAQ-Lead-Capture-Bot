import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

// --- Framer Motion Animation Setup ---
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
// ------------------------------------

const faqData = [
  {
    question: "How long does it take to set up and train the HelplyAI bot?",
    answer:
      "Setup is instant. You can train the AI in less than 5 minutes by uploading your existing documents (PDFs, FAQs, website links). The bot processes and learns your data immediately.",
  },
  {
    question: "What happens when I exceed my monthly chat limit?",
    answer:
      "We notify you when you reach 80% of your limit. We will never cut off a conversation abruptly. Instead, usage beyond your limit is automatically billed at a small, fixed rate per chat, or you can instantly upgrade your plan.",
  },
  {
    question:
      "Can the bot integrate with my existing CRM (e.g., Zoho, HubSpot)?",
    answer:
      "Yes. Our Pro Automation and Enterprise tiers support seamless, two-way integration with popular CRMs and tools like Slack, HubSpot, Salesforce, and Zoho to log leads and support transcripts.",
  },
  {
    question: "Is my proprietary data secure when training the AI?",
    answer:
      "Absolutely. All data used for training is encrypted both in transit and at rest. We maintain strict compliance standards, including GDPR, and your data is never used to train the general model.",
  },
  {
    question: "Do you offer a free trial or free tier?",
    answer:
      "Yes, we offer a free 7-day trial with full access to the Starter Bot features. No credit card is required to begin. This allows you to fully test the lead capture and support capabilities.",
  },
];

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="border-b border-[#210045] py-4"
    >
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl font-semibold text-white">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-fuchsia-400" />
        ) : (
          <ChevronDown className="w-6 h-6 text-fuchsia-400" />
        )}
      </button>

      {/* Accordion Content - Uses CSS transition for smooth height change */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-300 pr-10">{answer}</p>
      </div>
    </motion.div>
  );
};

export default function FAQSection() {
  return (
    <div className="py-24 bg-[#0A0027] text-white" id="faq">
      <motion.div
        className="max-w-7xl mx-auto px-6 lg:flex lg:space-x-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Left Content */}
        <div className="lg:w-1/3 mb-10 lg:mb-0">
          <motion.div variants={itemVariants}>
            <p className="text-fuchsia-400 font-semibold uppercase tracking-widest mb-3">
              FAQs
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
              Questions? We have <span className="text-blue-400">Answers.</span>
            </h2>
            <p className="text-gray-400">
              We know you have questions about integrating a new AI tool. We've
              compiled the most important ones here.
            </p>
          </motion.div>
        </div>

        {/* Right Accordion */}
        <div className="lg:w-2/3">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
