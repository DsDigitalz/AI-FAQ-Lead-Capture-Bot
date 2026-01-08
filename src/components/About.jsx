import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Target, Users, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// --- Framer Motion Animation Setup ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  },
};

const HelplyAILogo = ({ className = "w-12 h-12" }) => (
  <div className={`relative ${className}`}>
    <Shield className="w-full h-full text-white" strokeWidth={1.5} />
    <Zap
      className="absolute top-1/2 left-1/2 w-4 h-4 text-fuchsia-400 fill-fuchsia-400 transform -translate-x-1/2 -translate-y-1/2"
      strokeWidth={0}
    />
  </div>
);

const ValueCard = ({ icon: Icon, title, description }) => (
  <motion.article
    variants={itemVariants}
    className="group bg-[#140036]/40 p-8 rounded-2xl border border-white/5 hover:border-fuchsia-500/30 transition-all duration-500 flex flex-col items-start h-full relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="p-3 rounded-xl bg-white/5 text-fuchsia-400 mb-6 group-hover:bg-fuchsia-500 group-hover:text-white transition-all duration-300">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </motion.article>
);

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#0A0027] text-white pt-32 pb-24 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-fuchsia-600/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        className="max-w-6xl mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* 🟢 Semantic Markup: Page Header */}
        <header className="text-center mb-24">
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <Link to="/" className="hover:scale-110 transition-transform">
              <HelplyAILogo />
            </Link>
          </motion.div>
          <motion.p variants={itemVariants} className="text-fuchsia-400 font-bold uppercase tracking-[0.2em] text-xs mb-4">
            Our Mission & DNA
          </motion.p>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black leading-tight tracking-tighter mb-8">
            Building the Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-fuchsia-400">Customer Support.</span>
          </motion.h1>
        </header>

        {/* 1. Mission Section */}
        <motion.section
          variants={itemVariants}
          className="relative bg-white/5 p-8 md:p-16 rounded-[2.5rem] border border-white/10 mb-24 overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <Target size={200} className="text-white" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-3 mb-6 text-fuchsia-400">
              <Target size={28} />
              <h2 className="text-2xl font-bold uppercase tracking-widest">The Mission</h2>
            </div>
            <p className="text-2xl md:text-3xl text-gray-200 leading-snug font-medium mb-6">
              HelplyAI was founded on the belief that <span className="text-white">Nigerian businesses</span> deserve world-class tools to scale without compromising human connection.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              We provide an AI-Powered SaaS platform that transforms traditional support into 24/7 revenue-generating engines. By automating lead qualification and delivering lightning-fast resolutions, we empower companies to grow efficiently and sustainably.
            </p>
          </div>
        </motion.section>

        {/* 2. Values Section */}
        <section className="mb-32">
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-16 tracking-tight">
            Our Core Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={Zap}
              title="Speed & Efficiency"
              description="Wait times are the enemy of growth. We build tools that ensure your customers get answers in seconds, not hours."
            />
            <ValueCard
              icon={Users}
              title="Customer Focus"
              description="Technology should be invisible. Every feature we build aims to make the end-user experience feel personal and intuitive."
            />
            <ValueCard
              icon={Globe}
              title="Local Impact"
              description="Proudly based in Lagos. We tailor global AI standards to solve the unique logistical and operational hurdles of the African market."
            />
          </div>
        </section>

        {/* 3. The Journey Section */}
        <motion.section 
          variants={itemVariants} 
          className="text-center max-w-4xl mx-auto py-16 border-t border-white/5"
        >
          <h2 className="text-4xl font-black mb-8 text-white">The HelplyAI Journey</h2>
          <p className="text-xl text-gray-400 leading-relaxed mb-10">
            HelplyAI was born from the gap between ambitious local businesses and outdated support infrastructure. We saw too many missed leads and too much hold music. Since <span className="text-white font-semibold">September 30, 2025</span>, we've been on a mission in Lagos to prove that automation can be both smart and seamless.
          </p>
          <Link 
            to="/signup" 
            className="inline-flex items-center gap-2 text-fuchsia-400 font-bold text-lg group"
          >
            Join our journey 
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.section>
      </motion.div>
    </main>
  );
}