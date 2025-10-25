import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Shield, Zap, RefreshCw, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHABox from "../ReCAPTCHABox";

// --- Validation Schema ---
const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Invalid email address.")
    .min(1, "Email is required."),
});

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut", staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

// --- Logo ---
const HelplyAILogo = ({ className = "w-8 h-8" }) => (
  <div className={`relative ${className}`}>
    <Shield className="w-full h-full text-white" strokeWidth={1.5} />
    <Zap
      className="absolute top-1/2 left-1/2 w-3 h-3 text-fuchsia-400 fill-fuchsia-400 transform -translate-x-1/2 -translate-y-1/2"
      strokeWidth={0}
    />
  </div>
);

// --- Input Field ---
const InputField = ({
  id,
  label,
  icon: Icon,
  placeholder,
  register,
  errors,
}) => {
  const error = errors[id];
  return (
    <motion.div variants={itemVariants} className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-400">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className="w-5 h-5 text-gray-500" />
          </div>
        )}
        <input
          type="email"
          id={id}
          placeholder={placeholder}
          {...register(id)}
          aria-invalid={!!error}
          aria-describedby={`${id}-error`}
          className={`w-full pl-10 pr-4 py-3 bg-[#1e004a] border ${
            error ? "border-red-500" : "border-[#210045]"
          } rounded-lg text-white placeholder-gray-500 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-colors`}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-400 mt-1">
          {error.message}
        </p>
      )}
    </motion.div>
  );
};

// --- Mock API ---
const mockPasswordReset = (email) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      email.includes("@example.com")
        ? resolve()
        : reject(new Error("We couldn’t find that email. Please try again."));
    }, 1500)
  );

// --- Main Component ---
export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

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
    if (!captchaValue) {
      toast.error("Please verify that you’re not a robot 🤖");
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      await mockPasswordReset(data.email);
      toast.success(`Password reset link sent to ${data.email}`, {
        icon: "📩",
      });
      reset({ email: "" });
      setCaptchaValue(null);
    } catch (error) {
      toast.error(error.message, { icon: "⚠️" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0A0027] p-4 sm:p-6 lg:p-8 text-white">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1e004a",
            color: "#fff",
            border: "1px solid #4b0082",
            borderRadius: "10px",
            fontSize: "0.9rem",
            padding: "10px 15px",
          },
        }}
      />

      <motion.section
        className="w-full max-w-xl bg-[#140036] rounded-xl shadow-2xl p-8 sm:p-10 border border-[#210045]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <header className="text-center mb-8">
          <Link to="/signin">
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-4"
            >
              <HelplyAILogo />
            </motion.div>
          </Link>
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-extrabold text-white mb-2"
          >
            Reset Your Password
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-400">
            Enter your registered email, and we’ll send you a password reset
            link.
          </motion.p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            id="email"
            label="Email Address"
            icon={Mail}
            placeholder="you@yourcompany.com"
            register={register}
            errors={errors}
          />

          <motion.div
            variants={itemVariants}
            className="pt-2 flex justify-center"
          >
            <ReCAPTCHABox onChange={setCaptchaValue} />
          </motion.div>

          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-fuchsia-600 hover:bg-fuchsia-700 shadow-lg shadow-fuchsia-500/50"
            }`}
          >
            {loading ? (
              <>
                <RefreshCw className="animate-spin h-5 w-5 text-white" />
                <span>Sending Link...</span>
              </>
            ) : (
              <>
                <span>Send Reset Link</span>
                <Mail size={20} />
              </>
            )}
          </motion.button>
        </form>

        <motion.div variants={itemVariants} className="mt-8 text-center">
          <Link
            to="/signin"
            className="inline-flex items-center space-x-2 text-sm font-medium text-gray-400 hover:text-fuchsia-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sign In</span>
          </Link>
        </motion.div>
      </motion.section>
    </main>
  );
}
