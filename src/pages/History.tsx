import { motion } from "framer-motion";
import { Clock, Filter, Search } from "lucide-react";

export function History() {
  const isEmpty = true;

  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Riwayat Transaksi</h1>
          <p className="text-gray-400 mt-1">
            Pantau status uang dan barangmu di sini.
          </p>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-800/50 border border-white/5 rounded-xl text-sm font-medium hover:bg-gray-700/50 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Cari ID Transaksi..."
              className="pl-9 pr-4 py-2 bg-gray-800/50 border border-white/5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full md:w-64"
            />
          </div>
        </div>
      </motion.div>

      {isEmpty ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0b0f19]/60 backdrop-blur-md rounded-3xl border border-white/5 p-16 text-center"
        >
          <div className="w-20 h-20 bg-gray-800/50 rounded-full mx-auto flex items-center justify-center mb-6 border border-white/5">
            <Clock className="w-10 h-10 text-gray-600" />
          </div>
          <h3 className="text-xl font-bold text-white">Belum ada riwayat</h3>
          <p className="text-gray-400 mt-2 max-w-md mx-auto leading-relaxed">
            Kamu belum pernah melakukan transaksi sebagai Pembeli atau Penjual.
            Mulai transaksi aman pertamamu sekarang!
          </p>
        </motion.div>
      ) : (
        <div className="text-white">List Transaksi Akan Muncul Di Sini</div>
      )}
    </div>
  );
}
