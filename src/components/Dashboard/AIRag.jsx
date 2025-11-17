import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Upload,
  Trash2,
  Edit,
  ChevronDown,
  CheckCircle,
  Database,
  File,
  Folder,
  Plus,
  Server,
} from "lucide-react";

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

// --- Dummy Data ---
const knowledgeSources = [
  {
    id: 1,
    type: "PDF",
    name: "Q4_Product_Catalog_2025.pdf",
    size: "12 MB",
    status: "Processed",
    date: "2025-10-15",
    sync: "Hourly",
  },
  {
    id: 2,
    type: "FAQ List",
    name: "Pricing & Plans.txt",
    size: "50 KB",
    status: "Processed",
    date: "2025-10-10",
    sync: "Manual",
  },
  {
    id: 3,
    type: "Document",
    name: "Refund_Policy_v2.docx",
    size: "1.5 MB",
    status: "Processing",
    date: "2025-10-12",
    sync: "Daily",
  },
  {
    id: 4,
    type: "Folder",
    name: "Support_Articles_Archive",
    size: "450 MB",
    status: "Synced",
    date: "2025-09-01",
    sync: "Weekly",
  },
];

// --- Knowledge Source Card ---
const KnowledgeSourceCard = ({ source, index }) => {
  const isProcessing = source.status === "Processing";

  const statusClasses = {
    Processed: "bg-green-900/40 text-green-400",
    Processing: "bg-yellow-900/40 text-yellow-400 animate-pulse",
    Synced: "bg-blue-900/40 text-blue-400",
    Failed: "bg-red-900/40 text-red-400",
  };

  const Icon = source.type === "Folder" ? Folder : File;

  return (
    <motion.article
      variants={itemVariants}
      custom={index}
      className="flex items-center justify-between p-4 bg-[#140036] border border-[#210045] rounded-xl transition-shadow hover:shadow-fuchsia-500/10"
    >
      <div className="flex items-center space-x-4 flex-1 min-w-0">
        <div className="p-3 bg-fuchsia-900/30 rounded-lg text-fuchsia-400">
          <Icon size={24} />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold truncate text-white">
            {source.name}
          </h3>
          <div className="flex items-center space-x-3 text-sm text-gray-400 mt-1">
            <span>{source.size}</span>
            <span className="h-1 w-1 bg-gray-600 rounded-full"></span>
            <span>Last Updated: {source.date}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            statusClasses[source.status]
          }`}
        >
          {source.status}
        </span>
        <div className="text-sm text-gray-500 hidden sm:block">
          Sync: {source.sync}
        </div>
        <div className="flex space-x-2">
          <motion.button
            className="p-2 rounded-full text-gray-400 hover:text-blue-400 hover:bg-[#1e004a]"
            whileHover={{ scale: 1.1 }}
            disabled={isProcessing}
          >
            <Edit size={18} />
          </motion.button>
          <motion.button
            className="p-2 rounded-full text-gray-400 hover:text-red-400 hover:bg-[#1e004a]"
            whileHover={{ scale: 1.1 }}
            disabled={isProcessing}
          >
            <Trash2 size={18} />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

// --- Main Component ---
export default function AiRag() {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <motion.section
      className="space-y-8 p-4 md:p-0"
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
          <Database size={30} className="text-fuchsia-400" />
          <span>AI Knowledge Base & RAG Setup</span>
        </h2>
        <p className="text-gray-400 mt-1">
          Manage the documents, FAQs, and product catalogs that power your bot's
          accurate, business-specific responses.
        </p>
      </motion.header>

      {/* Upload Area */}
      <motion.div
        variants={itemVariants}
        className="bg-[#140036] p-6 rounded-xl border-2 border-dashed border-gray-700/50 hover:border-fuchsia-600 transition-colors"
      >
        <label
          htmlFor="file-upload"
          className="block text-center cursor-pointer"
        >
          <Upload size={48} className="text-gray-500 mx-auto mb-3" />
          <p className="text-lg font-semibold text-gray-300">
            Drag and drop files here, or click to upload
          </p>
          <p className="text-sm text-gray-500 mt-1">
            PDFs, DOCX, TXT, CSV, or ZIP files. Max 50 MB per file.
          </p>
          <input
            id="file-upload"
            type="file"
            multiple
            className="hidden"
            onChange={() => setIsUploading(true)}
          />
        </label>
        {isUploading && (
          <div className="mt-4 bg-[#1e004a] p-3 rounded-lg flex items-center justify-between text-sm text-yellow-400">
            <span className="animate-pulse">
              Uploading file (3/5)... Please wait.
            </span>
            <Server size={18} />
          </div>
        )}
      </motion.div>

      {/* Knowledge Source List */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-2xl font-bold text-white flex items-center justify-between">
          Activated Sources
          <button className="flex items-center space-x-1 text-fuchsia-400 hover:text-fuchsia-300 text-base font-medium">
            <Plus size={18} />
            <span>Add Manual FAQ</span>
          </button>
        </h3>

        <motion.div variants={containerVariants} className="space-y-3">
          {knowledgeSources.map((source, index) => (
            <KnowledgeSourceCard
              key={source.id}
              source={source}
              index={index}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* RAG Configuration */}
      <motion.div
        variants={itemVariants}
        className="space-y-4 pt-6 border-t border-[#210045]"
      >
        <h3 className="text-2xl font-bold text-white">AI Configuration</h3>

        <div className="bg-[#140036] p-6 rounded-xl border border-[#210045] space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="confidence" className="text-gray-300 font-medium">
              RAG Confidence Threshold
            </label>
            <span className="text-fuchsia-400 font-bold">85%</span>
          </div>
          <input
            type="range"
            id="confidence"
            min="50"
            max="99"
            defaultValue={85}
            className="w-full h-2 bg-[#210045] rounded-lg appearance-none cursor-pointer range-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          />
          <p className="text-sm text-gray-500">
            Lower confidence might lead to creative but inaccurate answers.
            Higher confidence ensures the bot only uses uploaded documents.
          </p>
        </div>

        <div className="flex items-start bg-[#140036] p-4 rounded-xl border border-[#210045] space-x-3">
          <input
            type="checkbox"
            id="human-handover"
            defaultChecked
            className="mt-1 form-checkbox h-5 w-5 text-fuchsia-600 bg-[#1e004a] border-gray-700 rounded focus:ring-fuchsia-500"
          />
          <label htmlFor="human-handover" className="text-gray-300">
            <span className="font-semibold">
              Enable Human Handover on Low Confidence
            </span>
            <p className="text-sm text-gray-500">
              If the confidence score drops below the threshold, automatically
              flag the conversation for a human agent (Item 6 integration).
            </p>
          </label>
        </div>
      </motion.div>
    </motion.section>
  );
}
