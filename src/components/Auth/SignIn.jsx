import React, { useState, useEffect } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { getAuthErrorMessage } from "../../utils/authErrorHandler";
import {
  Shield,
  Zap,
  Mail,
  Lock,
  LogIn,
  Eye,
  EyeOff,
  Github,
  Chrome,
  KeyRound,
  RefreshCw,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";

// -------------------- Zod Validation Schema --------------------
const SignInSchema = z.object({
  workEmail: z
    .string()
    .email("Invalid email address.")
    .min(1, "Email is required."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(8, "Password must be at least 8 characters."),
});

// -------------------- Animation Variants --------------------
// Applies a combination of fade-in and slide-in (upwards)
const scrollFadeVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// -------------------- Reusable Input Field --------------------
const InputField = ({
  name,
  label,
  type = "text",
  placeholder,
  rightElement,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex justify-between items-center">
        <label
          htmlFor={name}
          className="text-xs font-medium text-gray-400 uppercase tracking-wider"
        >
          {label}
        </label>
        {rightElement}
      </div>
      <div className="relative">
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          {...register(name)}
          className={`w-full px-4 py-2 bg-[#140036] border rounded-md text-white placeholder-gray-600 focus:ring-1 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all ${
            error ? "border-red-500" : "border-[#210045]"
          }`}
        />
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

// -------------------- Main Component --------------------
export default function SignIn() {
  const methods = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: { workEmail: "", password: "" },
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { handleSubmit } = methods;
  const { signIn, signInWithGoogle, loading: authLoading } = useAuth();

  useEffect(() => window.scrollTo(0, 0), []);

  const onSubmit = async (data) => {
    setLoading(true);
    const loadingToast = toast.loading("Signing in...");
    try {
      const { error } = await signIn(data.workEmail, data.password);
      toast.dismiss(loadingToast);
      if (error) {
        toast.error(getAuthErrorMessage(error));
        return;
      } else {
        toast.success("Welcome back!");
        // Redirect to intended location or dashboard
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      }
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch {
      toast.error("Google sign in failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#0A0027] text-white">
      {/* <Toaster position="top-right" /> */}

      {/* LEFT COLUMN: Authentication Form */}
      <section className="flex items-center justify-center p-6 sm:p-12 lg:p-20">
        <motion.div
          className="w-full max-w-sm space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scrollFadeVariants}
        >
          <header className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-gray-400 text-sm">Sign in to your account</p>
          </header>

          {/* Social Auth Group */}
          <div className="space-y-3">
            <motion.button
              variants={scrollFadeVariants}
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-[#210045] rounded-md bg-[#140036] hover:bg-[#1e004a] transition-colors text-sm font-medium"
            >
              <Chrome size={18} />
              Continue with Google
            </motion.button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-[#210045]"></div>
            <span className="flex-shrink mx-4 text-gray-600 text-xs uppercase tracking-widest">
              or
            </span>
            <div className="flex-grow border-t border-[#210045]"></div>
          </div>

          {/* Login Form */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <motion.div variants={scrollFadeVariants}>
                <InputField
                  name="workEmail"
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                />
              </motion.div>

              <motion.div variants={scrollFadeVariants} className="relative">
                <InputField
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  rightElement={
                    <Link
                      to="/forgot-password"
                      size="sm"
                      className="text-xs text-gray-500 hover:text-fuchsia-400 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[34px] text-gray-500 hover:text-fuchsia-400"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </motion.div>

              <motion.button
                variants={scrollFadeVariants}
                disabled={loading}
                className={`w-full py-2.5 rounded-md font-semibold transition-all flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-gray-700"
                    : "bg-fuchsia-600 hover:bg-fuchsia-500"
                }`}
              >
                {loading ? (
                  <>
                    <RefreshCw className="animate-spin h-4 w-4" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </motion.button>
            </form>
          </FormProvider>

          <footer className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-fuchsia-400 hover:underline">
              Sign up
            </Link>
          </footer>
        </motion.div>
      </section>

      {/* RIGHT COLUMN: Branding/Testimonial Section */}
      <section className="hidden lg:flex flex-col items-center justify-center bg-[#050015] p-20 border-l border-[#210045]">
        <motion.article
          className="max-w-lg space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollFadeVariants}
        >
          <div className="text-fuchsia-500 opacity-20">
            <svg width="45" height="36" viewBox="0 0 45 36" fill="currentColor">
              <path d="M13.415 35.5L0 22.085V0H19.297V22.085H9.648L13.415 35.5ZM38.415 35.5L25 22.085V0H44.297V22.085H34.648L38.415 35.5Z" />
            </svg>
          </div>

          <blockquote className="text-2xl font-medium leading-relaxed text-gray-200">
            "AI-powered conversations that work while you scale."
          </blockquote>
          <div className="text-fuchsia-500 opacity-20">
            <svg
              width="45"
              height="36"
              viewBox="0 0 45 36"
              fill="currentColor"
              className="rotate-180"
            >
              <path d="M13.415 35.5L0 22.085V0H19.297V22.085H9.648L13.415 35.5ZM38.415 35.5L25 22.085V0H44.297V22.085H34.648L38.415 35.5Z" />
            </svg>
          </div>

          {/* <footer className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-fuchsia-600 to-purple-600 flex items-center justify-center font-bold">
              G
            </div>
            <cite className="not-italic">
              <p className="font-semibold text-gray-200">@Soham_Asmi</p>
              <p className="text-sm text-gray-500">Developer at HelplyAI</p>
            </cite>
          </footer> */}
        </motion.article>
      </section>
    </main>
  );
}
