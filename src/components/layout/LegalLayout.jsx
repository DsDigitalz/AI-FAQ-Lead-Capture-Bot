// LegalLayout.js

import React from "react";
import { Outlet } from "react-router";
// 🔑 IMPORT: Use the new dedicated legal header

import Footer from "../Footer"; // Assuming Footer is one directory up
import LegalSubHeader from "../LegalSubHeader";
import LegalSubFooter from "../LegalSubFooter";

export default function LegalLayout() {
  return (
    // Set a flex column structure to ensure the footer stays at the bottom
    <div className="min-h-screen flex flex-col bg-[#0A0027]">
      {/* 🔑 MODIFIED: Uses the specialized Legal Sub-Header */}
      <LegalSubHeader />

      {/* 🟢 Semantic Markup: Main content wrapper */}
      <main className="flex-grow max-w-6xl mx-auto w-full">
        <Outlet />
      </main>

      {/* <Footer /> */}
      <LegalSubFooter />
    </div>
  );
}
