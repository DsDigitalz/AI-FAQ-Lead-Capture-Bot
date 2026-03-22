import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Server,
  Lock,
  Users,
  Mail,
  Globe,
  CheckCircle2,
} from "lucide-react";

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

export default function GDPRCompliance() {
  // 🔑 Scroll to Top Hook
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // 🟢 Semantic Markup: main content container
    <motion.div
      className="text-white pt-32 lg:pt-48 pb-24 px-6 max-w-5xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="mb-20 text-center lg:text-left">
        <motion.div
          variants={sectionVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
        >
          <ShieldCheck size={14} />
          Global Standards
        </motion.div>
        <motion.h1
          variants={sectionVariants}
          className="text-5xl md:text-6xl font-black mb-6 tracking-tighter"
        >
          GDPR{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-fuchsia-400">
            Compliance
          </span>
        </motion.h1>
        <motion.p
          variants={sectionVariants}
          className="text-gray-400 text-lg max-w-2xl"
        >
          Transparency is at the heart of HelplyAI. We’ve built our
          infrastructure to exceed European data protection standards.
        </motion.p>
      </header>

      <div className="space-y-8">
        {/* 1. Roles and Scope */}
        <motion.section
          variants={sectionVariants}
          className="p-8 bg-[#140036]/50 backdrop-blur-xl rounded-[2rem] border border-white/5"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Users className="text-blue-400" />
            1. Roles and Scope
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <article className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <h3 className="text-blue-400 font-bold mb-2">
                HelplyAI as Controller
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                We control the data of our direct clients (account emails,
                billing, and platform analytics) to provide our service.
              </p>
            </article>
            <article className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <h3 className="text-fuchsia-400 font-bold mb-2">
                HelplyAI as Processor
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                We process your customers' interaction data on your behalf. In
                this relationship, you remain the Data Controller.
              </p>
            </article>
          </div>
        </motion.section>

        {/* 2. Security Measures */}
        <motion.section
          variants={sectionVariants}
          className="p-8 bg-[#140036]/50 backdrop-blur-xl rounded-[2rem] border border-white/5"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-fuchsia-500/10 rounded-xl text-fuchsia-400">
              <Lock size={24} />
            </div>
            <h2 className="text-2xl font-bold">2. Security Architecture</h2>
          </div>
          <ul className="space-y-4">
            {[
              {
                title: "Encryption",
                desc: "End-to-end SSL/TLS 1.3 for data in motion and AES-256 for data at rest.",
              },
              {
                title: "Access Control",
                desc: "Principle of Least Privilege (PoLP) enforced across all internal data access.",
              },
              {
                title: "Audit Logging",
                desc: "Every access attempt is logged and monitored for suspicious activity.",
              },
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
              >
                <CheckCircle2
                  className="text-emerald-500 flex-shrink-0"
                  size={20}
                />
                <div>
                  <h4 className="font-bold text-white">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* 3. International Transfers */}
        <motion.section
          variants={sectionVariants}
          className="p-8 bg-[#140036]/50 backdrop-blur-xl rounded-[2rem] border border-white/5"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
              <Globe size={24} />
            </div>
            <h2 className="text-2xl font-bold">3. Data Residency</h2>
          </div>
          <p className="text-gray-300 leading-relaxed mb-6">
            To ensure compliance for our EU-based clients, HelplyAI offers
            regional data hosting.
          </p>
          <div className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20">
            <Server className="text-blue-400" size={32} />
            <p className="text-sm text-gray-300">
              Data for EU residents is hosted within **AWS Europe (Frankfurt)**
              regions to comply with residency requirements and optimize
              latency.
            </p>
          </div>
        </motion.section>

        {/* 4. Contact DPO */}
        <motion.section
          variants={sectionVariants}
          className="bg-gradient-to-br from-[#140036] to-[#0A0027] p-12 rounded-[2.5rem] border border-white/5 text-center"
        >
          <Mail className="mx-auto mb-6 text-fuchsia-400" size={40} />
          <h2 className="text-3xl font-bold mb-4">Request a DPA</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Need a signed Data Processing Addendum (DPA) for your legal records?
            Our compliance team is ready to assist.
          </p>
          <a
            href="mailto:dpo@helplyai.com"
            className="inline-block bg-white text-black font-bold px-10 py-4 rounded-2xl hover:bg-gray-200 transition-colors shadow-xl shadow-white/5"
          >
            Email Data Protection Officer
          </a>
        </motion.section>
      </div>
    </motion.div>
  );
}
