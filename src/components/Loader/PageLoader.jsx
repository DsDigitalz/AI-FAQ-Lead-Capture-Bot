import React from "react";
import { motion } from "framer-motion";

/**
 * PageLoader Component
 *
 * A reusable loading component for page-level loading states
 * Used for route transitions, data fetching, and authentication resolution
 *
 * Features:
 * - Smooth fade in/out animations
 * - Customizable message and size
 * - Tailwind CSS styling with dark theme
 * - Accessible with proper ARIA attributes
 *
 * @param {Object} props
 * @param {string} props.message - Optional loading message
 * @param {string} props.size - Size variant: 'sm', 'md', 'lg' (default: 'md')
 * @param {boolean} props.overlay - Whether to show as overlay (default: false)
 */
const PageLoader = ({
  message = "Loading...",
  size = "md",
  overlay = false,
}) => {
  // Size configurations
  const sizeClasses = {
    sm: {
      container: "p-4",
      spinner: "h-6 w-6",
      text: "text-sm",
    },
    md: {
      container: "p-6",
      spinner: "h-8 w-8",
      text: "text-base",
    },
    lg: {
      container: "p-8",
      spinner: "h-12 w-12",
      text: "text-lg",
    },
  };

  const currentSize = sizeClasses[size];

  const loaderContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={`flex flex-col items-center justify-center space-y-4 ${
        overlay
          ? "fixed inset-0 z-50 bg-[#0A0027]/95 backdrop-blur-sm"
          : "min-h-[200px] bg-transparent"
      }`}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      {/* Animated Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
        className={`rounded-full border-2 border-fuchsia-400/30 border-t-fuchsia-400 ${currentSize.spinner}`}
      />

      {/* Loading Message */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className={`text-fuchsia-300 font-medium ${currentSize.text}`}
      >
        {message}
      </motion.p>
    </motion.div>
  );

  return overlay ? (
    loaderContent
  ) : (
    <div className="w-full">{loaderContent}</div>
  );
};

export default PageLoader;
