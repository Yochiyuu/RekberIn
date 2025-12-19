import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { CreateTransaction } from "../components/CreateTransaction";
import { TransactionList } from "../components/TransactionList";

export function RekberApp() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* KOLOM KIRI: FORM (5 Kolom) */}
        <div className="lg:col-span-5">
          <CreateTransaction />
        </div>

        {/* KOLOM KANAN: FEED (7 Kolom) */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#0b0f19]/80 backdrop-blur-md rounded-3xl border border-white/5 p-8 min-h-[600px] relative"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Globe className="w-6 h-6 text-blue-500" />
                  Public Explorer
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  Pantau semua transaksi yang terjadi.
                </p>
              </div>
              <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Live
              </div>
            </div>

            {/* KOMPONEN LIST TRANSAKSI */}
            <TransactionList />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
