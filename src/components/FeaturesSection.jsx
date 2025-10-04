import React from "react";
import { motion } from "framer-motion";
import {
  Zap, // For speed/instant
  Shield, // For security/protection
  Users, // For team/integration
  CheckCircle,
  Database, // For knowledge base
  Clock, // For 24/7
} from "lucide-react";

// --- Framer Motion Animation Setup ---
// Inherits the custom instructions for fade-in and slide-in
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delayChildren: 0.2,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};
// ------------------------------------

const featureData = [
  {
    icon: Zap,
    title: "Instant 24/7 Support",
    description:
      "Eliminate wait times. Our bot provides immediate, accurate answers by processing your entire knowledge base in milliseconds.",
    color: "text-fuchsia-400",
  },
  {
    // 🟢 FIX: Now using CheckCircle, which is guaranteed to be exported.
    icon: CheckCircle,
    title: "Intelligent Lead Qualification",
    description:
      "Automatically ask critical questions (budget, needs, timeline) and qualify leads before handing them off to your sales team.",
    color: "text-blue-400",
  },
  {
    icon: Database,
    title: "Customizable Knowledge Base",
    description:
      "Train the AI instantly on your existing FAQs, documents, website content, and internal policies for pinpoint accuracy.",
    color: "text-green-400",
  },
  {
    icon: Users,
    title: "Seamless Team Handoff",
    description:
      "If a chat requires human intervention, the bot collects all context and smoothly transfers the conversation to a live agent.",
    color: "text-amber-400",
  },
  {
    icon: Shield,
    title: "GDPR & Data Security",
    description:
      "Maintain compliance and trust. All customer data is encrypted and handled according to strict regulatory standards (as promised in the Hero section).",
    color: "text-red-400",
  },
  {
    icon: Clock,
    title: "Real-time Performance Reports",
    description:
      "Access analytics on lead capture rate, customer satisfaction, and the time saved by your support agents.",
    color: "text-purple-400",
  },
];

export default function FeaturesSection() {
  return (
    // 🟢 Semantic Markup: Main container uses <section>
    <section className="pt-20 pb:10 md:py-20 bg-[#0A0027]">
      <motion.div
        className="max-w-7xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" // Animate when the user scrolls to the section
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section Heading */}
        {/* 🟢 Semantic Markup: Used <header> for the section's heading group */}
        <motion.header variants={itemVariants} className="text-center mb-16">
          <p className="text-fuchsia-400 font-semibold uppercase tracking-widest mb-3">
            Features
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            How HelplyAI Transforms Your Support
          </h2>
        </motion.header>

        {/* Features Grid */}
        {/* 🟢 Semantic Markup: Used <main> as the primary container for the feature articles */}
        <motion.main
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {featureData.map((feature, index) => (
            // 🟢 Semantic Markup: Used <article> for each self-contained feature item
            <motion.article
              key={index}
              variants={itemVariants}
              className="bg-[#140036] p-8 rounded-xl border border-[#210045] shadow-2xl hover:shadow-fuchsia-900/50 transition-shadow duration-300"
            >
              <feature.icon
                className={`w-8 h-8 ${feature.color} mb-4 p-1.5 rounded-md bg-white/10`}
                strokeWidth={2}
              />
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.article>
          ))}
        </motion.main>
      </motion.div>
    </section>
  );
}