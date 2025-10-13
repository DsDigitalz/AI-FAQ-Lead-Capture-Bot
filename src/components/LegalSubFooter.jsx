import React from "react"; // Removed useState and useEffect as they are replaced by useLocation
// Removed: import { motion } from "framer-motion";
import { Shield, Zap, Mail, Twitter, Linkedin } from "lucide-react";
// 🔑 MODIFIED: Import Link and useLocation from 'react-router-dom'
import { Link, useLocation } from "react-router-dom";

// New Logo Component (repeated for self-sufficiency)
const HelplyAILogo = ({ className = "w-8 h-8" }) => (
  // 🟢 Semantic Markup: Keeping <div> as this is purely a visual, non-semantic container for positioning icons
  <div className={`relative ${className}`}>
    <Shield className="w-full h-full text-white" strokeWidth={1.5} />
    <Zap
      className="absolute top-1/2 left-1/2 w-3 h-3 text-fuchsia-400 fill-fuchsia-400 transform -translate-x-1/2 -translate-y-1/2"
      strokeWidth={0}
    />
  </div>
);

const currentYear = new Date().getFullYear();

export default function LegalSubFooter() {
  // 🔑 NEW/MODIFIED: Get the current path dynamically using useLocation
  const location = useLocation();
  const currentPath = location.pathname;

  // 🔑 REMOVED: Manual state tracking and useEffect for 'popstate'

  // 🔑 MODIFIED: Function to check if a link is active and return the class
  const getLinkClasses = (hrefOrTo) => {
    // Compares the link path against the current dynamic path
    const linkPath = hrefOrTo;
    const isActive = currentPath === linkPath;

    // Default: text-gray-400, Hover: hover:text-blue-300
    // Active: text-white font-semibold
    return `
      hover:text-blue-300 transition-colors
      ${isActive ? "text-white font-semibold" : "text-gray-400"}
    `;
  };

  return (
    // 🟢 Semantic Markup: <footer>
    <footer className="bg-[#0A0027] flex justify-center pt-12 pb-6 border-t border-[#1e004a]" id="footer-section">
      {/* Replaced motion.div with standard div */}
      <div className="max-w-7xl mx-auto px-6 text-white">
        {/* Top Section: Logo, Mission, and Socials */}
        {/* 🟢 Semantic Markup: <section> */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-[#210045] pb-10 mb-8">
          {/* Column 1: Brand & Mission */}
          {/* 🟢 Semantic Markup: <article> */}
          <article className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Link to="/">
                <HelplyAILogo />
              </Link>
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
          </article>

          {/* Column 3: Legal & Company */}
          {/* 🟢 Semantic Markup: <nav> */}
          <nav>
            <h4 className="text-lg font-bold mb-4 text-blue-400">
              Company & Legal
            </h4>
            {/* 🔑 MODIFIED: Applied getLinkClasses to navigation links */}
            <ul className="space-y-3">
              <li>
                <Link to="/about" className={getLinkClasses("/about")}>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className={getLinkClasses("/privacy-policy")}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service"
                 
                  className={getLinkClasses("/terms-of-service")}
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/gdpr-compliance"
                  href="/gdpr-compliance"
                  className={getLinkClasses("/gdpr-compliance")}
                >
                  GDPR Compliance
                </Link>
              </li>
            </ul>
          </nav>
        </section>

        {/* Bottom Section: Copyright and Contact */}
        {/* 🟢 Semantic Markup: <section> */}
        <section className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          {/* 🟢 Semantic Markup: <p> */}
          <p className="mb-4 md:mb-0 order-2 md:order-1 text-center">
            &copy; {currentYear} HelplyAI. All rights reserved. Made with 💜 in
            Lagos, Nigeria.
          </p>

          {/* Replaced motion.div with standard div */}
          <div className="flex space-x-6 order-1 md:order-2 mb-4 md:mb-0">
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
          </div>
        </section>
      </div>
    </footer>
  );
}
