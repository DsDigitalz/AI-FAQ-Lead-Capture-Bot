import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    initAuth();

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // SIGN IN (ONLY existing users)

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // ❌ Invalid credentials / user not found
    if (error) {
      return {
        data: null,
        error: {
          code: error.status,
          message: error.message,
        },
      };
    }

    // ❌ Email not confirmed
    if (!data.user.email_confirmed_at) {
      await supabase.auth.signOut();
      return {
        data: null,
        error: {
          code: "EMAIL_NOT_CONFIRMED",
          message: "Please confirm your email before signing in.",
        },
      };
    }

    setUser(data.user);
    return { data, error: null };
  };

  // SIGN UP
  const signUp = async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) {
      return {
        error: {
          code: error.status,
          message: error.message,
        },
      };
    }

    /**
     * 🚨 CRITICAL CHECK
     * If identities array is empty,
     * the email already exists
     */
    if (
      data?.user &&
      Array.isArray(data.user.identities) &&
      data.user.identities.length === 0
    ) {
      return {
        error: {
          message: "Email already exists. Please sign in instead.",
        },
      };
    }

    return { error: null };
  };

  //RESET PASSWORD
  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        return { error };
      }

      return { error: null };
    } catch (err) {
      console.error("Reset password failed:", err);
      return { error: { message: "Network error. Please try again." } };
    }
  };

  // SIGN IN WITH GOOGLE
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      throw error;
    }

    return data;
  };

  // SIGN OUT
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        resetPassword,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
