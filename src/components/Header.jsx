import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Reference to the mobile menu

  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Close the menu if click is outside
      }
    };

    // Add event listener when menu is open
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const navLinks = (
    <li className="list-none flex flex-col lg:flex-row gap-8 lg:gap-20 text-lg lg:text-base">
      <a
        href="#features"
        className="hover:text-gray-300 hover:scale-105 active:text-gray-400 cursor-pointer transition-all duration-300"
        onClick={() => setIsMenuOpen(false)}
      >
        Features
      </a>
      <a
        href="#pricing"
        className="hover:text-gray-300 hover:scale-105 active:text-gray-400 cursor-pointer transition-all duration-300"
        onClick={() => setIsMenuOpen(false)}
      >
        Pricing
      </a>
      <a
        href="#about"
        className="hover:text-gray-300 hover:scale-105 active:text-gray-400 cursor-pointer transition-all duration-300"
        onClick={() => setIsMenuOpen(false)}
      >
        About
      </a>
    </li>
  );

  const actionButtons = (
    <div className="flex flex-col lg:flex-row items-center gap-5 lg:gap-10 mt-6 lg:mt-0 w-full lg:w-auto">
      <button
        className="cursor-pointer transition-all duration-300 hover:text-gray-300 active:text-gray-400 hover:scale-105 text-lg lg:text-base"
        onClick={() => setIsMenuOpen(false)}
      >
        Sign In
      </button>
      <button
        className="border font-semibold rounded py-3 px-6 cursor-pointer transition-all duration-300 hover:bg-gray-100 hover:text-[#333] active:bg-gray-400 w-full lg:w-auto"
        onClick={() => setIsMenuOpen(false)}
      >
        Get Started
      </button>
    </div>
  );

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const menuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        duration: 0.2,
      },
    },
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.2,
      },
    },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex font-medium justify-between items-center lg:backdrop-blur text-white bg-gradient-to-r from-[#181818] via-[#2e2e2e] to-[#181818] py-1 px-1 lg:py-5 md:px-4 lg:px-10 relative z-50"
    >
      {/* Logo (Visible on all screens) */}
      <div className="flex items-center space-x-2 md:space-x-4 p-4 font-medium">
        <div>
          <img src="/favicon.png" alt="Logo" className="lg:w-8" />
        </div>
        <h1 className="text-xl sm:text-3xl">
          H<span className="font-light">el</span>ply
          <span className="font-bold italic">AI</span>
        </h1>
      </div>

      {/* Navlinks - Desktop (Hidden on small screens) */}
      <nav className="hidden lg:block">{navLinks}</nav>

      {/* Action - Desktop (Hidden on small screens) */}
      <div className="hidden lg:flex items-center gap-10">{actionButtons}</div>

      {/* Hamburger Icon - Mobile (Visible only on small screens) */}
      <button
        className="lg:hidden text-white p-2 z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      <motion.div
        ref={menuRef} // Attach ref to the mobile menu
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={menuVariants}
        className="fixed top-0 right-0 h-full w-70 max-w-xs bg-gradient-to-b from-[#181818] via-[#2e2e2e] to-[#181818] p-6 shadow-xl lg:hidden z-40"
      >
        <div className="flex flex-col items-start pt-20 h-full">
          <nav className="w-full">{navLinks}</nav>
          <div className="mt-10 w-full">{actionButtons}</div>
        </div>
      </motion.div>
    </motion.header>
  );
}