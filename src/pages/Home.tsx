import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Code,
  Coins,
  Lock,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="h-screen w-full bg-black text-white selection:bg-white selection:text-black overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
      {/* --- SECTION 1: HERO --- */}
      <section className="relative h-screen w-full snap-start flex flex-col justify-center items-center px-6 bg-grid border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest uppercase text-gray-300">
                Live on Lisk Sepolia
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white leading-[0.9]">
              TRUSTLESS <br />
              <span className="text-gray-600">ESCROW.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Sistem Rekening Bersama terdesentralisasi.{" "}
            <br className="hidden md:block" />
            Keamanan transaksi tanpa perantara manusia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-5 pt-8"
          >
            <Link
              to="/app"
              className="px-10 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-gray-200 transition-transform hover:scale-105 flex items-center justify-center gap-3"
            >
              Mulai Transaksi <ArrowRight size={20} />
            </Link>
            <Link
              to="/buy"
              className="px-10 py-4 bg-transparent border-2 border-white/20 text-white text-lg font-bold rounded-full hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-3"
            >
              Beli Token
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest">
            Scroll Down
          </span>
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* --- SECTION 2: SECURITY (BENTO GRID LAYOUT) --- */}
      <section className="h-screen w-full snap-start flex flex-col justify-center items-center px-6 bg-black border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 p-4">
          <div className="md:col-span-5 flex flex-col justify-center space-y-6">
            <ScrollReveal>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                Proteksi <br />
                <span className="text-gray-500">Multilayer.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mt-4">
                Dana tidak dipegang admin, tapi dikunci oleh Smart Contract yang
                berjalan otomatis di atas Blockchain. Tidak ada celah untuk
                manipulasi manusia.
              </p>
              <div className="flex gap-4 mt-6">
                <div className="flex items-center gap-2 text-sm font-mono text-gray-300 bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                  <CheckCircle size={14} className="text-green-500" /> Audited
                </div>
                <div className="flex items-center gap-2 text-sm font-mono text-gray-300 bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                  <CheckCircle size={14} className="text-green-500" /> Open
                  Source
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ScrollReveal
              delay={0.2}
              className="sm:col-span-2 bg-[#080808] border border-white/10 p-8 rounded-3xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                <Code size={100} />
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Escrow Smart Contract
              </h3>
              <p className="text-gray-500 text-sm max-w-sm">
                Logika pemrograman yang mengunci dana sampai kedua belah pihak
                (pembeli & penjual) menyetujui transaksi selesai.
              </p>
            </ScrollReveal>

            <ScrollReveal
              delay={0.3}
              className="bg-[#080808] border border-white/10 p-6 rounded-3xl hover:border-white/30 transition-colors"
            >
              <Lock className="text-white mb-4" size={32} />
              <h4 className="text-xl font-bold text-white mb-1">
                Anti-Rugpull
              </h4>
              <p className="text-gray-500 text-xs">
                Admin tidak memiliki akses withdraw dana user.
              </p>
            </ScrollReveal>

            <ScrollReveal
              delay={0.4}
              className="bg-[#080808] border border-white/10 p-6 rounded-3xl hover:border-white/30 transition-colors"
            >
              <RefreshCcw className="text-white mb-4" size={32} />
              <h4 className="text-xl font-bold text-white mb-1">Auto Refund</h4>
              <p className="text-gray-500 text-xs">
                Dana kembali otomatis jika transaksi dibatalkan.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: TOKEN (BOLD TYPOGRAPHY BACKGROUND) --- */}
      <section className="h-screen w-full snap-start flex flex-col justify-center items-center px-6 bg-grid border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5">
          <span className="text-[20vw] font-black text-white tracking-tighter">
            IDRD
          </span>
        </div>

        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center z-10">
          <ScrollReveal>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-green-400 font-mono text-sm border border-green-500/20 bg-green-500/10 px-3 py-1 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />{" "}
                Stablecoin
              </div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                NILAI TUKAR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">
                  1:1 RUPIAH.
                </span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed max-w-md">
                Hindari volatilitas crypto. IDRD didesain untuk menjaga nilai
                tetap stabil setara dengan Rupiah, khusus untuk transaksi di
                platform ini.
              </p>

              <div className="pt-4">
                <Link
                  to="/buy"
                  className="inline-flex items-center gap-4 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all"
                >
                  Tukar Sekarang <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal
            delay={0.2}
            className="flex justify-center md:justify-end"
          >
            <div className="relative w-80 h-[450px] bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] border border-white/10 p-8 shadow-2xl flex flex-col justify-between overflow-hidden group hover:border-white/30 transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/10 transition-colors" />

              <div className="flex justify-between items-start">
                <Coins size={40} className="text-white" />
                <span className="font-mono text-xs text-gray-500 border border-white/10 px-2 py-1 rounded">
                  ERC-20
                </span>
              </div>

              <div className="text-center space-y-2 relative">
                <div className="w-32 h-32 mx-auto bg-gradient-to-tr from-gray-800 to-gray-700 rounded-full flex items-center justify-center shadow-lg border-4 border-black mb-6 group-hover:scale-110 transition-transform duration-500">
                  <span className="text-4xl font-black text-white">Rp</span>
                </div>
                <h3 className="text-3xl font-bold text-white">IDRD</h3>
                <p className="text-sm text-gray-400">
                  Indonesian Digital Rupiah Drew
                </p>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Price</span>
                  <span className="text-white font-mono">1 IDRD = 1 IDR</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Network</span>
                  <span className="text-white font-mono">Lisk Sepolia</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* --- SECTION 4: CTA --- */}
      <section className="h-screen w-full snap-start flex flex-col justify-center items-center px-6 text-center bg-black">
        <ScrollReveal>
          <div className="mb-10 inline-flex p-6 rounded-full bg-white/5 border border-white/10">
            <ShieldCheck className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-none">
            MULAI TRANSAKSI <br /> AMAN SEKARANG.
          </h2>
          <p className="text-gray-400 text-xl max-w-xl mx-auto mb-10">
            Bergabung dengan ribuan pengguna lain yang telah mengamankan
            transaksi digital mereka.
          </p>
          <div className="flex flex-col items-center gap-6">
            <Link
              to="/app"
              className="px-12 py-6 bg-white text-black text-xl font-bold rounded-full hover:bg-gray-300 transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              Buka Dashboard
            </Link>
            <p className="text-gray-600 text-xs tracking-widest uppercase mt-8">
              RekberIn © 2025 • Decentralized Escrow Protocol
            </p>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

function ScrollReveal({ children, className, delay = 0 }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
