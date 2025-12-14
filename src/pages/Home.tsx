import { Coins, Lock, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      {/* HERO SECTION */}
      <div className="text-center space-y-8 py-20">
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium animate-pulse">
          <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
          Ecosystem Drew Token Live
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
          Satu Platform, <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Semua Kebutuhan Kripto
          </span>
        </h1>

        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          Layanan Rekening Bersama (Escrow) terdesentralisasi, didukung oleh
          Drew Token sebagai mata uang native ekosistem.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/app"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95"
          >
            Mulai Transaksi
          </Link>
          <a
            href="#"
            className="px-8 py-3 border border-gray-700 hover:bg-gray-800 text-white font-bold rounded-xl transition-colors"
          >
            Beli Token Drew
          </a>
        </div>
      </div>

      {/* FEATURE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
        <FeatureCard
          icon={<ShieldCheck />}
          title="Aman (Escrow)"
          desc="Dana dikunci Smart Contract. Seller nakal ga bisa kabur."
        />
        <FeatureCard
          icon={<Zap />}
          title="Cepat"
          desc="Transaksi Lisk Sepolia hitungan detik, gas fee murah."
        />
        <FeatureCard
          icon={<Coins />}
          title="Drew Token"
          desc="Gunakan token native untuk diskon fee transaksi."
        />
        <FeatureCard
          icon={<Lock />}
          title="Anti-Hackback"
          desc="Sistem dispute resolution dengan admin terpercaya."
        />
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-gray-900 border border-white/5 hover:border-blue-500/30 transition-colors group">
      <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}
