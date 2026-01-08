import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

/**
 * AuthContext
 * Centralized authentication & tenant state
 */
const AuthContext = createContext({});

/**
 * AuthProvider
 * Wraps the app and provides auth state
 */
export const AuthProvider = ({ children }) => {
  // Logged-in Supabase user
  const [user, setUser] = useState(null);

  // Active tenant (organization)
  const [tenant, setTenant] = useState(null);

  // Global loading state (IMPORTANT for route guards)
  const [loading, setLoading] = useState(true);

  /**
   * Initial session restore + auth change listener
   */
  useEffect(() => {
    /**
     * Restore user session on page refresh
     */
    const getInitialSession = async () => {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);

      // Fetch profile & tenant only if user exists
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setTenant(null);
      }

      setLoading(false);
    };

    getInitialSession();

    /**
     * Listen to auth events (login, logout, token refresh)
     */
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setLoading(true);

      setUser(session?.user ?? null);

      if (session?.user) {
        // Check if user has a profile, if not, set them up
        const { data: profile } = await supabase
          .from("profiles")
          .select("user_id")
          .eq("user_id", session.user.id)
          .single();

        if (!profile) {
          // New user - set up their profile and tenant
          try {
            await supabase.rpc("handle_new_user_setup", {
              user_id: session.user.id,
              user_email: session.user.email,
              user_metadata: session.user.user_metadata,
            });
          } catch (setupError) {
            console.error("Error setting up user profile:", setupError);
          }
        }

        await fetchUserProfile(session.user.id);
      } else {
        setTenant(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  /**
   * Fetch user's profile and tenant info
   * This respects RLS automatically
   */
  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select(
          `
          id,
          user_id,
          full_name,
          avatar_url,
          tenant_users (
            role,
            tenants (
              id,
              name,
              domain,
              subdomain
            )
          )
        `
        )
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error("Failed to fetch profile:", error);
        setTenant(null);
        return;
      }

      /**
       * Resolve tenant
       * (Currently first tenant only — scalable later)
       */
      if (data?.tenant_users?.length > 0) {
        setTenant(data.tenant_users[0].tenants);
      } else {
        console.warn("User has no tenant assigned yet");
        setTenant(null);
      }
    } catch (err) {
      console.error("Unexpected profile fetch error:", err);
      setTenant(null);
    }
  };

  /**
   * Email + password signup
   */
  const signUp = async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    // If signup successful and user exists, set up their profile/tenant
    if (!error && data.user) {
      try {
        await supabase.rpc("handle_new_user_setup", {
          user_id: data.user.id,
          user_email: data.user.email,
          user_metadata: data.user.user_metadata,
        });
      } catch (setupError) {
        console.error("Error setting up user profile:", setupError);
        // Don't fail the signup if setup fails, but log it
      }
    }

    return { data, error };
  };

  /**
   * Email + password login
   */
  const signIn = async (email, password) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  /**
   * Google OAuth login
   */
  const signInWithGoogle = async () => {
    return await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  /**
   * Logout
   */
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setUser(null);
      setTenant(null);
    }

    return { error };
  };

  /**
   * Password reset
   */
  const resetPassword = async (email) => {
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
  };

  /**
   * Context value exposed to the app
   */
  const value = {
    user, // Supabase auth user
    tenant, // Active tenant (organization)
    loading, // Global auth loading state
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook for consuming auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
