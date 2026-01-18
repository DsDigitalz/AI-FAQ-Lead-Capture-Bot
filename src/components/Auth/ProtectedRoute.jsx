import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import PageLoader from "../Loader/PageLoader";

/**
 * ProtectedRoute Component
 *
 * Higher-order component that protects routes requiring authentication
 *
 * Features:
 * - Blocks unauthenticated users from accessing protected content
 * - Shows PageLoader while authentication state is being determined
 * - Redirects unauthenticated users to signin page
 * - Preserves intended destination for post-login redirect
 * - Handles authentication loading states gracefully
 * - Prevents unauthorized page flicker before auth is verified
 *
 * Usage:
 * ```jsx
 * <Route path="/dashboard" element={
 *   <ProtectedRoute>
 *     <DashboardComponent />
 *   </ProtectedRoute>
 * } />
 * ```
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();


  
  // 🔹 Debug: see what user is when this route renders
  console.log("Auth user:", user);
  
  /**
   * Loading State
   *
   * Show PageLoader while Supabase is resolving authentication state
   * This prevents flash of unauthorized content and handles initial app load
   * Uses overlay mode to cover the entire viewport during auth resolution
   */
  if (loading) {
    return (
      <PageLoader
        message="Verifying authentication..."
        size="lg"
        overlay={true}
      />
    );
  }

  /**
   * Authentication Check
   *
   * If user is not authenticated (no session), redirect to signin page
   * Preserve the current location so user can be redirected back after login
   */
  if (!user) {
    console.log("🚫 Access denied to protected route:", location.pathname);

    // Redirect to signin with return URL
    return (
      <Navigate
        to="/signin"
        state={{ from: location }} // Preserve intended destination
        replace // Replace history entry to prevent back button issues
      />
    );
  }

  /**
   * Authorized Access
   *
   * User is authenticated, render the protected content
   */
  console.log("✅ Access granted", location.pathname);
  return children;
};

export default ProtectedRoute;
