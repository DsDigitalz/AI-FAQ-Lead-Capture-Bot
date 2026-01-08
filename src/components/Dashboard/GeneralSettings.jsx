import React, { useState } from "react";
import { motion } from "framer-motion";
import { Settings, User, Palette, Mail, Globe, Save } from "lucide-react";

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.1 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

// --- Main Component ---
export default function GeneralSettings() {
  const [formData, setFormData] = useState({
    companyName: "HelplyAI Solutions",
    botName: "HelplyAI Assistant",
    primaryContact: "support@helply.ai",
    language: "English (US)",
    primaryColor: "#F472B6",
  });

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "color" ? value : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Settings Saved:", formData);
    alert("General Settings saved successfully!");
  };

  return (
    <motion.section
      className="mt-18 lg:mt-0 space-y-8 p-4 md:p-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.header
        variants={itemVariants}
        className="pb-4 border-b border-[#210045]"
      >
        <h2 className="text-3xl font-extrabold text-white flex items-center space-x-3">
          <Settings size={30} className="text-fuchsia-400" />
          <span>General Settings</span>
        </h2>
        <p className="text-gray-400 mt-1">
          Configure your company identity, bot persona, and default language
          settings.
        </p>
      </motion.header>

      {/* Settings Form */}
      <motion.form
        onSubmit={handleSubmit}
        variants={itemVariants}
        className="bg-[#140036] rounded-xl border border-[#210045] shadow-lg p-6 space-y-6"
      >
        {/* Bot Identity */}
        <div className="space-y-4 border-b border-[#210045] pb-6">
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <User size={20} className="text-yellow-400" />
            <span>Bot Persona</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="companyName"
                className="text-gray-400 font-medium block mb-2"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full bg-transparent border border-[#210045] rounded-lg py-2 px-4 text-white focus:ring-fuchsia-500"
              />
            </div>
            <div>
              <label
                htmlFor="botName"
                className="text-gray-400 font-medium block mb-2"
              >
                AI Assistant Name
              </label>
              <input
                type="text"
                id="botName"
                value={formData.botName}
                onChange={handleChange}
                className="w-full bg-transparent border border-[#210045] rounded-lg py-2 px-4 text-white focus:ring-fuchsia-500"
              />
            </div>
          </div>
        </div>

        {/* Branding & Defaults */}
        <div className="space-y-4 border-b border-[#210045] pb-6">
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <Palette size={20} className="text-fuchsia-400" />
            <span>Branding & Defaults</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="primaryContact"
                className="text-gray-400 font-medium block mb-2 flex items-center space-x-2"
              >
                <Mail size={16} />
                <span>Primary Contact Email</span>
              </label>
              <input
                type="email"
                id="primaryContact"
                value={formData.primaryContact}
                onChange={handleChange}
                className="w-full bg-transparent border border-[#210045] rounded-lg py-2 px-4 text-white focus:ring-fuchsia-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Used for system notifications and fallback human handover.
              </p>
            </div>
            <div>
              <label
                htmlFor="language"
                className="text-gray-400 font-medium block mb-2 flex items-center space-x-2"
              >
                <Globe size={16} />
                <span>Default Language</span>
              </label>
              <select
                id="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full bg-[#1e004a] border border-[#210045] rounded-lg p-2 text-white focus:ring-fuchsia-500"
              >
                <option>English (US)</option>
                <option>French (FR)</option>
                <option>Spanish (ES)</option>
                <option>Yoruba</option>
                <option>Igbo</option>
              </select>
            </div>
          </div>
        </div>

        {/* Primary Color */}
        <div className="space-y-4">
          <label
            htmlFor="primaryColor"
            className="text-gray-400 font-medium block mb-2 flex items-center space-x-2"
          >
            <Palette size={16} />
            <span>Widget Primary Color</span>
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="color"
              id="primaryColor"
              value={formData.primaryColor}
              onChange={handleChange}
              className="w-10 h-10 border-2 border-[#210045] rounded-md overflow-hidden p-0 bg-transparent cursor-pointer"
            />
            <input
              type="text"
              value={formData.primaryColor}
              readOnly
              className="w-40 bg-transparent border border-[#210045] rounded-lg py-2 px-4 text-white font-mono text-sm"
            />
          </div>
          <p className="text-xs text-gray-500">
            This color is used for your chat widget button and highlights.
          </p>
        </div>

        {/* Save Button */}
        <motion.div
          variants={itemVariants}
          className="pt-6 border-t border-[#210045] flex justify-end"
        >
          <motion.button
            type="submit"
            className="flex items-center space-x-2 bg-fuchsia-600 px-6 py-3 rounded-lg font-medium hover:bg-fuchsia-700 text-white transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <Save size={20} />
            <span>Save All Settings</span>
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.section>
  );
}
