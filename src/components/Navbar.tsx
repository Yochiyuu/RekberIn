import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const location = useLocation();

  const linkStyle = (path: string) =>
    `text-sm font-medium transition-colors tracking-wide ${
      location.pathname === path
        ? "text-white"
        : "text-gray-500 hover:text-white"
    }`;

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO AREA (Icon Dihapus & Font Dipertegas) */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black text-white tracking-tighter hover:text-gray-300 transition-colors">
            RekberIn
          </span>
        </Link>

        {/* MENU TENGAH */}
        <div className="hidden md:flex items-center gap-8 uppercase text-xs tracking-widest">
          <Link to="/" className={linkStyle("/")}>
            Introduction
          </Link>
          <Link to="/app" className={linkStyle("/app")}>
            Resources
          </Link>
          <Link to="/history" className={linkStyle("/history")}>
            Innovation
          </Link>
          <Link to="/buy" className={linkStyle("/buy")}>
            Participate
          </Link>
        </div>

        {/* CONNECT WALLET */}
        <div className="flex items-center">
          <ConnectButton
            showBalance={false}
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
            chainStatus="none"
          />
        </div>
      </div>
    </nav>
  );
}
