import React, { useEffect } from "react";
// 🔑 Framer Motion for fade-in/slide-in animation
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

export default function TermsOfService() {
  // 🔑 FIX: Scroll to Top Hook (Ensures the page starts at the top when navigated to)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // 🟢 Semantic Markup: The content block designed to fit within the LegalLayout
    <motion.div
      className="text-white pt-30 lg:pt-40 pb-20 l px-4 sm:px-8 lg:px-16" // Padding for content within the LegalLayout
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-fuchsia-400">
          Terms of Service
        </h1>
        <p className="mt-2 text-gray-400 text-lg">
          Effective Date: October 10, 2025
        </p>
      </header>

      {/* 1. Acceptance of Terms */}
      <motion.section
        variants={sectionVariants}
        className="mb-12 p-6 bg-[#140036] rounded-xl border border-[#210045]"
      >
        <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-300 leading-relaxed">
          Welcome to HelplyAI! These Terms of Service ("Terms") govern your
          access to and use of the HelplyAI website, products, and services
          (collectively, the "Service"). By clicking "I agree," accessing, or
          using any part of the Service, you accept and agree to be bound by
          these Terms. If you do not agree to all the terms and conditions of
          this agreement, then you may not access the website or use any
          services.
        </p>
      </motion.section>

      {/* 2. Service Access and Accounts */}
      <motion.section
        variants={sectionVariants}
        className="mb-12 p-6 bg-[#140036] rounded-xl border border-[#210045]"
      >
        <h2 className="text-2xl font-bold mb-4">
          2. Service Access and Accounts
        </h2>
        <ul className="list-disc list-inside space-y-3 pl-4 text-gray-400">
          <li>
            **Eligibility:** You must be at least 18 years old and capable of
            forming a binding contract with HelplyAI to use the Service.
          </li>
          <li>
            **Account Responsibility:** You are responsible for all activities
            that occur under your account and for maintaining the
            confidentiality of your password. You must notify us immediately
            upon becoming aware of any breach of security or unauthorized use of
            your account.
          </li>
          <li>
            **Service Use:** The Service is provided to you for your business
            use only, in accordance with the features of your selected
            subscription plan.
          </li>
        </ul>
      </motion.section>

      {/* 3. Fees and Payment */}
      <motion.section
        variants={sectionVariants}
        className="mb-12 p-6 bg-[#140036] rounded-xl border border-[#210045]"
      >
        <h2 className="text-2xl font-bold mb-4">3. Fees and Payment</h2>
        <ul className="list-disc list-inside space-y-3 pl-4 text-gray-400">
          <li>
            **Subscription:** Access to the Service is billed on a subscription
            basis. You will be billed in advance on a recurring, periodic basis
            (such as monthly or annual).
          </li>
          <li>
            **No Refunds:** Payments are non-refundable, except where explicitly
            stated in your subscription agreement or required by law.
          </li>
          <li>
            **Changes:** HelplyAI reserves the right to change its fees at any
            time, provided that any change will be effective only at the end of
            your current billing cycle.
          </li>
        </ul>
      </motion.section>

      {/* 4. Content and Conduct */}
      <motion.section
        variants={sectionVariants}
        className="mb-12 p-6 bg-[#140036] rounded-xl border border-[#210045]"
      >
        <h2 className="text-2xl font-bold mb-4">
          4. Customer Data and Intellectual Property
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          **Customer Data:** You retain all rights to the data you input or
          transmit through the Service ("Customer Data"), including your
          customer conversations. You grant HelplyAI a license to use this data
          only as necessary to provide, maintain, and improve the Service.
        </p>
        <p className="text-gray-300 leading-relaxed">
          **Service IP:** All intellectual property rights in the Service itself
          (excluding Customer Data) are owned by HelplyAI. You may not copy,
          modify, distribute, sell, or lease any part of our Service without
          express written permission.
        </p>
      </motion.section>

      {/* 5. Termination */}
      <motion.section
        variants={sectionVariants}
        className="mb-12 p-6 bg-[#140036] rounded-xl border border-[#210045]"
      >
        <h2 className="text-2xl font-bold mb-4">5. Termination</h2>
        <p className="text-gray-300 leading-relaxed">
          We may terminate or suspend your access to the Service immediately,
          without prior notice or liability, for any reason whatsoever,
          including without limitation if you breach the Terms. Upon
          termination, your right to use the Service will immediately cease.
        </p>
      </motion.section>

      {/* 6. Contact Information */}
      <motion.section
        variants={sectionVariants}
        className="mb-12 p-6 bg-[#140036] rounded-xl border border-[#210045]"
      >
        <h2 className="text-2xl font-bold mb-4">6. Contact Information</h2>
        <p className="text-gray-300">
          For any questions regarding these Terms of Service, please contact us:
        </p>
        <p className="mt-2 text-lg text-fuchsia-400 font-medium">
          Email: legal@helplyai.com
        </p>
      </motion.section>
    </motion.div>
  );
}
