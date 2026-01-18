import React, { useState, useEffect } from "react";
import AiRag from "../components/Dashboard/AIRag";
import PageLoader from "../components/Loader/PageLoader";

/**
 * AiRagPage Component
 *
 * AI RAG (Retrieval-Augmented Generation) dashboard page
 * Demonstrates loading state during data fetching
 *
 * Features:
 * - Shows PageLoader during initial data loading
 * - Simulates API call to fetch AI knowledge sources
 * - Handles loading and error states gracefully
 * - Uses PageLoader component for consistent UX
 */
export default function AiRagPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Simulate Data Fetching
   *
   * In a real application, this would fetch AI knowledge sources,
   * RAG configurations, or training data from your backend API
   */
  useEffect(() => {
    const fetchAIData = async () => {
      try {
        console.log("🤖 Fetching AI RAG data...");

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Simulate potential error (uncomment to test error handling)
        // throw new Error("Failed to fetch AI data");

        console.log("✅ AI RAG data loaded successfully");
        setIsLoading(false);
      } catch (err) {
        console.error("❌ Error fetching AI data:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchAIData();
  }, []);

  /**
   * Loading State
   *
   * Show PageLoader while fetching AI data
   * This prevents showing empty state and provides feedback to user
   */
  if (isLoading) {
    return <PageLoader message="Loading AI knowledge base..." size="lg" />;
  }

  /**
   * Error State
   *
   * Show error message if data fetching failed
   * In production, you might want to show a retry button
   */
  if (error) {
    return (
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-red-400 mb-2">
              Failed to Load AI Data
            </h2>
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  /**
   * Success State
   *
   * Render the AI RAG component once data is loaded
   */
  return (
    <main>
      <div>
        <AiRag />
      </div>
    </main>
  );
}
