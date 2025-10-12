import React, { useState } from "react"; // 🔑 ADDED: useState for modal control
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import PricingSection from "../components/PricingSection";
import FAQSection from "../components/FAQSection";
import FinalCTASection from "../components/FinalCTASection";
import Header from "../components/Header";
import Footer from "../components/Footer";

// 🔑 ADDED: Import the modal components
import ChatModal from "../components/Modals/ChatModal";
import DemoRequestModal from "../components/Modals/DemoRequestModal";

export default function LandingPage() {
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
    // 🟢 Semantic Markup: Keeping <div> wrapper
    <div>
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
    </div>
  );
}
