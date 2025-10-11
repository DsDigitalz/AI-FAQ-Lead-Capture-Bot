import React, { useEffect } from "react";
// 🔑 Framer Motion for fade-in/slide-in animation
import { motion } from "framer-motion";
import { ShieldCheck, Server, Lock, Users, Mail, Globe } from "lucide-react";

// --- Framer Motion Animation Setup ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// --- Main Component ---

export default function GDPRCompliance() {
  // 🔑 FIX: Scroll to Top Hook
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // 🟢 Semantic Markup: Content block designed to fit within the LegalLayout
    <motion.div
      className="text-white pt-12 pb-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="mb-12">
        <div className="flex items-center space-x-3 mb-2">
          <ShieldCheck className="w-8 h-8 text-green-400" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
            GDPR Compliance
          </h1>
        </div>
        <p className="mt-2 text-gray-400 text-lg">
          Our commitment to data protection and privacy for European users.
        </p>
      </header>

      {/* 1. Introduction and Roles */}
      <motion.section
        variants={sectionVariants}
        className="mb-12 p-6 bg-[#140036] rounded-xl border border-[#210045]"
      >
        <h2 className="text-2xl font-bold mb-4">1. Roles and Scope</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          The General Data Protection Regulation (GDPR) sets stringent standards
          for handling personal data of EU residents. At HelplyAI, we recognize
          two key roles:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
          <li>
            **HelplyAI as Data Controller:** We are the Controller for the
            personal data of our direct customers (e.g., your account details,
            billing info, usage analytics).
          </li>
          <li>
            **HelplyAI as Data Processor:** We are the Processor for the
            personal data of your customers (the data that flows through the
            HelplyAI bot, e.g., names, emails, conversation content). You, our
            client, are the **Data Controller** in this scenario.
          </li>
        </ul>
      </motion.section>

      {/* 2. Data Processing Agreements (DPA) */}
      <motion.section variants={sectionVariants} className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
          <Lock size={28} className="text-fuchsia-400" />
          <span>2. Security and Data Protection Measures</span>
        </h2>
        <p className="text-gray-300 mb-4">
          We have implemented robust technical and organizational measures to
          ensure data protection:
        </p>
        <ul className="list-disc list-inside space-y-3 pl-4 text-gray-400">
          <li>
            **Encryption:** All data, both in transit (using **SSL/TLS**) and at
            rest (using AES-256), is encrypted.
          </li>
          <li>
            **Data Centers:** We utilize secure, industry-leading data centers
            that meet stringent compliance standards.
          </li>
          <li>
            **Access Control:** Access to customer data is strictly limited to
            necessary personnel and is logged and audited regularly.
          </li>
          <li>
            **Pseudonymisation:** Where possible and appropriate, personal
            identifiers are separated from processing data.
          </li>
        </ul>
      </motion.section>

      {/* 3. Data Subject Rights */}
      <motion.section variants={sectionVariants} className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
          <Users size={28} className="text-fuchsia-400" />
          <span>3. Supporting Data Subject Rights</span>
        </h2>
        <p className="text-gray-300 mb-4">
          As the Data Controller for your customers' data, you are primarily
          responsible for handling Data Subject Requests (DSRs). HelplyAI fully
          supports your compliance:
        </p>
        <ul className="list-disc list-inside space-y-3 pl-4 text-gray-400">
          <li>
            **Right to Access:** We provide tools within the dashboard to allow
            you to easily search and retrieve specific customer data.
          </li>
          <li>
            **Right to Erasure ('Right to be Forgotten'):** We offer
            functionality to permanently delete specific conversation logs and
            associated customer data upon request.
          </li>
          <li>
            **Data Portability:** We can export your raw customer data in a
            structured, commonly used, and machine-readable format.
          </li>
        </ul>
      </motion.section>

      {/* 4. Data Transfers */}
      <motion.section variants={sectionVariants} className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
          <Globe size={28} className="text-fuchsia-400" />
          <span>4. International Data Transfers</span>
        </h2>
        <p className="text-gray-300 leading-relaxed">
          While HelplyAI is based in Nigeria, we host our EU customer data in
          secure data centers located within the EU or in territories deemed to
          offer an adequate level of data protection by the European Commission.
          If data is transferred outside the EU, we ensure appropriate
          safeguards are in place, typically through **Standard Contractual
          Clauses (SCCs)**.
        </p>
      </motion.section>

      {/* 5. Contact Information */}
      <motion.section variants={sectionVariants} className="mb-4">
        <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
          <Mail size={28} className="text-fuchsia-400" />
          <span>5. Contact for Compliance</span>
        </h2>
        <p className="text-gray-300">
          For any specific GDPR-related questions, requests regarding your
          personal data (as a direct HelplyAI client), or to request a copy of
          our Data Processing Addendum (DPA), please contact our Data Protection
          Officer:
        </p>
        <p className="mt-2 text-lg text-fuchsia-400 font-medium">
          Email: dpo@helplyai.com
        </p>
      </motion.section>
    </motion.div>
  );
}
