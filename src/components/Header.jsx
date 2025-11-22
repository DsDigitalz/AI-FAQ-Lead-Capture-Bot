import React, { useState, useEffect, useRef } from "react";
import { Menu, Shield, X, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

// New Logo Component: Shield (for help/protection) + Zap (for speed/AI)

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false); // 🔑 NEW: State to control header visibility
  const menuRef = useRef(null);

  // 🔑 NEW: Logic to auto-hide header when the Hero section is NOT visible
  useEffect(() => {
    // 🔑 We assume the first section you want the header to HIDE behind is called '#hero-section'
    const targetElement = document.getElementById("footer-section");

    // If the target element doesn't exist, we keep the header visible
    if (!targetElement) {
      setIsHeaderVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // The header should be VISIBLE when the target element (Hero) is NOT intersecting (i.e., user has scrolled past it)
          // We set it to TRUE (visible) when it leaves the screen (is not intersecting).
          // We set it to FALSE (hidden) when it enters the screen (is intersecting).
          setIsHeaderVisible(!entry.isIntersecting);
        });
      },
      {
        rootMargin: "0px", // Start observing immediately
        threshold: 0.01, // Trigger when even a small part (1%) of the target element is visible
      }
    );

    observer.observe(targetElement);

    return () => observer.unobserve(targetElement);
  }, []);

  // Effect to listen for hash changes (kept from original)
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

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

  // Function to check if a link is active and return the class (kept from original)
  const getLinkClasses = (href) => {
    const linkHash = href;
    const isActive = currentHash === linkHash;
    return `
      hover:text-gray-300 hover:scale-105 active:text-gray-400 
      cursor-pointer transition-all duration-300
      ${isActive ? "text-white" : "text-gray-400"} 
    `;
  };

  const navLinks = (
    <li className="list-none flex lg:flex-row gap-8 lg:gap-20 text-lg lg:text-base">
      <a
        href="#features"
        className={getLinkClasses("#features")}
        onClick={() => setIsMenuOpen(false)}
      >
        Features
      </a>
      <a
        href="#pricing"
        className={getLinkClasses("#pricing")}
        onClick={() => setIsMenuOpen(false)}
      >
        Pricing
      </a>
      <a
        href="#faq"
        className={getLinkClasses("#faq")}
        onClick={() => setIsMenuOpen(false)}
      >
        FAQ
      </a>
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
      // 🔑 MODIFIED: Apply visibility transition class
      className={`z-100 fixed w-full transition-all duration-300 ease-out 
        ${
          isHeaderVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }
        bg-gradient-to-br from-[#00031F] to-[#10003B]
      `}
    >
      <div className="max-w-7xl mx-auto flex font-medium justify-between items-center lg:backdrop-blur text-white py-3 px-4 lg:py-5 md:px-4 lg:px-6 relative z-50">
        {/* Logo Area */}
        <Logo />

        {/* Navlinks - Desktop */}
        <nav className="hidden lg:block">{navLinks}</nav>

        {/* Action - Desktop */}
        <div className="hidden lg:flex items-center gap-10">
          {actionButtons}
        </div>

        {/* Hamburger Icon - Mobile */}
        <button
          className=" right-0 lg:hidden text-white p-2 z-50"
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
