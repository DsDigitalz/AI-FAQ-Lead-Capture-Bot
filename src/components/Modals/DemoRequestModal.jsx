import React, { useState } from "react";
// 🔑 MODIFIED: Import motion for the scroll effect personalization
import { motion } from "framer-motion";
import { X, User, Mail, Briefcase } from "lucide-react";

// Animation Variants (using combination of fade-in and slide-in)
const modalVariants = {
  hidden: {
    opacity: 0,
    // 🔑 OPTIMIZED: Combine Y and Scale into a single transform,
    // using translate3d for guaranteed GPU acceleration.
    transform: "translateY(-5vh) scale(0.9) translateZ(0)",
  },
  visible: {
    opacity: 1,
    // 🔑 OPTIMIZED: Reset transform
    transform: "translateY(0) scale(1) translateZ(0)",
    transition: {
      // 🔑 MODIFIED: Use 'tween' for predictable, lightweight motion.
      type: "tween",
      ease: "easeOut",
      duration: 0.25, // Faster duration for a snappier feel.
      // Removed unnecessary damping/stiffness properties which are specific to 'spring'
    },
  },
  exit: {
    opacity: 0,
    // 🔑 OPTIMIZED: Ensure exit is also fast and GPU-accelerated
    transform: "translateY(-5vh) scale(0.9) translateZ(0)",
    transition: {
      duration: 0.2,
    },
  },
};

// 🟢 Semantic Markup: <section> is appropriate for a primary content container like a modal
export default function DemoRequestModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    details: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log("Demo Request Submitted:", formData);
    setIsSubmitted(true);
    // In a real app, you'd integrate with your CRM/backend here.
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setFormData({ name: "", email: "", company: "", details: "" });
    }, 3000);
  };

  return (
    // 🟢 Semantic Markup: Use a div role="dialog" for accessibility (Aria)
    <div
      className="fixed inset-0 z-[1000] bg-black bg-opacity-80 flex items-center justify-center p-4 transition-opacity"
      role="dialog"
      aria-modal="true"
    >
      {/* 🔑 PERSONALIZATION: Applied Framer Motion for scroll/fade effect */}
      <motion.section
        className="w-full max-w-md bg-[#0A0027] p-8 rounded-xl shadow-2xl border border-[#1e004a]"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <header className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold text-white bg-clip-text bg-gradient-to-r from-blue-400 to-fuchsia-400 ">
            Request a Demo
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full"
            aria-label="Close demo request form"
          >
            <X size={24} />
          </button>
        </header>

        {isSubmitted ? (
          <div className="text-center py-10">
            <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-white text-xl font-semibold">Request Sent!</h3>
            <p className="text-gray-400 mt-2">
              We'll be in touch shortly to schedule your personalized demo.
            </p>
          </div>
        ) : (
          // 🟢 Semantic Markup: Use <form> tag
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            {/* 🔑 PERSONALIZATION: Applying Framer Motion animation to each form element (scroll effect) */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Your Name
              </label>
              <div className="flex items-center bg-[#180045] rounded-lg border border-[#210045] p-2">
                <User size={20} className="text-fuchsia-400 mr-3" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-2 bg-transparent text-white placeholder-gray-500 focus:ring-0 border-none outline-none"
                />
              </div>
            </motion.div>

            {/* Email Input */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Work Email
              </label>
              <div className="flex items-center bg-[#180045] rounded-lg border border-[#210045] p-2">
                <Mail size={20} className="text-fuchsia-400 mr-3" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent px-2 text-white placeholder-gray-500 focus:ring-0 border-none outline-none"
                />
              </div>
            </motion.div>

            {/* Company Input */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Company Name
              </label>
              <div className="flex items-center bg-[#180045] rounded-lg border border-[#210045] p-2">
                <Briefcase size={20} className="text-fuchsia-400 mr-3" />
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent px-2 text-white placeholder-gray-500 focus:ring-0 border-none outline-none"
                />
              </div>
            </motion.div>

            {/* Details Textarea */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                What are you hoping to achieve with HelplyAI?
              </label>
              <textarea
                id="details"
                name="details"
                rows="3"
                value={formData.details}
                onChange={handleChange}
                className="w-full bg-[#180045] text-white rounded-lg border border-[#210045] p-3 focus:border-fuchsia-600 focus:ring-fuchsia-600 resize-none outline-none"
              ></textarea>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full font-semibold rounded-full py-3 px-6 cursor-pointer transition-all duration-300 bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white hover:opacity-90 active:opacity-70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              Submit Demo Request
            </motion.button>
          </form>
        )}
      </motion.section>
    </div>
  );
}
