import React, { useState, useEffect } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Shield, Zap, Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHABox from "../ReCAPTCHABox";
// import ReCAPTCHABox from "../components/ReCAPTCHABox"; // ✅ Use the same ReCAPTCHABox

// --- Zod Validation Schema ---
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

// --- Logo Component ---
const HelplyAILogo = ({ className = "w-8 h-8" }) => (
  <div className={`relative ${className}`}>
    <Shield className="w-full h-full text-white" strokeWidth={1.5} />
    <Zap
      className="absolute top-1/2 left-1/2 w-3 h-3 text-fuchsia-400 fill-fuchsia-400 transform -translate-x-1/2 -translate-y-1/2"
      strokeWidth={0}
    />
  </div>
);

// --- Input Fields ---
const InputField = ({
  name,
  label,
  type = "text",
  icon: Icon,
  placeholder,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <motion.div variants={itemVariants} className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-400">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className="w-5 h-5 text-gray-500" />
          </div>
        )}
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          {...register(name)}
          className={`w-full pl-10 pr-4 py-3 bg-[#1e004a] border rounded-lg text-white placeholder-gray-500 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-colors ${
            error ? "border-red-500" : "border-[#210045]"
          }`}
        />
      </div>
      {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
    </motion.div>
  );
};

const PasswordField = ({ name, label, placeholder }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const error = errors[name];

  return (
    <motion.div variants={itemVariants} className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-400">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Lock className="w-5 h-5 text-gray-500" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          placeholder={placeholder}
          {...register(name)}
          className={`w-full pl-10 pr-10 py-3 bg-[#1e004a] border rounded-lg text-white placeholder-gray-500 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-colors ${
            error ? "border-red-500" : "border-[#210045]"
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5 text-gray-500 hover:text-fuchsia-400" />
          ) : (
            <Eye className="w-5 h-5 text-gray-500 hover:text-fuchsia-400" />
          )}
        </button>
      </div>
      {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
    </motion.div>
  );
};

// --- Main Component ---
export default function SignIn() {
  const methods = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: { workEmail: "", password: "" },
  });

  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const navigate = useNavigate();
  const { handleSubmit } = methods;

  useEffect(() => window.scrollTo(0, 0), []);

  const handleCaptcha = (value) => setCaptchaValue(value);

  const onSubmit = async (data) => {
    if (!captchaValue) {
      toast.error("Please verify that you’re not a robot 🤖");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Signing you in...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200)); // simulate API
      toast.dismiss(loadingToast);

      const validEmail = "admin@example.com";
      const validPassword = "password123";

      if (data.workEmail === validEmail && data.password === validPassword) {
        toast.success("Welcome back 👋 Successfully signed in!");
        navigate("/");
      } else {
        toast.error("Invalid email or password. Please try again.");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Sign in failed. Please try again later.");
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
          <Link to="/">
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-4"
            >
              <HelplyAILogo className="w-10 h-10" />
            </motion.div>
          </Link>
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-extrabold text-white mb-2"
          >
            Welcome Back!
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-400">
            Sign in to continue to your HelplyAI dashboard.
          </motion.p>
        </header>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <InputField
              name="workEmail"
              label="Work Email"
              type="email"
              icon={Mail}
              placeholder="adaobi@yourcompany.com"
            />
            <PasswordField
              name="password"
              label="Password"
              placeholder="••••••••"
            />

            {/* ✅ Google reCAPTCHA */}
            <motion.div
              variants={itemVariants}
              className="pt-2 flex justify-center"
            >
              <ReCAPTCHABox onChange={handleCaptcha} />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex justify-end text-sm"
            >
              <Link
                to="/forgot-password"
                className="font-medium text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
              >
                Forgot Password?
              </Link>
            </motion.div>

            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={loading}
              className={`w-full py-3 mt-6 rounded-full text-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-fuchsia-600 hover:bg-fuchsia-700 shadow-lg shadow-fuchsia-500/50"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <LogIn size={20} />
                </>
              )}
            </motion.button>
          </form>
        </FormProvider>

        <motion.nav
          variants={itemVariants}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>
            Don’t have an account yet?{" "}
            <Link
              to="/signup"
              className="font-medium text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
            >
              Get Started Free
            </Link>
          </p>
        </motion.nav>
      </motion.section>
    </main>
  );
}
