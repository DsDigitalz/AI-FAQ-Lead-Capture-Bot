import React from "react";
import { Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import FinalCTASection from "./components/FinalCTASection";
import LandingPage from "./pages/LandingPage";
import Getstarted from "./pages/GetStarted";
import SignInPage from "./pages/SignInPage";
import PageNotFound from "./pages/PageNotFound";
import AboutPage from "./pages/AboutPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import LegalLayout from "./components/layout/LegalLayout";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import GDPRCompliancePage from "./pages/GDPRCompliancePage";
import SubscriptionCheckoutPage from "./pages/SubscriptionCheckoutPage";
import ContactSalesPage from "./pages/ContactSalesPage";

// You can add other page imports later like SignIn, GetStarted, etc.

export default function App() {
  return (
    <div>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <LandingPage>
              <HeroSection />
              <FeaturesSection />
              <PricingSection />
              <FAQSection />
              <FinalCTASection />
            </LandingPage>
          }
        />
        {/* Example additional pages */}
        <Route path="*" element={<PageNotFound />} /> // Page not found
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<Getstarted />} />
        <Route
          path="/checkout/starter-bot"
          element={<SubscriptionCheckoutPage />}
        />
        <Route path="/contact-sales" element={<ContactSalesPage />} />
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
