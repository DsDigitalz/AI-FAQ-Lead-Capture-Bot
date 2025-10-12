import React, { useState, useEffect, useRef } from "react";
import { Menu, Shield, X, Zap } from "lucide-react";
import { Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

// New Logo Component: Shield (for help/protection) + Zap (for speed/AI)
const HelplyAILogo = ({ className = "w-8 h-8" }) => (
  <div className={`relative ${className}`}>
    {/* Shield Icon: Represents help and protection */}
    <Shield className="w-full h-full text-white" strokeWidth={1.5} />
    {/* Zap Icon: Represents intelligence and speed */}
    <Zap
      className="absolute top-1/2 left-1/2 w-3 h-3 text-fuchsia-400 fill-fuchsia-400 transform -translate-x-1/2 -translate-y-1/2"
      strokeWidth={0}
    />
  </div>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 🔑 NEW: State to track the current URL hash for active link highlighting
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const menuRef = useRef(null);

  // 🔑 NEW: Effect to listen for hash changes (when a user clicks a nav link)
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    // Initial check and event listener setup
    handleHashChange(); // Set initial hash
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Ensure we don't close the menu when clicking the toggle button
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

  // 🔑 MODIFIED: Function to check if a link is active and return the class
  const getLinkClasses = (href) => {
    // 1. Get the hash part of the href (e.g., "#features")
    const linkHash = href;

    // 2. Check if the link's hash matches the current URL hash
    const isActive = currentHash === linkHash;

    // 3. Return combined classes, applying the focus style when active
    return `
      hover:text-gray-300 hover:scale-105 active:text-gray-400 
      cursor-pointer transition-all duration-300
      ${isActive ? "text-white" : "text-gray-400"} 
    `;
  };

  const navLinks = (
    // 🔑 MODIFIED: Removed text-gray-400 here to let the getLinkClasses set the color
    <li className="list-none flex lg:flex-row gap-8 lg:gap-20 text-lg lg:text-base">
      <a
        href="#features"
        className={getLinkClasses("#features")} // Apply active/focus classes
        onClick={() => setIsMenuOpen(false)}
        // behavior:smooth="true" // Removed non-standard attribute
      >
        Features
      </a>
      <a
        href="#pricing"
        className={getLinkClasses("#pricing")} // Apply active/focus classes
        onClick={() => setIsMenuOpen(false)}
        // behavior:smooth="true" // Removed non-standard attribute
      >
        Pricing
      </a>
      <a
        href="#faq"
        className={getLinkClasses("#faq")} // Apply active/focus classes
        onClick={() => setIsMenuOpen(false)}
        // behavior:smooth="true" // Removed non-standard attribute
      >
        FAQ
      </a>
    </li>
  );

  const actionButtons = (
    // 🔑 MODIFIED: Ensured text-gray-400 is on the container since Sign In doesn't use the custom function
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
    <header className="z-100 fixed w-full bg-gradient-to-br from-[#00031F] to-[#10003B]">
      <div className="max-w-7xl mx-auto flex font-medium justify-between items-center lg:backdrop-blur text-white py-1 px-1 lg:py-5 md:px-4 lg:px-6 relative z-50">
        {/* Logo Area */}
        <div className="flex items-center space-x-2 md:space-x-4 p-4 md:px-0 font-medium">
          {/* New HelplyAI Logo */}
          <Link to="/">
            <HelplyAILogo className="w-8 h-8" />
          </Link>

          {/* Gradient Text HelplyAI */}
          <h1 className="text-xl sm:text-3xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-fuchsia-400">
              Helply
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-blue-400 font-bold italic">
              AI
            </span>
          </h1>
        </div>

        {/* Navlinks - Desktop (Hidden on small screens) */}
        <nav className="hidden lg:block">{navLinks}</nav>

        {/* Action - Desktop (Hidden on small screens) */}
        <div className="hidden lg:flex items-center gap-10">
          {actionButtons}
        </div>

        {/* Hamburger Icon - Mobile (Visible only on small screens) */}
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
