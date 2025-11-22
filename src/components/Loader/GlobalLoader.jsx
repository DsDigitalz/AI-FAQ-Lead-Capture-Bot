import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";

// --- Global Loader Component ---
const GlobalLoader = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        // 🟢 Semantic Markup: <dialog> (for modal-like overlay)
        <motion.dialog
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
          {/* Loader Icon with Spin Animation */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
            }}
            className="p-4 rounded-full bg-fuchsia-600/20"
          >
            <Shield
              size={48}
              className="text-fuchsia-400 fill-fuchsia-400/20"
            />
          </motion.div>
        </motion.dialog>
      )}
    </AnimatePresence>
  );
};

export default GlobalLoader;
