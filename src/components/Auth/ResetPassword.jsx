import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  Shield,
  Zap,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { supabase } from "../../utils/supabase";

// --- Validation Schema ---
const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .regex(/[a-z]/, "Must contain a lowercase letter.")
      .regex(/[A-Z]/, "Must contain an uppercase letter.")
      .regex(/[0-9]/, "Must contain a number.")
      .regex(/[^A-Za-z0-9]/, "Must contain a symbol."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
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

// --- Reusable Input Field (Modified for Password Visibility) ---
const InputField = ({
  id,
  label,
  placeholder,
  register,
  errors,
  showToggle,
  isVisible,
  toggleVisibility,
}) => {
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
          type={isVisible ? "text" : "password"}
          id={id}
          placeholder={placeholder}
          {...register(id)}
          className={`w-full px-4 py-2.5 bg-[#140036] border rounded-md text-white placeholder-gray-600 focus:ring-1 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all ${
            error ? "border-red-500" : "border-[#210045]"
          }`}
        />
        {showToggle && (
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
          >
            {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

// --- Main Component ---
export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResetPasswordSchema),
  });

  useEffect(() => window.scrollTo(0, 0), []);

  const onSubmit = async (data) => {
    setLoading(true);
    const loadingToast = toast.loading("Updating security credentials...");

    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });
      toast.dismiss(loadingToast);

      if (error) {
        toast.error(error.message, { icon: "⚠️" });
      } else {
        toast.success("Password updated successfully!", { icon: "🔐" });
        navigate("/signin", { replace: true });
      }
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Failed to update password.", { icon: "⚠️" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#0A0027] text-white">
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
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Reset password
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Please enter your new password below. Ensure it is strong and
              secure.
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div variants={scrollFadeVariants} className="space-y-4">
              <InputField
                id="password"
                label="New Password"
                placeholder="••••••••"
                register={register}
                errors={errors}
                showToggle
                isVisible={showPass}
                toggleVisibility={() => setShowPass(!showPass)}
              />
              <InputField
                id="confirmPassword"
                label="Confirm Password"
                placeholder="••••••••"
                register={register}
                errors={errors}
                showToggle
                isVisible={showConfirm}
                toggleVisibility={() => setShowConfirm(!showConfirm)}
              />
            </motion.div>

            <motion.button
              variants={scrollFadeVariants}
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-md font-semibold transition-all flex items-center justify-center gap-2 ${
                loading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-fuchsia-600 hover:bg-fuchsia-500 shadow-lg shadow-fuchsia-500/20"
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="animate-spin h-4 w-4" />
                  <span>Updating...</span>
                </>
              ) : (
                <span>Update password</span>
              )}
            </motion.button>
          </form>

          <footer className="text-center pt-2">
            <Link
              to="/signin"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-fuchsia-400 transition-colors group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span>Back to Sign In</span>
            </Link>
          </footer>
        </motion.div>
      </section>

      {/* RIGHT COLUMN: Branding/Testimonial Section (Matches Forgot Password) */}
      <section className="hidden lg:flex flex-col items-center justify-center bg-[#050015] p-20 border-l border-[#210045] relative overflow-hidden">
        {/* Decorative Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-fuchsia-600/5 blur-[120px] rounded-full" />

        <motion.article
          className="max-w-lg space-y-6 relative z-10"
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
            "Your account security is our top priority. A strong password
            ensures your data and dashboard remain protected."
          </blockquote>

          <footer className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-fuchsia-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/20">
              H
            </div>
            <cite className="not-italic">
              <p className="font-semibold text-gray-200">HelplyAI Team</p>
              <p className="text-sm text-gray-500">Security Operations</p>
            </cite>
          </footer>
        </motion.article>
      </section>
    </main>
  );
}
