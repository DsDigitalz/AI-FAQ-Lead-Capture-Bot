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

// --- Framer Motion Animation Setup (Performance Optimized) ---
const containerVariants = {
  hidden: {
    opacity: 0,
    // 🔑 OPTIMIZATION: Use translateY for GPU-acceleration on the container
    transform: "translateY(20px) translateZ(0)",
  },
  visible: {
    opacity: 1,
    transform: "translateY(0) translateZ(0)",
    transition: {
      // 🔑 OPTIMIZATION: Reduced duration for snappier feel
      duration: 0.3,
      ease: "easeOut",
      // 🔑 OPTIMIZATION: Faster stagger for quick reveal
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    // 🔑 OPTIMIZATION: Use translateY and scale in transform for GPU
    transform: "translateY(15px) scale(0.98) translateZ(0)",
  },
  visible: {
    opacity: 1,
    transform: "translateY(0) scale(1) translateZ(0)",
    transition: {
      // 🔑 OPTIMIZATION: Snappy item duration
      duration: 0.3,
      ease: "easeOut",
    },
  },
};
// -----------------------------------------------------------

const featureData = [
  {
    icon: Zap,
    title: "Instant 24/7 Support",
    description:
      "Eliminate wait times. Our bot provides immediate, accurate answers by processing your entire knowledge base in milliseconds.",
    color: "text-fuchsia-400",
  },
  {
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
    <section className="pt-20 pb:10 md:py-30 bg-[#0A0027]" id="features">
      <motion.div
        className="max-w-7xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        // 🔑 MODIFIED: Increased amount to trigger the animation sooner when scrolling on mobile
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
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
        {/* NOTE: We removed variants from the inner <motion.main> tag because it was already set on the parent <motion.div>. Keeping it on the parent is more efficient. */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </main>
      </motion.div>
    </section>
  );
}
