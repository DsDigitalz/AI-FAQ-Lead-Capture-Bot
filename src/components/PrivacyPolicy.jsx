import React, { useEffect } from "react";
// 🔑 Framer Motion for fade-in animation
import { motion } from "framer-motion";

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

export default function PrivacyPolicy() {
  
  // 🔑 FIX: Scroll to Top Hook (Ensures the page starts at the top when navigated to)
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    // 🟢 Semantic Markup: The <main> tag should be provided by the LegalLayout,
    // but here we ensure the content block is ready for that layout.
    <motion.div
      className="text-white pt-12 pb-20" // Padding for content within the LegalLayout
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-fuchsia-400">
          Privacy Policy
        </h1>
        <p className="mt-2 text-gray-400 text-lg">
          Last Updated: October 10, 2025
        </p>
      </header>
      
      {/* 1. Introduction Section */}
      <motion.section 
        variants={sectionVariants} 
        className="mb-12 p-6 bg-[#140036] rounded-xl border border-[#210045]"
      >
        <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
        <p className="text-gray-300 leading-relaxed">
          HelplyAI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by HelplyAI, particularly in relation to our B2B SaaS platform that automates customer support and lead qualification. By accessing or using our service, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy.
        </p>
      </motion.section>

      {/* 2. Information We Collect */}
      <motion.section variants={sectionVariants} className="mb-12">
        <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
        <p className="text-gray-300 mb-4">
          We collect various types of information when you use our services:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
          <li>
            **Account Data:** Name, email address, company name, password (encrypted), and billing information provided during the sign-up or trial process.
          </li>
          <li>
            **Bot Interaction Data:** Content of conversations between your customers and the HelplyAI bot, including customer queries, bot responses, and lead qualification data. This data is processed on your behalf.
          </li>
          <li>
            **Usage Data:** Information about how you access and use the service, such as IP address, browser type, pages viewed, and time spent on the service.
          </li>
          <li>
            **Cookies and Tracking:** We use cookies and similar tracking technologies (like web beacons) to track activity on our service and hold certain information.
          </li>
        </ul>
      </motion.section>

      {/* 3. How We Use Your Information */}
      <motion.section variants={sectionVariants} className="mb-12">
        <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
        <p className="text-gray-300 mb-4">
          We use the information we collect primarily for the following purposes:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
          <li>To **Provide and Maintain** the Service, including processing transactions and managing your account.</li>
          <li>To **Improve, Personalize, and Expand** our Service (e.g., training the core AI models to better serve you).</li>
          <li>To **Communicate** with you regarding service updates, security alerts, and support messages.</li>
          <li>For **Security** purposes, such as preventing fraud and protecting the integrity of our platform.</li>
        </ul>
      </motion.section>

      {/* 4. Data Protection and Security */}
      <motion.section variants={sectionVariants} className="mb-12 p-6 bg-[#140036] rounded-xl border border-[#210045]">
        <h2 className="text-2xl font-bold mb-4">4. Data Protection and Security</h2>
        <p className="text-gray-300 leading-relaxed">
          We take reasonable measures to protect the information collected through the Service from loss, theft, misuse, and unauthorized access. We use **industry-standard encryption (SSL/TLS)**, access controls, and secure data centers. However, no internet transmission is 100% secure, and we cannot guarantee the absolute security of your information.
        </p>
      </motion.section>

      {/* 5. Your Rights (GDPR/Local Compliance) */}
      <motion.section variants={sectionVariants} className="mb-12">
        <h2 className="text-2xl font-bold mb-4">5. Your Data Rights</h2>
        <p className="text-gray-300 mb-4">
          Depending on your location, you may have the following rights regarding your personal data:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
          <li>**Right of Access:** Request copies of your personal data.</li>
          <li>**Right to Rectification:** Request that we correct any information you believe is inaccurate.</li>
          <li>**Right to Erasure:** Request that we erase your personal data under certain conditions.</li>
        </ul>
      </motion.section>
      
      {/* 6. Contact Information */}
      <motion.section variants={sectionVariants} className="mb-4">
        <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
        <p className="text-gray-300">
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p className="mt-2 text-lg text-fuchsia-400 font-medium">
          Email: privacy@helplyai.com
        </p>
        <p className="text-gray-400">
          Address: [Your Company's Physical Address in Lagos, Nigeria]
        </p>
      </motion.section>

    </motion.div>
  );
}