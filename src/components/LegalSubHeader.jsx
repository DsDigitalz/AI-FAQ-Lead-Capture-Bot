import React, { useState, useEffect, useRef } from "react";
import { Menu, Shield, X, Zap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

// New Logo Component: Shield (for help/protection) + Zap (for speed/AI)

export default function LegalSubHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  // 🔑 NEW: State to track header visibility
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // 🔑 NEW: Logic to auto-hide header when a specific content section is visible
  useEffect(() => {
    // 🔑 TARGET: Change this ID to the section you want the header to hide for.
    // E.g., The main content container on the legal pages.
    const targetElement = document.getElementById("footer-section");

    // If the target element doesn't exist, keep the header visible
    if (!targetElement) {
      setIsHeaderVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // The header should be HIDDEN (false) when the main content section
          // is intersecting the top of the viewport.
          // We check if the top of the target element is within the viewport.
          setIsHeaderVisible(!entry.isIntersecting);
        });
      },
      {
        // Use a rootMargin that matches the height of the fixed header (e.g., -80px)
        // to check intersection right at the bottom edge of the header.
        // For simplicity here, we'll rely on the default root margin.
        rootMargin: "0px", // Checks when content is *above* the viewport
        threshold: 0.01, // Triggers immediately
      }
    );

    observer.observe(targetElement);

    return () => observer.unobserve(targetElement);
  }, []); // Run only once on mount

  // Handle clicks outside the menu (kept from original)
  useEffect(() => {
    const handleClickOutside = (event) => {
      const toggleButton = document.querySelector(
        '[aria-label="Open menu"], [aria-label="Close menu"]'
      );
      if (toggleButton && toggleButton.contains(event.target)) {
        return;
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Function now uses location.pathname (kept from original)
  const getLinkClasses = (to) => {
    const isActive = location.pathname === to;

    return `
      hover:text-gray-300 hover:scale-105 active:text-gray-400 
      cursor-pointer transition-all duration-300
      ${isActive ? "text-white font-semibold" : "text-gray-400"} 
    `;
  };

  const navLinks = (
    <li className="list-none grid grid-cols-2 text-[16px] md:flex md:items-center gap-6 md:gap-8 lg:gap-10 text-lg lg:text-base">
      <Link
        to="/about"
        className={getLinkClasses("/about")}
        onClick={() => setIsMenuOpen(false)}
      >
        About Us
      </Link>
      <Link
        to="/privacy-policy"
        className={getLinkClasses("/privacy-policy")}
        onClick={() => setIsMenuOpen(false)}
      >
        Privacy Policy
      </Link>
      <Link
        to="/terms-of-service"
        className={getLinkClasses("/terms-of-service")}
        onClick={() => setIsMenuOpen(false)}
      >
        Terms of Service
      </Link>
      <Link
        to="/gdpr-compliance"
        className={getLinkClasses("/gdpr-compliance")}
        onClick={() => setIsMenuOpen(false)}
      >
        GDPR Compliance
      </Link>
    </li>
  );

  const actionButtons = (
    <div className="text-gray-400 flex lg:flex-row items-center gap-5 lg:gap-10 lg:mt-0 w-full lg:w-auto">
      <Link
        to="/signin"
        className="cursor-pointer transition-all duration-300 hover:text-gray-300 active:text-gray-400 hover:scale-105 text-lg lg:text-base whitespace-nowrap"
        onClick={() => setIsMenuOpen(false)}
      >
        Sign In
      </Link>

      <Link
        to="/signup"
        className="border font-semibold rounded py-3 px-6 cursor-pointer transition-all duration-300 hover:bg-gray-100 hover:text-[#333] active:bg-gray-400 w-full lg:w-auto text-center"
        onClick={() => setIsMenuOpen(false)}
      >
        Get Started
      </Link>
    </div>
  );

  return (
    // 🟢 Semantic Markup: Use <header> tag
    <header
      // 🔑 MODIFIED: Apply visibility transition based on isHeaderVisible
      className={`fixed w-full z-100 bg-gradient-to-br from-[#00031F] to-[#10003B]
        transition-transform duration-300 ease-in-out
        ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="max-w-7xl mx-auto flex font-medium justify-between items-center lg:backdrop-blur text-white py-3 px-4 lg:py-5 md:px-4 lg:px-6 relative z-50">
        {/* Logo Area */}
        <Logo />

        {/* Navlinks - Desktop (Hidden on small screens) */}
        <nav className="hidden lg:block">{navLinks}</nav>

        {/* Action - Desktop (Hidden on small screens) */}
        <div className="hidden lg:flex items-center gap-10">
          {actionButtons}
        </div>

        {/* Hamburger Icon - Mobile (Visible only on small screens) */}
        <button
          className="fixed right-0 lg:hidden text-white p-2 z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div
          ref={menuRef}
          className={`
            fixed top-0 right-0 w-full bg-gradient-to-br from-[#00031F] via-[#10003B] to-[#21000B] px-10 sm:px-30 py-7 shadow-xl lg:hidden z-40
            transition-transform duration-300 ease-in-out 
            ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="w-full flex flex-col gap-7 md:flex-row items-center justify-between">
            <nav>{navLinks}</nav>
            <div>{actionButtons}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
