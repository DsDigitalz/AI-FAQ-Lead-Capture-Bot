import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Shield, Zap, RefreshCw, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";

// --- Validation Schema ---
const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Invalid email address.")
    .min(1, "Email is required."),
});

// --- Animation Variants ---
const scrollFadeVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// --- Reusable Input Field ---
const InputField = ({ id, label, placeholder, register, errors }) => {
  const error = errors[id];
  return (
    <div className="space-y-1.5 w-full">
      <label
        htmlFor={id}
        className="text-xs font-medium text-gray-400 uppercase tracking-wider"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type="email"
          id={id}
          placeholder={placeholder}
          {...register(id)}
          className={`w-full px-4 py-2.5 bg-[#140036] border rounded-md text-white placeholder-gray-600 focus:ring-1 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all ${
            error ? "border-red-500" : "border-[#210045]"
          }`}
        />
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

// --- Main Component ---
export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "" },
  });

  useEffect(() => window.scrollTo(0, 0), []);

  const onSubmit = async (data) => {
    setLoading(true);
    const loadingToast = toast.loading("Sending reset link...");

    try {
      const { error } = await resetPassword(data.email);
      toast.dismiss(loadingToast);
      if (error) {
        toast.error(error.message, { icon: "⚠️" });
      } else {
        toast.success(`Password reset link sent to ${data.email}`, {
          icon: "📩",
        });
        reset({ email: "" });
      }
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Failed to send reset link.", { icon: "⚠️" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#0A0027] text-white">
      {/* <Toaster position="top-right" /> */}

      {/* LEFT COLUMN: Reset Form */}
      <section className="flex items-center justify-center p-6 sm:p-12 lg:p-20">
        <motion.div
          className="w-full max-w-sm space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollFadeVariants}
        >
          <header className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Forgot password
            </h1>
            <p className="text-gray-400 text-sm">
              Enter your email and we'll send you a link to reset your password.
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div variants={scrollFadeVariants}>
              <InputField
                id="email"
                label="Email Address"
                placeholder="you@yourcompany.com"
                register={register}
                errors={errors}
              />
            </motion.div>

            <motion.button
              variants={scrollFadeVariants}
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-md font-semibold transition-all flex items-center justify-center gap-2 ${
                loading
                  ? "bg-gray-700"
                  : "bg-fuchsia-600 hover:bg-fuchsia-500 shadow-lg shadow-fuchsia-500/20"
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="animate-spin h-4 w-4" />
                  <span>Sending Link...</span>
                </>
              ) : (
                <span>Send reset link</span>
              )}
            </motion.button>
          </form>

          <footer className="text-center">
            <Link
              to="/signin"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-fuchsia-400 transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to Sign In</span>
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
            "The password recovery process was seamless. I was back into my
            dashboard in less than two minutes."
          </blockquote>

          <footer className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-fuchsia-600 to-purple-600 flex items-center justify-center font-bold text-white">
              H
            </div>
            <cite className="not-italic">
              <p className="font-semibold text-gray-200">HelplyAI Team</p>
              <p className="text-sm text-gray-500">Support Operations</p>
            </cite>
          </footer>
        </motion.article>
      </section>
    </main>
  );
}
