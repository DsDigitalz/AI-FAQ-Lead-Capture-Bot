import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  Users,
  CheckCircle,
  Database,
  Clock,
  ArrowUpRight,
} from "lucide-react";

// --- Framer Motion Setup ---
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

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const featureData = [
  {
    icon: Zap,
    title: "Instant 24/7 Support",
    description:
      "Eliminate wait times. Our bot provides immediate, accurate answers by processing your entire knowledge base in milliseconds.",
    color: "from-fuchsia-500 to-purple-600",
    iconColor: "text-fuchsia-400",
  },
  {
    icon: CheckCircle,
    title: "Lead Qualification",
    description:
      "Automatically ask critical questions and qualify leads before handing them off to your sales team.",
    color: "from-blue-500 to-cyan-500",
    iconColor: "text-blue-400",
  },
  {
    icon: Database,
    title: "Custom Knowledge Base",
    description:
      "Train the AI instantly on your existing FAQs, documents, and website content for pinpoint accuracy.",
    color: "from-green-500 to-emerald-600",
    iconColor: "text-green-400",
  },
  {
    icon: Users,
    title: "Seamless Handoff",
    description:
      "If a chat requires human intervention, the bot collects all context and transfers it to a live agent.",
    color: "from-amber-500 to-orange-600",
    iconColor: "text-amber-400",
  },
  {
    icon: Shield,
    title: "GDPR & Security",
    description:
      "Maintain compliance and trust. All customer data is encrypted and handled with strict regulatory standards.",
    color: "from-red-500 to-rose-600",
    iconColor: "text-red-400",
  },
  {
    icon: Clock,
    title: "Real-time Reports",
    description:
      "Access analytics on lead capture rate, customer satisfaction, and the time saved by your support agents.",
    color: "from-purple-500 to-indigo-600",
    iconColor: "text-purple-400",
  },
];

export default function FeaturesSection() {
  return (
    <section
      className="relative py-24 bg-[#0A0027] overflow-hidden"
      id="features"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-fuchsia-600/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Section Heading */}
        <header className="text-center mb-20 space-y-4">
          <motion.span
            variants={itemVariants}
            className="inline-block px-4 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-xs font-bold uppercase tracking-[0.2em]"
          >
            Features
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Everything you need to <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-blue-400">
              scale your support.
            </span>
          </motion.h2>
        </header>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureData.map((feature, index) => (
            <motion.article
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative bg-[#140036]/50 backdrop-blur-sm p-8 rounded-2xl border border-[#210045] hover:border-fuchsia-500/30 transition-all duration-300"
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/0 via-transparent to-fuchsia-600/0 group-hover:from-fuchsia-600/5 transition-all duration-500 rounded-2xl" />

              <div className="relative z-10">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-10 mb-6 shadow-inner`}
                >
                  <feature.icon
                    className="w-6 h-6 text-white"
                    strokeWidth={2.5}
                  />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-between">
                  {feature.title}
                  <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-fuchsia-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>

                <p className="text-gray-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Decorative Line */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#210045] to-transparent group-hover:via-fuchsia-500/50 transition-all duration-500" />
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
