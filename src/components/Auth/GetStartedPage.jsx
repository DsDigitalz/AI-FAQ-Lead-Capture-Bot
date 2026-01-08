import React, { useState, useEffect } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  Shield,
  Zap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Github,
  Chrome,
  KeyRound,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";

// -------------------- Zod Validation Schema --------------------
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[0-9]/, "Password must contain at least one number.")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol.");

export const SignUpSchema = z
  .object({
    fullName: z.string().min(1, "Full Name is required."),
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Invalid email address."),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm Password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

// -------------------- Animation Variants --------------------
const scrollFadeVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// -------------------- Reusable Components --------------------

const InputField = ({ name, label, type = "text", placeholder }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <div className="space-y-1.5 w-full">
      <label
        htmlFor={name}
        className="text-xs font-medium text-gray-400 uppercase tracking-wider"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full px-4 py-2.5 bg-[#140036] border rounded-md text-white placeholder-gray-600 focus:ring-1 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all ${
          error ? "border-red-500" : "border-[#210045]"
        }`}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

// Fixed Password Field with Eye Toggle
const PasswordField = ({ name, label, placeholder }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [show, setShow] = useState(false);
  const error = errors[name];

  return (
    <div className="space-y-1.5 w-full">
      <label
        htmlFor={name}
        className="text-xs font-medium text-gray-400 uppercase tracking-wider"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          id={name}
          placeholder={placeholder}
          {...register(name)}
          className={`w-full px-4 py-2.5 pr-10 bg-[#140036] border rounded-md text-white placeholder-gray-600 focus:ring-1 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all ${
            error ? "border-red-500" : "border-[#210045]"
          }`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-fuchsia-400 transition-colors"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

// -------------------- Main Component --------------------
export default function GetStartedPage() {
  const methods = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { handleSubmit } = methods;
  const { signUp, signInWithGoogle } = useAuth();

  useEffect(() => window.scrollTo(0, 0), []);

  const onSubmit = async (data) => {
    setLoading(true);
    const loadingToast = toast.loading("Creating your account...");
    try {
      const { error } = await signUp(data.email, data.password, data.fullName);
      toast.dismiss(loadingToast);
      if (error) toast.error(error.message);
      else {
        toast.success("Account created! Please check your email.");
        navigate("/signin");
      }
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch {
      toast.error("Google sign in failed.");
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#0A0027] text-white">
      <Toaster position="top-right" />

      {/* LEFT COLUMN: Form Section */}
      <section className="flex items-center justify-center p-6 sm:p-12 lg:p-20">
        <motion.div
          className="w-full max-w-md space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollFadeVariants}
        >
          <header className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Create an account
            </h1>
            <p className="text-gray-400 text-sm">
              Sign up to start your 14-day free trial.
            </p>
          </header>

          {/* Social Auth */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-[#210045] rounded-md bg-[#140036] hover:bg-[#1e004a] transition-colors text-sm font-medium"
            >
              <Chrome size={18} />
              Continue with Google
            </button>
          </div>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-[#210045]"></div>
            <span className="flex-shrink mx-4 text-gray-600 text-xs uppercase tracking-widest">
              or
            </span>
            <div className="flex-grow border-t border-[#210045]"></div>
          </div>

          {/* Form */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <InputField
                name="fullName"
                label="Full Name"
                placeholder="Adaobi Okoro"
              />
              <InputField
                name="email"
                label="Work Email"
                type="email"
                placeholder="you@example.com"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PasswordField
                  name="password"
                  label="Password"
                  placeholder="••••••••"
                />
                <PasswordField
                  name="confirmPassword"
                  label="Confirm"
                  placeholder="••••••••"
                />
              </div>

              <button
                disabled={loading}
                className={`w-full py-3 mt-4 rounded-md font-semibold transition-all flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-gray-700"
                    : "bg-fuchsia-600 hover:bg-fuchsia-500 shadow-lg shadow-fuchsia-500/20"
                }`}
              >
                {loading ? "Creating..." : "Sign up"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>
          </FormProvider>

          <footer className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/signin" className="text-fuchsia-400 hover:underline">
              Sign in
            </Link>
          </footer>
        </motion.div>
      </section>

      {/* RIGHT COLUMN: Testimonial Section */}
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
            "Your business never sleeps. Neither does HelplyAI."
          </blockquote>
          <div className="text-fuchsia-500 opacity-20 ">
            <svg width="45" height="36" viewBox="0 0 45 36" fill="currentColor" className="flex rotate-180 ">
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
