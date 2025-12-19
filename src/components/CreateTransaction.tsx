import { motion } from "framer-motion";
import { Clock, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { REKBER_ABI, REKBER_ADDRESS } from "../config/constants";

export function CreateTransaction() {
  const [buyer, setBuyer] = useState("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("3"); // Default 3 Menit (buat testing)

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyer || !item || !amount || !duration) return;

    writeContract({
      address: REKBER_ADDRESS as `0x${string}`,
      abi: REKBER_ABI,
      functionName: "createTransaction",
      // Parameter Contract V2: [Buyer, Item, Amount, Duration]
      args: [buyer as `0x${string}`, item, BigInt(amount), BigInt(duration)],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full bg-[#0b0f19] p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] -mr-16 -mt-16 pointer-events-none" />

      <h3 className="text-2xl font-bold text-white mb-2">
        Buat Transaksi Baru
      </h3>
      <p className="text-gray-400 text-sm mb-8">
        Isi detail transaksi escrow dengan aman.
      </p>

      <form onSubmit={handleCreate} className="space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Alamat Pembeli (Wallet)
          </label>
          <input
            type="text"
            placeholder="0x..."
            value={buyer}
            onChange={(e) => setBuyer(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Detail Barang/Jasa
          </label>
          <input
            type="text"
            placeholder="Contoh: Akun Game / Jasa Design"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Harga (IDRD)
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Garansi Otomatis
            </label>
            <div className="relative">
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
              />
              <div className="absolute right-4 top-3 text-xs font-bold text-gray-500 flex items-center gap-1">
                <Clock size={12} /> Menit
              </div>
            </div>
          </div>
        </div>

        <button
          disabled={isPending || isConfirming}
          type="submit"
          className="w-full py-4 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg transform active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending || isConfirming ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Memproses
              Blockchain...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" /> Buat Transaksi
            </>
          )}
        </button>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs mt-4 break-words">
            Error: {error.message.split("\n")[0]}
          </div>
        )}

        {isSuccess && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm font-bold text-center mt-4">
            ✅ Transaksi Berhasil Dibuat! <br />
            <span className="text-xs font-normal text-gray-400">
              Tunggu pembeli melakukan deposit.
            </span>
          </div>
        )}
      </form>
    </motion.div>
  );
}
