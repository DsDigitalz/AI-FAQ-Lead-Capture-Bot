import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

// --- Animation Variants ---
const scrollFadeVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const pricingData = [
  {
    name: "Starter Bot",
    price: "₦120,000",
    description: "Ideal for small businesses just starting automated support.",
    interactions: "Up to 1,000 chats/month",
    features: [
      "Instant 24/7 Support",
      "Basic Lead Qualification",
      "Trained on 1 Data Source (FAQ)",
      "Email Support",
    ],
    isFeatured: false,
    buttonClass:
      "bg-white/5 hover:bg-white/10 text-white border border-white/10",
  },
  {
    name: "Pro Automation",
    price: "₦360,000",
    description: "Scale your team with powerful features and higher capacity.",
    interactions: "Up to 5,000 chats/month",
    features: [
      "Everything in Starter, plus:",
      "Intelligent Lead Qualification",
      "Seamless Team Handoff",
      "CRM/Slack Integration",
      "Real-time Performance Reports",
    ],
    isFeatured: true,
    buttonClass:
      "bg-fuchsia-600 hover:bg-fuchsia-500 shadow-lg shadow-fuchsia-500/20 text-white",
  },
  {
    name: "Enterprise AI",
    price: "Custom",
    description:
      "Tailored AI solutions for high-volume, complex support needs.",
    interactions: "Unlimited chats",
    features: [
      "Everything in Pro, plus:",
      "Custom Uptime SLA (99.99%)",
      "Dedicated Account Manager",
      "On-Premise Deployment Option",
      "Custom Security & Compliance",
    ],
    isFeatured: false,
    buttonClass: "bg-blue-600 hover:bg-blue-500 text-white",
  },
];

const PricingCard = ({ plan }) => (
  <motion.article
    variants={scrollFadeVariants}
    whileHover={{ y: -8 }}
    className={`relative flex flex-col p-8 rounded-3xl transition-all duration-500 overflow-hidden h-full ${
      plan.isFeatured
        ? "bg-[#1e004a]/80 border-2 border-fuchsia-500 shadow-[0_0_40px_-15px_rgba(192,38,211,0.3)]"
        : "bg-[#140036]/50 border border-[#210045] hover:border-white/20"
    } backdrop-blur-xl`}
  >
    {/* Featured Badge */}
    {plan.isFeatured && (
      <div className="absolute top-0 right-0">
        <div className="bg-fuchsia-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl flex items-center gap-1">
          <Sparkles size={10} />
          Most Popular
        </div>
      </div>
    )}

    <header className="mb-8">
      <h3
        className={`text-xl font-bold mb-2 ${
          plan.isFeatured ? "text-fuchsia-400" : "text-white"
        }`}
      >
        {plan.name}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed">
        {plan.description}
      </p>
    </header>

    <section className="mb-8">
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-black text-white">{plan.price}</span>
        {plan.name !== "Enterprise AI" && (
          <span className="text-gray-500 font-medium">/mo</span>
        )}
      </div>
      {plan.name !== "Enterprise AI" && (
        <p className="text-xs font-bold text-fuchsia-400/80 uppercase tracking-tighter mt-2 bg-fuchsia-400/10 inline-block px-2 py-0.5 rounded">
          {plan.interactions}
        </p>
      )}
    </section>

    <div className="mb-8">
      <Link
        to={plan.name === "Enterprise AI" ? "/contact-sales" : "/checkout"}
        className={`group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold transition-all ${plan.buttonClass}`}
      >
        {plan.name === "Enterprise AI" ? "Contact Sales" : "Get Started Now"}
        <ArrowRight
          size={18}
          className="group-hover:translate-x-1 transition-transform"
        />
      </Link>
    </div>

    <ul className="space-y-4 flex-grow">
      {plan.features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <div
            className={`mt-1 p-0.5 rounded-full ${
              plan.isFeatured ? "bg-fuchsia-500" : "bg-green-500"
            }`}
          >
            <Check size={12} className="text-[#0A0027]" strokeWidth={4} />
          </div>
          <span className="text-sm text-gray-300 leading-snug">{feature}</span>
        </li>
      ))}
    </ul>

    {plan.name === "Enterprise AI" && (
      <footer className="mt-8 pt-6 border-t border-white/5">
        <p className="text-[11px] text-center text-gray-500 font-medium italic">
          Includes volume discounts for 10,000+ chats.
        </p>
      </footer>
    )}
  </motion.article>
);

export default function PricingSection() {
  return (
    <section
      className="relative py-24 bg-[#0A0027] overflow-hidden"
      id="pricing"
    >
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-fuchsia-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto px-6 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <header className="text-center mb-20 space-y-4">
          <motion.div
            variants={scrollFadeVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-widest"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
            Pricing Plans
          </motion.div>
          <motion.h2
            variants={scrollFadeVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight"
          >
            Simple, Scalable{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-blue-400">
              Intelligence.
            </span>
          </motion.h2>
          <motion.p
            variants={scrollFadeVariants}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Choose a plan that fits your current volume. Scale up instantly as
            your support needs grow.
          </motion.p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {pricingData.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </main>
      </motion.div>
    </section>
  );
}
