import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
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
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
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

// --- Welcome Modal Component ---
const WelcomeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#0A0027]/80 backdrop-blur-md"
      />
      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-[#140036] border border-fuchsia-500/30 p-8 rounded-[2.5rem] shadow-[0_0_50px_rgba(192,38,211,0.2)] overflow-hidden text-center">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-fuchsia-600/20 blur-[60px] rounded-full" />
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20">
              <HelplyAILogo className="w-10 h-10" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-white mb-2 leading-tight">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-fuchsia-400">
              HelplyAI
            </span>
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Your AI-powered support engine is ready. Let's start transforming
            your customer experience today.
          </p>
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-fuchsia-500/25 active:scale-95"
          >
            Get Started <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Navigation Items ---
const navItems = [
  {
    heading: null,
    links: [
      { name: "Overview", icon: Home, path: "/dashboard" },
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
    heading: "Business",
    links: [
      { name: "Integrations", icon: Cloud, path: "/dashboard/integrations" },
      { name: "Revenue", icon: DollarSign, path: "/dashboard/payments" },
    ],
  },
  {
    heading: "Admin",
    links: [
      { name: "Team & Roles", icon: Users, path: "/dashboard/team" },
      { name: "API Keys", icon: Key, path: "/dashboard/api-keys" },
      { name: "Settings", icon: Settings, path: "/dashboard/settings" },
    ],
  },
];

// --- Sidebar Component ---
const Sidebar = ({ isOpen, closeSidebar, isCollapsed, toggleCollapse }) => {
  const location = useLocation();

  return (
    <aside
      className={`fixed lg:sticky top-0 left-0 h-screen bg-[#0A0027] flex flex-col z-30
        border-r border-white/5 transition-all duration-300
        ${isCollapsed ? "w-20" : "w-64"} 
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-6">
        <div className="flex items-center gap-3">
          <HelplyAILogo className="w-8 h-8 flex-shrink-0" />
          {!isCollapsed && (
            <span className="text-xl font-black tracking-tighter text-white">
              Helply<span className="text-fuchsia-500 italic">AI</span>
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 space-y-6 scrollbar-hide">
        {navItems.map((group, gIdx) => (
          <div key={gIdx}>
            {!isCollapsed && group.heading && (
              <p className="px-4 mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                {group.heading}
              </p>
            )}
            <ul className="space-y-1">
              {group.links.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      onClick={closeSidebar}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group
                        ${
                          isActive
                            ? "bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 shadow-[0_0_20px_rgba(192,38,211,0.1)]"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                      <item.icon
                        size={20}
                        className={`${
                          isActive
                            ? "text-fuchsia-400"
                            : "group-hover:text-fuchsia-400"
                        }`}
                      />
                      {!isCollapsed && (
                        <span className="font-semibold text-sm">
                          {item.name}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom Buttons */}
      <div className="p-4 border-t border-white/5 flex flex-col gap-2">
        {/* Collapse/Expand */}
        <button
          onClick={toggleCollapse}
          className="flex items-center gap-3 p-3 rounded-xl w-full text-gray-400 hover:bg-white/5 hover:text-white transition-all"
        >
          {isCollapsed ? (
            <ChevronRight size={20} className="mx-auto" />
          ) : (
            <ChevronLeft size={20} />
          )}
          {!isCollapsed && (
            <span className="font-semibold text-sm">Collapse</span>
          )}
        </button>

        {/* Logout */}
        <button className="flex items-center gap-3 p-3 rounded-xl w-full text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all">
          <LogOut size={20} className={isCollapsed ? "mx-auto" : ""} />
          {!isCollapsed && (
            <span className="font-semibold text-sm">Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
};

// --- Header Component ---
const Header = ({ openSidebar }) => (
  <header className="sticky top-0 z-20 w-full py-4 px-8 bg-[#0A0027]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <button
        className="lg:hidden p-2 text-gray-400 hover:text-white"
        onClick={openSidebar}
      >
        <Menu size={24} />
      </button>
      <div className="hidden sm:flex items-center gap-2 text-gray-400">
        <Sparkles size={16} className="text-fuchsia-500" />
        <span className="text-sm font-bold uppercase tracking-widest">
          Admin Dashboard
        </span>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <button className="relative p-2 rounded-xl bg-white/5 text-gray-400 hover:text-fuchsia-400 hover:bg-white/10 transition-all">
        <Bell size={20} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-fuchsia-500 rounded-full border-2 border-[#0A0027]" />
      </button>
      <div className="flex items-center gap-3 pl-4 border-l border-white/10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-600 to-blue-600 flex items-center justify-center text-sm font-black border border-white/10">
          AE
        </div>
      </div>
    </div>
  </header>
);

// --- Dashboard Layout ---
export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("helply_visited");
    if (!hasVisited) {
      setShowWelcome(true);
      sessionStorage.setItem("helply_visited", "true");
    }
  }, []);

  return (
    <section className="min-h-screen flex bg-[#0A0027]">
      <WelcomeModal
        isOpen={showWelcome}
        onClose={() => setShowWelcome(false)}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Header openSidebar={() => setIsSidebarOpen(true)} />
        <main className="flex-1 p-6 md:p-10  overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </section>
  );
}
