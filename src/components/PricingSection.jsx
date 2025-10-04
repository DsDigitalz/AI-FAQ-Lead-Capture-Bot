import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

// --- Framer Motion Animation Setup ---
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delayChildren: 0.2,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
// ------------------------------------

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
      "bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white",
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
      "bg-fuchsia-600 hover:bg-fuchsia-700 shadow-lg shadow-fuchsia-500/50 text-white",
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
    buttonClass:
      "bg-blue-600 hover:bg-blue-700 border border-blue-600 text-white",
  },
];

const PricingCard = ({ plan, index }) => (
  <motion.div
    variants={itemVariants}
    className={`
      flex flex-col p-8 rounded-xl shadow-2xl transition-all duration-300
      ${
        plan.isFeatured
          ? "bg-[#1e004a] border-2 border-fuchsia-500 transform scale-105"
          : "bg-[#140036] border border-[#210045]"
      }
      hover:shadow-fuchsia-900/50 hover:scale-[1.03]
    `}
    whileHover={{ y: -5 }} // subtle lift on hover
  >
    {/* Plan Header */}
    <h3
      className={`text-2xl font-bold ${
        plan.isFeatured ? "text-fuchsia-400" : "text-white"
      } mb-1`}
    >
      {plan.name}
    </h3>
    <p className="text-sm text-gray-400 mb-6">{plan.description}</p>

    {/* Price */}
    <div className="text-white mb-6">
      <span className="text-4xl font-extrabold">{plan.price}</span>
      <span className="text-lg text-gray-400 ml-1">
        {plan.name !== "Enterprise AI" && "/mo"}
      </span>
      {plan.name !== "Enterprise AI" && (
        <p className="text-sm text-fuchsia-300 mt-1">{plan.interactions}</p>
      )}
    </div>

    {/* Button */}
    <a
      href={plan.name === "Enterprise AI" ? "#contact" : "#signup"}
      className={`
        w-full py-3 rounded-full text-center text-lg font-semibold mb-6 transition-colors
        ${plan.buttonClass}
      `}
    >
      {plan.name === "Enterprise AI" ? "Contact Sales" : "Get Started Now"}
      <ArrowRight size={18} className="inline ml-2" />
    </a>

    {/* Feature List */}
    <ul className="space-y-3 flex-grow">
      {plan.features.map((feature, idx) => (
        <li key={idx} className="flex items-start text-gray-300">
          <Check
            size={18}
            className="text-green-400 mt-0.5 mr-2 flex-shrink-0"
          />
          <span className="text-base">{feature}</span>
        </li>
      ))}
    </ul>

    {/* Optional: Add a call for the Custom tier */}
    {plan.name === "Enterprise AI" && (
      <p className="text-sm text-gray-400 mt-4 pt-4 border-t border-gray-700">
        Includes volume discounts for 10,000+ chats.
      </p>
    )}
  </motion.div>
);

export default function PricingSection() {
  return (
    <div className="py-24 bg-[#0A0027] text-white">
      <motion.div
        className="max-w-7xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section Heading */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-fuchsia-400 font-semibold uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Simple, Scalable Plans
          </h2>
          <p className="text-xl text-gray-400 mt-4">
            Start free, upgrade when you're ready for more automation.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 lg:gap-x-8">
          {pricingData.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
