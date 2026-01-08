import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield, Zap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

// --- Framer Motion Animation Setup ---
const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const mobileMenuVariants = {
  closed: { x: "100%", opacity: 0 },
  open: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", damping: 25, stiffness: 200 },
  },
};

export default function LegalSubHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const menuRef = useRef(null);
  const location = useLocation();

  // Intersection Observer to hide header when Footer is visible
  useEffect(() => {
    const targetElement = document.getElementById("footer-section");
    if (!targetElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the footer is visible, hide the header to avoid overlap
          setIsHeaderVisible(!entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(targetElement);
    return () => observer.disconnect();
  }, []);

  // Function for active link styling
  const getLinkClasses = (to) => {
    const isActive = location.pathname === to;
    return `
      text-sm font-medium transition-all duration-300 hover:text-fuchsia-400
      ${isActive ? "text-fuchsia-400 font-bold" : "text-gray-400"}
    `;
  };

  const legalLinks = [
    { name: "About Us", path: "/about" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms of Service", path: "/terms-of-service" },
    { name: "GDPR", path: "/gdpr-compliance" },
  ];

  return (
    <AnimatePresence>
      {isHeaderVisible && (
        <motion.header
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={headerVariants}
          className="fixed top-0 left-0 w-full z-[100] px-4 py-4 md:px-6"
        >
          {/* 🟢 Semantic Markup: Navigation Container */}
          <nav className="max-w-7xl mx-auto flex items-center justify-between bg-[#140036]/80 backdrop-blur-2xl border border-white/10 px-6 py-3 rounded-2xl shadow-2xl">
            {/* Logo Area */}
            <div className="flex-shrink-0">
              <Logo />
            </div>

            {/* Desktop Legal Links */}
            <ul className="hidden lg:flex items-center gap-8">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={getLinkClasses(link.path)}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-6">
              <Link
                to="/signin"
                className="text-sm font-semibold text-gray-400 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-white/5 hover:bg-white/10 text-white text-sm font-bold px-5 py-2.5 rounded-xl border border-white/10 transition-all"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              className="lg:hidden text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <>
                {/* Dark Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1] lg:hidden"
                />

                {/* Mobile Drawer */}
                <motion.div
                  variants={mobileMenuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="absolute top-20 right-4 left-4 bg-[#0A0027] border border-white/10 p-8 rounded-3xl shadow-3xl lg:hidden"
                >
                  <ul className="flex flex-col gap-6 mb-8">
                    {legalLinks.map((link) => (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          className="text-2xl font-bold text-white hover:text-fuchsia-400"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col gap-4">
                    <Link
                      to="/signin"
                      className="w-full py-4 text-center font-bold text-white border border-white/10 rounded-2xl"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="w-full py-4 text-center font-bold text-white bg-fuchsia-600 rounded-2xl shadow-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
