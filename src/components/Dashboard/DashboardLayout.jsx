import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  Zap,
  Home,
  MessageSquare,
  Users,
  DollarSign,
  Send,
  Key,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Share2,
  Cpu,
  Cloud,
  Database,
  Layers,
  Calendar,
} from "lucide-react";

// --- HelplyAI Logo Component ---
const HelplyAILogo = ({ className = "w-8 h-8" }) => (
  <div className={`relative ${className}`}>
    <Shield className="w-full h-full text-white" strokeWidth={1.5} />
    <Zap
      className="absolute top-1/2 left-1/2 w-3 h-3 text-fuchsia-400 fill-fuchsia-400 transform -translate-x-1/2 -translate-y-1/2"
      strokeWidth={0}
    />
  </div>
);

// --- Motion Variants ---
const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut", delay: custom },
  }),
};
const containerVariants = { hidden: {}, visible: {} };

// --- Navigation Items ---
const navItems = [
  {
    heading: null,
    links: [
      { name: "Dashboard Overview", icon: Home, path: "/dashboard" },
      { name: "Team Inbox", icon: MessageSquare, path: "/dashboard/inbox" },
    ],
  },
  {
    heading: "Bot Configuration",
    links: [
      { name: "AI Knowledge Base", icon: Cpu, path: "/dashboard/ai-rag" },
      { name: "Channels & Widgets", icon: Share2, path: "/dashboard/channels" },
      { name: "Follow-up Engine", icon: Send, path: "/dashboard/followup" },
    ],
  },
  {
    heading: "Business & Integrations",
    links: [
      {
        name: "CRM & Scheduling",
        icon: Cloud,
        path: "/dashboard/integrations",
      },
      {
        name: "Payments & Revenue",
        icon: DollarSign,
        path: "/dashboard/payments",
      },
    ],
  },
  {
    heading: "Admin & Security",
    links: [
      { name: "Team & Roles", icon: Users, path: "/dashboard/team" },
      { name: "API Keys", icon: Key, path: "/dashboard/api-keys" },
      { name: "General Settings", icon: Settings, path: "/dashboard/settings" },
    ],
  },
];

// --- Sidebar Component ---
const Sidebar = ({ isOpen, closeSidebar, isCollapsed, toggleCollapse }) => {
  const location = useLocation();

  return (
    <motion.nav
      className={`fixed lg:sticky top-0 left-0 h-screen bg-[#140036] flex flex-col z-30
        border-r border-[#210045] transition-all duration-300
        ${isCollapsed ? "w-20" : "w-64"} 
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      {/* Logo & Collapse */}
      <div className="flex items-center justify-between pl-4 pr-2 py-6">
        <div className="flex items-center space-x-2">
          <HelplyAILogo className="w-7 h-7" />
          {!isCollapsed && (
            <h1 className="text-xl sm:text-2xl font-extrabold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-fuchsia-400">
                Helply
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-blue-400 font-bold italic">
                AI
              </span>
            </h1>
          )}
        </div>
        <button
          onClick={toggleCollapse}
          className="text-gray-400 hover:text-fuchsia-400 hidden lg:block"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex flex-col flex-grow overflow-y-auto pb-4 scrollbar-hide">
        {navItems.map((group, groupIndex) => (
          <motion.ul key={groupIndex} className="space-y-1 mt-4 pl-2">
            {!isCollapsed && group.heading && (
              <li className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {group.heading}
              </li>
            )}
            {group.links.map((item, itemIndex) => (
              <motion.li
                key={item.name}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                custom={groupIndex * 0.1 + itemIndex * 0.05}
              >
                <Link
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center p-3 mx-2 rounded-lg transition-colors duration-300 
                  ${
                    location.pathname === item.path
                      ? "bg-[#1e004a] text-fuchsia-400 font-medium"
                      : "text-gray-400 hover:bg-[#1e004a] hover:text-fuchsia-400"
                  }`}
                >
                  <item.icon
                    size={20}
                    className={isCollapsed ? "mx-auto" : ""}
                  />
                  {!isCollapsed && <span className="ml-3">{item.name}</span>}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        ))}
      </div>

      {/* Logout */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        custom={navItems.length * 0.1}
        className="mt-auto pt-4 border-t border-[#210045] p-2"
      >
        <button className="flex items-center p-3 rounded-lg w-full text-gray-400 hover:bg-red-900/40 hover:text-red-400 transition-colors">
          <LogOut size={20} className={isCollapsed ? "mx-auto" : ""} />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </motion.div>
    </motion.nav>
  );
};

// --- Header Component ---
const Header = ({ openSidebar }) => (
  <motion.header
    className="sticky top-0 z-20 w-full p-4 md:py-6 md:px-8 bg-[#140036] border-b border-[#210045] flex items-center justify-between"
    variants={pageTransition}
    initial="initial"
    animate="animate"
  >
    <div className="flex items-center space-x-4">
      <button className="lg:hidden text-white" onClick={openSidebar}>
        <Menu size={24} />
      </button>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-400 hidden sm:block">
        Admin Dashboard
      </h1>
    </div>
    <div className="flex items-center space-x-4">
      <button className="p-2 rounded-full bg-[#1e004a] text-gray-400 hover:text-fuchsia-400 transition-colors">
        <Bell size={20} />
      </button>
      <div className="w-8 h-8 rounded-full bg-fuchsia-600 flex items-center justify-center text-sm font-semibold">
        AE
      </div>
    </div>
  </motion.header>
);

// --- Main Dashboard Layout ---
export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <motion.section
      className="min-h-screen flex bg-[#0A0027]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header openSidebar={() => setIsSidebarOpen(true)} />
        <motion.main
          className="flex-1 p-4 sm:p-8 overflow-y-auto"
          variants={pageTransition}
          initial="initial"
          animate="animate"
        >
          <Outlet />
        </motion.main>
      </div>
    </motion.section>
  );
}
