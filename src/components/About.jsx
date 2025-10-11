import React, { useEffect } from "react"; // 🔑 ADDED: useEffect import
// 🔑 Framer Motion for fade-in/slide-in animation
import { motion } from "framer-motion";
import { Shield, Zap, Target, Users, Globe, Briefcase } from "lucide-react";

// --- Framer Motion Animation Setup ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.15, // Stagger for sections
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Logo Component (reused for branding)
const HelplyAILogo = ({ className = "w-10 h-10" }) => (
  <div className={`relative ${className}`}>
    <Shield className="w-full h-full text-white" strokeWidth={1.5} />
    <Zap
      className="absolute top-1/2 left-1/2 w-4 h-4 text-fuchsia-400 fill-fuchsia-400 transform -translate-x-1/2 -translate-y-1/2"
      strokeWidth={0}
    />
  </div>
);

// Value Card Component
const ValueCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    className="bg-[#140036] p-6 rounded-xl border border-[#210045] shadow-lg flex flex-col items-start h-full"
    variants={itemVariants}
    initial="hidden"
    animate="visible"
    custom={delay}
  >
    <Icon className="w-8 h-8 text-fuchsia-400 mb-4" />
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

// --- Main Component ---

export default function About() {
  // 🔑 FIX: Scroll to Top Hook
  useEffect(() => {
    // This runs after the component mounts, ensuring the page starts at the top.
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    // The <main> tag is STATIC to keep the background fixed.
    <main className="min-h-screen bg-[#0A0027] text-white pt-24 pb-16 px-4 sm:px-8 lg:px-16">
      {/* 🔑 ANIMATED Container for the entire content */}
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 🟢 Semantic Markup: Used <header> for the page introduction */}
        <motion.header variants={itemVariants} className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <HelplyAILogo className="w-12 h-12" />
          </div>
          <p className="text-fuchsia-400 font-semibold mb-2 uppercase tracking-widest">
            Our Story
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Building the Future of Customer Support
          </h1>
        </motion.header>

        {/* 1. Mission Section */}
        {/* 🟢 Semantic Markup: Used <section> */}
        <motion.section
          variants={itemVariants}
          className="bg-[#140036] p-8 md:p-12 rounded-3xl mb-16 border border-[#210045]"
        >
          <div className="flex items-center space-x-4 mb-4">
            <Target className="w-8 h-8 text-fuchsia-500" />
            <h2 className="text-3xl font-bold">Our Mission</h2>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed">
            HelplyAI was founded on the belief that **Nigerian businesses**
            deserve world-class tools to scale their operations without
            compromising customer experience. Our mission is to provide an
            **AI-Powered SaaS platform** that automates lead qualification and
            delivers **lightning-fast, 24/7 support** to help companies grow
            efficiently and sustainably.
          </p>
          <p className="mt-4 text-lg text-gray-400">
            We are committed to transforming hold times into conversion
            opportunities, one smart bot at a time.
          </p>
        </motion.section>

        {/* 2. Values Section */}
        {/* 🟢 Semantic Markup: Used <section> */}
        <motion.section variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={Zap}
              title="Speed & Efficiency"
              description="We build tools that minimize wait times and maximize operational efficiency, making speed a core component of our solution."
            />
            <ValueCard
              icon={Users}
              title="Customer Focus"
              description="Every feature is designed to elevate the user experience—both for our clients and their customers."
            />
            <ValueCard
              icon={Globe}
              title="Local Impact"
              description="Based in Lagos, we are dedicated to building global-standard software tailored for the unique challenges of the African market."
            />
          </div>
        </motion.section>

        {/* 3. The Founding Story Section */}
        {/* 🟢 Semantic Markup: Used <section> */}
        <motion.section variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">The HelplyAI Journey</h2>
          <p className="max-w-4xl mx-auto text-lg text-gray-400">
            HelplyAI was conceptualized after realizing the gap between
            ambitious local businesses and the slow, outdated support systems
            they were forced to use. Frustrated with endless hold music and
            missed lead opportunities, our founders decided to build an
            intelligent, integrated solution from the ground up right here in
            Lagos. Since our start on September 30, 2025, we’ve been driven by
            the idea that automation should be smart, seamless, and always
            available.
          </p>
        </motion.section>

       
       
      </motion.div>
    </main>
  );
}
