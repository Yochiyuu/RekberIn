import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  ArrowRightLeft,
  Home,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-blue-400 bg-blue-500/10"
      : "text-gray-400 hover:text-white";

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <ShieldCheck className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            RekberDrew
          </span>
        </Link>

        {/* MENU TENGAH */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${isActive(
              "/"
            )}`}
          >
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link
            to="/app"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${isActive(
              "/app"
            )}`}
          >
            <ArrowRightLeft className="w-4 h-4" /> Rekber App
          </Link>
          <Link
            to="/history"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${isActive(
              "/history"
            )}`}
          >
            <LayoutDashboard className="w-4 h-4" /> History
          </Link>
        </div>

        {/* CONNECT WALLET */}
        <ConnectButton
          showBalance={false}
          accountStatus="avatar"
          chainStatus="icon"
        />
      </div>
    </nav>
  );
}
