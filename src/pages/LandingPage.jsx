import React, { useState, useEffect } from "react"; // 🔑 MODIFIED: Added useEffect
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import PricingSection from "../components/PricingSection";
import FAQSection from "../components/FAQSection";
import FinalCTASection from "../components/FinalCTASection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion"; // 🔑 ADDED: Framer Motion for wrapper animation
// 🔑 ADDED: Import the modal components
import ChatModal from "../components/Modals/ChatModal";
import DemoRequestModal from "../components/Modals/DemoRequestModal";

// --- Framer Motion Animation Setup ---
const pageVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren", // Ensures the fade-in starts before individual components
    },
  },
};
// -------------------------------------

export default function LandingPage() {
  // 🔑 NEW: ADDED EFFECT HOOK TO SCROLL TO TOP
  useEffect(() => {
    // This function runs once after the component mounts
    // It forces the window to scroll to coordinates (0, 0)
    window.scrollTo(0, 0);

    // An alternative if the window scroll is unreliable (e.g., in some routers) is:
    // document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
  }, []); // The empty dependency array [] ensures this only runs on mount

  // 🔑 NEW: State to control the visibility of the modals
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  // 🔑 NEW: Helper function for the "Request a Demo" button
  const handleRequestDemo = () => {
    setIsDemoOpen(true);
  };

  // 🔑 NEW: Helper function for the "Start Chatting" button
  const handleStartChatting = () => {
    setIsChatOpen(true);
  };

  return (
    // 🟢 Semantic Markup: Used <motion.div> to apply the requested page-level animation (fade-in)
    <motion.div
      id="main-content" // ID added for potential scroll-into-view method
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <Header />

      {/* 🔑 MODIFIED: Pass the handlers to the HeroSection where the main buttons reside */}
      <HeroSection
        onStartChatting={handleStartChatting}
        onRequestDemo={handleRequestDemo}
      />

      <FeaturesSection />
      <PricingSection />
      <FAQSection />

      {/* 🔑 MODIFIED: Pass the handler to the FinalCTASection if it has a demo button */}
      <FinalCTASection onRequestDemo={handleRequestDemo} />

      <Footer />

      {/* 🔑 NEW: Render the Modals at the highest level */}
      {/* They will appear fixed over all other content when 'isOpen' is true. */}

      {/* Chat Modal */}
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Demo Request Modal */}
      <DemoRequestModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
    </motion.div>
  );
}
