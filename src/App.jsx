import React from "react";
import { Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import FinalCTASection from "./components/FinalCTASection";
import LandingPage from "./pages/LandingPage";
import GetStartedPage from "./pages/GetStartedPage";
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
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import DashboardOverview from "./components/Dashboard/DashboardOverview";
import TeamInboxPage from "./pages/TeamInboxPage";
import AuthCallback from "./components/Auth/AuthCallback";
import DashboardLayoutPage from "./pages/DashboardLayoutPage";
import DashboardOverviewPage from "./pages/DashboardOverviewPage";
import ChannelsPage from "./pages/ChannelsPage";
import AiRagPage from "./pages/AiRagPage";
import TeamManagementPage from "./pages/TeamManagementPage";
import FollowUpEnginePage from "./pages/FollowUpEnginePage";
import IntegrationsPage from "./pages/IntegrationsPage";
import PaymentIntegrationPage from "./pages/PaymentIntegrationPage";
import ApiKeysPage from "./pages/ApiKeysPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import GeneralSettingsPage from "./pages/GeneralSettingsPage";

// --- NEW LOADER IMPORTS ---
import { LoaderProvider, useLoader } from "./components/Loader/LoaderContext";
import GlobalLoader from "./components/Loader/GlobalLoader";

import ResetPassword from "./components/Auth/ResetPassword";
import { motion, AnimatePresence } from "framer-motion";

// --------------------------

// Wrapper component to consume the LoaderContext
function AppContent() {
  const { isLoading } = useLoader();

  return (
    <div className="min-h-screen">
      {/* Renders the global loader over the entire screen */}
      <GlobalLoader isLoading={isLoading} />
      {/* ✅ Global styled & animated toaster */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={12}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1b0136",
            color: "#ffffff",
            border: "1px solid #8b5cf6",
            padding: "14px 20px",
            borderRadius: "12px",
            fontSize: "0.95rem",
            fontWeight: 500,
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            backdropFilter: "blur(4px)",

            maxWidth: "10px",
            width: "fit-content",
            wordBreak: "break-word",
            lineHeight: "1.4",
          },
          success: {
            iconTheme: { primary: "#d946ef", secondary: "#1b0136" },
          },
          error: {
            iconTheme: { primary: "#f87171", secondary: "#1b0136" },
          },
          loading: {
            iconTheme: { primary: "#facc15", secondary: "#1b0136" },
          },
        }}
      >
        {(t) => (
          <AnimatePresence>
            {t.visible && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  background: t.style.background,
                  color: t.style.color,
                  border: t.style.border,
                  padding: t.style.padding,
                  borderRadius: t.style.borderRadius,
                  fontSize: t.style.fontSize,
                  fontWeight: t.style.fontWeight,
                  boxShadow: t.style.boxShadow,
                  backdropFilter: t.style.backdropFilter,
                }}
              >
                {t.message}
              </motion.div>
            )}
          </AnimatePresence>
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
        <Route path="/signup" element={<GetStartedPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* PARENT ROUTE: Renders the persistent UI (Sidebar & Header) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* CHILD ROUTE 1: Renders the default content when navigating to /dashboard */}
          <Route index element={<DashboardOverviewPage />} />

          {/* CHILD ROUTE 2: Renders TeamInboxPage when navigating to /dashboard/inbox */}
          <Route path="inbox" element={<TeamInboxPage />} />

          {/* CHILD ROUTE 3: Renders ChannelsPage when navigating to /dashboard/channels */}
          <Route path="channels" element={<ChannelsPage />} />

          {/* CHILD ROUTE 4: Renders AIRagPage when navigating to /dashboard/ai-rag */}
          <Route path="ai-rag" element={<AiRagPage />} />

          {/* CHILD ROUTE 5: Renders TeamManagementPage when navigating to /dashboard/team-management */}
          <Route path="team" element={<TeamManagementPage />} />

          {/* CHILD ROUTE 6: Renders FollowUpEnginePage when navigating to /dashboard/followup */}
          <Route path="followup" element={<FollowUpEnginePage />} />

          {/* CHILD ROUTE 7: Renders IntegrationsPage when navigating to /dashboard/integrations*/}
          <Route path="integrations" element={<IntegrationsPage />} />

          {/* CHILD ROUTE 8: Renders PaymentIntegrationsPage when navigating to /dashboard/payments*/}
          <Route path="payments" element={<PaymentIntegrationPage />} />

          {/* CHILD ROUTE 9: Renders ApiKeysPage when navigating to /dashboard/api-keys*/}
          <Route path="api-keys" element={<ApiKeysPage />} />

          {/* CHILD ROUTE 10: Renders GeneralSettingsPage when navigating to /dashboard/settings*/}
          <Route path="settings" element={<GeneralSettingsPage />} />

          {/* ... and so on for all dashboard pages ... */}
        </Route>

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

// Main App component exports the LoaderProvider wrapping the content
export default function App() {
  return (
    <LoaderProvider>
      <AppContent />
    </LoaderProvider>
  );
}
