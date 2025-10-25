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
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div>
      {/* ✅ Global styled & animated toaster */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={12} // spacing between toasts
        toastOptions={{
          duration: 3500,
          style: {
            background: "#1a0035", // deep dark violet background
            color: "#fff",
            border: "1px solid #a21caf", // fuchsia accent
            padding: "12px 16px",
            borderRadius: "12px",
            fontSize: "0.95rem",
            boxShadow: "0 4px 12px rgba(162, 28, 175, 0.3)",
          },
          success: {
            iconTheme: {
              primary: "#d946ef", // fuchsia
              secondary: "#1a0035",
            },
          },
          error: {
            iconTheme: {
              primary: "#fb7185", // soft red
              secondary: "#1a0035",
            },
          },
        }}
        containerStyle={{
          top: 20,
          right: 20,
        }}
      >
        {(t) => (
          <div
            style={{
              transform: t.visible ? "translateY(0)" : "translateY(-20px)",
              opacity: t.visible ? 1 : 0,
              transition: "all 0.3s ease-out",
            }}
          >
            {t.message}
          </div>
        )}
      </Toaster>

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

        {/* Auth Pages */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<Getstarted />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Other Pages */}
        <Route
          path="/checkout/starter-bot"
          element={<SubscriptionCheckoutPage />}
        />
        <Route path="/contact-sales" element={<ContactSalesPage />} />

        {/* Legal Pages (use shared layout) */}
        <Route element={<LegalLayout />}>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/gdpr-compliance" element={<GDPRCompliancePage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
