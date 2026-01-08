import React from "react";
import { motion } from "framer-motion";
import { Users, UserPlus, Trash2, Shield, Settings, Edit } from "lucide-react";

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
const teamMembers = [
  {
    id: 1,
    name: "Adaeze Kalu (Owner)",
    email: "adaeze@company.com",
    role: "Owner",
    lastActive: "Just now",
    status: "Active",
  },
  {
    id: 2,
    name: "Uche Nwabueze",
    email: "uche@company.com",
    role: "Admin",
    lastActive: "10m ago",
    status: "Active",
  },
  {
    id: 3,
    name: "Tola Adesina",
    email: "tola@company.com",
    role: "Agent",
    lastActive: "2h ago",
    status: "Active",
  },
  {
    id: 4,
    name: "Demo Agent",
    email: "demo@company.com",
    role: "Agent",
    lastActive: "3 days ago",
    status: "Inactive",
  },
];

const roles = [
  {
    name: "Owner",
    description: "Full control over billing, security, and team management.",
  },
  {
    name: "Admin",
    description:
      "Can manage bot settings, integrations, and assign conversations.",
  },
  {
    name: "Agent",
    description:
      "Can view and reply to assigned conversations in the Team Inbox.",
  },
];

// --- Sub-Component: Team Member Row ---
const MemberRow = ({ member, index }) => {
  const roleColor =
    member.role === "Owner"
      ? "bg-red-900/40 text-red-400"
      : member.role === "Admin"
      ? "bg-blue-900/40 text-blue-400"
      : "bg-green-900/40 text-green-400";

  return (
    <motion.article
      variants={itemVariants}
      custom={index * 0.1}
      className="grid grid-cols-4 md:grid-cols-6 items-center p-4 border-b border-[#210045] hover:bg-[#1e004a] transition-colors"
    >
      <div className="col-span-2 flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-fuchsia-600 flex items-center justify-center text-sm font-semibold text-white">
          {member.name[0]}
        </div>
        <span className="font-medium text-white">{member.name}</span>
      </div>
      <span className="hidden md:block text-gray-400 truncate">
        {member.email}
      </span>
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full w-max ${roleColor}`}
      >
        {member.role}
      </span>
      <span className="hidden md:block text-gray-500">{member.lastActive}</span>
      <div className="flex justify-end space-x-2">
        <motion.button
          className="p-2 rounded-full text-gray-400 hover:text-fuchsia-400 hover:bg-fuchsia-900/40"
          whileHover={{ scale: 1.1 }}
          disabled={member.role === "Owner"}
        >
          <Edit size={18} />
        </motion.button>
        <motion.button
          className="p-2 rounded-full text-gray-400 hover:text-red-400 hover:bg-red-900/40"
          whileHover={{ scale: 1.1 }}
          disabled={member.role === "Owner"}
        >
          <Trash2 size={18} />
        </motion.button>
      </div>
    </motion.article>
  );
};

// --- Main Component ---
export default function TeamManagement() {
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
        className="pb-4 border-b border-[#210045] flex justify-between items-center"
      >
        <h2 className="text-3xl font-extrabold text-white flex items-center space-x-3">
          <Users size={30} className="text-fuchsia-400" />
          <span>Team Management & Roles</span>
        </h2>
        <motion.button
          className="flex items-center space-x-2 bg-fuchsia-600 px-4 py-2 rounded-lg font-medium hover:bg-fuchsia-700 transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          <UserPlus size={20} className="text-[#fafafa]" />
          <span className="text-[#fafafa]">Invite New Member</span>
        </motion.button>
      </motion.header>

      {/* Team Member List */}
      <motion.div
        variants={itemVariants}
        className="bg-[#140036] rounded-xl border border-[#210045] shadow-lg overflow-hidden"
      >
        <div className="grid grid-cols-4 md:grid-cols-6 p-4 font-semibold text-gray-400 border-b border-[#210045]">
          <span className="col-span-2">Member</span>
          <span className="hidden md:block">Email</span>
          <span>Role</span>
          <span className="hidden md:block">Last Active</span>
          <span className="text-right">Actions</span>
        </div>
        <motion.div variants={containerVariants}>
          {teamMembers.map((member, index) => (
            <MemberRow key={member.id} member={member} index={index} />
          ))}
        </motion.div>
      </motion.div>

      {/* Role Definitions */}
      <motion.div
        variants={itemVariants}
        className="pt-6 border-t border-[#210045] space-y-4"
      >
        <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Shield size={24} className="text-yellow-400" />
          <span>Role-Based Access Control (RBAC)</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <motion.article
              key={role.name}
              variants={itemVariants}
              custom={(index + teamMembers.length) * 0.1}
              className="bg-[#140036] p-6 rounded-xl border border-[#210045] space-y-2"
            >
              <h4 className="text-xl font-bold text-fuchsia-400">
                {role.name}
              </h4>
              <p className="text-gray-400 text-sm">{role.description}</p>
              <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center space-x-1 pt-2">
                <Settings size={16} />
                <span>View Permissions</span>
              </button>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
