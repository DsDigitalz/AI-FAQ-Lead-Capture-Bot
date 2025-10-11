import React from "react";
import { Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import FinalCTASection from "./components/FinalCTASection";
import Home from "./pages/Home";
import Getstarted from "./pages/GetStarted";
import SignInPage from "./pages/SignInPage";
import PageNotFound from "./pages/PageNotFound";
import AboutPage from "./pages/AboutPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import LegalLayout from "./components/layout/LegalLayout";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import GDPRCompliancePage from "./pages/GDPRCompliancePage";

// You can add other page imports later like SignIn, GetStarted, etc.

export default function App() {
  return (
    <div>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <Home>
              <HeroSection />
              <FeaturesSection />
              <PricingSection />
              <FAQSection />
              <FinalCTASection />
            </Home>
          }
        />
        {/* Example additional pages */}
        <Route path="*" element={<PageNotFound />} /> // Page not found
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<Getstarted />} />
        {/* --- B: ROUTES WITH LEGAL SUB-HEADER (LegalLayout) --- */}
        <Route element={<LegalLayout />}>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/gdpr-compliance" element={<GDPRCompliancePage />} />
          {/* Add /gdpr, etc., here */}
        </Route>
      </Routes>
    </div>
  );
}

// Started Project September 30, 2025 U
