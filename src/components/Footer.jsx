import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Mail, Twitter, Linkedin } from "lucide-react";

// New Logo Component (repeated for self-sufficiency)
const HelplyAILogo = ({ className = "w-8 h-8" }) => (
  <div className={`relative ${className}`}>
    <Shield className="w-full h-full text-white" strokeWidth={1.5} />
    <Zap
      className="absolute top-1/2 left-1/2 w-3 h-3 text-fuchsia-400 fill-fuchsia-400 transform -translate-x-1/2 -translate-y-1/2"
      strokeWidth={0}
    />
  </div>
);

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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
// ------------------------------------

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    // 🟢 CHANGE: Replaced top <div> with <footer>
    <footer className="bg-[#0A0027] pt-12 pb-6 border-t border-[#1e004a]">
      <motion.div
        className="max-w-7xl mx-auto px-6 text-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Top Section: Logo, Mission, and Socials */}
        {/* 🟢 CHANGE: Used <section> for the major content block within the footer */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-[#210045] pb-10 mb-8">
          {/* Column 1: Brand & Mission */}
          {/* 🟢 CHANGE: Used <article> for the self-contained branding info */}
          <motion.article variants={itemVariants} className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <HelplyAILogo />
              <h3 className="text-3xl font-extrabold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-fuchsia-400">
                  Helply
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-blue-400 font-bold italic">
                  AI
                </span>
              </h3>
            </div>
            <p className="text-gray-400 max-w-sm">
              The fastest way for Nigerian businesses to automate support,
              qualify leads, and scale operations 24/7.
            </p>
          </motion.article>

          {/* Column 2: Product Links */}
          {/* 🟢 CHANGE: Used <nav> for the navigation link group */}
          <motion.nav variants={itemVariants}>
            <h4 className="text-lg font-bold mb-4 text-fuchsia-400">Product</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="#features"
                  className="hover:text-fuchsia-300 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-fuchsia-300 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-fuchsia-300 transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#demo"
                  className="hover:text-fuchsia-300 transition-colors"
                >
                  Request a Demo
                </a>
              </li>
            </ul>
          </motion.nav>

          {/* Column 3: Legal & Company */}
          {/* 🟢 CHANGE: Used <nav> for the navigation link group */}
          <motion.nav variants={itemVariants}>
            <h4 className="text-lg font-bold mb-4 text-blue-400">
              Company & Legal
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="/about"
                  className="hover:text-blue-300 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:text-blue-300 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-blue-300 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/gdpr"
                  className="hover:text-blue-300 transition-colors"
                >
                  GDPR Compliance
                </a>
              </li>
            </ul>
          </motion.nav>
        </section>

        {/* Bottom Section: Copyright and Contact */}
        {/* 🟢 CHANGE: Used <section> for the final copyright/social bar */}
        <section className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          {/* 🟢 CHANGE: Used <p> for the copyright text */}
          <motion.p
            variants={itemVariants}
            className="mb-4 md:mb-0 order-2 md:order-1 text-center"
          >
            &copy; {currentYear} HelplyAI. All rights reserved. Made with 💜 in
            Lagos, Nigeria.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex space-x-6 order-1 md:order-2 mb-4 md:mb-0"
          >
            <a
              href="mailto:support@helplyai.com"
              aria-label="Email Support"
              className="hover:text-fuchsia-400 transition-colors"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://twitter.com/helplyai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-fuchsia-400 transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://linkedin.com/company/helplyai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-fuchsia-400 transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </motion.div>
        </section>
      </motion.div>
    </footer>
  );
}
