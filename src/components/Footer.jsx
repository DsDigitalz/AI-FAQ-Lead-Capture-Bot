import React, { useState, useEffect } from "react";
// Removed: import { motion } from "framer-motion";
import { Shield, Zap, Mail, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom"; // Changed to react-router-dom for proper SPA routing

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

export default function Footer() {
  // 🔑 NEW: State to track the current URL path and hash
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  // 🔑 NEW: Effect to listen for URL changes (both path and hash)
  useEffect(() => {
    const handleUrlChange = () => {
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);
    };

    // Listen for both router path changes and hash fragment changes
    // Note: In a real app with 'react-router-dom', the 'Link' component often handles routing,
    // but manually listening to 'popstate' and 'hashchange' covers direct URL input/hash clicks.
    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("hashchange", handleUrlChange);
    handleUrlChange(); // Set initial state

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("hashchange", handleUrlChange);
    };
  }, []);

  // 🔑 NEW: Function to check if a link is active and return the class
  const getLinkClasses = (
    hrefOrTo,
    defaultHoverClass = "hover:text-fuchsia-300"
  ) => {
    let isActive = false;
    const path = hrefOrTo.startsWith("/") ? hrefOrTo : "";
    const hash = hrefOrTo.startsWith("#") ? hrefOrTo : "";

    if (path) {
      // Logic for /route-links
      isActive = currentPath === path;
      defaultHoverClass = "hover:text-blue-300"; // Using blue for legal links
    } else if (hash) {
      // Logic for #fragment-links
      isActive = currentHash === hash;
      defaultHoverClass = "hover:text-fuchsia-300"; // Using fuchsia for main page links
    }

    // Return combined classes, applying the distinct color when active
    return `
      ${defaultHoverClass} transition-colors 
      ${isActive ? "text-white font-semibold" : "text-gray-400"}
    `;
  };

  return (
    // 🟢 Semantic Markup: <footer>
    <footer className="bg-[#0A0027] pt-12 pb-6 border-t border-[#1e004a]" id="footer-section">
      {/* Replaced motion.div with standard div */}
      <div className="max-w-7xl mx-auto px-6 text-white">
        {/* Top Section: Logo, Mission, and Socials */}
        {/* 🟢 Semantic Markup: <section> */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-[#210045] pb-10 mb-8">
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

          {/* Column 2: Product Links */}
          {/* 🟢 Semantic Markup: <nav> */}
          <nav>
            <h4 className="text-lg font-bold mb-4 text-fuchsia-400">Product</h4>
            {/* 🔑 MODIFIED: Applied getLinkClasses for active hash links */}
            <ul className="space-y-3">
              <li>
                <a href="#features" className={getLinkClasses("#features")}>
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className={getLinkClasses("#pricing")}>
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className={getLinkClasses("#faq")}>
                  FAQ
                </a>
              </li>
              <li>
                <a href="#demo" className={getLinkClasses("#demo")}>
                  Request a Demo
                </a>
              </li>
            </ul>
          </nav>

          {/* Column 3: Legal & Company */}
          {/* 🟢 Semantic Markup: <nav> */}
          <nav>
            <h4 className="text-lg font-bold mb-4 text-blue-400">
              Company & Legal
            </h4>
            {/* 🔑 MODIFIED: Applied getLinkClasses for active route links */}
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
                <a
                  href="/terms-of-service"
                  className={getLinkClasses("/terms-of-service")}
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/gdpr-compliance"
                  className={getLinkClasses("/gdpr-compliance")}
                >
                  GDPR Compliance
                </a>
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
